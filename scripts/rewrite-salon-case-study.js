/**
 * Rewrite salon-marketing-automation-roi case study with rich content
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/rewrite-salon-case-study.js
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
    textBlock('The Challenge: Two Years of Empty Rooms Bleeding Money', 'h2'),

    richBlock([
        plain('Two vacant suites. Two years of trying. Zero results. That was Laiz\'s reality at Casagrande Salon in Manhattan. Premium space sitting idle wasn\'t just an inconvenience. It was a '),
        bold('$3,000/month wound'),
        plain(' that wouldn\'t stop bleeding.'),
    ]),

    textBlock('She\'d tried everything: scattered social posts, unfocused ads, word-of-mouth prayers. Nothing stuck. The leads that did trickle in vanished into a black hole of missed messages and forgotten follow-ups.'),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Hidden Cost of Empty Space',
        content: 'Vacant commercial space doesn\'t just cost rent. It costs opportunity. Every month a suite sits empty, that\'s revenue a competitor is capturing. In Manhattan, where salon suite rentals average $3,000-5,000/month, two years of vacancy represents $72,000-120,000 in lost income.',
    },

    textBlock('The real problem wasn\'t marketing. It was systems.', 'h3'),

    ...bulletList([
        [bold('No targeting'), plain(': Generic ads reached the wrong audience, wasting precious budget')],
        [bold('No capture'), plain(': Interested leads had no clear path to take action')],
        [bold('No follow-up'), plain(': Manual responses meant leads went cold within hours')],
        [bold('No tracking'), plain(': No visibility into what was working or failing')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Vacant space isn\'t a marketing problem. It\'s a systems problem. Without targeted outreach and automated nurture, even premium real estate becomes a liability instead of an asset.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Fix Your Lead Leakage',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: Precision Targeting + Automated Conversion Machine', 'h2'),

    richBlock([
        plain('We structured a '),
        bold('performance-based partnership'),
        plain(': Laiz covered a modest $600 ad spend, and we\'d only earn the first month\'s rent upon securing year-long tenants. Skin in the game with aligned incentives.'),
    ]),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Why Performance-Based Works',
        content: 'When the agency only gets paid on results, incentives align. We weren\'t interested in vanity metrics. We wanted signed leases.',
    },

    // Phase 1
    textBlock('Phase 1: Hyper-Targeted Meta Ads', 'h3'),

    textBlock('The first problem was reaching the right people. Generic "rent salon space" ads attract tire-kickers. We needed licensed professionals ready to commit.'),

    ...bulletList([
        [bold('Laser-focused targeting'), plain(': Stylists, barbers, and beauty professionals within a tight Manhattan radius')],
        [bold('Interest layering'), plain(': Filtered by professional licenses, industry groups, and salon equipment interests')],
        [bold('Compelling creative'), plain(': Before/after photos of the suites, clear pricing, and professional lifestyle imagery')],
        [bold('Zero wasted impressions'), plain(': Every dollar spent reached qualified prospects')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 2
    textBlock('Phase 2: Instant Lead Capture + CRM Infrastructure', 'h3'),

    textBlock('Getting clicks is useless without capturing and qualifying leads automatically.'),

    ...bulletList([
        [bold('GoHighLevel CRM'), plain(': All leads flowed directly into the system with zero manual data entry')],
        [bold('Instant response'), plain(': Automated SMS within 60 seconds of form submission')],
        [bold('Qualification questions'), plain(': Pre-screened for license status, timeline, and budget before human contact')],
        [bold('Calendar integration'), plain(': Qualified leads could self-book salon tours immediately')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 3
    textBlock('Phase 3: Hands-Free Nurture Pipeline', 'h3'),

    richBlock([
        plain('The system ran '),
        bold('completely hands-off'),
        plain(' for Laiz. Automated workflows tracked every conversation, scheduled salon tours, and managed all communication until prospects were ready to sign.'),
    ]),

    ...bulletList([
        [bold('Multi-channel sequences'), plain(': SMS for speed, email for detail, all coordinated automatically')],
        [bold('Conversation tracking'), plain(': Complete history visible for every lead')],
        [bold('Tour scheduling'), plain(': Self-service booking eliminated back-and-forth')],
        [bold('No leads lost'), plain(': Every inquiry received professional, timely follow-up')],
    ]),

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'The System Difference',
        content: 'Before: Laiz manually checked Facebook messages 2-3 times daily, often missing leads. After: Every lead received a response within 60 seconds, 24/7, with zero effort from Laiz.',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 4
    textBlock('Phase 4: Tour-to-Lease Conversion', 'h3'),

    textBlock('Getting people through the door was just the beginning. We optimized the entire tour-to-lease journey.'),

    ...bulletList([
        [bold('Tour reminders'), plain(': Automated SMS the day before and hour before scheduled visits')],
        [bold('No-show recovery'), plain(': Missed appointments triggered rebooking sequences')],
        [bold('Post-tour follow-up'), plain(': Same-day follow-up with lease terms and next steps')],
        [bold('Urgency triggers'), plain(': "Only 1 suite left" messaging for final conversions')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: From Two-Year Failure to $36K Annual Revenue', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '60X', label: 'ROAS' },
            { _key: generateKey(), value: '$36K', label: 'Annual Revenue' },
            { _key: generateKey(), value: '$600', label: 'Ad Spend' },
            { _key: generateKey(), value: '90', label: 'Days to Fill' },
        ],
    },

    textBlock('Within three months, both suites were locked in with quality, long-term stylists on one-year leases.'),

    // Video testimonial
    {
        _type: 'videoEmbed',
        _key: generateKey(),
        url: 'https://fast.wistia.net/embed/iframe/hr0yfppjnl',
        caption: 'Laiz shares her experience with RSL/A',
    },

    // Client testimonial
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'I tried for years to rent my salon space and nothing worked. After Rahul and RSL/A, in just a few months both my rooms were filled. Now I don\'t stress about rent anymore.',
        author: 'Laiz',
        role: 'Owner, Casagrande Salon',
    },

    // Breakdown
    textBlock('The Numbers That Matter', 'h3'),

    ...bulletList([
        [bold('60X return on ad spend'), plain(': $600 in, $36,000 out. That\'s not marketing, that\'s a money machine')],
        [bold('Liability → Asset'), plain(': Empty suites transformed into predictable, passive revenue')],
        [bold('Stress → Surplus'), plain(': Laiz went from worrying about rent to counting profit')],
        [bold('Zero ongoing effort'), plain(': System continues generating leads for future vacancies')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Tech Stack
    {
        _type: 'techStack',
        _key: generateKey(),
        tools: [
            { _key: generateKey(), name: 'Meta Ads (Facebook/Instagram)' },
            { _key: generateKey(), name: 'GoHighLevel CRM' },
            { _key: generateKey(), name: 'SMS Automation' },
            { _key: generateKey(), name: 'Email Sequences' },
            { _key: generateKey(), name: 'Calendar Booking' },
            { _key: generateKey(), name: 'Lead Scoring' },
        ],
    },

    // Closing
    textBlock('Your Vacant Space Is Costing You $3K+ Every Month', 'h2'),

    textBlock('Whether it\'s salon suites, office space, or rental units, empty rooms are burning money. Every month of vacancy is revenue your competitors are capturing instead of you.'),

    textBlock('We build targeted ad + automated nurture systems that fill vacancies fast and keep them filled, without requiring your time or attention.'),

    // Final CTAs
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Fill Your Vacancies',
        url: '/#contact',
        style: 'primary',
    },
];

async function rewriteCaseStudy() {
    const slug = 'salon-marketing-automation-roi';

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
