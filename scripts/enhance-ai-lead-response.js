/**
 * Enhance ai-lead-response-autoresponder case study with rich content elements
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/enhance-ai-lead-response.js
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
    textBlock('The Challenge: Every Minute of Silence Costs You Money', 'h2'),

    richBlock([
        plain('"Thank you for contacting us. We will respond within 24-48 business hours." You\'ve sent that email. And you\'ve received it. We all know what it really means: '),
        bold('nobody read your message'),
        plain(', you\'re in a queue, and your problem isn\'t a priority.'),
    ]),

    // Info callout with research
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Speed-to-Lead Research',
        content: 'Harvard Business Review found that leads who receive a response within 5 minutes are 21X more likely to convert than those contacted 30 minutes later. Every hour of delay decreases conversion by 10% (Drift).',
    },

    textBlock('The Lead Hemorrhage', 'h3'),

    ...bulletList([
        [bold('35% of web leads arrive outside business hours'), plain(' (evenings, weekends, holidays)')],
        [bold('Every hour of delay decreases conversion by 10%'), plain(' (Drift)')],
        [bold('60% of customers would rather wait for a human'), plain(' than receive a robotic auto-reply (Zendesk)')],
    ]),

    textBlock('The impossible choice: respond instantly with generic garbage (and turn people off), or respond personally hours later (and lose hot leads). Most businesses pick one poison or the other.'),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'Speed without personalization feels robotic. Personalization without speed loses deals. Traditional auto-replies fail at both. The market rewards businesses that crack this paradox and punishes those that don\'t.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Crack the Response Paradox',
        url: '/#contact',
        style: 'primary',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Solution Section
    textBlock('The Solution: We Engineered an AI That Actually Reads Every Email', 'h2'),

    richBlock([
        plain('We architected an intelligent email response system that doesn\'t just acknowledge receipt. It '),
        bold('reads, analyzes, and personalizes'),
        plain(' every reply in real-time. The AI extracts the sender\'s specific question, identifies their industry, and crafts a response that references what they actually asked about.'),
    ]),

    textBlock('The result: emails that feel human-written, delivered in 24 seconds, 24/7.'),

    // Tip callout
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'tip',
        title: 'The Dual-AI Approach',
        content: 'Two AI passes: First extracts the core question and intent. Second generates a personalized response. This separation ensures higher accuracy and more relevant replies.',
    },

    textBlock('Phase 1: Deployed 24/7 Inbox Surveillance', 'h3'),

    ...bulletList([
        'Configured Make.com to monitor inbox continuously via IMAP/Gmail connection',
        'Engineered smart filtering rules targeting contact form submissions and specific keywords',
        'Implemented instant trigger with typical 15-30 second response latency',
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 2: Deployed Dual-Stage AI Analysis', 'h3'),

    textBlock('Instead of canned responses, we engineered a two-pass AI system using OpenAI GPT-4:'),

    ...bulletList([
        [bold('First AI call (Intelligence Extraction):'), plain(' Reads email body, extracts core question, identifies inquiry category, determines urgency')],
        [bold('Second AI call (Response Generation):'), plain(' References specific question, provides relevant context, sets expectations, adds conversational touch')],
    ]),

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Phase 3: Engineered Psychological Timing', 'h3'),

    textBlock('Critical insight: instant replies (0-5 seconds) scream "bot." We engineered a 30-90 second random delay before sending.'),

    ...bulletList([
        [bold('Feels more human:'), plain(' Suggests someone actually read the message')],
        [bold('Creates perception of consideration:'), plain(' A 60-second delay implies thought, not automation')],
        [bold('Bypasses spam filters:'), plain(' Slight delays reduce automated flagging')],
    ]),

    // Tech Stack
    {
        _type: 'techStack',
        _key: generateKey(),
        tools: [
            { _key: generateKey(), name: 'Gmail / IMAP' },
            { _key: generateKey(), name: 'Make.com' },
            { _key: generateKey(), name: 'OpenAI GPT-4' },
        ],
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Results Section
    textBlock('The Results: Generic vs. Intelligent, Night and Day', 'h2'),

    // Stats Card
    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '24', label: 'Sec Response Time' },
            { _key: generateKey(), value: '24/7', label: 'Availability' },
            { _key: generateKey(), value: '21X', label: 'Conversion Lift' },
            { _key: generateKey(), value: '100%', label: 'Personalized' },
        ],
    },

    textBlock('Example 1: Service Inquiry', 'h3'),

    // Bad example
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'warning',
        title: 'Generic Auto-Reply (Bad)',
        content: '"Thank you for contacting RSL/A. We have received your message and will respond within 24-48 business hours."',
    },

    // Good example
    {
        _type: 'callout',
        _key: generateKey(),
        type: 'success',
        title: 'AI-Personalized Auto-Reply (Good)',
        content: '"Hi there! Thanks for reaching out about our GoHighLevel CRM services for your dental practice. We absolutely work with healthcare businesses. In fact, we\'ve helped several multi-location dental offices streamline their patient management and appointment systems using GHL. Someone from our team will reach out within 24-48 hours to discuss how we can help modernize your 3-location setup. Looking forward to connecting!"',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'dots' },

    textBlock('Why This Converts', 'h3'),

    ...bulletList([
        [bold('Specific acknowledgment:'), plain(' References "dental practice," "3 locations," "GoHighLevel"')],
        [bold('Relevant social proof:'), plain(' "We\'ve helped several dental offices" signals expertise')],
        [bold('Intelligent routing:'), plain(' Different team members for different inquiry types')],
        [bold('Conversational cadence:'), plain(' Reads like a human who quickly replied')],
        [bold('Trust signal:'), plain(' The sender knows their message was actually read')],
    ]),

    // Executive insight
    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: '"We got your message" vs. "We read your message about X and here\'s what happens next." The gap is massive. One feels robotic. The other feels attentive. Attentiveness = trust = conversion. The AI makes it possible at scale.',
        author: 'Executive Axiom',
        role: 'RSL/A',
    },

    // Divider
    { _type: 'divider', _key: generateKey(), style: 'line' },

    // Built For Section
    textBlock('Built For: Any Business Bleeding Leads to Slow Response', 'h2'),

    ...bulletList([
        [bold('Service Businesses:'), plain(' Agencies, consultants, freelancers losing evening/weekend leads')],
        [bold('E-commerce:'), plain(' Product questions, wholesale inquiries, partnership requests at scale')],
        [bold('Local Businesses:'), plain(' Dental offices, salons, contractors with after-hours form submissions')],
        [bold('SaaS Companies:'), plain(' Demo requests, support tickets, partnership inquiries 24/7')],
        [bold('Professional Services:'), plain(' Law firms, accountants, advisors who can\'t always answer immediately')],
    ]),

    // Psychology section
    textBlock('The Psychology: Why "Smart" Auto-Replies Convert', 'h2'),

    richBlock([
        plain('Here\'s the fascinating part: customers often '),
        bold('know'),
        plain(' it\'s automated. But because it references their specific question, perception shifts entirely.'),
    ]),

    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'The Perception Shift',
        content: 'Generic auto-reply: "They didn\'t read my email. I\'m just a number." Personalized auto-reply: "Someone quickly read my message and sent a thoughtful response. They\'re paying attention." Feeling heard matters more than knowing whether a human or AI did the hearing.',
    },

    // Closing
    textBlock('Your Leads Are Cooling While You Read This', 'h2'),

    textBlock('Every minute without a response costs you money. Every generic auto-reply erodes trust. This system solves both simultaneously.'),

    // Final CTA
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Stop Bleeding Leads',
        url: '/#contact',
        style: 'primary',
    },
];

async function enhanceCaseStudy() {
    const slug = 'ai-lead-response-autoresponder';

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
