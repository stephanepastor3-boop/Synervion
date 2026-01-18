import { exec } from 'child_process';
import { parseArgs } from 'util';

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Parse command line arguments
const { values } = parseArgs({
    args: process.argv.slice(2),
    options: {
        subreddit: {
            type: 'string',
            short: 's',
        },
        limit: {
            type: 'string',
            short: 'l',
            default: '3',
        },
    },
});

const subreddit = values.subreddit;
const limit = values.limit;

if (!subreddit) {
    console.error('Error: Please provide a subreddit name using --subreddit or -s');
    process.exit(1);
}

const URL = `https://old.reddit.com/r/${subreddit}/.json?limit=${limit}`;

console.log(`Fetching top ${limit} posts from r/${subreddit}...`);

const command = `curl -s -A "${USER_AGENT}" "${URL}"`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error fetching data: ${error.message}`);
        return;
    }

    // curl might output to stderr even on success, so we rely on stdout presence primarily
    if (!stdout) {
        if (stderr) console.error(`curl stderr: ${stderr}`);
        return;
    }

    try {
        const data = JSON.parse(stdout);

        if (!data.data || !data.data.children || data.data.children.length === 0) {
            console.log('No posts found or unexpected response structure.');
            return;
        }

        const posts = data.data.children.map(child => child.data);

        console.log(`\n--- Top ${posts.length} Posts from r/${subreddit} ---\n`);
        posts.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}`);
            console.log(`   Score: ${post.score}`);
            console.log(`   URL: ${post.url}`);
            console.log(`   Comments: https://www.reddit.com${post.permalink}`);
            console.log('-----------------------------------');
        });

    } catch (parseError) {
        console.error('Error parsing JSON:', parseError.message);
        // console.log('Raw output:', stdout.substring(0, 200)); // Debugging
    }
});
