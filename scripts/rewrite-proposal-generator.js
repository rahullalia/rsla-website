/**
 * Rewrite ai-proposal-generator-sales-workflow case study
 *
 * Real story: Built for RSL/A internally. Proposals took 1-3 hours because of
 * OCD-level formatting. Typeform → Make.com → Claude → Google Docs pipeline
 * now produces branded proposals in ~10 minutes. Started with PandaDocs ($65/mo),
 * switched to Google Docs to cut costs.
 *
 * Run: SANITY_API_TOKEN=xxx node scripts/rewrite-proposal-generator.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '36wenybq',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

function generateKey() {
    return Math.random().toString(36).substring(2, 12);
}

function block(text, style = 'normal', markDefs = []) {
    const children = [];
    if (typeof text === 'string') {
        children.push({ _type: 'span', _key: generateKey(), text, marks: [] });
    } else {
        // Array of span objects for mixed formatting
        children.push(...text);
    }
    return {
        _type: 'block',
        _key: generateKey(),
        style,
        markDefs,
        children,
    };
}

function span(text, marks = []) {
    return { _type: 'span', _key: generateKey(), text, marks };
}

function heading(text, level = 'h2') {
    return block(text, level);
}

function bulletList(items) {
    return items.map(item => ({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        markDefs: [],
        children: [{ _type: 'span', _key: generateKey(), text: item, marks: [] }],
    }));
}

function numberList(items) {
    return items.map(item => ({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: 'number',
        level: 1,
        markDefs: [],
        children: [{ _type: 'span', _key: generateKey(), text: item, marks: [] }],
    }));
}

// ========================================
// STRUCTURED FIELDS (top-level metadata)
// ========================================

const structuredFields = {
    title: 'How We Cut Proposal Time from 2 Hours to 10 Minutes with AI',
    tag: 'AI Automation & Workflow',
    description: 'We were spending 1-3 hours per proposal obsessing over formatting and design. A Typeform + Make.com + Claude pipeline now generates branded, client-ready proposals in about 10 minutes. 105 hours recovered annually.',

    metrics: [
        { _key: generateKey(), value: '105', label: 'Hours Saved/Year' },
        { _key: generateKey(), value: '92%', label: 'Time Reduction' },
    ],

    tldr: 'Proposals used to take 1-3 hours each because we obsessed over formatting, margins, and design consistency. We built a pipeline where a Typeform captures discovery call details, Make.com sends them to Claude for narrative generation, and the output populates a branded Google Docs template. Now it takes about 10 minutes. At roughly 5 proposals a month, that is 105 hours a year we got back.',

    keyTakeaways: [
        'Structure your intake form to capture the exact inputs AI needs. Garbage in, garbage out.',
        'Use AI for narrative generation, not just fill-in-the-blank. Claude writes persuasive problem/solution copy.',
        'Templates eliminate the perfectionism trap. Once the design is locked, every proposal looks professional.',
        'PandaDocs is great but $65/month adds up. Google Docs with a payment link follow-up works just as well.',
        'Build time was 2 hours. Break-even was the second proposal.',
    ],

    problemStatement: 'Every proposal was a time sink. Not because the content was hard, but because the formatting was. Margins, line spacing, section headers, making sure the design looked polished and consistent. That part alone could eat an hour. Then writing the actual narrative on top of it. Total time per proposal ranged from 1 to 3 hours depending on complexity. At roughly 5 proposals a month, that added up. And the real cost was not just time. It was the delay. A prospect finishes a discovery call excited, and then waits days for a proposal because you are buried in Google Docs adjusting bullet point indentation. Leads cool. Momentum dies. We were losing deals not because our proposals were bad, but because they took too long to deliver.',

    solutionApproach: 'We built a four-step pipeline using Typeform, Make.com, Claude, and Google Docs. After a discovery call, the intake form captures everything: prospect name, business summary, the problem they described, the solution we proposed, deliverables, timeline, and investment. Takes about 5 minutes to fill out. Make.com picks it up instantly and sends the structured data to Claude, which generates a proposal title, writes the problem and solution narratives, and formats deliverables into clear scope items. The output is structured JSON that flows directly into a branded Google Docs template. Same design, same margins, same professionalism every time.',

    resultsOutcome: 'Proposals now take about 10 minutes from discovery call to delivery. That is roughly a 92% reduction in time. At 5 proposals a month, we recover about 105 hours per year. The consistency improvement matters just as much. Every proposal now matches our brand standards automatically. No more rabbit holes over font sizes or section spacing. We also saved $65/month by switching from PandaDocs to Google Docs. The only trade-off is sending a separate payment link, which for us is fine.',

    industry: 'agency',
    servicesUsed: ['ai-automation'],
    timeframe: 1,
    category: 'AI Automation',
};

// ========================================
// CONTENT BLOCKS (portable text body)
// ========================================

const enhancedContent = [
    // --- THE PROBLEM ---
    heading('The Problem: Every Proposal Was a Production'),

    block('We are a two-person agency. When a discovery call goes well, the last thing you want is a 3-hour formatting session standing between you and a signed deal.'),

    block('But that is exactly what was happening. Every proposal turned into a design project. Margins had to be perfect. Section headers had to be consistent. The narrative had to sound polished without being generic. And because we care about how things look, we could not just slap text into a doc and send it.'),

    block('The process looked something like this:'),

    ...numberList([
        'Finish the discovery call. Take notes.',
        'Open a blank document or duplicate an old proposal.',
        'Rewrite the problem statement for this specific prospect.',
        'Write the solution narrative tailored to their situation.',
        'Format deliverables, timeline, and pricing.',
        'Obsess over design details for 30-60 minutes.',
        'Finally send it, sometimes a full day later.',
    ]),

    block('At 1-3 hours per proposal and roughly 5 a month, that is anywhere from 5 to 15 hours of production time. Not strategy time. Not sales time. Document formatting time.'),

    {
        _type: 'testimonial',
        _key: generateKey(),
        quote: 'I do not need a dedicated calendar block to create a proposal anymore. I just go in, fill a form, and that is it.',
        author: 'Rahul Lalia',
        role: 'Founder, RSL/A',
    },

    block('The worst part was the delay. A prospect finishes a call feeling excited about working together, and then waits a day or two for a proposal. Momentum dies. We were not losing deals because our work was bad. We were losing them because the paperwork was slow.'),

    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // --- THE SOLUTION ---
    heading('The Solution: Typeform + Make.com + Claude + Google Docs'),

    block('We needed a system that could take structured inputs from a discovery call and produce a branded, client-ready proposal without any manual formatting.'),

    // Workflow screenshot
    {
        _type: 'caseStudyImage',
        _key: generateKey(),
        asset: {
            _type: 'image',
            asset: { _type: 'reference', _ref: 'image-dfa8604e49e80f5f8496f0227c58666a79d600a2-1397x369-jpg' },
        },
        alt: 'Make.com workflow: Typeform trigger, Claude AI prompt, JSON parse, Google Docs output',
        caption: 'The full automation. Six modules. Typeform watches for submissions, Claude generates the proposal content, Google Docs produces the final document.',
        size: 'full',
    },

    block('The pipeline has four steps:'),

    heading('Step 1: Structured Intake via Typeform', 'h3'),

    // Typeform screenshot
    {
        _type: 'caseStudyImage',
        _key: generateKey(),
        asset: {
            _type: 'image',
            asset: { _type: 'reference', _ref: 'image-2ce55c9ce91295d63938f9735423f302513fa94c-973x583-jpg' },
        },
        alt: 'Typeform intake showing: Fill out this form to automatically generate a proposal',
        caption: 'The Typeform intake. Takes about 7 minutes. Every field is structured so Claude gets clean inputs.',
        size: 'medium',
    },

    block('After every discovery call, we fill out a Typeform that captures:'),

    ...bulletList([
        'Prospect name, business name, phone, email',
        'One-line business summary',
        'The problem they described on the call',
        'The solution we proposed',
        'Specific deliverables',
        'Timeline',
        'Investment amount',
    ]),

    block('This takes about 5 minutes. The key insight is that structuring the input is what makes the AI output good. If you dump unstructured notes into an LLM, you get generic copy. If you give it specific fields, you get specific proposals.'),

    heading('Step 2: Make.com Orchestration', 'h3'),

    block('Make.com watches for new Typeform submissions and triggers instantly. It takes the structured form data and sends it to the next step. No manual intervention. No copy-pasting between tools.'),

    heading('Step 3: Claude Generates the Narrative', 'h3'),

    block('This is where the magic happens. Claude receives the structured data and generates:'),

    ...bulletList([
        'A compelling proposal title',
        'A problem narrative that reflects what the prospect actually said',
        'A solution narrative explaining our approach',
        'Deliverables formatted as clear scope items',
        'A phased timeline with milestones',
    ]),

    block('The output is structured JSON, not free-form text. That matters because it flows directly into the template without any cleanup.'),

    block('We currently use Claude Opus 4.6, though the AI model is swappable depending on preference. The prompt engineering is what matters more than the model.'),

    heading('Step 4: Google Docs Template Population', 'h3'),

    block('The final step injects Claude\'s output into a branded Google Docs template. Same design, same margins, same section structure every time. The template is the design layer. AI is the content layer. They never interfere with each other.'),

    {
        _type: 'callout',
        _key: generateKey(),
        type: 'info',
        title: 'Why We Switched from PandaDocs',
        content: 'We started with PandaDocs ($65/month) for its built-in e-signatures and payment collection. After two months, we switched to Google Docs. The only trade-off is sending a separate payment link, which saves $780/year. For agencies that need integrated payments and signatures on every proposal, PandaDocs is worth it. For us, the manual follow-up is a non-issue.',
    },

    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // --- THE RESULTS ---
    heading('The Results'),

    {
        _type: 'statsCard',
        _key: generateKey(),
        stats: [
            { _key: generateKey(), value: '~10 min', label: 'Per Proposal' },
            { _key: generateKey(), value: '105 hrs', label: 'Saved/Year' },
            { _key: generateKey(), value: '92%', label: 'Time Reduction' },
            { _key: generateKey(), value: '2 hrs', label: 'Build Time' },
        ],
    },

    block('Before: 1-3 hours per proposal, inconsistent formatting, multi-day delivery delays.'),

    block('After: ~10 minutes per proposal, identical branding every time, same-day delivery.'),

    block('At roughly 5 proposals a month, that is about 105 hours recovered annually. The build took 2 hours. Break-even hit on the second proposal.'),

    heading('What Actually Changed', 'h3'),

    ...bulletList([
        'No more rabbit holes. The template handles design. You never touch margins or fonts again.',
        'Same-day proposals. Prospects get proposals hours after the call, not days.',
        'Brand consistency. Every proposal looks like it came from the same agency, because it did.',
        'Scalable. We could handle 10x the proposal volume without adding any time.',
    ]),

    block('The $780/year PandaDocs savings is a nice bonus, but the real value is the 105 hours. That is over 2.5 full work weeks returned to actual revenue-generating work.'),

    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // --- TECH STACK ---
    heading('Tech Stack'),

    {
        _type: 'techStack',
        _key: generateKey(),
        tools: [
            { _key: generateKey(), name: 'Typeform', url: 'https://www.typeform.com/' },
            { _key: generateKey(), name: 'Make.com', url: 'https://www.make.com/en/register?pc=lalia', promo: 'Free tier available' },
            { _key: generateKey(), name: 'Claude (Anthropic)', url: 'https://www.anthropic.com/' },
            { _key: generateKey(), name: 'Google Docs', url: 'https://docs.google.com/' },
        ],
    },

    // --- HOW TO BUILD THIS ---
    heading('How to Build Something Like This'),

    block('The framework is simple and repeatable for any service business that sends proposals:'),

    ...numberList([
        'Create a structured intake form. Capture the specific fields your proposals need. Do not use a blank text box.',
        'Connect to Make.com. Set up a trigger that fires on new form submissions.',
        'Prompt an LLM with structured output. Tell it exactly what to generate: title, narratives, scope items, timeline. Require JSON output.',
        'Build a branded template. Lock the design once. Never touch it again. AI populates the content.',
        'Test with 3-5 real proposals before going live. Tune the prompt based on output quality.',
    ]),

    block('Total build time should be under 3 hours for anyone comfortable with Make.com and API integrations.'),

    { _type: 'divider', _key: generateKey(), style: 'dots' },

    // --- DOWNLOAD ---
    {
        _type: 'gatedResource',
        _key: generateKey(),
        title: 'Typeform AI Content Generator Blueprint',
        description: 'The Make.com blueprint that connects Typeform to Claude and generates structured proposal content. Import it directly.',
        downloadUrl: '/downloads/proposal-generator-blueprint.json',
        buttonText: 'Download the Blueprint',
    },

    // --- CTA ---
    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'Build a System Like This',
        url: '/#contact',
        style: 'primary',
    },

    block('We build custom automation systems for agencies and service businesses. If you are spending hours on proposals, reports, or any repetitive document workflow, we can fix that.'),

    {
        _type: 'ctaButton',
        _key: generateKey(),
        text: 'See What We Can Automate',
        url: '/work',
        style: 'secondary',
    },
];

// ========================================
// FAQ Schema
// ========================================

const faqSchema = [
    {
        _key: generateKey(),
        question: 'How long does it take to build an AI proposal generator?',
        answer: 'About 2 hours if you are comfortable with Make.com and API integrations. The most time-consuming part is designing the template and engineering the prompt. Once those are locked, the automation itself is straightforward.',
    },
    {
        _key: generateKey(),
        question: 'What AI model works best for proposal generation?',
        answer: 'We use Claude Opus 4.6 from Anthropic. It handles persuasive writing well and follows structured output instructions reliably. That said, the model is swappable. GPT-4 or other models work too. The prompt engineering matters more than the specific model.',
    },
    {
        _key: generateKey(),
        question: 'Do I need PandaDocs for this to work?',
        answer: 'No. We started with PandaDocs for its integrated e-signatures and payment collection, but switched to Google Docs after two months. The only difference is sending a separate payment link. That saved us $65/month.',
    },
    {
        _key: generateKey(),
        question: 'How accurate is the AI-generated proposal content?',
        answer: 'Very accurate, because the intake form captures specific details from the discovery call. The AI is not guessing. It is working with structured inputs: the prospect problem, your proposed solution, deliverables, and pricing. You still review before sending, but we rarely edit more than a sentence or two.',
    },
];

// ========================================
// PUSH TO SANITY
// ========================================

async function main() {
    const slug = 'ai-proposal-generator-sales-workflow';

    console.log(`Fetching case study: ${slug}...`);
    const doc = await client.fetch(
        `*[_type == "caseStudy" && slug.current == $slug][0]{ _id }`,
        { slug }
    );

    if (!doc) {
        console.error('Case study not found!');
        process.exit(1);
    }

    console.log(`Found document: ${doc._id}`);
    console.log('Updating content...');

    const result = await client
        .patch(doc._id)
        .set({
            title: structuredFields.title,
            tag: structuredFields.tag,
            description: structuredFields.description,
            metrics: structuredFields.metrics,
            tldr: structuredFields.tldr,
            keyTakeaways: structuredFields.keyTakeaways,
            problemStatement: structuredFields.problemStatement,
            solutionApproach: structuredFields.solutionApproach,
            resultsOutcome: structuredFields.resultsOutcome,
            industry: structuredFields.industry,
            servicesUsed: structuredFields.servicesUsed,
            timeframe: structuredFields.timeframe,
            category: structuredFields.category,
            faqSchema,
            content: enhancedContent,
        })
        .commit();

    console.log(`Done! Rev: ${result._rev}`);
    console.log('\nUpdated fields:');
    console.log(`  Title: ${structuredFields.title}`);
    console.log(`  Metrics: ${structuredFields.metrics.map(m => m.value + ' ' + m.label).join(', ')}`);
    console.log(`  Content blocks: ${enhancedContent.length}`);
    console.log(`  FAQ items: ${faqSchema.length}`);
    console.log('\nRemember: Run "npx vercel --prod" to rebuild SSG pages.');
}

main().catch((err) => {
    console.error('Error:', err.message);
    process.exit(1);
});
