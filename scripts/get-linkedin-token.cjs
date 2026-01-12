const http = require('http');
const https = require('https');
const url = require('url');
const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const REDIRECT_URI = 'http://localhost:8080/callback';

console.log('--- LinkedIn Access Token Generator ---');
console.log('Please ensure your LinkedIn App has "http://localhost:8080/callback" added to the Authorized Redirect URLs in the Developer Portal.\n');

rl.question('Enter Client ID: ', (clientId) => {
    rl.question('Enter Client Secret: ', (clientSecret) => {

        const server = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);

            if (parsedUrl.pathname === '/callback') {
                const code = parsedUrl.query.code;

                if (code) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h1>Authorization Code Received</h1><p>Returning to console...</p>');

                    console.log('\nAuthorization Code received. Exchanging for Access Token...');
                    getAccessToken(clientId, clientSecret, code);

                    server.close();
                } else {
                    res.writeHead(400);
                    res.end('No code found.');
                }
            } else {
                res.writeHead(404);
                res.end('Not found');
            }
        });

        server.listen(8080, () => {
            const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId.trim()}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&state=random_state_string&scope=w_member_social%20r_liteprofile%20w_organization_social%20r_organization_social`;

            console.log('\nPlease open the following URL in your browser to authorize:');
            console.log(authUrl);

            // Try to open automatically
            const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
            exec(`${start} "${authUrl}"`);
        });
    });
});

function getAccessToken(clientId, clientSecret, code) {
    const postData = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: clientId.trim(),
        client_secret: clientSecret.trim()
    }).toString();

    const options = {
        hostname: 'www.linkedin.com',
        path: '/oauth/v2/accessToken',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            const response = JSON.parse(data);
            if (response.access_token) {
                console.log('\nSUCCESS! Here is your Access Token:\n');
                console.log(response.access_token);
                console.log('\nExpires in:', response.expires_in, 'seconds');
                process.exit(0);
            } else {
                console.error('Error fetching token:', response);
                process.exit(1);
            }
        });
    });

    req.on('error', (e) => {
        console.error('Request error:', e);
    });

    req.write(postData);
    req.end();
}
