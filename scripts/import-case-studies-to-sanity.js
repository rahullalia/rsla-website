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
    console.error('Set it with: export SANITY_API_TOKEN="your-token-here"');
    process.exit(1);
}

const client = createClient(config);

// Image cache to avoid re-uploading
const imageCache = new Map();

// Parse YAML frontmatter
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { metadata: {}, body: content };

    const frontmatter = match[1];
    const body = match[2];

    const metadata = {};
    frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            // Remove quotes
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            metadata[key] = value;
        }
    });

    return { metadata, body };
}

// Upload image to Sanity and return asset reference
async function uploadImage(imagePath) {
    // Check cache first
    if (imageCache.has(imagePath)) {
        return imageCache.get(imagePath);
    }

    // Convert web path to file system path
    const fsPath = path.join(__dirname, '../public', imagePath);

    if (!fs.existsSync(fsPath)) {
        console.warn(`  Image not found: ${fsPath}`);
        return null;
    }

    try {
        const imageBuffer = fs.readFileSync(fsPath);
        const filename = path.basename(imagePath);

        console.log(`  Uploading image: ${filename}`);
        const asset = await client.assets.upload('image', imageBuffer, {
            filename: filename,
        });

        const assetRef = {
            _type: 'reference',
            _ref: asset._id,
        };

        imageCache.set(imagePath, assetRef);
        return assetRef;
    } catch (error) {
        console.error(`  Failed to upload image ${imagePath}:`, error.message);
        return null;
    }
}

// Generate unique key for blocks
function generateKey() {
    return Math.random().toString(36).substring(2, 14);
}

// Parse markdown to Portable Text blocks
async function parseMarkdownToPortableText(markdown) {
    const blocks = [];
    const lines = markdown.split('\n');

    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip empty lines
        if (!trimmed) {
            i++;
            continue;
        }

        // Headers
        if (trimmed.startsWith('## ')) {
            const { children, markDefs } = parseInlineContent(trimmed.slice(3));
            blocks.push({
                _type: 'block',
                _key: generateKey(),
                style: 'h2',
                markDefs: markDefs,
                children: children,
            });
            i++;
            continue;
        }

        if (trimmed.startsWith('### ')) {
            const { children, markDefs } = parseInlineContent(trimmed.slice(4));
            blocks.push({
                _type: 'block',
                _key: generateKey(),
                style: 'h3',
                markDefs: markDefs,
                children: children,
            });
            i++;
            continue;
        }

        // Images
        const imageMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imageMatch) {
            const [, alt, src] = imageMatch;
            const assetRef = await uploadImage(src);
            if (assetRef) {
                blocks.push({
                    _type: 'image',
                    _key: generateKey(),
                    asset: assetRef,
                    alt: alt || '',
                });
            }
            i++;
            continue;
        }

        // Blockquotes - collect all consecutive > lines
        if (trimmed.startsWith('> ')) {
            const quoteLines = [];
            while (i < lines.length && lines[i].trim().startsWith('> ')) {
                quoteLines.push(lines[i].trim().slice(2));
                i++;
            }

            // Parse each line in the blockquote
            for (const qline of quoteLines) {
                if (!qline.trim()) continue;

                // Check for header inside blockquote
                if (qline.startsWith('## ')) {
                    const { children, markDefs } = parseInlineContent(qline.slice(3));
                    blocks.push({
                        _type: 'block',
                        _key: generateKey(),
                        style: 'h2',
                        markDefs: markDefs,
                        children: children,
                    });
                } else if (qline.startsWith('### ')) {
                    const { children, markDefs } = parseInlineContent(qline.slice(4));
                    blocks.push({
                        _type: 'block',
                        _key: generateKey(),
                        style: 'h3',
                        markDefs: markDefs,
                        children: children,
                    });
                } else {
                    // Regular blockquote paragraph
                    const { children, markDefs } = parseInlineContent(qline);
                    blocks.push({
                        _type: 'block',
                        _key: generateKey(),
                        style: 'blockquote',
                        markDefs: markDefs,
                        children: children,
                    });
                }
            }
            continue;
        }

        // List items
        if (trimmed.startsWith('- ')) {
            const listItems = [];
            while (i < lines.length && lines[i].trim().startsWith('- ')) {
                listItems.push(lines[i].trim().slice(2));
                i++;
            }

            for (const item of listItems) {
                const { children, markDefs } = parseInlineContent(item);
                blocks.push({
                    _type: 'block',
                    _key: generateKey(),
                    style: 'normal',
                    listItem: 'bullet',
                    level: 1,
                    markDefs: markDefs,
                    children: children,
                });
            }
            continue;
        }

        // Regular paragraph
        const { children, markDefs } = parseInlineContent(trimmed);
        blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            markDefs: markDefs,
            children: children,
        });
        i++;
    }

    return blocks;
}

// Parse inline content (bold, links, etc.)
function parseInlineContent(text) {
    const children = [];
    const markDefs = [];

    // Regex to match bold, links, or plain text
    // Order matters: check for bold-with-link first, then bold, then link, then text
    const tokenRegex = /(\*\*\[([^\]]+)\]\(([^)]+)\):\*\*|\*\*\[([^\]]+)\]\(([^)]+)\)\*\*|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|[^*\[]+)/g;

    let match;
    while ((match = tokenRegex.exec(text)) !== null) {
        const token = match[0];

        // Bold link with colon: **[text](url):**
        if (match[2] && match[3]) {
            const linkKey = generateKey();
            markDefs.push({
                _type: 'link',
                _key: linkKey,
                href: match[3],
            });
            children.push({
                _type: 'span',
                _key: generateKey(),
                marks: ['strong', linkKey],
                text: match[2] + ':',
            });
        }
        // Bold link: **[text](url)**
        else if (match[4] && match[5]) {
            const linkKey = generateKey();
            markDefs.push({
                _type: 'link',
                _key: linkKey,
                href: match[5],
            });
            children.push({
                _type: 'span',
                _key: generateKey(),
                marks: ['strong', linkKey],
                text: match[4],
            });
        }
        // Bold text: **text**
        else if (match[6]) {
            children.push({
                _type: 'span',
                _key: generateKey(),
                marks: ['strong'],
                text: match[6],
            });
        }
        // Link: [text](url)
        else if (match[7] && match[8]) {
            const linkKey = generateKey();
            markDefs.push({
                _type: 'link',
                _key: linkKey,
                href: match[8],
            });
            children.push({
                _type: 'span',
                _key: generateKey(),
                marks: [linkKey],
                text: match[7],
            });
        }
        // Plain text
        else if (token.trim()) {
            children.push({
                _type: 'span',
                _key: generateKey(),
                marks: [],
                text: token,
            });
        }
    }

    // Ensure at least one child
    if (children.length === 0) {
        children.push({
            _type: 'span',
            _key: generateKey(),
            marks: [],
            text: text || ' ',
        });
    }

    return { children, markDefs };
}

// Find case study by slug
async function findCaseStudyBySlug(slug) {
    const query = `*[_type == "caseStudy" && slug.current == $slug][0]`;
    return await client.fetch(query, { slug });
}

// Main import function
async function importCaseStudies() {
    const exportDir = path.join(__dirname, '../exported_case_studies');

    if (!fs.existsSync(exportDir)) {
        console.error(`Export directory not found: ${exportDir}`);
        process.exit(1);
    }

    const files = fs.readdirSync(exportDir).filter(f => f.endsWith('.md'));
    console.log(`Found ${files.length} markdown files to import.\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const file of files) {
        const filePath = path.join(exportDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { metadata, body } = parseFrontmatter(content);

        const slug = metadata.slug || file.replace('.md', '');
        console.log(`Processing: ${slug}`);

        // Find existing case study
        const existing = await findCaseStudyBySlug(slug);

        if (!existing) {
            console.log(`  ⚠️  No existing case study found for slug: ${slug}`);
            skipCount++;
            continue;
        }

        try {
            // Parse markdown to Portable Text
            const blocks = await parseMarkdownToPortableText(body);

            // Update the case study content
            await client.patch(existing._id)
                .set({ content: blocks })
                .commit();

            console.log(`  ✅ Updated content (${blocks.length} blocks)`);
            successCount++;
        } catch (error) {
            console.error(`  ❌ Error updating ${slug}:`, error.message);
            errorCount++;
        }
    }

    console.log('\n=== Import Complete ===');
    console.log(`✅ Success: ${successCount}`);
    console.log(`⚠️  Skipped: ${skipCount}`);
    console.log(`❌ Errors: ${errorCount}`);
}

// Run
importCaseStudies();
