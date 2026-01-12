import https from 'node:https';

const ACCESS_TOKEN = 'AQV1k6vAjWH8is39CLVDKWyUHuj0m8-bhzttkAQQ_Smef_rB45PZdKb-3mK13PkWeRnnmTYXBFLg4F_8F8-UAtlRW2ZUhLcUi52QDav4pdIB8VILnDq8ECkfjhV3pUpEa6ZoyMA2VFg7FpZ9yDQi4Gis4TOuELwlDzodxsYiViLy-iSnYqL25litZTyb9SNgJYxHCZJcqD2N5_-qAZFJJTZ1WmDJhobf29GwV7DFoUdqYPxATZu2EMxNy3hWPxZBzkqDpudkmfaI8hyojerSZ9vqSHusUDwa0pFlw_2iJuLkglAg_J8F3XJXsdygM0Au8C3beP8O_bGVczq9c3_jWo9iF2s6rQ';
const POST_ID = process.argv[2];

if (!POST_ID) {
    console.error("Usage: node check-linkedin-post.js <POST_ID>");
    process.exit(1);
}

const options = {
    hostname: 'api.linkedin.com',
    path: `/v2/ugcPosts/${encodeURIComponent(POST_ID)}`,
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
            console.log("Post Details:");
            const post = JSON.parse(data);
            console.log(JSON.stringify(post, null, 2));
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
