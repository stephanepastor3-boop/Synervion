---
name: seo-auditing
description: Audits a website's SEO health using Google Search Console API. Generates a report on indexing status, coverage issues, and mobile usability for all URLs in a sitemap. Use when the user asks to "check SEO", "audit site", or "fix indexing issues".
---

# SEO Auditing Skill

## When to use this skill
- User asks to "audit my SEO" or "check indexing status".
- User reports GSC errors and wants to identify affected pages.
- User wants to check if their new pages are indexed.

## Workflow

1.  **Prerequisites**:
    *   Ensure a Google Service Account JSON key exists in the workspace.
    *   Ensure the Service Account email has **Full** access to the GSC Property.
    *   Ensure `googleapis` is installed (`npm install googleapis`).

2.  **Execute Audit**:
    *   Run the included script pointing to the sitemap and key file.
    *   `node .agent/skills/seo-auditing/scripts/audit.js --key <path-to-key> --sitemap <url-or-path> --output <path-to-report>`

3.  **Analyze**:
    *   Read the generated JSON report.
    *   Summarize findings (Total Indexed, Errors, Not Indexed).
    *   Identify specific URLs requiring action (e.g. "Briefly crawled", "Soft 404").

## Usage Example

```bash
# Install dependency if missing
npm list googleapis || npm install googleapis

# Run Audit (Remote Sitemap)
node .agent/skills/seo-auditing/scripts/audit.js \
  --key ./gsc-key.json \
  --sitemap https://www.example.com/sitemap.xml \
  --output ./seo_report.json

# Run Audit (Local Sitemap)
node .agent/skills/seo-auditing/scripts/audit.js \
  --key ./gsc-key.json \
  --sitemap ./public/sitemap.xml \
  --output ./seo_report.json
```
