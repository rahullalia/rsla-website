/**
 * Enhance ai-proposal-generator-sales-workflow case study with rich content elements
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/enhance-ai-proposal.js
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
    textBlock('The Challenge: 2 Hours Per Proposal Was Killing Our Pipeline', 'h2'),

    richBlock([
        plain('Every agency knows the pain: a prospect is hot, the discovery call went great, and now you need to send a proposal. '),
        bold('Two hours later'),
        plain(', you\'re still formatting bullet points. Meanwhile, the lead cools and the opportunity slips.'),
    ]),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Proposal Bottleneck',
        content: 'At $133/hour agency rate, every 2-hour proposal costs $267 in direct labor. But the real cost is pipeline velocity—multi-day delays between discovery calls and proposal delivery let competitors swoop in.',
    },

    textBlock('The damage was quantifiable:', 'h3'),

    ...bulletList([
        [bold('2 hours per proposal:'), plain(' Writing, formatting, and obsessing over every detail')],
        [bold('Rabbit hole syndrome:'), plain(' Perfectionism stealing time from actually closing deals')],
        [bold('Brand inconsistency:'), plain(' Every proposal looked different depending on who wrote it')],
        [bold('Lead cooling:'), plain(' Multi-day delays between discovery calls and proposal delivery')],
        [bold('$267 opportunity cost per proposal:'), plain(' At our rate, proposal writing was burning real revenue')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Every hour spent formatting proposals is an hour not spent closing deals. Manual document creation isn\'t just inefficient. It\'s actively killing your pipeline velocity.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Accelerate Your Sales',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: We Engineered an AI Proposal Machine', 'h2'),

    textBlock('We architected a fully automated proposal system that transforms discovery call notes into polished, branded documents in minutes. The pipeline runs autonomously using Make.com, Claude Opus 4, and Google Docs.'),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Why Claude Opus 4',
        content: 'Claude excels at understanding business context and writing persuasive, professional content. It generates complete proposal narratives—not just bullet points—from structured discovery notes.',
    },

    textBlock('Phase 1: Structured Discovery Call Capture', 'h3'),

    textBlock('Post-call, sales completes a focused Typeform (5-10 minutes) capturing:'),

    ...bulletList([
        'Prospect details (name, company, email)',
        'One-line business summary',
        'The bleeding-neck problem they described',
        'The solution we proposed',
        'Deliverables and timeline commitments',
        'Pricing tier',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 2: Claude Opus 4 Generates Content', 'h3'),

    textBlock('Make.com triggers instantly, feeding form data to Claude Opus 4, which:'),

    ...bulletList([
        'Generates a compelling proposal title',
        'Writes persuasive problem and solution narratives',
        'Breaks deliverables into 5 crystal-clear scope items',
        'Constructs a 4-milestone timeline with concrete dates',
        'Outputs structured JSON ready for template injection',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 3: Automated Template Population', 'h3'),

    textBlock('Structured data flows directly into a branded Google Docs template:'),

    ...bulletList([
        'Professional design with RSL/A identity',
        'Client-specific business context',
        'Custom problem/solution narrative',
        'Detailed 5-deliverable scope of work',
        '4-phase timeline with milestone gates',
        'Investment summary and clear next steps',
    ]),

    // Tech Stack callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Tech Stack',
        content: 'Typeform (discovery capture), Make.com (automation), Claude Opus 4 (content generation), Google Docs API (template population)',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: 165 Hours Recovered. $22K Saved. 92% Time Reduction.', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '92%', label: 'Time Reduction' },
            { _key: generateKey(), value: '165', label: 'Hours Saved/Year' },
            { _key: generateKey(), value: '$22K', label: 'Annual Savings' },
            { _key: generateKey(), value: '8,150%', label: 'First-Year ROI' },
        ],
    },

    textBlock('Time Obliterated', 'h3'),

    ...bulletList([
        [bold('Before:'), plain(' 2 hours per proposal')],
        [bold('After:'), plain(' 10 minutes per proposal')],
        [bold('Per-proposal savings:'), plain(' 1 hour 50 minutes eliminated (92% reduction)')],
        [bold('Annual recovery:'), plain(' 165 hours, over 4 full work weeks returned')],
    ]),

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'Operational Wins',
        content: 'Brand lock-in: Every proposal now matches our professional standards. Same-day delivery: Proposals sent hours after discovery calls, not days. Rabbit hole eliminated: Structured input prevents perfectionism paralysis.',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Financial Transformation', 'h3'),

    ...bulletList([
        [bold('Monthly value:'), plain(' $1,835 in recovered productivity')],
        [bold('Annual value:'), plain(' $22,027 in time savings')],
        [bold('Build investment:'), plain(' 2 hours ($267)')],
        [bold('Break-even point:'), plain(' 2 proposals, less than one week')],
    ]),

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'A 2-hour build now saves 165+ hours annually. That\'s 4 weeks of billable time returned every year. The real win? Eliminating the cognitive load of proposal writing so our team focuses on what drives revenue: relationships and closes.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Strategic Win Section
    textBlock('The Strategic Win: Scale Without Headcount', 'h2'),

    textBlock('Beyond hours and dollars, this automation proves a critical principle: the right systems let you scale without scaling payroll.'),

    textBlock('Pre-automation, doubling proposal volume would have required:'),

    ...bulletList([
        '20-40 hours/month burned on document creation',
        'Hiring sales support staff',
        'Slower lead response times',
        'Inconsistent messaging and brand drift',
    ]),

    textBlock('Now we handle 10x proposal volume with the same team. That\'s leverage.'),

    // Closing
    textBlock('Your Proposals Are Costing You Deals', 'h2'),

    textBlock('Every hour spent writing proposals is an hour not spent closing. We build AI-powered proposal systems that eliminate busywork and accelerate your pipeline.'),

    // Final CTA
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Accelerate Your Pipeline',
        url: '/#contact',
        style: 'primary',
    },
];

async function enhanceCaseStudy() {
    const slug = 'ai-proposal-generator-sales-workflow';

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
