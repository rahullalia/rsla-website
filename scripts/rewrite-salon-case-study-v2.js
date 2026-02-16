/**
 * Rewrite salon-marketing-automation-roi case study v2
 * - Corrected: "6 months" not "2 years"
 * - Added: Full funnel data (30 leads → 20 tours → 10 showed → 2 leased)
 * - No em dashes, no mention of third suite
 * - Voice calibrated, natural tone
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/rewrite-salon-case-study-v2.js
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

// ============================================
// STRUCTURED FIELDS (patched separately)
// ============================================

const structuredFields = {
    tldr: `Two vacant salon suites in Manhattan had been sitting empty for six months. We spent $600 on hyper-targeted Meta Ads and built a GoHighLevel CRM pipeline that nurtured leads automatically. Out of 30 leads, 20 booked tours, 10 showed up, and 2 signed year-long leases. $36K in annual revenue from $600. That is a 60X return on ad spend.`,

    keyTakeaways: [
        'Structure performance-based partnerships where you only get paid on results. It aligns incentives and builds trust fast.',
        'Hyper-local Meta targeting with a tight radius and professional interest filters keeps cost per lead under $20.',
        'Automated SMS and email sequences engaged leads within minutes. 67% of leads booked a tour without any manual follow-up.',
        'Build hands-free nurture pipelines so owners are not chasing leads. Laiz did not touch a single message.',
        'Track the full funnel. 30 leads, 20 tours booked, 10 showed, 2 leased. Know your numbers at every stage.'
    ],

    problemStatement: `Six months of empty suites and zero traction. That was the situation when Laiz reached out. Two premium salon suites at Casagrande Salon in Manhattan were sitting vacant, costing her roughly $3,000 per month in lost income.

She had tried a few things on her own. Some social media posts here and there, a couple of boosted ads, word of mouth. But nothing was consistent and nothing converted. The few leads that did come in went cold because there was no system to follow up. Messages got buried. Interested people moved on.

It was not a traffic problem. It was a systems problem. No targeting, no capture, no follow-up, no tracking. Every month the suites stayed empty was another $3K gone.`,

    solutionApproach: `We set up a performance-based deal. Laiz covered $600 in ad spend, and we would earn the first month's rent only after securing year-long tenants. So both sides had skin in the game.

The first thing we built was a hyper-targeted Meta Ads campaign focused on licensed stylists, barbers, and beauty professionals within a tight Manhattan radius. No broad audiences. Every dollar went toward reaching people who were actually looking for salon space.

Then we wired up GoHighLevel as the CRM backbone. Every lead that came in got an automated SMS within 60 seconds, followed by a qualification sequence and a self-service tour booking link. The whole pipeline ran without Laiz lifting a finger. Leads came in, got nurtured, booked tours, and showed up. All automated.`,

    resultsOutcome: `The campaign reached about 6,000 people and generated 30 qualified leads at roughly $20 per lead. For context, average cost per lead in local services runs $30 to $50. We came in at $20.

Out of those 30, 20 booked a salon tour. That is a 67% booking rate. Industry average for lead-to-appointment conversion sits around 2 to 12%. 10 of those 20 actually showed up. And out of 10 tours, 2 signed year-long leases. Both suites filled within 90 days.

$600 in ad spend turned into $36,000 in annual rental income. 60X return on ad spend. The beauty industry average ROAS on Meta Ads is 3.5 to 4.2X. We hit 60X. That is roughly 15 times the industry benchmark.

As Laiz put it: "Now I don't stress about rent anymore." Update: both tenants are still in their suites and going strong.`,

    servicesUsed: ['paid-acquisition', 'crm-infrastructure', 'ai-automation']
};

// ============================================
// RICH CONTENT BLOCKS
// ============================================

const enhancedContent = [
    // ---- CHALLENGE SECTION ----
    textBlock('The Challenge: Empty Suites Bleeding $3K a Month', 'h2'),

    richBlock([
        plain('Six months of vacant suites. That was Laiz\'s reality at Casagrande Salon in Manhattan. Two premium rooms sitting empty, costing her roughly '),
        bold('$3,000 per month'),
        plain(' in lost rental income.'),
    ]),

    textBlock('She had tried a few things on her own. Some social posts, a couple of boosted ads, word of mouth. But nothing was consistent and nothing converted. And the leads that did trickle in? They went cold because there was no system to catch them.'),

    // Laiz's voice - problem
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'I tried for months to rent my salon space and nothing worked. I was posting on social media, asking around. Nothing.',
        author: 'Laiz',
        role: 'Owner, Casagrande Salon',
    },

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Real Cost of Vacant Space',
        content: 'Empty commercial space does not just cost rent. It costs opportunity. In Manhattan, salon suites go for $1,500 to $3,000 per month each. Six months of vacancy on two suites means $18,000 or more in lost income. That is money a system could have recovered.',
    },

    textBlock('The real problem was not marketing. It was systems.', 'h3'),

    ...bulletList([
        [bold('No targeting: '), plain('Generic ads reached the wrong audience and wasted budget')],
        [bold('No capture: '), plain('Interested leads had no clear path to take action')],
        [bold('No follow-up: '), plain('Manual responses meant leads went cold within hours')],
        [bold('No tracking: '), plain('No visibility into what was working or what was failing')],
    ]),

    { _type: 'divider', _key: generateKey(), style: 'dots' },

    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Vacant space is not a marketing problem. It is a systems problem. Without targeted outreach and automated nurture, even premium real estate becomes a liability.',
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

    { _type: 'divider', _key: generateKey(), style: 'line' },

    // ---- SOLUTION SECTION ----
    textBlock('The Solution: Targeted Ads + Automated Nurture Pipeline', 'h2'),

    richBlock([
        plain('We structured a '),
        bold('performance-based partnership'),
        plain('. Laiz covered $600 in ad spend, and we would only earn the first month\'s rent after securing year-long tenants. Skin in the game for both sides.'),
    ]),

    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Why Performance-Based Works',
        content: 'When the agency only gets paid on results, the incentives align. We were not interested in impressions or clicks. We wanted signed leases.',
    },

    // Phase 1
    textBlock('Phase 1: Hyper-Targeted Meta Ads', 'h3'),

    textBlock('The first thing we did was narrow the audience down to people who were actually looking for salon space. No broad targeting. No guessing.'),

    ...bulletList([
        [bold('Tight radius: '), plain('Stylists, barbers, and beauty professionals within a specific Manhattan area')],
        [bold('Interest layering: '), plain('Filtered by professional licenses, industry groups, and salon equipment interests')],
        [bold('Professional creative: '), plain('Photos of the actual suites with clear pricing and lifestyle imagery')],
        [bold('$7 per day budget: '), plain('Small but focused. Every dollar reached qualified prospects')],
    ]),

    // === AD CREATIVE PLACEHOLDER ===
    // User will insert actual ad video/image here via Sanity Studio
    textBlock('The Ad That Filled Both Suites', 'h3'),

    textBlock('This is the actual ad we ran. Targeted to licensed beauty professionals within a tight Manhattan radius at $7 per day.'),

    // Actual ad video (Wistia)
    {
        _type: 'videoEmbed',
        _key: generateKey(),
        url: 'https://fast.wistia.net/embed/iframe/u6p5as7gmm',
        caption: 'The actual Meta Ad that generated 30 leads at $7/day',
        orientation: 'vertical',
    },

    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 2
    textBlock('Phase 2: Instant Lead Capture via GoHighLevel', 'h3'),

    textBlock('Getting clicks means nothing if you cannot capture and qualify leads automatically. So we built the CRM infrastructure to handle everything.'),

    ...bulletList([
        [bold('Instant response: '), plain('Automated SMS within 60 seconds of form submission')],
        [bold('Qualification flow: '), plain('Pre-screened for license status, timeline, and budget before human contact')],
        [bold('Self-service booking: '), plain('Qualified leads could schedule salon tours directly from their phone')],
        [bold('Zero manual entry: '), plain('Every lead flowed into GoHighLevel automatically')],
    ]),

    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Phase 3
    textBlock('Phase 3: Hands-Free Nurture Pipeline', 'h3'),

    richBlock([
        plain('This is where it gets good. The system ran '),
        bold('completely hands-off'),
        plain(' for Laiz. She did not send a single message, make a single call, or chase a single lead. The pipeline handled everything.'),
    ]),

    ...bulletList([
        [bold('Multi-channel sequences: '), plain('SMS for speed, email for detail, all coordinated automatically')],
        [bold('Tour reminders: '), plain('Automated texts the day before and one hour before scheduled visits')],
        [bold('No-show recovery: '), plain('Missed appointments triggered rebooking sequences')],
        [bold('Post-tour follow-up: '), plain('Same-day message with lease terms and next steps')],
    ]),

    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'The System Difference',
        content: 'Before: Laiz checked Facebook messages a couple of times a day and often missed leads. After: Every lead got a response within 60 seconds, 24/7, with zero effort from her.',
    },

    // Laiz's voice - solution reaction
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'I didn\'t have to do anything. The leads just came in and the system handled everything. I would just get a notification that someone booked a tour.',
        author: 'Laiz',
        role: 'Owner, Casagrande Salon',
    },

    { _type: 'divider', _key: generateKey(), style: 'line' },

    // ---- RESULTS SECTION ----
    textBlock('The Results: $600 In, $36K Out', 'h2'),

    // Main stats card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '60X', label: 'Return on Ad Spend' },
            { _key: generateKey(), value: '$36K', label: 'Annual Revenue' },
            { _key: generateKey(), value: '$600', label: 'Total Ad Spend' },
            { _key: generateKey(), value: '90 days', label: 'Time to Fill' },
        ],
    },

    textBlock('Both suites filled within 90 days with quality, long-term stylists on year-long leases.'),

    // Funnel breakdown
    textBlock('The Full Funnel Breakdown', 'h3'),

    textBlock('Here is how the numbers played out at every stage of the pipeline.'),

    // Funnel stats card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '~6,000', label: 'People Reached' },
            { _key: generateKey(), value: '30', label: 'Leads Generated' },
            { _key: generateKey(), value: '20', label: 'Tours Booked' },
            { _key: generateKey(), value: '10', label: 'Tours Attended' },
        ],
    },

    // === DASHBOARD SCREENSHOT PLACEHOLDER ===
    // User will insert Meta Ads Manager screenshot here via Sanity Studio
    textBlock('Straight from the Meta Ads dashboard. 29 leads generated, $477 total spend, $16.46 cost per lead.'),

    // Dashboard screenshot
    {
        _type: 'caseStudyImage',
        _key: generateKey(),
        image: {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: 'image-e26cf799240d74ac50d6f89965817ceb16611892-1598x887-jpg',
            },
        },
        alt: 'Meta Ads Dashboard - Campaign 01 [RSL] CS Leads performance',
        caption: 'Campaign 01 - [RSL] CS Leads. 29 leads, $477 spent, $16.46 CPL.',
        size: 'large',
    },

    ...bulletList([
        [bold('Cost per lead: '), plain('~$20. For qualified salon professionals in Manhattan, that is very efficient.')],
        [bold('Lead to tour booking: '), plain('67%. Two out of three leads booked a tour without any manual follow-up.')],
        [bold('Tour show rate: '), plain('50%. Half of the people who booked actually showed up.')],
        [bold('Tour to lease: '), plain('20%. Two out of ten tours converted to signed year-long leases.')],
    ]),

    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'Why the Funnel Matters',
        content: 'Most businesses only track leads and sales. But the conversion happens in between. A 67% tour booking rate means the automated nurture sequences were doing their job. And a 50% show rate means the reminder system was keeping people accountable. Every stage of the funnel was working.',
    },

    // Benchmark comparison
    textBlock('How This Stacks Up Against Industry Averages', 'h3'),

    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'Benchmark Comparison',
        content: 'Meta Ads ROAS in the beauty industry averages 3.5 to 4.2X. This campaign hit 60X, roughly 15 times the benchmark. Cost per lead in local services averages $30 to $50. We came in at $20. And lead-to-appointment booking rates typically range from 2 to 12%. Ours was 67%.',
    },

    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Video testimonial
    {
        _type: 'videoEmbed',
        _key: generateKey(),
        url: 'https://fast.wistia.net/embed/iframe/hr0yfppjnl',
        caption: 'Laiz shares her experience working with RSL/A',
        orientation: 'vertical',
    },

    // Client testimonial
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'I tried for months to rent my salon space and nothing worked. After Rahul and RSL/A, in just a few months both my rooms were filled. Now I don\'t stress about rent anymore.',
        author: 'Laiz',
        role: 'Owner, Casagrande Salon',
    },

    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Tech Stack
    {
        _type: 'techStack',
        _key: generateKey(),
        tools: [
            { _key: generateKey(), name: 'Meta Ads (Facebook/Instagram)' },
            { _key: generateKey(), name: 'GoHighLevel CRM', url: 'https://www.gohighlevel.com/?fp_ref=rahul-lalia' },
            { _key: generateKey(), name: 'SMS Automation' },
            { _key: generateKey(), name: 'Email Sequences' },
            { _key: generateKey(), name: 'Calendar Booking' },
            { _key: generateKey(), name: 'Lead Scoring' },
        ],
    },

    // Tenant update
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'Update',
        content: 'Both tenants are still in their suites and going strong.',
    },

    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Closing CTA
    textBlock('Your Vacant Space Is Costing You Thousands Every Month', 'h2'),

    textBlock('Whether it is salon suites, office space, or rental units, empty rooms are burning money. Every month of vacancy is revenue that someone else is capturing.'),

    textBlock('We build targeted ad and automated nurture systems that fill vacancies fast and keep them filled. Without requiring your time or attention.'),

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Fill Your Vacancies',
        url: '/#contact',
        style: 'primary',
    },
];

// ============================================
// FAQ Updates
// ============================================

const faqSchema = [
    {
        _key: generateKey(),
        question: 'How long had the salon suites been vacant?',
        answer: 'The two suites had been vacant for approximately six months before RSL/A was brought in. Previous marketing attempts including social media posts and boosted ads had not generated any signed leases.',
    },
    {
        _key: generateKey(),
        question: 'What was the total marketing investment?',
        answer: 'The total ad spend was $600 on Meta Ads (Facebook and Instagram). RSL/A worked on a performance-based model, only earning compensation after securing year-long tenants. The $600 investment generated $36,000 in annual rental income, a 60X return on ad spend.',
    },
    {
        _key: generateKey(),
        question: 'What were the conversion rates at each stage?',
        answer: 'The campaign reached approximately 6,000 people and generated 30 qualified leads at about $20 per lead. 67% of leads booked a salon tour (20 out of 30). 50% of those who booked showed up (10 out of 20). 20% of tours converted to signed leases (2 out of 10). Both suites were filled within 90 days.',
    },
    {
        _key: generateKey(),
        question: 'What tools were used for this campaign?',
        answer: 'Meta Ads for hyper-targeted advertising to licensed beauty professionals in Manhattan. GoHighLevel CRM for lead capture, automated SMS and email sequences, tour scheduling, and pipeline management. The entire nurture process was automated so the salon owner did not need to manually follow up with any leads.',
    },
];

// ============================================
// EXECUTE
// ============================================

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

    try {
        // Update structured fields + content + FAQ
        await client.patch(caseStudy._id)
            .set({
                tldr: structuredFields.tldr,
                keyTakeaways: structuredFields.keyTakeaways,
                problemStatement: structuredFields.problemStatement,
                solutionApproach: structuredFields.solutionApproach,
                resultsOutcome: structuredFields.resultsOutcome,
                servicesUsed: structuredFields.servicesUsed,
                content: enhancedContent,
                faqSchema: faqSchema,
            })
            .commit();

        console.log('✅ Case study updated successfully!');
        console.log(`   Structured fields: 6 updated`);
        console.log(`   Content blocks: ${enhancedContent.length}`);
        console.log(`   FAQ items: ${faqSchema.length}`);
        console.log(`\nView at: https://rsla.io/work/${slug}`);
        console.log(`Markdown: https://rsla.io/api/work/${slug}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}

rewriteCaseStudy().catch(console.error);
