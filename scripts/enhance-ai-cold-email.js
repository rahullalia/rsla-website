/**
 * Enhance ai-cold-email-personalization case study with rich content elements
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/enhance-ai-cold-email.js
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

function link(text, href) {
    const markKey = generateKey();
    return {
        text,
        marks: [markKey],
        markDef: { _type: 'link', _key: markKey, href },
    };
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
    textBlock('The Challenge: 8 Minutes Per Email Was Killing Our Outreach', 'h2'),

    richBlock([
        plain('Here\'s the brutal math every sales team ignores. Personalized emails get '),
        bold('5-8X higher response rates'),
        plain(' than templates. But personalizing each email costs 8 minutes of research and writing. At scale, that math breaks completely.'),
    ]),

    textBlock('We were hemorrhaging time. Choosing between quality and volume meant losing either way.'),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Personalization Paradox',
        content: 'Personalized emails get 5-8X higher response rates, but take 8 minutes each. At 50 emails/week, that\'s 350 hours annually. Nearly 9 full work weeks burned on research and writing.',
    },

    textBlock('The Time Drain We Couldn\'t Ignore', 'h3'),

    textBlock('Every single personalized cold email demanded:'),

    ...bulletList([
        [bold('LinkedIn stalking:'), plain(' 1-2 minutes scanning their profile, headline, and recent activity')],
        [bold('Company research:'), plain(' 2-3 minutes understanding their business context and pain points')],
        [bold('Icebreaker crafting:'), plain(' 3-5 minutes writing something that doesn\'t sound like a robot')],
        [bold('Total per email:'), plain(' 8 minutes of pure friction')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('The Math That Demanded a Solution', 'h3'),

    ...bulletList([
        [bold('50 emails/week'), plain(' × 8 minutes = 6.7 hours gone every week')],
        [bold('Annual time burn:'), plain(' 350 hours. Nearly 9 full work weeks.')],
        [bold('Cost at agency rate:'), plain(' $46,725/year vanishing into research')],
    ]),

    textBlock('The alternative? Generic templates that guaranteed sub-2% reply rates. We refused to accept either option.'),

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'The cold email trap: personalize manually (unsustainable) or blast templates (ineffective). Most teams pick volume over quality and wonder why their pipeline is dry. We chose neither. We engineered a third path.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Escape the Outreach Trap',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: We Built an AI Personalization Engine', 'h2'),

    textBlock('We built an automated system that ingests LinkedIn enrichment data and deploys GPT-4 to generate custom icebreakers for every prospect. The output? Emails that feel hand-crafted, produced in seconds instead of minutes.'),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Why This Works',
        content: 'AI doesn\'t replace personalization. It scales it. By feeding GPT-4 rich context from LinkedIn, we generate icebreakers that reference specific details about each prospect\'s role, company, and recent activity.',
    },

    textBlock('Phase 1: Ingested LinkedIn Enrichment Data', 'h3'),

    textBlock('We configured a Google Sheet pipeline fed by enriched prospect data:'),

    ...bulletList([
        [bold('Core identifiers:'), plain(' Name, email, company. The basics.')],
        [bold('LinkedIn intelligence:'), plain(' Job title, headline, profile URL, recent activity')],
        [bold('Business signals:'), plain(' Industry, company size, growth trajectory')],
        [bold('Enrichment depth:'), plain(' Tech stack, funding status, hiring patterns')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 2: Deployed GPT-4 for Icebreaker Generation', 'h3'),

    textBlock('Make.com executes daily, processing every lead missing an icebreaker:'),

    ...bulletList([
        [bold('Extracts all enrichment data'), plain(' from the prospect row')],
        [bold('Feeds GPT-4'), plain(' a custom prompt containing their LinkedIn headline, role, company context, and recent activity')],
        [bold('Outputs a 2-3 sentence icebreaker'), plain(' that references something specific and bridges to our value proposition')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 3: Automated Pipeline Completion', 'h3'),

    textBlock('AI-generated icebreakers write back to Google Sheets instantly. The sales team now has:'),

    ...bulletList([
        'Fully researched, personalized opening lines, ready to deploy',
        'Context annotations explaining why each icebreaker works',
        'Copy-paste content compatible with any email platform',
        'Consistent quality at infinite scale',
    ]),

    // Tech Stack
    {
        _type: 'techStack',
        _key: generateKey(),
        tools: [
            { _key: generateKey(), name: 'Google Sheets' },
            { _key: generateKey(), name: 'Make.com' },
            { _key: generateKey(), name: 'OpenAI GPT-4' },
            { _key: generateKey(), name: 'Apollo.io' },
            { _key: generateKey(), name: 'LinkedIn Sales Navigator' },
        ],
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: 325 Hours Recovered. $43K Saved. 94% Time Reduction.', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '94%', label: 'Time Reduction' },
            { _key: generateKey(), value: '325', label: 'Hours Saved/Year' },
            { _key: generateKey(), value: '$43K', label: 'Annual Savings' },
            { _key: generateKey(), value: '10,746%', label: 'First-Year ROI' },
        ],
    },

    textBlock('Time Obliterated', 'h3'),

    ...bulletList([
        [bold('Before:'), plain(' 8 minutes per email (research + writing)')],
        [bold('After:'), plain(' 30 seconds per email (quick review, copy, send)')],
        [bold('Per-email savings:'), plain(' 7.5 minutes eliminated (94% reduction)')],
        [bold('Annual recovery:'), plain(' 325 hours. Over 8 full work weeks returned.')],
    ]),

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'Quality + Scale Unlocked',
        content: 'Every icebreaker is context-aware and thoughtful. Zero writer\'s block. Infinite scalability. Junior reps now output senior-level research quality.',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Real Example', 'h3'),

    // Sample testimonial
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Hi Sarah, I noticed you\'re scaling growth marketing at TechFlow after your time at HubSpot. Given your experience with marketing automation at scale, I thought you might be interested in how we\'re helping B2B SaaS companies like yours automate their lead nurture workflows using AI, cutting manual work by 70% while improving conversion rates.',
        author: 'AI-Generated Icebreaker',
        role: 'For Sarah Chen, VP of Marketing at TechFlow Solutions',
    },

    textBlock('Why this works: References her specific background (HubSpot), acknowledges her current role (scaling growth), and positions our solution as relevant to her exact challenges.'),

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'A 3-hour build now saves 325+ hours annually and $43K in labor. The personalization vs. scale dilemma? Solved. We now send 100 emails with the same quality as 5 hand-written ones. That\'s not optimization. That\'s leverage.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Built For Section
    textBlock('Built For: Teams That Refuse to Choose Between Quality and Volume', 'h2'),

    textBlock('This system is engineered for anyone running cold outreach who refuses to sacrifice personalization for scale:'),

    ...bulletList([
        [bold('B2B Sales Teams:'), plain(' 50-500 cold emails weekly to C-suite decision-makers')],
        [bold('Marketing Agencies:'), plain(' Multi-client outbound campaigns at agency velocity')],
        [bold('Consultants & Freelancers:'), plain(' Pipeline building without the time tax')],
        [bold('SaaS Companies:'), plain(' Personalized product messaging at PLG scale')],
        [bold('Recruiters:'), plain(' Passive candidate outreach that actually gets replies')],
    ]),

    // Closing
    textBlock('Your Cold Email Is Either Personal or Ignored', 'h2'),

    textBlock('If you\'re still choosing between volume and quality, you\'re playing last decade\'s game. AI-powered personalization delivers both at a fraction of the cost.'),

    // Final CTA
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Scale Your Outreach',
        url: '/#contact',
        style: 'primary',
    },
];

async function enhanceCaseStudy() {
    const slug = 'ai-cold-email-personalization';

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
