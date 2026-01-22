/**
 * Rewrite seo-content-marketing-automation case study with rich content
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/rewrite-seo-content-case-study.js
 */

const { createClient } = require('@sanity/client');

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

function generateKey() {
    return Math.random().toString(36).substring(2, 15);
}

function textBlock(text, style = 'normal') {
    return {
        _type: 'block',
        _key: generateKey(),
        style,
        children: [{ _type: 'span', _key: generateKey(), text, marks: [] }],
    };
}

function richBlock(parts, style = 'normal') {
    return {
        _type: 'block',
        _key: generateKey(),
        style,
        markDefs: parts.filter(p => p.markDef).map(p => p.markDef),
        children: parts.map(p => ({
            _type: 'span',
            _key: generateKey(),
            text: p.text,
            marks: p.marks || [],
        })),
    };
}

function bold(text) {
    return { text, marks: ['strong'] };
}

function plain(text) {
    return { text, marks: [] };
}

function bulletList(items) {
    return items.map(item => ({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: typeof item === 'string'
            ? [{ _type: 'span', _key: generateKey(), text: item, marks: [] }]
            : item.map(p => ({ _type: 'span', _key: generateKey(), text: p.text, marks: p.marks || [] })),
    }));
}

const enhancedContent = [
    // Challenge Section
    textBlock('The Challenge: $75 Per Article Was Unsustainable', 'h2'),

    richBlock([
        plain('Content marketing is non-negotiable for demonstrating expertise. But at '),
        bold('$75 per article'),
        plain(', publishing four posts monthly cost $300/month, or $3,600 annually in raw copywriting fees. Factor in coordination, editing, and publishing time, and the true cost approached '),
        bold('$18,000 per year'),
        plain('.'),
    ]),

    textBlock('We faced a classic scaling problem: the more we grew, the more content we needed, and the more expensive it became. Something had to change.'),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Content Cost Crisis',
        content: 'Companies publishing 16+ blog posts per month get 3.5X more traffic than those publishing 0-4. But at $75-150 per article, that level of output costs $15,000-30,000/year. Often more than the ROI justifies.',
    },

    textBlock('Beyond cost, two critical factors were failing:', 'h3'),

    ...bulletList([
        [bold('Time drain'), plain(': Manual editing and publishing choked the content pipeline, taking 2-3 hours per post')],
        [bold('Consistency collapse'), plain(': Weekly publishing schedules were aspirational, not operational. We\'d miss weeks at a time')],
        [bold('Quality variance'), plain(': Different writers meant inconsistent brand voice and SEO optimization')],
        [bold('Scalability ceiling'), plain(': Adding more content meant adding more cost linearly')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Human labor in low-margin content production doesn\'t scale. Every hour spent on repetitive content tasks is an hour not spent on strategy. The math demands automation.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Fix Your Content Economics',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: Autonomous Content Pipeline', 'h2'),

    textBlock('We built this system for ourselves first, then opened it to clients. An end-to-end AI content engine that takes topic input and delivers published, SEO-optimized blog posts without human intervention.'),

    // Warning callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'warning',
        title: 'Important Note',
        content: 'AI-generated content still requires human oversight for accuracy and brand alignment. Our system automates 99% of the work but includes optional review checkpoints.',
    },

    // Phase 1
    textBlock('Phase 1: Structured Input System', 'h3'),

    textBlock('The foundation: a clean data capture system that feeds the AI with exactly what it needs.'),

    ...bulletList([
        [bold('Typeform frontend'), plain(': Clean interface capturing blog topics, primary/secondary keywords, and internal/external links')],
        [bold('Google Sheets tracking'), plain(': Central record for content pipeline visibility and status updates')],
        [bold('Validation rules'), plain(': Ensures all required fields are populated before triggering automation')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 2
    textBlock('Phase 2: AI Content Generation', 'h3'),

    textBlock('The intelligence layer: custom-engineered prompts that produce consistent, high-quality output.'),

    ...bulletList([
        [bold('GPT-4 integration'), plain(': Engineered prompts instructing AI to generate SEO-optimized outlines and full posts')],
        [bold('Brand voice training'), plain(': Custom system prompts that maintain our tone, style, and formatting preferences')],
        [bold('SEO best practices'), plain(': Built-in requirements for headers, keyword density, meta descriptions, and internal linking')],
        [bold('Length control'), plain(': Configurable word count targets (1,500-3,000 words typical)')],
    ]),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Prompt Engineering Matters',
        content: 'The difference between generic AI content and publishable AI content is in the prompts. We spent 40+ hours refining our prompt architecture to match human-quality output.',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 3
    textBlock('Phase 3: Automated Publishing Pipeline', 'h3'),

    richBlock([
        plain('The entire system runs on '),
        bold('Make.com'),
        plain('. Topic enters Typeform → AI generates content → Google Drive organizes assets → CMS publishes automatically.'),
    ]),

    ...bulletList([
        [bold('Zero manual copying'), plain(': Content flows directly from AI to CMS')],
        [bold('Asset organization'), plain(': Generated content automatically saved to organized folder structure')],
        [bold('Scheduling flexibility'), plain(': Publish immediately or queue for optimal timing')],
        [bold('Error handling'), plain(': Failed steps trigger notifications for human intervention')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 4
    textBlock('Phase 4: Quality Assurance Layer', 'h3'),

    textBlock('Optional but recommended: human checkpoints for critical content.'),

    ...bulletList([
        [bold('Draft review stage'), plain(': Content pauses for human approval before publishing')],
        [bold('Fact-checking prompts'), plain(': AI flags claims that may need verification')],
        [bold('Brand alignment check'), plain(': Quick scan for off-brand language or tone')],
        [bold('SEO validation'), plain(': Automated checks for keyword presence and meta data')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: $18K Saved, 4X Output, 99% Automation', 'h2'),

    textBlock('The system delivered immediate, measurable impact:'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '$18K', label: 'Annual Savings' },
            { _key: generateKey(), value: '4X', label: 'Content Output' },
            { _key: generateKey(), value: '99%', label: 'Work Automated' },
            { _key: generateKey(), value: '< $5', label: 'Cost Per Post' },
        ],
    },

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'The Bottom Line',
        content: 'What used to cost the same as a part-time employee now runs for less than the cost of a single outsourced article. We don\'t just sell automation. We run on it.',
    },

    textBlock('Breakdown of Impact', 'h3'),

    ...bulletList([
        [bold('$18,000 annual savings'), plain(': Compared to fully-burdened manual copywriting costs')],
        [bold('4X content velocity'), plain(': Weekly publishing now operational, not aspirational')],
        [bold('99% manual work eliminated'), plain(': Data entry, writing, formatting, scheduling. All automated')],
        [bold('Consistent quality'), plain(': Every post follows SEO best practices and brand voice guidelines')],
        [bold('Scalable infrastructure'), plain(': Adding more content costs pennies, not dollars')],
    ]),

    // Internal testimonial
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'We went from struggling to publish once a month to effortlessly publishing weekly. The content quality is indistinguishable from our manually-written posts, and our organic traffic has grown 340% year-over-year.',
        author: 'Internal Results',
        role: 'RSL/A Content Team',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Tech Stack
    {
        _type: 'techStack',
        _key: generateKey(),
        tools: [
            { _key: generateKey(), name: 'Make.com' },
            { _key: generateKey(), name: 'OpenAI GPT-4' },
            { _key: generateKey(), name: 'Typeform' },
            { _key: generateKey(), name: 'Google Sheets' },
            { _key: generateKey(), name: 'Google Drive' },
            { _key: generateKey(), name: 'WordPress/Sanity' },
        ],
    },

    // Closing
    textBlock('Your Content Costs Are Eating Your Margins', 'h2'),

    textBlock('If you\'re paying $50-150 per article, or worse, not publishing consistently because it\'s too expensive, the math is broken. Every month you delay is a month your competitors are building organic traffic that you\'re not.'),

    textBlock('We build AI content systems that fix the economics permanently, custom-tailored to your brand voice, SEO strategy, and publishing workflow.'),

    // Final CTAs
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Fix Your Content Economics',
        url: '/#contact',
        style: 'primary',
    },
];

async function rewriteCaseStudy() {
    const slug = 'seo-content-marketing-automation';

    console.log(`Fetching case study: ${slug}...\n`);

    const query = `*[_type == "caseStudy" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current
    }`;

    const caseStudy = await client.fetch(query, { slug });

    if (!caseStudy) {
        console.error(`Case study not found: ${slug}`);
        process.exit(1);
    }

    console.log(`Found: ${caseStudy.title} (${caseStudy._id})\n`);
    console.log(`Updating with ${enhancedContent.length} content blocks...\n`);

    try {
        await client.patch(caseStudy._id)
            .set({ content: enhancedContent })
            .commit();

        console.log('✅ Case study updated successfully!');
        console.log(`\nView at: https://rsla.io/work/${slug}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

rewriteCaseStudy().catch(console.error);
