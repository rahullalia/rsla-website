/**
 * Enhance field-service-operations-automation case study with rich content elements
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/enhance-field-service.js
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
    textBlock('The Challenge: 50+ Clients, 4 Systems, Zero Visibility', 'h2'),

    richBlock([
        plain('White Glove Cleaning had grown to 50+ recurring clients, and their operations were collapsing under the weight. Housecall Pro for scheduling. Google Sheets for customer notes. Manual texts for follow-ups. Email for invoicing. The owner was burning '),
        bold('20+ hours weekly'),
        plain(' on admin tasks. They\'d hired 2 full-time employees just to answer phones and send confirmation texts.'),
    ]),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Hidden Cost of Fragmentation',
        content: 'When customer data lives in 4+ systems, every interaction requires context-switching. Staff waste hours hunting for information, customers get inconsistent experiences, and revenue leaks through the cracks of disconnected workflows.',
    },

    textBlock('The operational bleeding:', 'h3'),

    ...bulletList([
        [bold('Customer data fragmented across 4 systems:'), plain(' No single source of truth for history, preferences, or communications')],
        [bold('Manual follow-up workflows:'), plain(' Employees typing the same confirmation texts hundreds of times monthly')],
        [bold('Weekly double-bookings:'), plain(' Scheduling not synced with communication, conflicts guaranteed')],
        [bold('Revenue leaking everywhere:'), plain(' No automated upsell, rebooking, or dormant client reactivation')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Scattered operations don\'t just waste time. They create blind spots that cost you customers. Every disconnected system is a leak in your revenue pipeline. You can\'t fix what you can\'t see.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Eliminate Your Blind Spots',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: We Architected GoHighLevel as Central Command', 'h2'),

    richBlock([
        plain('We rebuilt their entire operations infrastructure in GoHighLevel, creating a '),
        bold('single source of truth'),
        plain(' for all customer interactions, scheduling, and communications. Critical constraint: they needed to keep Housecall Pro for scheduling. We engineered bidirectional sync so both systems stayed in lockstep.'),
    ]),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Why Bidirectional Sync Matters',
        content: 'Most integrations are one-way. Jobs created in Housecall Pro appear in GHL, but not vice versa. We built true bidirectional sync so the team can work from either system without data drift.',
    },

    textBlock('Phase 1: Engineered Housecall Pro Integration & Data Migration', 'h3'),

    ...bulletList([
        'Built custom API integration between Housecall Pro and GoHighLevel using Make.com',
        'Migrated all customer data, job history, and notes into unified GoHighLevel contacts',
        'Deployed bidirectional sync: jobs scheduled in Housecall Pro automatically create opportunities in GHL',
        'Constructed custom fields tracking service type, frequency, property size, and preferences',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 2: Deployed AI-Powered Communication Workflows', 'h3'),

    ...bulletList([
        [bold('Automated appointment confirmations:'), plain(' SMS/email at 48 hours, 24 hours, and morning-of')],
        [bold('AI-personalized review requests:'), plain(' Sent 2 hours post-completion with service-specific messaging')],
        [bold('Smart rebooking sequences:'), plain(' Workflows triggered by service frequency (weekly, bi-weekly, monthly)')],
        [bold('24/7 AI chat widget:'), plain(' Answers FAQs, books estimates, qualifies leads while the team sleeps')],
        [bold('Emergency request handling:'), plain(' After-hours inquiries get instant responses with next-available slots')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 3: Constructed Operational Command Dashboard', 'h3'),

    ...bulletList([
        'Custom pipeline views: New Leads, Active Jobs, Follow-Ups, Recurring Clients',
        'Daily digest emails: jobs scheduled, completions, review scores, revenue at a glance',
        'Automated reporting: customer lifetime value, rebooking rates, service profitability',
        'Team task automation: quality checks and special requests routed automatically',
    ]),

    // Tech Stack
    {
        _type: 'techStack',
        _key: generateKey(),
        tools: [
            { _key: generateKey(), name: 'GoHighLevel CRM' },
            { _key: generateKey(), name: 'Housecall Pro' },
            { _key: generateKey(), name: 'Make.com' },
            { _key: generateKey(), name: 'AI Chat Widget' },
        ],
    },

    // Client testimonial
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'We went from needing 2 people just to answer phones and schedule jobs to having everything run automatically. I get a morning email showing exactly what\'s happening that day, and I can see our entire business in one place. The AI chat even books estimates while I\'m sleeping. This paid for itself in the first month.',
        author: 'Owner',
        role: 'White Glove Cleaning',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: 2 Positions Eliminated, $15K Revenue Recovered', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '100%', label: 'Ops Consolidated' },
            { _key: generateKey(), value: '2', label: 'Positions Redeployed' },
            { _key: generateKey(), value: '99%', label: 'Confirmation Rate' },
            { _key: generateKey(), value: '$15K', label: 'Revenue Recovered' },
        ],
    },

    textBlock('Within 60 days of go-live:'),

    ...bulletList([
        [bold('100% operations consolidated:'), plain(' All customer data, communications, and workflows in one system')],
        [bold('2 employees redeployed to fieldwork:'), plain(' Admin positions eliminated, service capacity increased')],
        [bold('99% confirmation rate:'), plain(' Automated reminders virtually eliminated no-shows')],
        [bold('37 leads captured, 18 converted:'), plain(' AI chat widget booking estimates while team sleeps')],
        [bold('14 → 132 Google reviews in 60 days:'), plain(' Automated review requests running on autopilot')],
        [bold('$15K recovered annually:'), plain(' Rebooking workflows reactivated 23 dormant clients')],
    ]),

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'The Compound Effect',
        content: 'The right operations platform doesn\'t just save time. It unlocks revenue you didn\'t know was leaking. Automated rebooking recovered 23 dormant clients. Review automation built social proof. AI chat captured leads 24/7.',
    },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'The right operations platform doesn\'t just save time. It unlocks revenue you didn\'t know was leaking. Automating the routine work frees your team for high-value activities that actually grow the business.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Closing
    textBlock('Your Operations Are Scattered. Your Revenue Is Leaking.', 'h2'),

    textBlock('If you\'re managing your business across multiple platforms, you\'re paying for inefficiency you can\'t even see. We build centralized operations hubs that run 24/7 and pay for themselves in weeks.'),

    // Final CTA
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Consolidate Your Operations',
        url: '/#contact',
        style: 'primary',
    },
];

async function enhanceCaseStudy() {
    const slug = 'field-service-operations-automation';

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
