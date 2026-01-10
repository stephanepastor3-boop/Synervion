import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const studiesPath = path.resolve(__dirname, '../src/data/studies.json');
const articlesPath = path.resolve(__dirname, '../src/data/articles.ts');
const publicPath = path.resolve(__dirname, '../public');
const sitemapPath = path.join(publicPath, 'sitemap.xml');

// Base URL
const BASE_URL = 'https://www.synervion.com';

// Helper to format date YYYY-MM-DD
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

const today = formatDate(new Date());

// Static Routes
const staticRoutes = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/about', changefreq: 'monthly', priority: '0.8' },
    { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
    { loc: '/partnerships', changefreq: 'monthly', priority: '0.8' },
    { loc: '/brand-system', changefreq: 'monthly', priority: '0.5' },
    { loc: '/calculator/cordyceps-goal-planner', changefreq: 'monthly', priority: '0.8' },
    { loc: '/products', changefreq: 'monthly', priority: '0.9' }, // If you have a main shop page, otherwise omit
    // Core Product Pages
    { loc: '/product/synv-core', changefreq: 'weekly', priority: '1.0' },
    { loc: '/product/synv-pulse', changefreq: 'weekly', priority: '1.0' },
    { loc: '/product/synv-root', changefreq: 'weekly', priority: '1.0' },
    { loc: '/terms', changefreq: 'monthly', priority: '0.5' },
    { loc: '/privacy-policy', changefreq: 'monthly', priority: '0.5' }
];

// Read Studies
let studyRoutes = [];
try {
    const studies = JSON.parse(fs.readFileSync(studiesPath, 'utf-8'));
    studyRoutes = studies.map(study => ({
        loc: `/study/${study.id}`,
        changefreq: 'monthly',
        priority: '0.8'
    }));
} catch (error) {
    console.error('Error reading studies.json:', error);
}

// Read Articles (using regex to extract slugs from TS file)
let articleRoutes = [];
try {
    const articlesContent = fs.readFileSync(articlesPath, 'utf-8');
    // Regex to find slugs: slug: 'some-slug-here'
    const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = slugRegex.exec(articlesContent)) !== null) {
        articleRoutes.push({
            loc: `/${match[1]}`,
            changefreq: 'monthly',
            priority: '0.8'
        });
    }
} catch (error) {
    console.error('Error reading articles.ts:', error);
}

// Combine all routes
const allRoutes = [...staticRoutes, ...studyRoutes, ...articleRoutes];

// Generate XML
const generateSitemapXML = (routes) => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    routes.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}${route.loc}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
};

// Write to file
try {
    const sitemapXML = generateSitemapXML(allRoutes);
    fs.writeFileSync(sitemapPath, sitemapXML);
    console.log(`Sitemap generated successfully at ${sitemapPath}`);
    console.log(`Total URLs: ${allRoutes.length}`);
} catch (error) {
    console.error('Error writing sitemap.xml:', error);
    process.exit(1);
}
