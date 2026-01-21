const fs = require('fs');
const path = require('path');

// Simple regex parser for metadata
function parseMetadata(content) {
    const metadata = {};

    // Extract title
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    if (titleMatch) metadata.seo_title = titleMatch[1];

    // Extract description
    const descMatch = content.match(/description:\s*"([^"]+)"/);
    if (descMatch) metadata.seo_description = descMatch[1];

    // Extract canonical
    const canonicalMatch = content.match(/canonical:\s*"([^"]+)"/);
    if (canonicalMatch) metadata.canonical = canonicalMatch[1];

    return metadata;
}

// Simple regex parser for React Content to Text/Markdown-ish
function parseReactContent(content) {
    // 1. Extract content inside return <CaseStudyLayout>(...)</CaseStudyLayout>
    const match = content.match(/return\s*\(\s*<CaseStudyLayout[^>]*>([\s\S]*?)<\/CaseStudyLayout>/);
    if (!match) return "";

    let html = match[1];

    // simple cleanup
    return html
        .replace(/<[Mm]arketResearchContent[^>]*\/>/g, '') // remove self references if any
        .replace(/<[^>]+>/g, '') // remove tags (keeping text) - primitive but "content"
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();

    // Wait, user asked for "content". If they want to COPY PASTE into Sanity, 
    // my previous parsing script did a better job preserving structure for Sanity.
    // If this export is for BACKUP, maybe keep the raw HTML/JSX?
    // "extract each case study... and give it to me".
    // I will export raw JSX snippet for body, it's safer.
}

function extractRawJSX(content) {
    const match = content.match(/return\s*\(\s*<CaseStudyLayout[^>]*>([\s\S]*?)<\/CaseStudyLayout>/);
    if (!match) return "";
    return match[1].trim();
}


async function exportCaseStudies() {
    const archivesDir = path.join(__dirname, '../src/archived_case_studies');
    const exportDir = path.join(__dirname, '../exported_case_studies');

    if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
    }

    const dirs = fs.readdirSync(archivesDir);

    console.log(`Found ${dirs.length} items to export...`);

    for (const slug of dirs) {
        const dirPath = path.join(archivesDir, slug);
        if (!fs.lstatSync(dirPath).isDirectory()) continue;

        // Read page.tsx for Metadata
        const pagePath = path.join(dirPath, 'page.tsx');
        let seoData = {};
        if (fs.existsSync(pagePath)) {
            const pageContent = fs.readFileSync(pagePath, 'utf8');
            seoData = parseMetadata(pageContent);
        }

        // Read Content.tsx for Body
        const files = fs.readdirSync(dirPath);
        const contentFile = files.find(f => f.endsWith('Content.tsx'));
        let bodyContent = "";

        if (contentFile) {
            const contentPath = path.join(dirPath, contentFile);
            const rawFile = fs.readFileSync(contentPath, 'utf8');
            bodyContent = extractRawJSX(rawFile);
        }

        // Create Output Markdown with Frontmatter
        const fileContent = `---
slug: ${slug}
seo_title: "${seoData.seo_title || ''}"
seo_description: "${seoData.seo_description || ''}"
canonical: "${seoData.canonical || ''}"
---

${bodyContent}
`;

        const outPath = path.join(exportDir, `${slug}.md`);
        fs.writeFileSync(outPath, fileContent);
        console.log(`Exported: ${slug}.md`);
    }

    console.log(`\nAll exported to: ${exportDir}`);
}

exportCaseStudies();
