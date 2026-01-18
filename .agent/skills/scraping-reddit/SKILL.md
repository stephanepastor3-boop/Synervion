---
name: scraping-reddit
description: Scrapes top posts from a specified subreddit. Use when the user asks to extract content from Reddit.
---

# Reddit Scraping Skill

## When to use this skill
- When the user wants to see the top posts from a specific subreddit.
- When the user asks to "scrape" or "fetch" content from Reddit.
- When you need to get recent discussions or news from a subreddit.

## Workflow
1.  **Identify the Subreddit**: Determine which subreddit the user is interested in.
2.  **Run extraction**: Use the provided script `scripts/scrape.js` to fetch the data.
3.  **Present Results**: formatting the output clearly for the user.

## Instructions
This skill provides a robust way to scrape Reddit JSON data using `curl` to bypass standard bot protections.

To scrape a subreddit, run the following command from the root of the workspace:
```bash
node .agent/skills/scraping-reddit/scripts/scrape.js --subreddit=[SUBREDDIT_NAME] --limit=[NUMBER_OF_POSTS]
```
- `[SUBREDDIT_NAME]`: The name of the subreddit (e.g., `technology`, `javascript`).
- `[NUMBER_OF_POSTS]`: (Optional) Number of posts to retrieve. Default is 3.

## Resources
- [scripts/scrape.js](scripts/scrape.js): Node.js script that uses `curl` to fetch and parse Reddit data.
