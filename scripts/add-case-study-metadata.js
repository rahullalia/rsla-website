/**
 * Add SEO metadata to existing case studies
 * Populates clientName, industry, timeframe, readingTime fields
 *
 * Usage: SANITY_API_TOKEN=xxx node scripts/add-case-study-metadata.js
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

// Metadata for each case study
const caseStudyMetadata = {
    'ai-cold-email-personalization': {
        clientName: 'B2B Sales Agency',
        industry: 'agency',
        timeframe: 14,
        seo: {
            metaTitle: 'AI Cold Email Personalization | 94% Faster Lead Research',
            metaDescription: 'How AI automation reduced lead research time by 94% and boosted cold email response rates with hyper-personalized ice breakers.',
        },
        faqSchema: [
            { question: 'How does AI email personalization work?', answer: 'The system automatically researches each prospect using LinkedIn and company data, then generates personalized ice breakers using Claude AI in under 24 seconds per lead.' },
            { question: 'What tools were used for this automation?', answer: 'The automation uses Make.com for orchestration, Clay or Perplexity for research, and Claude AI for generating personalized email content.' },
            { question: 'What results can I expect from AI cold emails?', answer: 'Clients typically see 3-5x higher response rates compared to generic templates, with research time reduced from 7+ minutes to under 24 seconds per prospect.' },
        ]
    },
    'ai-lead-response-autoresponder': {
        clientName: 'Service Business',
        industry: 'contractor',
        timeframe: 7,
        seo: {
            metaTitle: 'AI Lead Autoresponder | 40,000% Faster Response Time',
            metaDescription: 'How AI automation reduced lead response time from 10 hours to under 1 second, dramatically improving conversion rates.',
        },
        faqSchema: [
            { question: 'How fast is the AI lead autoresponder?', answer: 'The system responds to new leads in under 1 second, compared to the industry average of 10+ hours. This is a 40,000% improvement in response time.' },
            { question: 'What happens when a lead comes in?', answer: 'The AI immediately sends a personalized SMS and email, asks qualifying questions, and can book appointments directly into the calendar.' },
            { question: 'Does this work 24/7?', answer: 'Yes, the AI autoresponder works around the clock including nights, weekends, and holidays, ensuring no lead goes unanswered.' },
        ]
    },
    'ai-proposal-generator-sales-workflow': {
        clientName: 'Consulting Firm',
        industry: 'agency',
        timeframe: 21,
        seo: {
            metaTitle: 'AI Proposal Generator | $136K Annual Savings',
            metaDescription: 'How AI automation saved $136K annually by reducing proposal generation time from 4 hours to 15 minutes.',
        },
        faqSchema: [
            { question: 'How much time does AI proposal generation save?', answer: 'AI reduces proposal creation from 4+ hours to approximately 15 minutes, a 94% reduction in time spent per proposal.' },
            { question: 'What goes into an AI-generated proposal?', answer: 'The system pulls data from sales calls (via transcript), client requirements, pricing templates, and past successful proposals to generate customized documents.' },
            { question: 'Are the proposals personalized?', answer: 'Yes, each proposal is tailored to the specific client needs, industry, and budget discussed during the sales call.' },
        ]
    },
    'field-service-operations-automation': {
        clientName: 'Professional Cleaning Company',
        industry: 'contractor',
        timeframe: 30,
        seo: {
            metaTitle: 'Field Service Automation | $58K Annual Savings',
            metaDescription: 'How a cleaning company automated job confirmations and reduced no-shows, saving $58K annually in operational costs.',
        },
        faqSchema: [
            { question: 'What field service tasks were automated?', answer: 'Job confirmations, route notifications, follow-up reminders, and review requests were all automated, reducing manual admin work by 85%.' },
            { question: 'How did automation reduce no-shows?', answer: 'Automated SMS reminders sent 24 hours and 2 hours before appointments reduced no-show rates from 15% to under 3%.' },
            { question: 'What CRM was used?', answer: 'GoHighLevel (GHL) was used as the central CRM and automation platform for all customer communications.' },
        ]
    },
    'iot-manufacturing-robot-tracking': {
        clientName: 'Manufacturing Facility',
        industry: 'manufacturing',
        timeframe: 60,
        seo: {
            metaTitle: 'IoT Robot Tracking System | Real-Time Manufacturing Analytics',
            metaDescription: 'How a custom IoT solution provided real-time visibility into robot performance and production metrics across the factory floor.',
        },
        faqSchema: [
            { question: 'What does the IoT tracking system monitor?', answer: 'The system tracks robot status, production counts, cycle times, error rates, and maintenance alerts in real-time across all connected machines.' },
            { question: 'How is the data displayed?', answer: 'A custom dashboard shows live metrics, historical trends, and alerts. Data is accessible from any device including phones and tablets on the factory floor.' },
            { question: 'What hardware was required?', answer: 'Industrial IoT sensors were connected to existing PLCs and robots, with edge computing devices handling local processing and cloud sync.' },
        ]
    },
    'local-seo-reputation-management': {
        clientName: 'Spice on a Slice',
        industry: 'restaurant',
        timeframe: 90,
        seo: {
            metaTitle: 'Local SEO & Reputation Management | Restaurant Case Study',
            metaDescription: 'How a restaurant grew Google reviews from 12 to 200+ and increased local search visibility with automated review management.',
        },
        faqSchema: [
            { question: 'How did the restaurant grow reviews so quickly?', answer: 'Automated SMS review requests were sent after each order, along with a simple QR code system at point-of-sale. Response rate was over 15%.' },
            { question: 'What impact did more reviews have?', answer: 'Google Business Profile visibility increased 340%, leading to 45% more discovery searches and significantly more walk-in customers.' },
            { question: 'How were negative reviews handled?', answer: 'The system alerts staff to any review under 4 stars within minutes, allowing for quick response and resolution before public escalation.' },
        ]
    },
    'market-research-data-scraping-automation': {
        clientName: 'Market Research Firm',
        industry: 'agency',
        timeframe: 14,
        seo: {
            metaTitle: 'Market Research Automation | 10x Faster Data Collection',
            metaDescription: 'How automated web scraping reduced market research time from weeks to hours while improving data accuracy.',
        },
        faqSchema: [
            { question: 'What type of data was scraped?', answer: 'Competitor pricing, product catalogs, market trends, and public business data were collected from hundreds of sources automatically.' },
            { question: 'Is web scraping legal?', answer: 'Yes, when done ethically and within terms of service. This project only scraped publicly available data with appropriate rate limiting and respect for robots.txt.' },
            { question: 'How accurate is the automated data?', answer: 'Data validation steps catch 99%+ of errors. The automation actually improved accuracy compared to manual research due to consistent formatting and deduplication.' },
        ]
    },
    'marketing-analytics-reporting-automation': {
        clientName: 'Digital Marketing Agency',
        industry: 'agency',
        timeframe: 21,
        seo: {
            metaTitle: 'Marketing Analytics Automation | 50 Hours Saved Monthly',
            metaDescription: 'How automated reporting saved a marketing agency 50+ hours monthly by eliminating manual data compilation across ad platforms.',
        },
        faqSchema: [
            { question: 'What platforms does the reporting integrate?', answer: 'The system pulls data from Facebook Ads, Google Ads, Google Analytics, and the CRM, consolidating everything into unified dashboards and reports.' },
            { question: 'How often are reports generated?', answer: 'Daily automated syncs keep dashboards current. Weekly and monthly PDF reports are generated and emailed to clients automatically.' },
            { question: 'Can clients access reports directly?', answer: 'Yes, clients get their own login to view real-time dashboards. They can also download reports and set up custom alerts.' },
        ]
    },
    'media-content-operations-ai': {
        clientName: 'Digital Media Company',
        industry: 'media',
        timeframe: 45,
        seo: {
            metaTitle: 'AI Content Operations | Media Company Case Study',
            metaDescription: 'How AI automation streamlined content production workflows, reducing production time by 60% while maintaining quality.',
        },
        faqSchema: [
            { question: 'What content tasks were automated?', answer: 'Transcription, content repurposing (long-form to clips), SEO optimization, social media scheduling, and analytics reporting were all automated.' },
            { question: 'Did AI replace the content team?', answer: 'No, AI augmented the team by handling repetitive tasks. Creators could focus on strategy and creative work while AI handled production workflows.' },
            { question: 'What quality controls were in place?', answer: 'Human review checkpoints were built into the workflow. AI handled first drafts and suggestions, with final approval from editors.' },
        ]
    },
    'nonprofit-crm-volunteer-automation': {
        clientName: 'United Sikhs',
        industry: 'nonprofit',
        timeframe: 60,
        seo: {
            metaTitle: 'Nonprofit CRM & Volunteer Automation | United Sikhs',
            metaDescription: 'How a global nonprofit automated volunteer coordination and donor management, scaling operations without adding staff.',
        },
        faqSchema: [
            { question: 'What nonprofit processes were automated?', answer: 'Volunteer onboarding, shift scheduling, donor acknowledgments, event reminders, and recurring donation processing were all automated.' },
            { question: 'How did automation help with limited staff?', answer: 'The nonprofit was able to manage 3x more volunteers and donors without hiring additional administrative staff, redirecting budget to mission work.' },
            { question: 'What CRM was implemented?', answer: 'GoHighLevel was customized for nonprofit use, with integrations to payment processing, email marketing, and volunteer management systems.' },
        ]
    },
    'salon-marketing-automation-roi': {
        clientName: 'Casagrande Salon',
        industry: 'salon-spa',
        timeframe: 90,
        seo: {
            metaTitle: 'Salon Marketing Automation | $36K Annual Revenue Case Study',
            metaDescription: 'How targeted Meta ads and CRM automation helped a salon fill vacant suite rentals, generating $36K in annual revenue.',
        },
        faqSchema: [
            { question: 'How long were the salon suites vacant?', answer: 'Two salon suites had been empty for over 2 years despite traditional advertising efforts like Craigslist and word of mouth.' },
            { question: 'What marketing strategy was used?', answer: 'Targeted Facebook and Instagram ads reached licensed cosmetologists within a 15-mile radius, with automated follow-up sequences nurturing leads.' },
            { question: 'What was the total investment?', answer: 'The client invested approximately $3,000 in ad spend and setup, generating $36,000 in annual rental revenue - a 12x return on investment.' },
        ]
    },
    'seo-content-marketing-automation': {
        clientName: 'RSL Media Hub',
        industry: 'agency',
        timeframe: 30,
        seo: {
            metaTitle: 'SEO Content Automation | Blog Production at Scale',
            metaDescription: 'How AI-powered content automation reduced blog production time from 8 hours to 30 minutes while improving SEO performance.',
        },
        faqSchema: [
            { question: 'How does AI content generation maintain quality?', answer: 'AI creates first drafts based on SEO research and outlines. Human editors review, fact-check, and add brand voice before publishing.' },
            { question: 'What SEO improvements were seen?', answer: 'Organic traffic increased 280% over 6 months, with multiple articles ranking on page 1 for target keywords.' },
            { question: 'How many blog posts can be produced?', answer: 'The system can produce 20-30 SEO-optimized blog posts per month, compared to 4-5 with the previous manual process.' },
        ]
    },
};

// Calculate reading time from content
function calculateReadingTime(content) {
    if (!content || !Array.isArray(content)) return 5;

    let wordCount = 0;
    for (const block of content) {
        if (block._type === 'block' && block.children) {
            for (const child of block.children) {
                if (child.text) {
                    wordCount += child.text.split(/\s+/).length;
                }
            }
        }
    }

    // Average reading speed: 200 words/minute
    return Math.max(3, Math.ceil(wordCount / 200));
}

async function fetchAllCaseStudies() {
    const query = `*[_type == "caseStudy"] {
        _id,
        title,
        "slug": slug.current,
        content,
        clientName,
        industry
    }`;
    return await client.fetch(query);
}

async function addMetadata() {
    console.log('Fetching all case studies...\n');
    const caseStudies = await fetchAllCaseStudies();

    console.log(`Found ${caseStudies.length} case studies\n`);

    let updatedCount = 0;

    for (const cs of caseStudies) {
        const metadata = caseStudyMetadata[cs.slug];

        if (!metadata) {
            console.log(`⏭️  ${cs.slug}: No metadata configured, skipping`);
            continue;
        }

        // Check if already has metadata
        if (cs.clientName && cs.industry) {
            console.log(`⏭️  ${cs.slug}: Already has metadata, skipping`);
            continue;
        }

        const readingTime = calculateReadingTime(cs.content);

        console.log(`📝 ${cs.slug}: Adding metadata...`);

        try {
            await client.patch(cs._id)
                .set({
                    clientName: metadata.clientName,
                    industry: metadata.industry,
                    timeframe: metadata.timeframe,
                    readingTime: readingTime,
                    seo: metadata.seo,
                    faqSchema: metadata.faqSchema,
                })
                .commit();

            console.log(`   ✅ Updated: ${metadata.clientName} | ${metadata.industry} | ${readingTime} min read`);
            updatedCount++;
        } catch (error) {
            console.error(`   ❌ Error: ${error.message}`);
        }
    }

    console.log('\n=== Metadata Update Complete ===');
    console.log(`📊 Case studies updated: ${updatedCount}`);
}

// Run
addMetadata().catch(console.error);
