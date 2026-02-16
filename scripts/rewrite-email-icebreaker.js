/**
 * Rewrite ai-cold-email-personalization case study
 *
 * Real story: Built for RSL/A's own outreach. Emails were landing in spam.
 * 3-module Make.com automation generates personalized icebreakers using
 * LinkedIn enrichment data. 900-1500 emails/day, Mon-Sat.
 *
 * Voice: No em dashes. No exclamation marks. Honest. Matter-of-fact.
 * Follow brandTone.md exactly.
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/rewrite-email-icebreaker.js
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

function bulletItem(parts) {
    return {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        level: 1,
        listItem: 'bullet',
        markDefs: parts.filter(p => p.markDef).map(p => p.markDef),
        children: parts.map(p => ({
            _type: 'span',
            _key: generateKey(),
            text: p.text,
            marks: p.marks || [],
        })),
    };
}

function callout(type, title, content) {
    return { _type: 'callout', _key: generateKey(), type, title, content };
}

function divider(style = 'line') {
    return { _type: 'divider', _key: generateKey(), style };
}

function statsCard(stats) {
    return {
        _type: 'statsCard',
        _key: generateKey(),
        stats: stats.map(s => ({ _key: generateKey(), ...s })),
    };
}

function testimonial(quote, author, role) {
    return { _type: 'testimonial', _key: generateKey(), quote, author, role };
}

function ctaButton(text, url, style = 'primary') {
    return { _type: 'ctaButton', _key: generateKey(), text, url, style };
}

function techStack(tools) {
    return {
        _type: 'techStack',
        _key: generateKey(),
        tools: tools.map(t => ({ _key: generateKey(), ...t })),
    };
}

function caseStudyImage(assetRef, alt, caption, size = 'full') {
    return {
        _type: 'caseStudyImage',
        _key: generateKey(),
        asset: {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetRef },
        },
        alt,
        caption,
        size,
    };
}

function gatedResource(title, description, downloadUrl, buttonText) {
    return {
        _type: 'gatedResource',
        _key: generateKey(),
        title,
        description,
        downloadUrl,
        buttonText,
    };
}

// ============================================================
// CONTENT
// ============================================================

const content = [
    // ── PROBLEM ──
    textBlock('Our Cold Emails Were Landing in Spam', 'h2'),

    textBlock('We send between 900 and 1,500 cold emails a day. Monday through Saturday. At that volume, personalization was never an option. Every message went out with the same template, the same opening line, the same forgettable intro.'),

    textBlock('The inbox placement tests told the story. Emails were landing in spam folders. Prospects never saw them. The ones that did get through looked exactly like what they were: mass outreach from a stranger.'),

    callout('info', 'The Cold Email Problem', 'Generic cold emails get flagged by spam filters and ignored by humans. Personalization fixes both problems, but manually researching 1,200 prospects a day would take a team of 10 working full-time. We needed a third option.'),

    divider('dots'),

    textBlock('The Math We Were Ignoring', 'h3'),

    bulletItem([
        { text: '1,200 emails/day average, ', marks: ['strong'] },
        { text: '6 days a week' },
    ]),
    bulletItem([
        { text: 'Manual personalization: ', marks: ['strong'] },
        { text: '8 minutes per email (LinkedIn research, company context, icebreaker writing)' },
    ]),
    bulletItem([
        { text: 'At that rate: ', marks: ['strong'] },
        { text: '160 hours per day. Physically impossible.' },
    ]),
    bulletItem([
        { text: 'The alternative: ', marks: ['strong'] },
        { text: 'Generic templates that spam filters catch and prospects delete.' },
    ]),

    textBlock('We were stuck between two bad options. Send garbage at scale, or send quality to nobody. So we built a system that does both.'),

    ctaButton('Build a System Like This', '/#contact'),

    divider('line'),

    // ── SOLUTION ──
    textBlock('A 3-Step Automation Built in 90 Minutes', 'h2'),

    textBlock('The entire system is three modules in Make.com. It reads from a Google Sheet, generates a personalized icebreaker using GPT, and writes it back. That is it.'),

    caseStudyImage(
        'image-1cc547a7fbca001e3e8d03f04bb7b8bdde8d145a-1316x527-webp',
        'Make.com automation workflow showing three modules: Get Leads from Google Sheets, Generate Icebreaker with GPT, Update row with Icebreaker',
        'The full automation. Three modules. Google Sheets, GPT, Google Sheets.',
        'large'
    ),

    divider('dots'),

    textBlock('Step 1: Pull Leads from Google Sheets', 'h3'),

    textBlock('The scenario runs on a schedule, pulling every lead that does not have an icebreaker yet. The sheet contains enrichment data from whatever source you use. Apollo, LinkedIn Sales Navigator, Clay, or any lead database.'),

    textBlock('The more data you have, the better the output. At minimum, you need:'),

    bulletItem([
        { text: 'LinkedIn headline ', marks: ['strong'] },
        { text: '(their self-description, usually their role and what they care about)' },
    ]),
    bulletItem([
        { text: 'LinkedIn summary/description ', marks: ['strong'] },
        { text: '(longer context about their experience and focus areas)' },
    ]),
    bulletItem([
        { text: 'Company name and industry ', marks: ['strong'] },
        { text: '(for relevance)' },
    ]),

    textBlock('Optional but helpful: job title, company size, recent posts, tech stack, funding status. Each additional data point makes the icebreaker sharper.'),

    divider('dots'),

    textBlock('Step 2: Generate the Icebreaker with AI', 'h3'),

    textBlock('The GPT module receives the enrichment data and a prompt that instructs it to write a 2-3 sentence opener. The prompt tells it to reference something specific from their LinkedIn profile and connect it naturally to why you are reaching out.'),

    callout('tip', 'The Formula', 'The icebreaker references something from their profile (a role change, a stated priority, a company milestone) and bridges to your value proposition. It should read like you spent 5 minutes researching them. The AI does it in under a second.'),

    textBlock('The GPT module can be swapped for any LLM. Claude, Gemini, Llama. The prompt structure matters more than the model. We use GPT because Make.com has a native module for it, but the logic is portable.'),

    divider('dots'),

    textBlock('Step 3: Write It Back', 'h3'),

    textBlock('The generated icebreaker writes back to the same Google Sheet row. The sales workflow picks it up from there. Copy it into your email tool, merge it into your sequences, or feed it into your sending platform automatically.'),

    textBlock('No new tools to learn. No new dashboards. The icebreaker just appears in the column next to the lead.'),

    techStack([
        { name: 'Make.com', url: 'https://www.make.com/en/register?pc=lalia', promo: 'Free tier available' },
        { name: 'Google Sheets', url: 'https://docs.google.com/' },
        { name: 'OpenAI GPT-4', url: 'https://chatgpt.com/' },
        { name: 'Apollo.io', url: 'https://apollo.io/' },
        { name: 'LinkedIn Sales Navigator', url: 'https://business.linkedin.com/' },
        { name: 'Clay', url: 'https://www.clay.com/' },
    ]),

    gatedResource(
        'Make.com Blueprint',
        'Import this directly into Make.com and connect your Google Sheet. The entire 3-step scenario, ready to run.',
        '/downloads/case-studies/email-ice-breaker/blueprint.json',
        'Download the Blueprint'
    ),

    divider('line'),

    // ── RESULTS ──
    textBlock('What Changed', 'h2'),

    statsCard([
        { value: '1,200+', label: 'Emails Personalized/Day' },
        { value: '90 min', label: 'Total Build Time' },
        { value: '~$0', label: 'Per-Email Cost' },
        { value: '6 days/wk', label: 'Runs Automatically' },
    ]),

    textBlock('Before this automation, every cold email was identical. The same opener, the same pitch, the same result: spam folder or delete.'),

    textBlock('After: every email references something specific about the prospect. Their LinkedIn headline, their role, their company. It reads like someone actually looked them up before hitting send. Because technically, something did.'),

    divider('dots'),

    textBlock('Deliverability', 'h3'),

    textBlock('The inbox placement problem largely went away. Personalized emails look different to spam filters. Unique content in each message, specific references, natural language. Mailbox providers stopped flagging us.'),

    textBlock('Response Rates', 'h3'),

    textBlock('People reply when they feel seen. An email that mentions their actual LinkedIn headline, their actual company, their actual role gets read differently than "Hi {first_name}, I noticed your company is growing." The response rate went up because the emails stopped looking like mass outreach.'),

    textBlock('The Time Equivalent', 'h3'),

    textBlock('If we had done this manually at 8 minutes per email across 1,200 emails a day, that is 160 hours of research. Every single day. The automation handles it in the background while we do actual work.'),

    callout('success', 'The Real Win', 'This is not about saving time on something we were already doing. We were not personalizing emails before because it was impossible at our volume. The automation made personalization possible for the first time. That is the difference.'),

    divider('dots'),

    textBlock('Before and After', 'h3'),

    testimonial(
        'Hi {first_name}, I came across your profile and thought we could connect. We help companies like yours improve their marketing with AI automation. Would you be open to a quick chat?',
        'Before: Generic Template',
        'Same message to every prospect'
    ),

    testimonial(
        'Hi Sarah, I saw your post about scaling outbound at TechFlow after the Series B. Hiring 4 SDRs is one way to hit that target. We built a system for a similar-stage SaaS company that personalized 1,200 emails a day without adding headcount. Happy to share the playbook if it is useful.',
        'After: AI-Generated Icebreaker',
        'References her LinkedIn activity, company stage, and hiring signals'
    ),

    textBlock('Same prospect. Two completely different emails. The first gets deleted. The second gets a reply.'),

    divider('line'),

    // ── WHO THIS IS FOR ──
    textBlock('Who This Works For', 'h2'),

    textBlock('Anyone sending cold emails who has hit the wall between quality and volume:'),

    bulletItem([
        { text: 'B2B sales teams ', marks: ['strong'] },
        { text: 'sending 50 to 5,000 emails a day' },
    ]),
    bulletItem([
        { text: 'Agencies ', marks: ['strong'] },
        { text: 'running outbound for multiple clients' },
    ]),
    bulletItem([
        { text: 'Recruiters ', marks: ['strong'] },
        { text: 'reaching out to passive candidates' },
    ]),
    bulletItem([
        { text: 'SaaS founders ', marks: ['strong'] },
        { text: 'doing their own sales outreach' },
    ]),
    bulletItem([
        { text: 'Consultants ', marks: ['strong'] },
        { text: 'building pipeline without a sales team' },
    ]),

    textBlock('If you have a lead list in a spreadsheet and you are sending the same email to everyone on it, this system fixes that in 90 minutes.'),

    ctaButton('Build Your Icebreaker System', '/#contact'),
];

// ============================================================
// STRUCTURED FIELDS
// ============================================================

const doc = {
    title: 'How We Personalize 1,200 Cold Emails a Day with a 3-Step Automation',
    tag: 'AI Automation',
    description: 'Our cold emails were landing in spam. We built a 90-minute Make.com automation that generates personalized icebreakers using LinkedIn data for 1,200+ emails daily.',
    metrics: [
        { _key: generateKey(), value: '1,200+', label: 'Emails/Day' },
        { _key: generateKey(), value: '90 min', label: 'Build Time' },
    ],
    clientName: 'RSL/A (Internal)',
    industry: 'agency',
    timeframe: 1,
    servicesUsed: ['ai-automation'],
    annualSavings: null,
    tldr: 'We send 900 to 1,500 cold emails a day. They were all generic, and most landed in spam. We built a 3-module Make.com automation in 90 minutes that reads LinkedIn data from a Google Sheet, generates a personalized icebreaker with GPT, and writes it back. Deliverability improved, response rates went up, and every email now references something specific about the prospect.',
    keyTakeaways: [
        'Personalization is a deliverability fix, not just a quality improvement. Unique content in each email keeps you out of spam folders.',
        'The automation is three steps: pull lead data, generate icebreaker with AI, write it back. Build time is under two hours.',
        'LinkedIn headline and description are the minimum data points needed. More enrichment data means sharper icebreakers.',
        'The GPT module is swappable. Claude, Gemini, or any LLM works. The prompt structure matters more than the model.',
        'Start with your existing lead list. No new tools required beyond Make.com and your Google Sheet.',
    ],
    problemStatement: 'We send between 900 and 1,500 cold emails a day, Monday through Saturday. At that volume, personalization was never an option. Every message went out generic. Inbox placement tests confirmed what we suspected: most emails were landing in spam. The ones that got through looked like mass outreach and got deleted. Manual personalization at 8 minutes per email would require 160 hours of research every day. We needed to make personalization possible at a scale where it previously was not.',
    solutionApproach: 'We built a 3-module automation in Make.com in about 90 minutes. Module 1 pulls leads from a Google Sheet that lack an icebreaker. Module 2 feeds their LinkedIn headline, description, company, and role into GPT with a prompt that generates a 2-3 sentence personalized opener. Module 3 writes the icebreaker back to the sheet. The scenario runs on a schedule. The sales workflow picks up the icebreakers from the sheet and merges them into outgoing emails. No new tools, no new dashboards.',
    resultsOutcome: 'Every cold email now references something specific about the prospect. Their LinkedIn headline, their role, their company context. Inbox placement improved because unique personalized content looks different to spam filters than identical templates. Response rates went up because prospects can tell when someone actually looked at their profile before reaching out. The system processes 1,200+ emails a day, runs 6 days a week, and took 90 minutes to build.',
    seo: {
        metaTitle: 'How We Personalize 1,200 Cold Emails a Day | AI Automation Case Study',
        metaDescription: 'Our cold emails were landing in spam. A 90-minute Make.com automation now generates personalized icebreakers from LinkedIn data for 1,200+ emails daily.',
    },
    faqSchema: [
        {
            _key: generateKey(),
            question: 'How does AI cold email personalization work?',
            answer: 'A Make.com automation pulls lead data from a Google Sheet, feeds LinkedIn enrichment data (headline, description, company) into GPT, and writes a personalized 2-3 sentence icebreaker back to the sheet. The entire process runs automatically on a schedule.',
        },
        {
            _key: generateKey(),
            question: 'What tools do you need for AI email personalization?',
            answer: 'Make.com for automation, Google Sheets for your lead list, and an AI model (GPT, Claude, or Gemini) for generating icebreakers. Lead enrichment can come from Apollo, LinkedIn Sales Navigator, Clay, or any data provider.',
        },
        {
            _key: generateKey(),
            question: 'Does AI email personalization improve deliverability?',
            answer: 'Yes. Unique personalized content in each email looks different to spam filters than identical templates sent to thousands of recipients. Personalization helps emails reach the primary inbox instead of spam folders.',
        },
        {
            _key: generateKey(),
            question: 'How long does it take to set up AI cold email personalization?',
            answer: 'The Make.com automation takes about 90 minutes to build. You need a Google Sheet with lead data, a Make.com account, and an OpenAI API key. A free blueprint is available to import the scenario directly.',
        },
    ],
    content,
};

// ============================================================
// PUSH TO SANITY
// ============================================================

async function main() {
    const docId = 'case-study-ai-cold-email-personalization';

    console.log('Updating case study:', docId);
    console.log('Title:', doc.title);
    console.log('Content blocks:', content.length);

    const result = await client
        .patch(docId)
        .set({
            title: doc.title,
            tag: doc.tag,
            description: doc.description,
            metrics: doc.metrics,
            clientName: doc.clientName,
            industry: doc.industry,
            timeframe: doc.timeframe,
            servicesUsed: doc.servicesUsed,
            annualSavings: doc.annualSavings,
            tldr: doc.tldr,
            keyTakeaways: doc.keyTakeaways,
            problemStatement: doc.problemStatement,
            solutionApproach: doc.solutionApproach,
            resultsOutcome: doc.resultsOutcome,
            seo: doc.seo,
            faqSchema: doc.faqSchema,
            content: doc.content,
        })
        .commit();

    console.log('Updated successfully. Rev:', result._rev);
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
