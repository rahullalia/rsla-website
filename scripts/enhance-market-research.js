/**
 * Enhance market-research-data-scraping-automation case study with rich content elements
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/enhance-market-research.js
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
    textBlock('The Challenge: $136K Bleeding Out Every Year on Manual Data Entry', 'h2'),

    richBlock([
        bold('Eighty people. Four months. One spreadsheet at a time.'),
        plain(' That was the brutal reality for a national research firm running one of the region\'s largest readership surveys. They weren\'t just inefficient. They were trapped in a cost spiral that threatened the entire operation.'),
    ]),

    // Info callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Scale of the Problem',
        content: '320 person-months of work annually. That\'s enough labor to fund an entire department—spent copying data from government databases into spreadsheets.',
    },

    textBlock('The bleeding was severe:', 'h3'),

    ...bulletList([
        [bold('Crippling labor drain:'), plain(' 320 person-months of work annually, enough to fund an entire department')],
        [bold('CAPTCHA fortress:'), plain(' Government databases weaponized image CAPTCHAs that blocked every automation attempt')],
        [bold('Data rot:'), plain(' Manual entry spawned typos, formatting chaos, and ghost records that corrupted downstream analysis')],
        [bold('Glacial throughput:'), plain(' 15-20 minutes per record, a pace that guaranteed missed deadlines')],
        [bold('Scaling death spiral:'), plain(' Every new data source multiplied costs linearly with no end in sight')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'If your core operation requires hundreds of person-months of manual labor, you\'re not running a business. You\'re subsidizing inefficiency. Automation isn\'t a nice-to-have. It\'s oxygen.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Stop the Bleeding',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: We Engineered a 24/7 Data Extraction Machine', 'h2'),

    textBlock('We architected a military-grade automation platform that combined distributed web scraping with AI-powered OCR to crack CAPTCHAs and extract data at industrial scale. The system ran on AWS infrastructure with self-healing capabilities and zero human intervention required.'),

    // Warning callout about CAPTCHA
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'warning',
        title: 'The CAPTCHA Challenge',
        content: 'Government databases use image CAPTCHAs specifically designed to block automation. We achieved 97% solve rate using dual-engine OCR with preprocessing—matching or exceeding human accuracy.',
    },

    textBlock('Phase 1: Architected Scalable Cloud Infrastructure', 'h3'),

    ...bulletList([
        'Engineered distributed scraping architecture using Selenium Hub for parallel browser orchestration',
        'Deployed auto-scaling EC2 clusters that spin up instantly during peak extraction windows',
        'Integrated S3 for bulletproof data persistence and CloudWatch for real-time surveillance',
        'Constructed multi-threaded Python engine delivering 50x raw performance gains',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 2: Eliminated the CAPTCHA Barrier with AI', 'h3'),

    ...bulletList([
        'Deployed dual-engine OCR combining Tesseract and EasyOCR for maximum accuracy',
        'Engineered preprocessing pipeline with contrast enhancement and noise elimination',
        'Built confidence scoring system that automatically retries ambiguous CAPTCHAs',
        'Achieved 97% solve rate, matching or exceeding human accuracy',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 3: Constructed High-Throughput Data Pipeline', 'h3'),

    ...bulletList([
        'Engineered intelligent queue management handling 4,000 records per hour',
        'Implemented exponential backoff retry logic that never loses a record',
        'Built validation layer that catches data corruption before it reaches the database',
        'Created checkpoint system enabling instant resume from any failure point',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 4: Built Self-Healing Quality Assurance', 'h3'),

    ...bulletList([
        'Implemented comprehensive error taxonomy (network, CAPTCHA, validation) with auto-routing',
        'Constructed real-time admin dashboard tracking extraction velocity and error rates',
        'Deployed automated QA comparing extracted data against validation patterns',
        'Configured intelligent alerting that escalates only true emergencies',
    ]),

    // Tech Stack callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'Tech Stack',
        content: 'AWS (EC2, S3, Lambda, CloudWatch), Selenium Hub, Python (multi-threaded), Tesseract + EasyOCR, PIL image preprocessing, Message queues',
    },

    // Client testimonial
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Engaging Siddharth for a critical software-automation project proved invaluable. He invested the time to understand our manual processes end-to-end and delivered a robust, efficient solution that saved us substantial time and resources. He\'s proactive, detail-oriented, and a fantastic collaborator.',
        author: 'Ranjit M.',
        role: 'Head of Projects & Technology, Insight To Strategy',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: From 4 Months to 2 Weeks. From 80 People to Zero.', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '$136K', label: 'Annual Savings' },
            { _key: generateKey(), value: '87.5%', label: 'Time Reduction' },
            { _key: generateKey(), value: '1000X', label: 'Throughput Gain' },
            { _key: generateKey(), value: '97%', label: 'CAPTCHA Accuracy' },
        ],
    },

    textBlock('The platform went live and immediately obliterated the old way of working:'),

    ...bulletList([
        [bold('$136,000 recovered annually:'), plain(' Slashed labor from 320 person-months to 40, an 87.5% reduction')],
        [bold('4 months → 2 weeks:'), plain(' Compressed the entire extraction cycle by 87.5%')],
        [bold('1,000x throughput multiplier:'), plain(' From 4 records/hour manually to 4,000 records/hour automated')],
        [bold('97% machine accuracy:'), plain(' AI matched or beat human performance on CAPTCHA solving')],
        [bold('Zero manual CAPTCHAs:'), plain(' Eliminated the single most soul-crushing bottleneck entirely')],
        [bold('10x headroom:'), plain(' Infrastructure scales to 10x current volume with no additional staff')],
        [bold('Reusable asset:'), plain(' Platform now deployed across multiple data collection initiatives')],
    ]),

    // Success callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'The Compound Effect',
        content: 'Six-figure savings from one automation project isn\'t exceptional—it\'s expected when you target the right process. The platform is now a reusable asset deployed across multiple data collection initiatives.',
    },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Six-figure savings from one automation project isn\'t exceptional. It\'s expected when you target the right process. The best automation investments pay back in weeks, not years.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Closing
    textBlock('Your Manual Process Is Costing You Six Figures', 'h2'),

    textBlock('If your team burns hundreds of hours on manual data collection, web scraping, or document processing, you\'re leaving money on the table. We engineer automation platforms that work 24/7 at a fraction of what you\'re paying now.'),

    // Final CTA
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Calculate Your Savings',
        url: '/#contact',
        style: 'primary',
    },
];

async function enhanceCaseStudy() {
    const slug = 'market-research-data-scraping-automation';

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
