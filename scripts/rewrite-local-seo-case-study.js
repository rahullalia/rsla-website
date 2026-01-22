/**
 * Rewrite local-seo-reputation-management case study with rich content
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/rewrite-local-seo-case-study.js
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

// Helper to create a text block
function textBlock(text, style = 'normal') {
    return {
        _type: 'block',
        _key: generateKey(),
        style,
        children: [{ _type: 'span', _key: generateKey(), text, marks: [] }],
    };
}

// Helper to create a block with mixed formatting
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

// Helper for bold text part
function bold(text) {
    return { text, marks: ['strong'] };
}

// Helper for plain text part
function plain(text) {
    return { text, marks: [] };
}

// Helper for linked text
function link(text, href) {
    const markKey = generateKey();
    return {
        text,
        marks: [markKey],
        markDef: { _type: 'link', _key: markKey, href },
    };
}

// Helper for bullet list
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
    textBlock('The Challenge: Great Pizza, Zero Visibility', 'h2'),

    richBlock([
        plain('Spice on a Slice made excellent pizza. Their regulars loved them. But online? They were invisible. With only '),
        bold('14 Google reviews'),
        plain(', they were buried beyond page two of local search results. Effectively nonexistent to anyone discovering restaurants online.'),
    ]),

    textBlock('Every day, potential customers searched "pizza near me" and found their competitors instead. The shop\'s lack of digital social proof was strangling growth and leaving thousands of dollars on the table each month.'),

    // Info callout with industry context
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Review Economy',
        content: '93% of consumers say online reviews impact their purchasing decisions. For local businesses, Google reviews are the #1 factor determining whether a new customer walks through your door or goes to a competitor.',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive Insight as testimonial
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Satisfied customers don\'t become reviewers automatically. Without a system to convert in-store loyalty into online advocacy, even great businesses stay invisible to new customers.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    // CTA Button
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Fix Your Visibility Gap',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: Automated Review Generation Engine', 'h2'),

    textBlock('We engineered a complete local SEO system combining Google Business Profile optimization with automated review generation that converts happy customers into online advocates, without requiring any manual effort from the shop owner.'),

    // Phase 1
    textBlock('Phase 1: Google Business Profile Optimization', 'h3'),

    textBlock('Before driving reviews, we ensured the foundation was solid. A poorly optimized profile wastes review momentum.'),

    ...bulletList([
        [bold('Complete profile audit'), plain(': Updated hours, photos, menu items, and service areas')],
        [bold('Keyword optimization'), plain(': Added relevant terms to business description and services')],
        [bold('Photo enhancement'), plain(': Uploaded high-quality images of signature dishes and the dining area')],
        [bold('Q&A seeding'), plain(': Pre-populated common customer questions with helpful answers')],
    ]),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Pro Tip',
        content: 'Google Business Profiles with 100+ photos get 520% more calls than those with fewer than 10. Visual content builds trust before customers even visit.',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 2
    textBlock('Phase 2: In-Store Lead Capture + CRM Pipeline', 'h3'),

    textBlock('We needed a frictionless way to capture customer contact information without disrupting the dining experience.'),

    ...bulletList([
        [bold('Free slice incentive'), plain(': Customers provided contact info for a complimentary slice on their next visit')],
        [bold('Instant CRM sync'), plain(': Every contact flowed automatically into the CRM pipeline')],
        [bold('Database reactivation'), plain(': Launched SMS and email campaigns to re-engage past customers')],
        [bold('Segmentation'), plain(': Tagged contacts by visit frequency for personalized follow-up')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 3
    textBlock('Phase 3: Automated Review Request Sequences', 'h3'),

    textBlock('The system ran autonomously. No manual work required from the shop owner.'),

    ...bulletList([
        [bold('Timing optimization'), plain(': Review requests sent 2 hours after visit when satisfaction is highest')],
        [bold('Multi-channel approach'), plain(': SMS for speed, email for detail. Customers chose their preference')],
        [bold('Polite persistence'), plain(': Non-responders received one gentle follow-up, then stopped')],
        [bold('Direct link'), plain(': One-tap review submission eliminated friction')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 4
    textBlock('Phase 4: Nurture Campaigns for Repeat Business', 'h3'),

    textBlock('Reviews were just the beginning. Ongoing nurture campaigns drove repeat visits and compounded revenue.'),

    ...bulletList([
        [bold('Weekly specials'), plain(': Automated SMS with rotating promotions')],
        [bold('Birthday rewards'), plain(': Free meal on customer birthdays with high redemption rate')],
        [bold('Seasonal campaigns'), plain(': Holiday-themed offers drove traffic during slow periods')],
        [bold('Re-engagement'), plain(': Customers inactive 30+ days received a "we miss you" offer')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: 118 New Reviews, $25K Revenue, Page 1 Ranking', 'h2'),

    textBlock('In under 60 days, the shop\'s local presence transformed completely:'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '14 → 132', label: 'Google Reviews' },
            { _key: generateKey(), value: '$25K', label: 'New Revenue' },
            { _key: generateKey(), value: '60', label: 'Days to Results' },
            { _key: generateKey(), value: '#1', label: 'Local Ranking' },
        ],
    },

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'Key Achievement',
        content: 'The shop went from buried on page 2 to ranking #1 for "pizza near me" in their neighborhood, capturing walk-in traffic that was previously going to competitors.',
    },

    // Client testimonial
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'People already liked our pizza, but not enough people knew about us. New customers are finding us now, old ones are coming back, and our Google reviews finally show the quality we\'ve always had.',
        author: 'Shop Owner',
        role: 'Spice on a Slice',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Breakdown of results
    textBlock('What Changed', 'h3'),

    ...bulletList([
        [bold('Reviews exploded from 14 to 132'), plain(': Undeniable social proof that converts browsers to customers')],
        [bold('$25,000 in new revenue'), plain(' from increased visibility and repeat visits')],
        [bold('First page Google Maps ranking'), plain(' for key local searches, capturing walk-in traffic')],
        [bold('Repeat business compounding'), plain(' from automated nurture sequences')],
        [bold('Owner time saved'), plain(': System runs autonomously, no daily management needed')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Tech Stack
    {
        _type: 'techStack',
        _key: generateKey(),
        tools: [
            { _key: generateKey(), name: 'GoHighLevel CRM' },
            { _key: generateKey(), name: 'Google Business Profile' },
            { _key: generateKey(), name: 'SMS Automation' },
            { _key: generateKey(), name: 'Email Sequences' },
            { _key: generateKey(), name: 'Lead Capture Forms' },
        ],
    },

    // Closing section
    textBlock('Your Competitors Are Stealing Your Customers Online', 'h2'),

    textBlock('Every day without reviews is a day competitors capture your potential customers. The math is simple: more reviews = more visibility = more revenue.'),

    textBlock('We build automated review generation systems that turn your satisfied customers into your marketing engine, without requiring any ongoing effort from you.'),

    // Final CTAs
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Dominate Local Search',
        url: '/#contact',
        style: 'primary',
    },
];

async function rewriteCaseStudy() {
    const slug = 'local-seo-reputation-management';

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
