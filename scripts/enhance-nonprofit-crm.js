/**
 * Enhance nonprofit-crm-volunteer-automation case study with rich content elements
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/enhance-nonprofit-crm.js
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
    textBlock('The Challenge: 2,000 Volunteers Scattered Across 15 Databases', 'h2'),

    richBlock([
        plain('This international nonprofit runs disaster relief and humanitarian programs across 15 countries. Their volunteer army of '),
        bold('2,000+'),
        plain(' was their greatest asset and their biggest operational nightmare. Data lived in Google Sheets, email lists, and local chapter databases. Onboarding a single volunteer consumed 3-5 hours of manual work.'),
    ]),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'Why This Matters',
        content: 'When disaster strikes, every hour counts. If you can\'t quickly identify and deploy volunteers with the right skills to the right location, lives are at stake. Fragmented data isn\'t just inefficient—it\'s a mission failure waiting to happen.',
    },

    textBlock('The operational bleeding was severe:', 'h3'),

    ...bulletList([
        [bold('Database chaos:'), plain(' 15 regional chapters maintained separate lists with duplicates, conflicts, and data rot everywhere')],
        [bold('Manual onboarding paralysis:'), plain(' Background checks, training, and scheduling required 100% human intervention')],
        [bold('Volunteer leakage:'), plain(' No follow-up automation meant enthusiastic signups vanished into the void')],
        [bold('Compliance exposure:'), plain(' Inconsistent records created liability gaps in sensitive humanitarian work')],
        [bold('Reporting death march:'), plain(' Quarterly funder reports required weeks of manual data archaeology')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Fragmented volunteer data isn\'t an efficiency problem. It\'s a mission failure waiting to happen. When disaster strikes and you can\'t deploy the right people fast, lives are at stake. Unified systems aren\'t overhead; they\'re infrastructure.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Unify Your Operations',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: We Built a Self-Running Volunteer Operations System', 'h2'),

    textBlock('We architected a comprehensive volunteer management platform in GoHighLevel, creating a single source of truth, automated onboarding pipelines, and intelligent matching between volunteer skills and urgent program needs.'),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'The Platform Choice',
        content: 'GoHighLevel isn\'t just for marketing agencies. Its workflow automation, form building, and CRM capabilities make it ideal for complex volunteer management at a fraction of specialized nonprofit software costs.',
    },

    textBlock('Phase 1: Unified All 15 Databases Into One CRM', 'h3'),

    ...bulletList([
        'Consolidated 2,000+ volunteer records from 15 regional databases into a single, clean system',
        'Eliminated duplicates and established data quality standards that prevent future rot',
        'Engineered custom fields for skills, certifications, availability, languages, and regional assignments',
        'Configured role-based access so chapter leads manage locally while HQ maintains global visibility',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 2: Automated the Entire Onboarding Pipeline', 'h3'),

    ...bulletList([
        [bold('Smart intake forms:'), plain(' Conditional logic routes volunteers based on type, location, and availability')],
        [bold('Background check triggers:'), plain(' Automated verification requests with status tracking')],
        [bold('Training delivery:'), plain(' Sequential email courses with embedded video, quizzes, and progress gates')],
        [bold('AI-powered scheduling:'), plain(' Orientation booking integrated with chapter calendars')],
        [bold('Document automation:'), plain(' Waivers, NDAs, and program-specific forms delivered and tracked automatically')],
        [bold('Personalized welcome sequences:'), plain(' Custom journeys based on volunteer interests and capacity')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 3: Deployed Engagement & Rapid-Response Automation', 'h3'),

    ...bulletList([
        [bold('Skill-based matching:'), plain(' When emergencies hit, the system identifies qualified volunteers by skills, location, and availability in seconds')],
        [bold('Re-engagement campaigns:'), plain(' Dormant volunteers receive personalized outreach based on their history')],
        [bold('Recognition automation:'), plain(' Thank-you messages, milestone celebrations, and impact reports fire automatically')],
        [bold('Growth pathing:'), plain(' Suggested training based on volunteer progression and program needs')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 4: Built Real-Time Reporting Infrastructure', 'h3'),

    ...bulletList([
        'Live dashboards tracking volunteer hours, program participation, and geographic distribution',
        'One-click quarterly reports for grant applications and board meetings with no manual compilation',
        'Retention analytics identifying at-risk volunteers before they disengage',
        'Impact tracking tied directly to volunteer contributions',
    ]),

    // Tech Stack callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Tech Stack',
        content: 'GoHighLevel CRM, conditional forms, email/SMS automation, calendar integration, custom dashboards, role-based access control',
    },

    // Client testimonial
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Before RSL/A, onboarding a single volunteer took our coordinator 3-5 hours. Now it\'s completely automated, volunteers complete everything on their own, and we only step in for the final orientation call. We eliminated a full-time position and redirected that budget to direct program services. More importantly, when disaster strikes, we can deploy the right volunteers in minutes instead of days.',
        author: 'Operations Director',
        role: 'International Humanitarian Nonprofit',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: $40K Freed. 95% Onboarding Automated. 3x Faster Deployment.', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '$40K', label: 'Redirected to Programs' },
            { _key: generateKey(), value: '95%', label: 'Onboarding Automated' },
            { _key: generateKey(), value: '3X', label: 'Faster Deployment' },
            { _key: generateKey(), value: '42%', label: 'Retention Increase' },
        ],
    },

    textBlock('Within 90 days:'),

    ...bulletList([
        [bold('$40,000 redirected to programs:'), plain(' Eliminated full-time coordinator position so funds now serve the mission directly')],
        [bold('100% database unification:'), plain(' All 2,000+ volunteers in one CRM with complete history and certifications')],
        [bold('95% onboarding automation:'), plain(' From 3-5 hours of manual work to 15 minutes of human review per volunteer')],
        [bold('3x faster emergency deployment:'), plain(' Volunteer mobilization reduced from days to hours')],
        [bold('42% retention increase:'), plain(' Automated engagement workflows kept volunteers active and committed')],
        [bold('80% reporting time eliminated:'), plain(' From 2 weeks of manual compilation to 2 hours of data export')],
        [bold('Zero compliance incidents:'), plain(' Automated record-keeping eliminated every liability gap')],
    ]),

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'Mission Impact',
        content: 'Every dollar saved on administration is a dollar deployed to disaster relief. Every hour saved on data entry is an hour spent coordinating aid. Automation in nonprofits isn\'t about efficiency—it\'s about impact.',
    },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Automation in nonprofits isn\'t about replacing human connection. It\'s about freeing humans for mission-critical work. Every hour saved on data entry is an hour spent changing lives.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Closing
    textBlock('Your Spreadsheets Are Stealing From Your Mission', 'h2'),

    textBlock('Every hour spent on volunteer data entry is an hour not spent serving your cause. We build self-running volunteer management systems that let your team focus on what matters.'),

    // Final CTA
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Automate Your Operations',
        url: '/#contact',
        style: 'primary',
    },
];

async function enhanceCaseStudy() {
    const slug = 'nonprofit-crm-volunteer-automation';

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
