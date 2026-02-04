/**
 * Converts Sanity PortableText to clean Markdown for AI/LLM consumption.
 * Used by the /api/work/[slug] endpoint for AX-SEO (Agent Experience SEO).
 */

interface PortableTextBlock {
    _type: string;
    _key?: string;
    style?: string;
    listItem?: string;
    level?: number;
    children?: Array<{
        _type: string;
        text?: string;
        marks?: string[];
    }>;
    markDefs?: Array<{
        _key: string;
        _type: string;
        href?: string;
    }>;
    // Custom block types
    type?: string;
    title?: string;
    content?: string;
    quote?: string;
    author?: string;
    role?: string;
    url?: string;
    caption?: string;
    alt?: string;
    stats?: Array<{ value: string; label: string }>;
    tools?: Array<{ name: string; url?: string; promo?: string }>;
    text?: string;
}

/**
 * Convert a single text span with marks to markdown
 */
function spanToMarkdown(span: { text?: string; marks?: string[] }, markDefs: Array<{ _key: string; _type: string; href?: string }> = []): string {
    if (!span.text) return '';

    let text = span.text;
    const marks = span.marks || [];

    // Find link marks
    const linkMark = marks.find(mark => {
        const def = markDefs.find(d => d._key === mark);
        return def?._type === 'link';
    });

    if (linkMark) {
        const linkDef = markDefs.find(d => d._key === linkMark);
        if (linkDef?.href) {
            text = `[${text}](${linkDef.href})`;
        }
    }

    // Apply formatting marks
    if (marks.includes('strong') || marks.includes('bold')) {
        text = `**${text}**`;
    }
    if (marks.includes('em') || marks.includes('italic')) {
        text = `*${text}*`;
    }
    if (marks.includes('code')) {
        text = `\`${text}\``;
    }

    return text;
}

/**
 * Convert a block's children to markdown text
 */
function childrenToMarkdown(children: PortableTextBlock['children'], markDefs: PortableTextBlock['markDefs'] = []): string {
    if (!children) return '';
    return children.map(child => spanToMarkdown(child, markDefs)).join('');
}

/**
 * Convert a single PortableText block to markdown
 */
function blockToMarkdown(block: PortableTextBlock): string {
    // Handle standard text blocks
    if (block._type === 'block') {
        const text = childrenToMarkdown(block.children, block.markDefs);

        // Handle headings
        if (block.style === 'h1') return `# ${text}\n`;
        if (block.style === 'h2') return `## ${text}\n`;
        if (block.style === 'h3') return `### ${text}\n`;
        if (block.style === 'h4') return `#### ${text}\n`;

        // Handle lists
        if (block.listItem === 'bullet') {
            const indent = '  '.repeat((block.level || 1) - 1);
            return `${indent}- ${text}`;
        }
        if (block.listItem === 'number') {
            const indent = '  '.repeat((block.level || 1) - 1);
            return `${indent}1. ${text}`;
        }

        // Handle blockquotes
        if (block.style === 'blockquote') {
            return `> ${text}\n`;
        }

        // Regular paragraph
        return text ? `${text}\n` : '';
    }

    // Handle callout blocks
    if (block._type === 'callout') {
        const typeLabel = block.type?.toUpperCase() || 'NOTE';
        const title = block.title ? `**${block.title}**\n\n` : '';
        return `> **${typeLabel}:** ${title}${block.content || ''}\n`;
    }

    // Handle testimonial blocks
    if (block._type === 'testimonial') {
        const attribution = block.author
            ? `\n> — ${block.author}${block.role ? `, ${block.role}` : ''}`
            : '';
        return `> "${block.quote}"${attribution}\n`;
    }

    // Handle stats card
    if (block._type === 'statsCard' && block.stats) {
        const rows = block.stats.map(s => `| ${s.value} | ${s.label} |`).join('\n');
        return `| Metric | Description |\n|--------|-------------|\n${rows}\n`;
    }

    // Handle tech stack
    if (block._type === 'techStack' && block.tools) {
        const items = block.tools.map(t => {
            const link = t.url ? `[${t.name}](${t.url})` : t.name;
            const promo = t.promo ? ` — ${t.promo}` : '';
            return `- ${link}${promo}`;
        }).join('\n');
        return `**Tools Used:**\n${items}\n`;
    }

    // Handle video embed
    if (block._type === 'videoEmbed') {
        const caption = block.caption ? ` "${block.caption}"` : '';
        return `[Video:${caption}](${block.url})\n`;
    }

    // Handle CTA button
    if (block._type === 'ctaButton') {
        return `[${block.text}](${block.url})\n`;
    }

    // Handle images
    if (block._type === 'caseStudyImage' || block._type === 'image') {
        const alt = block.alt || 'Image';
        const caption = block.caption ? `\n*${block.caption}*` : '';
        return `![${alt}]${caption}\n`;
    }

    // Handle divider
    if (block._type === 'divider') {
        return '\n---\n';
    }

    // Handle code blocks
    if (block._type === 'code') {
        return `\`\`\`\n${block.content || ''}\n\`\`\`\n`;
    }

    return '';
}

/**
 * Convert full PortableText array to markdown
 */
export function portableTextToMarkdown(blocks: PortableTextBlock[]): string {
    if (!blocks || !Array.isArray(blocks)) return '';

    const lines: string[] = [];
    let inList = false;

    for (const block of blocks) {
        const md = blockToMarkdown(block);

        // Handle list continuity
        const isListItem = block.listItem === 'bullet' || block.listItem === 'number';
        if (inList && !isListItem) {
            lines.push(''); // Add blank line after list
            inList = false;
        }
        if (isListItem) {
            inList = true;
        }

        if (md) {
            lines.push(md);
        }
    }

    return lines.join('\n').trim();
}

/**
 * Generate YAML frontmatter for case study
 */
export function generateFrontmatter(caseStudy: {
    title: string;
    slug: string;
    clientName?: string;
    industry?: string;
    tag?: string;
    description?: string;
    metrics?: Array<{ value: string; label: string }>;
    timeframe?: number;
    servicesUsed?: string[];
    publishedAt?: string;
}): string {
    const lines = ['---'];

    lines.push(`title: "${caseStudy.title.replace(/"/g, '\\"')}"`);
    lines.push(`url: "https://rsla.io/work/${caseStudy.slug}"`);

    if (caseStudy.clientName) {
        lines.push(`client: "${caseStudy.clientName}"`);
    }
    if (caseStudy.industry) {
        lines.push(`industry: "${caseStudy.industry}"`);
    }
    if (caseStudy.tag) {
        lines.push(`service: "${caseStudy.tag}"`);
    }
    if (caseStudy.servicesUsed && caseStudy.servicesUsed.length > 0) {
        lines.push(`services: [${caseStudy.servicesUsed.map(s => `"${s}"`).join(', ')}]`);
    }
    if (caseStudy.timeframe) {
        lines.push(`timeframe_days: ${caseStudy.timeframe}`);
    }
    if (caseStudy.metrics && caseStudy.metrics.length > 0) {
        lines.push('metrics:');
        for (const m of caseStudy.metrics) {
            lines.push(`  - value: "${m.value}"`);
            lines.push(`    label: "${m.label}"`);
        }
    }
    if (caseStudy.publishedAt) {
        lines.push(`published: "${caseStudy.publishedAt}"`);
    }

    lines.push('---');
    return lines.join('\n');
}

/**
 * Generate full markdown document for a case study
 */
export function generateCaseStudyMarkdown(caseStudy: {
    title: string;
    slug: string;
    description?: string;
    clientName?: string;
    industry?: string;
    tag?: string;
    metrics?: Array<{ value: string; label: string }>;
    timeframe?: number;
    servicesUsed?: string[];
    publishedAt?: string;
    tldr?: string;
    keyTakeaways?: string[];
    problemStatement?: string;
    solutionApproach?: string;
    resultsOutcome?: string;
    content?: PortableTextBlock[];
    faqSchema?: Array<{ question: string; answer: string }>;
}): string {
    const sections: string[] = [];

    // Frontmatter
    sections.push(generateFrontmatter(caseStudy));

    // Title
    sections.push(`# ${caseStudy.title}`);

    // Description
    if (caseStudy.description) {
        sections.push(`\n${caseStudy.description}`);
    }

    // TL;DR
    if (caseStudy.tldr) {
        sections.push(`\n## TL;DR\n\n${caseStudy.tldr}`);
    }

    // Key Takeaways
    if (caseStudy.keyTakeaways && caseStudy.keyTakeaways.length > 0) {
        sections.push('\n## Key Takeaways\n');
        caseStudy.keyTakeaways.forEach((takeaway, i) => {
            sections.push(`${i + 1}. ${takeaway}`);
        });
    }

    // Structured sections (if available)
    if (caseStudy.problemStatement) {
        sections.push(`\n## The Problem\n\n${caseStudy.problemStatement}`);
    }
    if (caseStudy.solutionApproach) {
        sections.push(`\n## The Solution\n\n${caseStudy.solutionApproach}`);
    }
    if (caseStudy.resultsOutcome) {
        sections.push(`\n## The Results\n\n${caseStudy.resultsOutcome}`);
    }

    // Full content (converted from PortableText)
    if (caseStudy.content && caseStudy.content.length > 0) {
        const contentMd = portableTextToMarkdown(caseStudy.content);
        if (contentMd) {
            sections.push('\n---\n');
            sections.push(contentMd);
        }
    }

    // FAQ
    if (caseStudy.faqSchema && caseStudy.faqSchema.length > 0) {
        sections.push('\n## FAQ\n');
        for (const faq of caseStudy.faqSchema) {
            sections.push(`**Q: ${faq.question}**`);
            sections.push(`A: ${faq.answer}\n`);
        }
    }

    return sections.join('\n');
}
