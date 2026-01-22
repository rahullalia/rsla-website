/**
 * Enhance iot-manufacturing-robot-tracking case study with rich content elements
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/enhance-iot-manufacturing.js
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
    textBlock('The Challenge: Millions in Robots, Zero Visibility', 'h2'),

    richBlock([
        plain('Factories of Future was deploying autonomous mobile robots (AMRs) for one of the region\'s largest automotive manufacturers. '),
        bold('Multi-million dollar robots'),
        plain(' handling material transport across factory floors, and operations teams couldn\'t see any of them. No centralized monitoring. No real-time position data. No status visibility.'),
    ]),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Smart Factory Paradox',
        content: 'Manufacturers invest millions in autonomous equipment, then manage it with spreadsheets and radio calls. Without real-time visibility, "smart" factories are just expensive blind spots.',
    },

    textBlock('The operational blind spots:', 'h3'),

    ...bulletList([
        [bold('Zero real-time tracking:'), plain(' No visibility into robot positions, tasks, or states')],
        [bold('Siloed vendor systems:'), plain(' AMR vendor\'s proprietary interface incompatible with Twinzo digital twin platform')],
        [bold('Multi-plant chaos:'), plain(' Multiple facilities with different coordinate systems and no unified view')],
        [bold('Enterprise security requirements:'), plain(' Production floor IoT demanded robust per-device authentication')],
        [bold('Performance demands:'), plain(' Factory monitoring needed near-instantaneous updates (10Hz or faster)')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'In smart manufacturing, real-time visibility isn\'t a nice-to-have. It\'s the foundation of operational efficiency. If you can\'t see your factory floor in real-time, you\'re not running a smart factory. You\'re guessing.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'End the Guessing',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: We Architected Bidirectional Industrial IoT Integration', 'h2'),

    textBlock('We engineered bidirectional integration between the Hi-tech AMR vendor\'s control system and the manufacturer\'s Twinzo digital twin platform. MQTT for real-time data streaming. REST APIs for command-and-control. Multi-plant support with secure per-device authentication.'),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Why Hybrid Protocols',
        content: 'MQTT excels at high-frequency streaming (position updates 10x/second). REST excels at reliable commands (start, stop, reroute). Using both gives you real-time visibility AND reliable control.',
    },

    textBlock('Phase 1: Designed Hybrid Protocol Architecture', 'h3'),

    ...bulletList([
        'Architected MQTT + REST hybrid: MQTT for high-frequency position data, REST for control commands',
        'Collaborated with Hi-tech AMR vendor to map their data format and API capabilities',
        'Engineered message broker infrastructure supporting 10Hz real-time position streaming',
        'Built failover mechanisms handling network interruptions and broker downtime gracefully',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 2: Deployed OAuth 2.0 & Multi-Plant Support', 'h3'),

    ...bulletList([
        'Implemented OAuth 2.0 per-device authentication for secure AMR-to-platform communication',
        'Constructed credential management system for onboarding and token rotation',
        'Built plant-specific configuration layer handling different coordinate systems and layouts',
        'Engineered coordinate transformation pipeline mapping AMR positions to digital twin coordinates',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 3: Engineered Real-Time Streaming & Visualization', 'h3'),

    ...bulletList([
        'Built MQTT subscriber handling 10Hz position updates from multiple AMRs simultaneously',
        'Constructed data normalization layer for vendor-specific message formats',
        'Integrated with Twinzo platform for real-time robot visualization on factory layouts',
        'Implemented status tracking: battery levels, task assignments, error states',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 4: Created Documentation & Vendor Onboarding', 'h3'),

    ...bulletList([
        'Authored comprehensive API integration documentation for AMR vendors',
        'Wrote step-by-step onboarding guides with code examples',
        'Developed troubleshooting playbook for common integration issues',
        'Conducted technical training sessions with client operations and AMR vendor engineers',
    ]),

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'Scalable Foundation',
        content: 'This integration became the foundation for the manufacturer\'s smart factory monitoring infrastructure. OAuth-based authentication and comprehensive documentation reduced vendor onboarding from weeks to days.',
    },

    // Tech Stack callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Tech Stack',
        content: 'MQTT (real-time streaming), REST APIs (control commands), OAuth 2.0 (per-device authentication), Twinzo digital twin, Python multi-threaded processing',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: Real-Time Visibility Across Multi-Plant Operations', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '10Hz', label: 'Update Rate' },
            { _key: generateKey(), value: '0', label: 'Downtime' },
            { _key: generateKey(), value: '97%', label: 'CAPTCHA Accuracy' },
            { _key: generateKey(), value: '∞', label: 'Scalability' },
        ],
    },

    textBlock('Live in production since August 2024:'),

    ...bulletList([
        [bold('10Hz real-time tracking:'), plain(' Position data updated 10 times per second for instantaneous visibility')],
        [bold('Multi-plant deployment:'), plain(' Single platform monitoring AMRs across all facilities')],
        [bold('Zero downtime:'), plain(' Failover mechanisms ensure continuous monitoring through network issues')],
        [bold('Enterprise-grade security:'), plain(' OAuth 2.0 per-device tokens eliminate vulnerabilities')],
        [bold('Vendor-agnostic architecture:'), plain(' New AMR vendors onboard in days, not weeks')],
        [bold('Infinite scalability:'), plain(' Add robots and plants without code changes')],
    ]),

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Industrial IoT integration isn\'t about connecting devices. It\'s about building secure, scalable infrastructure that works in production. Good architecture and documentation pay dividends every time you add a plant or vendor.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Closing
    textBlock('Your Factory Floor Is a Black Box', 'h2'),

    textBlock('If you\'re deploying IoT devices, robots, or sensors without real-time visibility, you\'re guessing, not managing. We build the integration infrastructure that turns black boxes into dashboards. Secure. Scalable. Production-ready.'),

    // Final CTA
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Illuminate Your Operations',
        url: '/#contact',
        style: 'primary',
    },
];

async function enhanceCaseStudy() {
    const slug = 'iot-manufacturing-robot-tracking';

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
