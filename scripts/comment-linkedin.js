import https from 'node:https';
import { Buffer } from 'node:buffer';

const ACCESS_TOKEN = 'AQV1k6vAjWH8is39CLVDKWyUHuj0m8-bhzttkAQQ_Smef_rB45PZdKb-3mK13PkWeRnnmTYXBFLg4F_8F8-UAtlRW2ZUhLcUi52QDav4pdIB8VILnDq8ECkfjhV3pUpEa6ZoyMA2VFg7FpZ9yDQi4Gis4TOuELwlDzodxsYiViLy-iSnYqL25litZTyb9SNgJYxHCZJcqD2N5_-qAZFJJTZ1WmDJhobf29GwV7DFoUdqYPxATZu2EMxNy3hWPxZBzkqDpudkmfaI8hyojerSZ9vqSHusUDwa0pFlw_2iJuLkglAg_J8F3XJXsdygM0Au8C3beP8O_bGVczq9c3_jWo9iF2s6rQ';
const ORGANIZATION_ID = '105128149';

const ACTIVITY_URN = process.argv[2];
const COMMENT_TEXT = process.argv[3];

if (!ACTIVITY_URN || !COMMENT_TEXT) {
    console.error("Usage: node comment-linkedin.js <ACTIVITY_URN> <COMMENT_TEXT>");
    process.exit(1);
}

const postData = JSON.stringify({
    "actor": `urn:li:organization:${ORGANIZATION_ID}`,
    "object": ACTIVITY_URN,
    "message": {
        "text": COMMENT_TEXT
    }
});

const options = {
    hostname: 'api.linkedin.com',
    path: `/v2/socialActions/${encodeURIComponent(ACTIVITY_URN)}/comments`,
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log("Success! Comment posted.");
            try {
                const response = JSON.parse(data);
                console.log("Comment ID:", response.id);
            } catch (e) {
                console.log("Response:", data);
            }
        } else {
            console.error(`Error: ${res.statusCode}`);
            console.error(data);
            process.exit(1);
        }
    });
});

req.on('error', (e) => {
    console.error('Request error:', e);
    process.exit(1);
});

req.write(postData);
req.end();
