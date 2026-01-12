import https from 'node:https';
import fs from 'node:fs';
import { Buffer } from 'node:buffer';
import path from 'node:path';

// Configuration
// Args: node script.js <content_file> <image1> <image2> ...
const CONTENT_FILE = process.argv[2];
const IMAGE_FILES = process.argv.slice(3);

if (!CONTENT_FILE) {
    console.error("Usage: node post-linkedin-update.js <CONTENT_FILE> [IMAGE_FILES...]");
    process.exit(1);
}

// Credentials
const ACCESS_TOKEN = 'AQV1k6vAjWH8is39CLVDKWyUHuj0m8-bhzttkAQQ_Smef_rB45PZdKb-3mK13PkWeRnnmTYXBFLg4F_8F8-UAtlRW2ZUhLcUi52QDav4pdIB8VILnDq8ECkfjhV3pUpEa6ZoyMA2VFg7FpZ9yDQi4Gis4TOuELwlDzodxsYiViLy-iSnYqL25litZTyb9SNgJYxHCZJcqD2N5_-qAZFJJTZ1WmDJhobf29GwV7DFoUdqYPxATZu2EMxNy3hWPxZBzkqDpudkmfaI8hyojerSZ9vqSHusUDwa0pFlw_2iJuLkglAg_J8F3XJXsdygM0Au8C3beP8O_bGVczq9c3_jWo9iF2s6rQ';
const ORGANIZATION_ID = '105128149';

const content = fs.readFileSync(CONTENT_FILE, 'utf8');

// Simple clean up
const cleanContent = content
    .replace(/^#+ .*/gm, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .trim();

async function main() {
    try {
        let mediaAssets = [];

        if (IMAGE_FILES.length > 0) {
            console.log(`Uploading ${IMAGE_FILES.length} images...`);
            // Upload sequentially to avoid rate limits or race conditions
            for (const file of IMAGE_FILES) {
                const urn = await uploadImage(file);
                // Poll for status
                await pollForStatus(urn);
                mediaAssets.push(urn);
            }
        }

        await postUpdate(cleanContent, mediaAssets);

    } catch (error) {
        console.error("FAILED:", error);
        process.exit(1);
    }
}

function httpsRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(data ? JSON.parse(data) : {});
                    } catch (e) {
                        resolve({});
                    }
                } else {
                    reject(new Error(`Status ${res.statusCode}: ${data}`));
                }
            });
        });
        req.on('error', reject);
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

async function uploadImage(filePath) {
    // 1. Register Upload
    console.log(`Registering upload for ${path.basename(filePath)}...`);
    const registerData = JSON.stringify({
        "registerUploadRequest": {
            "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
            "owner": `urn:li:organization:${ORGANIZATION_ID}`,
            "serviceRelationships": [{
                "relationshipType": "OWNER",
                "identifier": "urn:li:userGeneratedContent"
            }]
        }
    });

    const registerRes = await httpsRequest({
        hostname: 'api.linkedin.com',
        path: '/v2/assets?action=registerUpload',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Length': Buffer.byteLength(registerData)
        }
    }, registerData);

    const uploadUrl = registerRes.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    const assetUrn = registerRes.value.asset;

    // 2. Upload Binary
    console.log(`Uploading bytes to ${assetUrn}...`);
    const fileBuffer = fs.readFileSync(filePath);
    const url = new URL(uploadUrl);

    await httpsRequest({
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/octet-stream',
            'Content-Length': fileBuffer.length
        }
    }, fileBuffer);

    return assetUrn;
}

async function pollForStatus(assetUrn) {
    console.log(`Verifying status for ${assetUrn}...`);
    const maxRetries = 20;
    const delay = 2000; // 2 seconds

    const assetId = assetUrn.split(':').pop();
    for (let i = 0; i < maxRetries; i++) {
        const res = await httpsRequest({
            hostname: 'api.linkedin.com',
            path: `/v2/assets/${assetId}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'X-Restli-Protocol-Version': '2.0.0'
            }
        });

        const status = res.recipes && res.recipes[0] ? res.recipes[0].status : 'UNKNOWN';
        process.stdout.write(`Attempt ${i + 1}: ${status} \r`);

        if (status === 'AVAILABLE') {
            console.log(`\nVerified: ${assetUrn} is AVAILABLE.`);
            return true;
        } else if (status === 'FAILED') {
            throw new Error(`Asset processing failed: ${JSON.stringify(res)}`);
        }

        await new Promise(r => setTimeout(r, delay));
    }
    throw new Error("\nAsset processing timed out.");
}

async function postUpdate(text, assets) {
    console.log("Creating post...");

    let shareContent = {
        "shareCommentary": {
            "text": text
        },
        "shareMediaCategory": "NONE"
    };

    if (assets.length > 0) {
        shareContent.shareMediaCategory = "IMAGE";
        shareContent.media = assets.map(urn => ({
            "status": "READY",
            "description": { "text": "Synervion Website Launch" },
            "media": urn,
            "title": { "text": "Synervion Website Launch" }
        }));
    }

    const postData = JSON.stringify({
        "author": `urn:li:organization:${ORGANIZATION_ID}`,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": shareContent
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    });

    const res = await httpsRequest({
        hostname: 'api.linkedin.com',
        path: '/v2/ugcPosts',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Length': Buffer.byteLength(postData)
        }
    }, postData);

    console.log("Success! Post created.");
    console.log("ID:", res.id);
}

main();
