import https from 'node:https';

const ACCESS_TOKEN = 'AQV1k6vAjWH8is39CLVDKWyUHuj0m8-bhzttkAQQ_Smef_rB45PZdKb-3mK13PkWeRnnmTYXBFLg4F_8F8-UAtlRW2ZUhLcUi52QDav4pdIB8VILnDq8ECkfjhV3pUpEa6ZoyMA2VFg7FpZ9yDQi4Gis4TOuELwlDzodxsYiViLy-iSnYqL25litZTyb9SNgJYxHCZJcqD2N5_-qAZFJJTZ1WmDJhobf29GwV7DFoUdqYPxATZu2EMxNy3hWPxZBzkqDpudkmfaI8hyojerSZ9vqSHusUDwa0pFlw_2iJuLkglAg_J8F3XJXsdygM0Au8C3beP8O_bGVczq9c3_jWo9iF2s6rQ';
const ACTIVITY_URN = process.argv[2];

if (!ACTIVITY_URN) {
    console.error("Usage: node check-social-actions.js <ACTIVITY_URN>");
    process.exit(1);
}

const options = {
    hostname: 'api.linkedin.com',
    path: `/v2/socialActions/${encodeURIComponent(ACTIVITY_URN)}`,
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'X-Restli-Protocol-Version': '2.0.0'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        if (res.statusCode === 200) {
            console.log("Social Actions:");
            const info = JSON.parse(data);
            console.log(JSON.stringify(info, null, 2));
        } else {
            console.error(`Error: ${res.statusCode}`);
            console.error(data);
        }
    });
});

req.on('error', (e) => {
    console.error('Request error:', e);
});

req.end();
