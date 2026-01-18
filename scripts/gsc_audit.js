
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration ---
const KEY_FILE_PATH = path.resolve(__dirname, '../gsc-service-account.json');
const BASE_URL = 'https://www.synervion.com';
const REPORT_PATH = path.resolve(__dirname, '../seo_audit_report.json');

// --- 1. Reconstruct URL List (Mirroring generate-sitemap.js logic) ---
const studiesPath = path.resolve(__dirname, '../src/data/studies.json');
const articlesPath = path.resolve(__dirname, '../src/data/articles.ts');

const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/partnerships',
    '/brand-system',
    '/calculator/cordyceps-goal-planner',
    '/product/synv-core',
    '/product/synv-pulse',
    '/product/synv-root',
    '/terms',
    '/privacy-policy'
];

let studyRoutes = [];
try {
    if (fs.existsSync(studiesPath)) {
        const studies = JSON.parse(fs.readFileSync(studiesPath, 'utf-8'));
        studyRoutes = studies.map(study => `/study/${study.id}`);
    }
} catch (error) {
    console.warn('Warning: Could not read studies.json', error.message);
}

let articleRoutes = [];
try {
    if (fs.existsSync(articlesPath)) {
        const articlesContent = fs.readFileSync(articlesPath, 'utf-8');
        const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
        let match;
        while ((match = slugRegex.exec(articlesContent)) !== null) {
            articleRoutes.push(`/${match[1]}`);
        }
    }
} catch (error) {
    console.warn('Warning: Could not read articles.ts', error.message);
}

// Full list of URLs to inspect
const allPaths = [...new Set([...staticRoutes, ...studyRoutes, ...articleRoutes])];
const allUrls = allPaths.map(p => `${BASE_URL}${p}`);

console.log(`Auditing ${allUrls.length} URLs for ${BASE_URL}...`);

// --- 2. GSC Audit Function ---

async function auditSEO() {
    // Auth
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE_PATH,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Verify Site Access
    try {
        const sites = await searchconsole.sites.list();
        const siteEntry = sites.data.siteEntry || [];
        const siteUrls = siteEntry.map(s => s.siteUrl);

        // Find best match for our BASE_URL
        // Priority 1: Exact match (URL Prefix)
        // Priority 2: Domain property (sc-domain:)

        const host = new URL(BASE_URL).host; // www.synervion.com
        const domain = host.replace('www.', ''); // synervion.com

        let matchedSite = siteUrls.find(s => s === BASE_URL || s === `${BASE_URL}/`);

        if (!matchedSite) {
            // Check for sc-domain match
            matchedSite = siteUrls.find(s => s === `sc-domain:${domain}` || s === `sc-domain:www.${domain}`);
        }

        // Fallback: Check for ANY sc-domain that ends with the domain
        if (!matchedSite) {
            matchedSite = siteUrls.find(s => s.startsWith('sc-domain:') && (s.includes(domain) || domain.includes(s.replace('sc-domain:', ''))));
        }

        if (!matchedSite) {
            console.error(`Error: Service account does not have access to ${BASE_URL}.`);
            console.error('Available sites:', siteUrls);
            console.error('Please ensure you added the service account email to the GSC property for https://www.synervion.com/');
            process.exit(1);
        }

        console.log(`Connected to GSC Property: ${matchedSite}`);

        const results = [];

        // Process URLs sequentially to avoid rate limits (approx 600/min is quota, but 2000/day total)
        // We will pause slightly between requests just to be safe.
        for (const [index, url] of allUrls.entries()) {
            process.stdout.write(`Warning: Inspecting (${index + 1}/${allUrls.length}): ${url} ... `);

            try {
                const res = await searchconsole.urlInspection.index.inspect({
                    requestBody: {
                        inspectionUrl: url,
                        siteUrl: matchedSite,
                        languageCode: 'en-US'
                    }
                });

                const inspectionResult = res.data.inspectionResult || {};
                const indexStatus = inspectionResult.indexStatusResult || {};

                const status = {
                    url: url,
                    verdict: indexStatus.verdict || 'UNKNOWN', // PASS, FAIL, NEUTRAL
                    coverageState: indexStatus.coverageState || 'UNKNOWN', // INDEXED, DISCOVERED_NOT_INDEXED, CRAWLED_NOT_INDEXED etc
                    indexingState: indexStatus.indexingState || 'UNKNOWN',
                    lastCrawlTime: indexStatus.lastCrawlTime || 'NEVER',
                    pageFetchState: indexStatus.pageFetchState || 'UNKNOWN', // SUCCESSFUL, SOFT_404, NOT_FOUND
                    robotsTxtState: indexStatus.robotsTxtState || 'ALLOWED',
                    mobileUsability: inspectionResult.mobileUsabilityResult?.verdict || 'UNKNOWN',
                    richResults: (inspectionResult.richResultsResult?.detectedItems || []).map(r => r.richResultType)
                };

                results.push(status);
                console.log(`[${status.verdict}] ${status.coverageState}`);

            } catch (err) {
                console.error(`FAILED: ${err.message}`);
                results.push({ url, error: err.message });
            }

            // Small delay to be nice to API
            await new Promise(r => setTimeout(r, 500));
        }

        // Save Report
        fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
        console.log(`\nAudit Complete! Report saved to: ${REPORT_PATH}`);

        // Output Summary
        const indexed = results.filter(r => r.coverageState?.includes('INDEXED')).length;
        const notIndexed = results.filter(r => r.coverageState && !r.coverageState.includes('INDEXED')).length;
        const errors = results.filter(r => r.error).length;

        console.log('\n--- Quick Summary ---');
        console.log(`Total Scanned: ${results.length}`);
        console.log(`Indexed: ${indexed}`);
        console.log(`Not Indexed/Issues: ${notIndexed}`);
        console.log(`Errors: ${errors}`);

    } catch (error) {
        console.error('Fatal Error during audit:', error);
    }
}

auditSEO();
