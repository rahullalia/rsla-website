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


// Regex parser for React Content to Clean Markdown
function parseReactContent(content) {
    // 1. Extract content inside return <CaseStudyLayout>(...)</CaseStudyLayout>
    const match = content.match(/return\s*\(\s*<CaseStudyLayout[^>]*>([\s\S]*?)<\/CaseStudyLayout>/);
    if (!match) return "";

    let html = match[1];

    // ========== PHASE 1: EARLY JSX CLEANUP ==========

    // Remove JSX whitespace expressions like {" "} or {' '}
    html = html.replace(/\{\s*["']\s*["']\s*\}/g, ' ');

    // Remove JSX comments
    html = html.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

    // Remove component tags we don't need
    html = html.replace(/<[Mm]arketResearchContent[^>]*\/>/g, '');

    // ========== PHASE 2: CONVERT MULTI-LINE ANCHOR TAGS ==========
    // Must happen BEFORE collapsing whitespace
    // Match <a ...> with newlines, extract href and inner text
    html = html.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/g, (match, href, innerText) => {
        // Clean the inner text: remove newlines and extra whitespace
        const cleanText = innerText.replace(/\s+/g, ' ').trim();
        return `[${cleanText}](${href})`;
    });

    // Handle Next.js Link components (also multi-line)
    html = html.replace(/<Link\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/Link>/g, (match, href, innerText) => {
        const cleanText = innerText.replace(/\s+/g, ' ').trim();
        return `[${cleanText}](${href})`;
    });

    // ========== PHASE 3: CONVERT SPECIAL BOXES TO BLOCKQUOTES ==========
    const toBlockquote = (match, content) => {
        // First convert any remaining HTML inside the box
        let inner = content;

        // Convert headers inside boxes
        inner = inner.replace(/<h3[^>]*>(.*?)<\/h3>/g, '### $1');
        inner = inner.replace(/<h2[^>]*>(.*?)<\/h2>/g, '## $1');

        // Convert paragraphs - normalize whitespace
        inner = inner.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, (m, p) => {
            return p.replace(/\s+/g, ' ').trim() + '\n';
        });

        // Convert strong/bold - normalize whitespace inside
        inner = inner.replace(/<strong>([\s\S]*?)<\/strong>/g, (m, s) => {
            return `**${s.replace(/\s+/g, ' ').trim()}**`;
        });

        // Split into lines, trim, filter empties, prefix with >
        const lines = inner.split('\n');
        const quoted = lines
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => `> ${line}`)
            .join('\n');

        return '\n\n' + quoted + '\n\n';
    };

    html = html.replace(/<div className="proof-box"[^>]*>([\s\S]*?)<\/div>/g, toBlockquote);
    html = html.replace(/<div className="key-takeaway-box"[^>]*>([\s\S]*?)<\/div>/g, toBlockquote);
    html = html.replace(/<div className="cta-section"[^>]*>([\s\S]*?)<\/div>/g, toBlockquote);

    // Remove remaining generic wrapper divs
    html = html.replace(/<div[^>]*>/g, '');
    html = html.replace(/<\/div>/g, '');

    // ========== PHASE 4: CONVERT HTML STRUCTURE ==========

    // Convert Headers (ensure blank lines around them)
    html = html.replace(/<h2[^>]*>(.*?)<\/h2>/g, '\n\n## $1\n\n');
    html = html.replace(/<h3[^>]*>(.*?)<\/h3>/g, '\n\n### $1\n\n');

    // Convert Paragraphs
    html = html.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '$1\n\n');

    // Handle lists - multi-pass approach for nested lists
    // Pass 1: Remove all <ul> wrapper tags
    html = html.replace(/<\/?ul[^>]*>/g, '');

    // Pass 2: Convert <li> tags - handle both simple and complex content
    // For <li> containing other list items (nested), keep content inline
    html = html.replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (match, content) => {
        // Clean the content - normalize whitespace
        let cleanContent = content
            .replace(/\s+/g, ' ')
            .trim();
        return `- ${cleanContent}\n`;
    });

    // Pass 3: Clean any stray <li> or </li> tags
    html = html.replace(/<\/?li[^>]*>/g, '');

    // Convert Images (ImageLightbox)
    html = html.replace(/<ImageLightbox[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*\/>/g, '\n![$2]($1)\n');
    html = html.replace(/<ImageLightbox[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*\/>/g, '\n![$1]($2)\n');
    html = html.replace(/<ImageLightbox[^>]*\/>/g, '');

    // ========== PHASE 5: CONVERT FORMATTING ==========
    // Normalize whitespace inside formatting tags before converting
    html = html.replace(/<strong>([\s\S]*?)<\/strong>/g, (match, content) => {
        const clean = content.replace(/\s+/g, ' ').trim();
        return `**${clean}**`;
    });
    html = html.replace(/<b>([\s\S]*?)<\/b>/g, (match, content) => {
        const clean = content.replace(/\s+/g, ' ').trim();
        return `**${clean}**`;
    });
    html = html.replace(/<em>([\s\S]*?)<\/em>/g, (match, content) => {
        const clean = content.replace(/\s+/g, ' ').trim();
        return `*${clean}*`;
    });
    html = html.replace(/<i>([\s\S]*?)<\/i>/g, (match, content) => {
        const clean = content.replace(/\s+/g, ' ').trim();
        return `*${clean}*`;
    });

    // ========== PHASE 6: CLEANUP ENTITIES ==========
    html = html.replace(/&quot;/g, '"');
    html = html.replace(/&apos;/g, "'");
    html = html.replace(/&amp;/g, '&');
    html = html.replace(/&lt;/g, '<');
    html = html.replace(/&gt;/g, '>');
    html = html.replace(/&nbsp;/g, ' ');

    // ========== PHASE 7: FINAL CLEANUP ==========

    // Trim leading whitespace from each line (JSX indentation)
    html = html.split('\n').map(line => line.trim()).join('\n');

    // Remove empty blockquote lines (just "> " with nothing after)
    html = html.replace(/^>\s*$/gm, '');

    // Remove duplicate blank lines (max 2 newlines)
    html = html.replace(/\n{3,}/g, '\n\n');

    // Clean up list formatting - ensure proper spacing
    html = html.replace(/\n- /g, '\n- ');

    // Trim edges
    html = html.trim();

    return html;
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
            bodyContent = parseReactContent(rawFile);
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
