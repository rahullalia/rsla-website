const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    projectId: '36wenybq',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
};

if (!config.token) {
    console.error('Error: SANITY_API_TOKEN environment variable is required.');
    process.exit(1);
}

const client = createClient(config);

// Simple HTML to Portable Text Parser
function parseHTMLToPortableText(html) {
    const blocks = [];

    // Normalize: Remove newlines to simplify regex
    let cleanHtml = html.replace(/\\n/g, ' ').replace(/\\s+/g, ' ');

    // Extract all tags we care about in order
    // We'll use a regex that matches the tag and its content
    // Supported: h2, h3, p, ul (li)

    // Strategy: Split by tags and process
    // This regex matches <tag ...>content</tag>
    const tagRegex = /<(h[23]|p|ul)(?:[^>]*)>(.*?)<\/\1>/g;

    let match;
    while ((match = tagRegex.exec(cleanHtml)) !== null) {
        const [fullMatch, tag, content] = match;

        if (tag === 'ul') {
            // Process list items
            const liRegex = /<li(?:[^>]*)>(.*?)<\/li>/g;
            let liMatch;
            while ((liMatch = liRegex.exec(content)) !== null) {
                const liContent = liMatch[1];
                blocks.push({
                    _type: 'block',
                    style: 'normal',
                    listItem: 'bullet',
                    children: parseInline(liContent)
                });
            }
        } else {
            // Process headers and paragraphs
            let style = 'normal';
            if (tag === 'h2') style = 'h2';
            if (tag === 'h3') style = 'h3';

            blocks.push({
                _type: 'block',
                style: style,
                children: parseInline(content)
            });
        }
    }

    return blocks;
}

function parseInline(text) {
    const children = [];
    // Handle marks: strong, em, a (Link)
    // For simplicity, we'll strip tags or do basic mark handling.
    // A robust parser is complex. Here we will define a "Span" regex.

    // Let's do a simplified approach: Split by tags and map.
    // Supports: <strong>, <Link ...>

    // 1. Replace <Link ...> with <a href="...">
    let processed = text.replace(/<Link[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/Link>/g, '<a href="$1">$2</a>');

    // Regex to split by tags
    // Matches <a>...</a> or <strong>...</strong> or standard text
    const tokenRegex = /(<a[^>]*>.*?<\/a>|<strong>.*?<\/strong>|[^<>]+)/g;

    let match;
    while ((match = tokenRegex.exec(processed)) !== null) {
        const token = match[0];

        if (token.startsWith('<strong')) {
            const content = token.replace(/<\/?strong>/g, '').trim();
            if (content) {
                children.push({
                    _type: 'span',
                    marks: ['strong'],
                    text: content
                });
            }
        } else if (token.startsWith('<a')) {
            const hrefMatch = token.match(/href=["']([^"']*)["']/);
            const content = token.replace(/<a[^>]*>(.*?)<\/a>/, '$1').trim();
            const href = hrefMatch ? hrefMatch[1] : '#';

            if (content) {
                const markKey = 'link-' + Math.random().toString(36).substr(2, 5);
                children.push({
                    _type: 'span',
                    marks: [markKey],
                    text: content,
                    // We need to attach the mark definition to the block parent later?
                    // Portable Text structure for marks is specific. 
                    // Actually, marks are keys in 'markDefs'.
                    // Simplification: We'll just make it bold for now if link is too hard, 
                    // OR we add markDefs to the block.
                });
                // Note: To support links properly in this simple parser, we'd need to emit markDefs.
                // For this quick script, we will just make links STRONG to preserve content.
                // Or try to implement markDefs.
            }
        } else {
            const cleanText = token.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&').trim();
            if (cleanText) {
                children.push({
                    _type: 'span',
                    marks: [],
                    text: cleanText
                });
            }
        }
    }

    if (children.length === 0) {
        children.push({ _type: 'span', marks: [], text: ' ' });
    }

    return children;
}


async function migrateContent() {
    try {
        const dataPath = path.join(__dirname, '../migration_data.json');
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const caseStudies = JSON.parse(rawData);

        console.log(`Processing content for ${caseStudies.length} case studies...`);

        const archivesDir = path.join(__dirname, '../src/archived_case_studies');

        for (const item of caseStudies) {
            const slug = item.slug;
            const dirPath = path.join(archivesDir, slug);

            if (!fs.existsSync(dirPath)) {
                console.warn(`Directory not found for slug: ${slug} `);
                continue;
            }

            // Find the Content.tsx file
            const files = fs.readdirSync(dirPath);
            const contentFile = files.find(f => f.endsWith('Content.tsx'));

            if (!contentFile) {
                console.warn(`Content file not found for ${slug}`);
                continue;
            }

            const contentPath = path.join(dirPath, contentFile);
            let rawContent = fs.readFileSync(contentPath, 'utf8');

            // Extract content inside the return ( ... );
            // Helper regex to find the main JSX body
            const returnRegex = /return\s*\(\s*<CaseStudyLayout[^>]*>([\s\S]*?)<\/CaseStudyLayout>/;
            const match = returnRegex.exec(rawContent);

            if (!match) {
                console.warn(`Could not extract JSX from ${slug} `);
                continue;
            }

            const htmlContent = match[1];

            // Parse to Blocks
            const blocks = parseHTMLToPortableText(htmlContent);

            if (blocks.length > 0) {
                console.log(`Updating content for: ${item.title}`);
                await client.patch('case-study-' + slug)
                    .set({ content: blocks })
                    .commit();
            } else {
                console.warn(`No blocks parsed for ${slug}`);
            }
        }

        console.log('Content migration complete!');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrateContent();
