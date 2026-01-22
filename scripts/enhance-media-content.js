/**
 * Enhance media-content-operations-ai case study with rich content elements
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/enhance-media-content.js
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
    textBlock('The Challenge: Scaling Content Without Scaling Headcount', 'h2'),

    richBlock([
        plain('CrazyTok Media was winning. Revenue up. Content volume exploding. But their operations couldn\'t keep pace. Every video meant '),
        bold('60+ minutes of manual QC'),
        plain('. Every podcast episode meant '),
        bold('4-6 hours of content repurposing'),
        plain('. Analytics lived in a dozen fragmented dashboards with no unified view.'),
    ]),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Linear Scaling Trap',
        content: 'Media companies face a brutal choice: scale headcount linearly with content volume, or build AI systems that break the linear relationship. At 100+ pieces monthly, manual operations become impossible.',
    },

    textBlock('The operational bleeding:', 'h3'),

    ...bulletList([
        [bold('60+ minute video QC sessions:'), plain(' Manual frame-by-frame review for text overlays, audio sync, and brand compliance')],
        [bold('4-6 hours per content repurpose:'), plain(' Transforming one podcast into Twitter threads, blogs, and short-form clips consumed entire days')],
        [bold('Analytics chaos:'), plain(' YouTube metrics scattered across dashboards, PRE/POST comparison nearly impossible')],
        [bold('No quality enforcement:'), plain(' Netflix-level standards existed on paper, but manual review couldn\'t consistently enforce them')],
        [bold('Linear scaling trap:'), plain(' Every new content piece required proportional increases in human labor')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Media companies face a brutal choice: scale headcount linearly with content volume, or build AI systems that break the linear relationship. Manual operations that consume hours per asset become impossible at 100+ pieces monthly. The math doesn\'t lie.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Break the Linear Trap',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: We Architected Three Production AI Systems from Scratch', 'h2'),

    richBlock([
        plain('As Founding Engineer, we designed, built, and deployed '),
        bold('three distinct AI automation systems'),
        plain(', each targeting a critical operational bottleneck. These aren\'t prototypes. They\'re production systems running daily operations.'),
    ]),

    // System 1
    textBlock('System 1: AI-Powered Video QC with Netflix Standards', 'h3'),

    ...bulletList([
        'Engineered LLM-based text detection system identifying on-screen overlays, spelling errors, and brand violations',
        'Architected multi-stage pipeline: frame extraction → OCR → LLM interpretation → compliance scoring',
        'Integrated industry-standard quality checks matching major streaming platform requirements',
    ]),

    // Success callout for System 1
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'System 1 Impact',
        content: '60+ minutes → 5-10 minutes per video (83-92% efficiency gain)',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // System 2
    textBlock('System 2: Podcast → Social Content Pipeline', 'h3'),

    ...bulletList([
        'Architected 4-stage AI workflow: chunking → interpretation → tweetification → editing',
        'Engineered 500+ line LLM prompts for consistent brand voice across all outputs',
        'Built AirTable integration for content management and team review workflows',
        'Automated transformation: one 60-minute podcast → Twitter threads, blogs, short-form scripts',
    ]),

    // Success callout for System 2
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'System 2 Impact',
        content: '4-6 hours → 20 minutes per episode (93% efficiency gain)',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // System 3
    textBlock('System 3: YouTube Analytics Chrome Extension', 'h3'),

    ...bulletList([
        'Developed custom Chrome extension for YouTube Studio with automated PRE/POST treatment comparison',
        'Constructed 35-column data export: views, CTR, watch time, traffic sources, engagement metrics',
        'Created cross-platform aggregation comparing performance across YouTube, Twitter, LinkedIn',
    ]),

    // Success callout for System 3
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'System 3 Impact',
        content: '2+ hours → 5 minutes for comprehensive analytics reporting (96% efficiency gain)',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Additional tools
    textBlock('Additional AI-Powered Tools', 'h3'),

    ...bulletList([
        [bold('Profile matching:'), plain(' Image recognition via Playwright and Pillow for cross-platform guest identification')],
        [bold('Headline generators:'), plain(' LLM-powered title and thumbnail optimization for maximum CTR')],
        [bold('Content workflow automation:'), plain(' End-to-end pipelines from raw footage to multi-platform distribution')],
    ]),

    // Engineering Philosophy callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Engineering Philosophy',
        content: 'These aren\'t prototypes. They\'re production systems handling daily operations for a scaling media company. Every system was engineered with error handling, quality validation, and team workflows baked in.',
    },

    // Tech Stack
    {
        _type: 'techStack',
        _key: generateKey(),
        tools: [
            { _key: generateKey(), name: 'OpenAI GPT-4' },
            { _key: generateKey(), name: 'Playwright' },
            { _key: generateKey(), name: 'Pillow' },
            { _key: generateKey(), name: 'Python' },
            { _key: generateKey(), name: 'AirTable API' },
            { _key: generateKey(), name: 'Chrome Extension (JavaScript)' },
            { _key: generateKey(), name: 'YouTube Studio API' },
        ],
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: 70% Workload Eliminated, Creative Team Unleashed', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '70%', label: 'Workload Eliminated' },
            { _key: generateKey(), value: '92%', label: 'Video QC Efficiency' },
            { _key: generateKey(), value: '93%', label: 'Repurposing Speed' },
            { _key: generateKey(), value: '10X', label: 'Content Multiplication' },
        ],
    },

    textBlock('All three systems launched August 2024 through present, now running as core operational infrastructure:'),

    ...bulletList([
        [bold('70% manual workload obliterated:'), plain(' Content team freed from hours of repetitive QC, repurposing, and analytics work')],
        [bold('83-92% video QC efficiency:'), plain(' 60+ minutes → 5-10 minutes per video')],
        [bold('93% content repurposing acceleration:'), plain(' 4-6 hours → 20 minutes per episode')],
        [bold('96% analytics time reduction:'), plain(' 35-column reports in 5 minutes vs. 2+ hours manual compilation')],
        [bold('10x content multiplication:'), plain(' Single longform asset → 10+ platform-specific pieces automatically')],
        [bold('Netflix-level enforcement:'), plain(' Automated quality standards no longer dependent on human vigilance')],
        [bold('Data-driven iteration:'), plain(' Real-time analytics enable rapid content strategy pivots')],
    ]),

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'AI automation doesn\'t replace creative teams. It eliminates the grunt work choking them. A 70% workload reduction doesn\'t mean 70% fewer people. It means 10x more output with the same team. The creative work gets done by humans. The repetitive work gets done by machines.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Closing
    textBlock('Your Content Team Is Drowning in Grunt Work', 'h2'),

    textBlock('If your team is burning hours on manual QC, content repurposing, or analytics compilation, you\'re wasting their talent. We build production AI systems that eliminate the repetitive work and let your creative people create.'),

    // Final CTA
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Free Your Creative Team',
        url: '/#contact',
        style: 'primary',
    },
];

async function enhanceCaseStudy() {
    const slug = 'media-content-operations-ai';

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

        console.log('✅ Case study enhanced successfully!');
        console.log(`\nView at: https://rsla.io/work/${slug}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

enhanceCaseStudy().catch(console.error);
