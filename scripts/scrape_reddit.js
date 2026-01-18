import { exec } from 'child_process';

const SUBREDDIT = 'MushroomSupplements';
const URL = `https://old.reddit.com/r/${SUBREDDIT}/.json?limit=3`;
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function scrapeReddit() {
    console.log(`Fetching top 3 posts from r/${SUBREDDIT}...`);

    const command = `curl -s -A "${USER_AGENT}" "${URL}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error fetching data: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`curl stderr: ${stderr}`);
            return;
        }

        try {
            const data = JSON.parse(stdout);

            if (!data.data || !data.data.children || data.data.children.length === 0) {
                console.log('No posts found or unexpected response structure.');
                // Log a snippet of the response for debugging if needed
                console.log('Response snippet:', stdout.substring(0, 100));
                return;
            }

            const posts = data.data.children.map(child => child.data);

            console.log('\n--- Top 3 Posts ---\n');
            posts.forEach((post, index) => {
                console.log(`${index + 1}. ${post.title}`);
                console.log(`   Score: ${post.score}`);
                console.log(`   URL: ${post.url}`);
                console.log(`   Comments: https://www.reddit.com${post.permalink}`);
                console.log('-----------------------------------');
            });

        } catch (parseError) {
            console.error('Error parsing JSON:', parseError.message);
            console.log('Raw output:', stdout.substring(0, 200));
        }
    });
}

scrapeReddit();
