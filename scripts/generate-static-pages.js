import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/studies.json'), 'utf-8'));

const distPath = path.resolve(__dirname, '../build');
const templatePath = path.join(distPath, 'index.html');

// Ensure dist exists (it should after build)
if (!fs.existsSync(distPath)) {
    console.error('Dist folder not found. Run "npm run build" first.');
    process.exit(1);
}

// Read the template index.html
const template = fs.readFileSync(templatePath, 'utf-8');

// Function to generate a page for a study
const generateStudyPage = (study) => {
    const studyDir = path.join(distPath, 'study', String(study.id));

    // Create directory if it doesn't exist
    if (!fs.existsSync(studyDir)) {
        fs.mkdirSync(studyDir, { recursive: true });
    }

    // Replace meta tags
    let html = template;

    // Title
    html = html.replace(/<title>.*?<\/title>/, `<title>${study.title} | Synervion Research</title>`);

    // Meta tags (Open Graph)
    // We use a regex to find existing tags or just inject new ones if they don't exist in a clean way.
    // A simpler way is to have placeholder tags in index.html, but replacing generic ones works too.

    const metaTags = `
    <meta property="og:title" content="${study.title}" />
    <meta property="og:description" content="${study.summary}" />
    <meta property="og:image" content="https://synervion.com${study.imageUrl}" />
    <meta property="og:url" content="https://synervion.com/study/${study.id}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${study.title}" />
    <meta name="twitter:description" content="${study.summary}" />
    <meta name="twitter:image" content="https://synervion.com${study.imageUrl}" />
  `;

    // Inject before </head>
    html = html.replace('</head>', `${metaTags}</head>`);

    // Write the file
    fs.writeFileSync(path.join(studyDir, 'index.html'), html);
    console.log(`Generated static page for study ${study.id}: ${study.title}`);
};

// Generate pages
studies.forEach(generateStudyPage);

console.log(`Successfully generated ${studies.length} static study pages.`);
