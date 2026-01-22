/**
 * Enhance marketing-analytics-reporting-automation case study with rich content elements
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/enhance-marketing-analytics.js
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
    textBlock('The Challenge: Senior Talent Trapped in Spreadsheet Hell', 'h2'),

    richBlock([
        plain('A digital marketing agency\'s best strategist was drowning in data entry. '),
        bold('Four hours. Every single day.'),
        plain(' Instead of optimizing campaigns and growing client accounts, they were copying numbers from Facebook Ads Manager into spreadsheets.'),
    ]),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Hidden Cost',
        content: 'When your highest-paid team members do repetitive data work, you\'re not just wasting salary. You\'re losing the strategic thinking that actually moves the needle. That\'s nearly 1,000 hours annually that could be spent on client strategy.',
    },

    textBlock('The daily grind included:', 'h3'),

    ...bulletList([
        [bold('Multi-account data exports:'), plain(' Multiple clients, multiple campaigns, every day')],
        [bold('Manual metric transfers:'), plain(' Spend, impressions, clicks, conversions, CPL, ROAS—all copied by hand')],
        [bold('Derived calculations:'), plain(' Week-over-week changes, running averages, client-specific KPIs')],
        [bold('Report formatting:'), plain(' Each client demanded their data in specific formats')],
        [bold('Landing page cross-referencing:'), plain(' Manual lookup of conversion events across systems')],
    ]),

    textBlock('The cost wasn\'t just wasted time. It was strategic paralysis. The person who should have been improving client results was trapped in data entry.'),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'When your highest-paid team members do repetitive data work, you\'re not just wasting salary. You\'re losing the strategic thinking that actually moves the needle. Automation doesn\'t replace people; it unleashes them.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Unleash Your Team',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: We Engineered a Self-Refreshing Analytics Engine', 'h2'),

    textBlock('We architected a comprehensive automation system using Google Sheets and custom Apps Script, pulling, processing, and visualizing Facebook Ads data automatically. The system scaled seamlessly as the agency added clients.'),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Why Google Sheets',
        content: 'Google Sheets with Apps Script provides a familiar interface with powerful automation. No additional software costs, easy team adoption, and direct Facebook Ads API integration.',
    },

    textBlock('Phase 1: Built Automated Data Ingestion', 'h3'),

    ...bulletList([
        'Engineered custom scripts pulling Facebook Ads data via API integration',
        'Configured scheduled refreshes running every morning before the team arrived',
        'Implemented error handling with Slack alerts for failed data pulls',
        'Deployed multi-account architecture handling all clients in a single dashboard',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 2: Deployed Intelligent Data Processing', 'h3'),

    ...bulletList([
        'Automated derived metric calculations (CPL, ROAS, week-over-week deltas)',
        'Built dynamic date range comparisons (7-day, 30-day, MTD, QTD)',
        'Configured conditional formatting highlighting anomalies and opportunities',
        'Implemented data validation catching API inconsistencies before they pollute reports',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 3: Uncovered Hidden Tracking Gaps', 'h3'),

    textBlock('Critical insight: during the automation build, we identified tracking gaps that were costing conversions.'),

    ...bulletList([
        'Identified critical landing page tracking gaps during the automation build',
        'Implemented additional conversion events that were never being captured',
        'Created funnel visualization exposing drop-off points',
        'Built A/B test tracking directly into the automated reporting',
    ]),

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'Unexpected Win',
        content: 'This proactive discovery led directly to the 4% conversion lift. Metrics that were always available but never visible. Sometimes the biggest wins come from automating the boring stuff so you can pay attention to what actually matters.',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 4: Created Scalable Documentation', 'h3'),

    ...bulletList([
        'Authored comprehensive SOPs for system maintenance and troubleshooting',
        'Built onboarding materials for future team members',
        'Established processes for adding new client accounts in minutes',
        'Created self-serve troubleshooting guides',
    ]),

    // Tech Stack callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Tech Stack',
        content: 'Google Sheets, Google Apps Script, Facebook Ads API, Slack (alerting), Landing page tracking (HTML/CSS/JS), Notion (SOPs)',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: 96% Time Reduction, +4% Conversions, $18K Saved', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '96%', label: 'Time Reduction' },
            { _key: generateKey(), value: '990+', label: 'Hours Saved/Year' },
            { _key: generateKey(), value: '+4%', label: 'Conversion Lift' },
            { _key: generateKey(), value: '$18K', label: 'Annual Savings' },
        ],
    },

    textBlock('The automation system delivered immediate and measurable impact:'),

    ...bulletList([
        [bold('96% time reduction:'), plain(' 4-hour daily process reduced to 10 minutes of review')],
        [bold('990+ hours saved annually:'), plain(' Nearly 20 hours per week returned to strategic work')],
        [bold('$18,000 annual savings:'), plain(' Lead marketer time reallocated to revenue-generating activities')],
        [bold('+4% conversion rate improvement:'), plain(' New tracking metrics revealed optimization opportunities')],
        [bold('Zero manual data entry:'), plain(' Completely eliminated copy-paste workflows')],
        [bold('Scalable system:'), plain(' New clients onboarded in minutes instead of adding to workload')],
        [bold('Documented processes:'), plain(' SOPs enabled smooth team transitions and growth')],
    ]),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'Key Takeaway',
        content: 'The 4% conversion lift wasn\'t from a fancy new tool. It came from finally having visibility into metrics that were always available but never tracked. Sometimes the biggest wins come from automating the boring stuff so you can pay attention to what actually matters.',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Working Relationship section
    textBlock('The Working Relationship', 'h3'),

    textBlock('Over five months of collaboration, we transformed how the agency handled data operations. The lead marketer went from dreading the daily reporting grind to having mornings free for client strategy calls. The automation system became a core part of their operations, handling data for all client accounts and scaling seamlessly as they added new business.'),

    // Additional contributions
    textBlock('Additional Contributions', 'h3'),

    textBlock('Beyond the core automation project, the engagement included:'),

    ...bulletList([
        [bold('Landing page development:'), plain(' Built and optimized conversion-focused pages')],
        [bold('Email and WhatsApp automation:'), plain(' Set up nurture sequences for leads')],
        [bold('Bug identification:'), plain(' Found and reported critical issues in internal ad-tracking software')],
        [bold('Payment integration:'), plain(' Assisted with Razorpay gateway setup for client projects')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Closing
    textBlock('Your Marketers Are Stuck in Spreadsheet Hell', 'h2'),

    textBlock('If your marketers are spending hours on data entry instead of strategy, you\'re leaving money on the table. We build automation systems that free up your best people to do their best work.'),

    // Final CTA
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Free Your Marketing Team',
        url: '/#contact',
        style: 'primary',
    },
];

async function enhanceCaseStudy() {
    const slug = 'marketing-analytics-reporting-automation';

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
