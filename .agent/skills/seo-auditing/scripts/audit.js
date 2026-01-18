
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple arg parser
const args = process.argv.slice(2);
const getArg = (flag) => {
    const idx = args.indexOf(flag);
    return idx !== -1 ? args[idx + 1] : null;
};

const KEY_FILE_PATH = getArg('--key');
const SITEMAP_SOURCE = getArg('--sitemap'); // Can be URL or local path
const REPORT_PATH = getArg('--output') || 'seo_audit.json';
const BASE_URL_OVERRIDE = getArg('--url'); // Optional overrides

if (!KEY_FILE_PATH || !SITEMAP_SOURCE) {
    console.error('Usage: node audit.js --key <path/to/service-account.json> --sitemap <url_or_path> [--output <path>] [--url <base_url>]');
    process.exit(1);
}

// Helper: Fetch Sitemap
async function getSitemapUrls(source) {
    let content = '';

    if (source.startsWith('http')) {
        console.log(`Fetching sitemap from: ${source}`);
        const res = await fetch(source);
        if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.statusText}`);
        content = await res.text();
    } else {
        console.log(`Reading sitemap from file: ${source}`);
        content = fs.readFileSync(source, 'utf-8');
    }

    // Simple Regex XML Extract (works for standard sitemaps)
    const urls = [];
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(content)) !== null) {
        urls.push(match[1]);
    }
    return urls;
}

async function auditSEO() {
    try {
        // 1. Get URLs
        const allUrls = await getSitemapUrls(SITEMAP_SOURCE);
        if (allUrls.length === 0) {
            console.error('Error: No URLs found in sitemap.');
            process.exit(1);
        }

        // Determine Base URL from first entry if not provided
        const baseUrl = BASE_URL_OVERRIDE || new URL(allUrls[0]).origin;
        console.log(`Auditing ${allUrls.length} URLs for ${baseUrl}...`);

        // 2. Auth
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE_PATH,
            scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });
        const searchconsole = google.searchconsole({ version: 'v1', auth });

        // 3. Find Property
        const sites = await searchconsole.sites.list();
        const siteUrls = (sites.data.siteEntry || []).map(s => s.siteUrl);

        const host = new URL(baseUrl).host;
        const domain = host.replace('www.', '');

        // Matching logic: Exact -> Domain -> Partial Domain
        let matchedSite = siteUrls.find(s => s === baseUrl || s === `${baseUrl}/`);
        if (!matchedSite) matchedSite = siteUrls.find(s => s === `sc-domain:${domain}` || s === `sc-domain:www.${domain}`);
        if (!matchedSite) matchedSite = siteUrls.find(s => s.startsWith('sc-domain:') && (s.includes(domain) || domain.includes(s.replace('sc-domain:', ''))));

        if (!matchedSite) {
            console.error(`Error: Service account does not have access to ${baseUrl}. Available:`, siteUrls);
            process.exit(1);
        }
        console.log(`Connected to GSC Property: ${matchedSite}`);

        // 4. Inspect
        const results = [];
        for (const [index, url] of allUrls.entries()) {
            process.stdout.write(`Warning: Inspecting (${index + 1}/${allUrls.length}): ${url} ... `);
            try {
                const res = await searchconsole.urlInspection.index.inspect({
                    requestBody: { inspectionUrl: url, siteUrl: matchedSite, languageCode: 'en-US' }
                });

                const inspectionResult = res.data.inspectionResult || {};
                const indexStatus = inspectionResult.indexStatusResult || {};

                const status = {
                    url: url,
                    verdict: indexStatus.verdict || 'UNKNOWN',
                    coverageState: indexStatus.coverageState || 'UNKNOWN',
                    indexingState: indexStatus.indexingState || 'UNKNOWN',
                    lastCrawlTime: indexStatus.lastCrawlTime || 'NEVER',
                    pageFetchState: indexStatus.pageFetchState || 'UNKNOWN',
                    mobileUsability: inspectionResult.mobileUsabilityResult?.verdict || 'UNKNOWN',
                    richResults: (inspectionResult.richResultsResult?.detectedItems || []).map(r => r.richResultType)
                };

                results.push(status);
                console.log(`[${status.verdict}] ${status.coverageState}`);
            } catch (err) {
                console.error(`FAILED: ${err.message}`);
                results.push({ url, error: err.message });
            }
            await new Promise(r => setTimeout(r, 500)); // Rate limit buffer
        }

        // 5. Save & Summary
        fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
        console.log(`\nAudit Complete! Report saved to: ${REPORT_PATH}`);

        const indexed = results.filter(r => r.coverageState?.includes('INDEXED')).length;
        const issues = results.length - indexed;
        console.log(`Summary: ${indexed} Indexed / ${issues} Issues/Not Indexed`);

    } catch (error) {
        console.error('Fatal Error:', error);
        process.exit(1);
    }
}

auditSEO();
