
import 'dotenv/config';
import fetch from 'node-fetch';

const CRON_SECRET = process.env.CRON_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://synervion.com';

async function triggerCron() {
    console.log("--- TRIGGERING CLOUD CRON JOB ---");
    console.log(`Target: ${APP_URL}/api/cron/daily-post`);

    if (!CRON_SECRET) {
        console.error("Error: CRON_SECRET not found in .env");
        process.exit(1);
    }

    try {
        const response = await fetch(`${APP_URL}/api/cron/daily-post`, {
            headers: {
                'Authorization': `Bearer ${CRON_SECRET}`
            }
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log("Response:", text);

    } catch (error) {
        console.error("Failed to trigger cron:", error);
    }
}

triggerCron();
