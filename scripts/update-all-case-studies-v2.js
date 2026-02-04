#!/usr/bin/env node

/**
 * Update ALL 12 case studies with voice-calibrated content
 * Run: SANITY_API_TOKEN=xxx node scripts/update-all-case-studies-v2.js
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
    console.error('Usage: SANITY_API_TOKEN=xxx node scripts/update-all-case-studies-v2.js');
    process.exit(1);
}

const client = createClient(config);

const caseStudies = [
  // ============================================
  // 4 MISSING CASE STUDIES (new content)
  // ============================================
  {
    slug: 'market-research-data-scraping-automation',
    tldr: `So we built an automation platform that basically replaced 80 people doing manual data entry. The system runs on AWS with AI-powered CAPTCHA solving—went from 4 months of work down to 2 weeks. And the numbers? $136K saved annually, 1,000x throughput improvement, 97% accuracy on CAPTCHAs. This thing now runs 24/7 with zero human intervention.`,
    keyTakeaways: [
      'Target processes bleeding six figures in labor—that\'s where automation ROI is undeniable',
      'Deploy dual-engine OCR (Tesseract + EasyOCR) with preprocessing for 97% CAPTCHA solve rates',
      'Build self-healing systems with checkpoint recovery so failures don\'t mean starting over',
      'Design for 10x headroom from day one—infrastructure should scale without code changes',
      'Calculate true cost including coordination and QA, not just raw labor hours'
    ],
    problemStatement: `So here's the situation. Eighty people. Four months. One spreadsheet at a time. That was the reality for this national research firm running readership surveys. And the worst part? Government databases had weaponized image CAPTCHAs that blocked every automation attempt they'd tried before.

The bleeding was severe—320 person-months of work annually. Manual entry spawning typos, formatting chaos, ghost records corrupting downstream analysis. 15-20 minutes per record. Every new data source multiplied costs linearly.

This wasn't inefficiency. This was a death spiral. And they'd basically accepted it as "just how things work."`,
    solutionApproach: `We architected what I'd call a military-grade automation platform. Distributed web scraping with AI-powered OCR to crack those CAPTCHAs—running on AWS infrastructure with self-healing capabilities.

Phase one was the cloud infrastructure. Selenium Hub for parallel browser orchestration, auto-scaling EC2 clusters, S3 for bulletproof persistence. Multi-threaded Python engine delivering 50x raw performance gains.

Then we tackled the CAPTCHA barrier. Dual-engine OCR combining Tesseract and EasyOCR. Preprocessing pipeline with contrast enhancement and noise elimination. Built a confidence scoring system that automatically retries ambiguous ones. Hit 97% solve rate—matching or beating human accuracy.

The data pipeline handles 4,000 records per hour with exponential backoff retry logic. Validation layer catches corruption before it reaches the database. Checkpoint system enables instant resume from any failure point.`,
    resultsOutcome: `The platform went live and basically obliterated the old way of working. $136,000 recovered annually—slashed labor from 320 person-months to 40. That's an 87.5% reduction.

Timeline compression? 4 months down to 2 weeks. 1,000x throughput multiplier—from 4 records per hour manually to 4,000 automated. 97% machine accuracy on CAPTCHAs. Zero manual CAPTCHA solving required anymore.

And here's what really matters: 10x headroom built in. Infrastructure scales to 10x current volume with no additional staff. The platform's now deployed across multiple data collection initiatives.

Six-figure savings from one automation project isn't exceptional when you target the right process. The best automation investments pay back in weeks, not years.`,
    servicesUsed: ['ai-automation']
  },
  {
    slug: 'salon-marketing-automation-roi',
    tldr: `Two vacant suites sitting empty for two years in Manhattan—that's $3K/month bleeding out. We spent $600 on Meta Ads with hyper-targeted campaigns plus GoHighLevel CRM automation. Three months later, both suites filled with year-long leases. $36K annual revenue locked in. 60X return on ad spend. The system basically ran itself while leads got nurtured automatically.`,
    keyTakeaways: [
      'Structure performance-based partnerships where you only get paid on results—skin in the game aligns incentives',
      'Deploy hyper-local Meta targeting for service businesses—tight radius, specific professions, zero wasted impressions',
      'Build automated SMS/email sequences that engage leads within minutes, not hours',
      'Create hands-free nurture pipelines so owners aren\'t chasing leads manually',
      'Transform liability (empty space) into predictable passive revenue streams'
    ],
    problemStatement: `Two vacant suites. Two years of trying. Zero results. That was Laiz's reality at Casagrande Salon in Manhattan. Premium space sitting idle wasn't just an inconvenience—it was a $3,000/month wound that wouldn't stop bleeding.

She'd tried everything. Scattered social posts, unfocused ads, word-of-mouth prayers. Nothing stuck. And the leads that did trickle in? They vanished into a black hole of missed messages and forgotten follow-ups.

The financial pressure just kept compounding month after month. Vacant space isn't a marketing problem—it's a systems problem. Without targeted outreach and automated nurture, even premium real estate becomes a liability.`,
    solutionApproach: `We structured a performance-based partnership. Laiz covered a modest $600 ad spend, and we'd only earn the first month's rent upon securing year-long tenants. Skin in the game with aligned incentives.

First, we deployed hyper-targeted Meta Ads—laser-focused on stylists, barbers, and beauty professionals within a tight Manhattan radius. No wasted impressions. Every dollar working.

Then came the CRM infrastructure. Instant lead capture flowing directly into GoHighLevel with zero manual data entry. Automated SMS and email sequences with qualification questions, appointment scheduling, and follow-up triggers. Every lead engaged within minutes.

The system ran completely hands-off for Laiz. Automated workflows tracked every conversation, scheduled salon tours, managed all communication until prospects were ready to sign. No more scattered notes. No more missed messages.`,
    resultsOutcome: `Within three months, both suites were locked in with quality, long-term stylists on one-year leases. $3,000/month in rental income—that's $36,000 annually—secured with a $600 ad investment.

60X return on ad spend. $600 in, $36,000 out. That's not marketing. That's a money machine.

Empty suites transformed from liability to asset. Predictable, passive revenue stream. Laiz went from worrying about rent to counting profit.

But yeah, the real win here? She doesn't have to think about it anymore. The system handles everything. Vacancy problem solved permanently.`,
    servicesUsed: ['paid-acquisition', 'crm-infrastructure', 'ai-automation']
  },
  {
    slug: 'local-seo-reputation-management',
    tldr: `Spice on a Slice made excellent pizza but had only 14 Google reviews—basically invisible online. We built an automated review generation engine with in-store lead capture plus CRM nurture sequences. 60 days later: 132 reviews, $25K in new revenue, first page Google Maps ranking. Database reactivation campaign brought back old customers while new ones kept discovering them.`,
    keyTakeaways: [
      'Deploy frictionless in-store capture—free slice for contact info creates a steady lead pipeline',
      'Run database reactivation campaigns via SMS/email to re-engage past customers immediately',
      'Automate review requests with proper timing—polite, well-timed asks after positive experiences',
      'Build nurture sequences that drive repeat visits with promotions and menu updates',
      'Remember: satisfied customers don\'t become reviewers automatically—you need a system'
    ],
    problemStatement: `So here's the thing about Spice on a Slice. Great pizza. Regulars loved them. But online? Completely invisible. 14 Google reviews meant they were buried beyond page two of local search results. Basically nonexistent to anyone discovering restaurants online.

Every day, potential customers searched "pizza near me" and found their competitors instead. The shop's lack of digital social proof was strangling growth and leaving revenue on the table.

And you know, satisfied customers don't become reviewers automatically. Without a system to convert in-store loyalty into online advocacy, even great businesses stay invisible to new customers.`,
    solutionApproach: `We engineered a complete local SEO system. Google Business Profile optimization plus automated review generation that converts happy customers into online advocates.

First, we deployed frictionless in-store lead capture—free slice in exchange for contact info. Simple value exchange. Every contact instantly flowed into CRM for automated follow-up.

Then we launched a database reactivation campaign via SMS and email to re-engage past customers and kickstart review generation. Hit the existing customer base first while building the new capture system.

The automated sequences ran autonomously. Every new customer received polite, well-timed review requests via SMS and email. Ongoing nurture campaigns drove repeat visits with promotions and menu updates. Generating consistent reviews while compounding revenue.`,
    resultsOutcome: `In under 60 days, the shop's local presence transformed completely. Reviews exploded from 14 to 132—that's 118 new reviews establishing undeniable social proof.

$25,000 in new revenue from increased visibility and repeat visits. First page Google Maps ranking for key local searches, capturing walk-in traffic that was going to competitors before.

Repeat business compounding from the automated nurture sequences. Old customers coming back, new customers finding them, reviews building momentum.

But yeah, the real story? People already liked their pizza. Not enough people knew about them. Now they do. And the system keeps running on autopilot.`,
    servicesUsed: ['local-seo', 'crm-infrastructure', 'ai-automation']
  },
  {
    slug: 'seo-content-marketing-automation',
    tldr: `We were paying $75 per article—$3,600 annually just in copywriting, closer to $18K when you factor in coordination, editing, and publishing time. So we built an AI content engine using Make.com, GPT-4, and Typeform. Now topics go in, published SEO-optimized posts come out. 4X content velocity, 99% manual work eliminated, $18K saved. We run on our own automation.`,
    keyTakeaways: [
      'Calculate true content costs including coordination, editing, and publishing—not just raw writing fees',
      'Deploy structured input via Typeform capturing keywords, links, and brand voice requirements',
      'Engineer custom GPT-4 prompts that match your specific brand voice and SEO patterns',
      'Build end-to-end pipelines: topic → AI generation → Google Drive → WordPress publish',
      'Eat your own cooking—we built this for ourselves first, then opened it to clients'
    ],
    problemStatement: `Content marketing is non-negotiable for demonstrating expertise. But at $75 per article, publishing four posts monthly cost $300/month—$3,600 annually in raw copywriting fees alone. Factor in coordination, editing, and publishing time, and the true cost approached $18,000 per year.

Beyond cost, two critical factors were failing. Time drain—manual editing and publishing choked the content pipeline. And consistency collapse—weekly publishing schedules were aspirational, not operational.

Human labor in low-margin content production doesn't scale. Every hour spent on repetitive content tasks is an hour not spent on strategy. The math demanded automation.`,
    solutionApproach: `We built this system for ourselves first, then opened it to clients. End-to-end AI content engine that takes topic input and delivers published, SEO-optimized blog posts without human intervention.

First, structured input and AI integration. Deployed Typeform frontend capturing blog topics, primary and secondary keywords, internal and external links. Google Sheets as central tracking record for pipeline visibility. Custom prompts instructing GPT-4 to generate SEO-optimized outlines and full posts matching our brand voice.

Then end-to-end automation via Make.com. Topic enters Typeform, AI generates content, Google Drive organizes assets, WordPress publishes automatically. Zero manual copying, pasting, or scheduling. Human involvement? Optional quality review.`,
    resultsOutcome: `What used to cost the same as a part-time employee now runs for less than the cost of a single outsourced article.

$18,000 annual savings compared to fully-burdened manual copywriting costs. 4X content velocity—weekly publishing now operational, not aspirational. 99% manual work eliminated—data entry, writing, formatting, all automated.

Consistent quality on every post. SEO best practices and brand voice guidelines baked into the prompts.

We don't just sell automation. We run on it. This system powers our own blog while generating the same savings for clients.`,
    servicesUsed: ['ai-automation', 'content-marketing']
  },

  // ============================================
  // 8 EXISTING CASE STUDIES (voice consistency refresh)
  // ============================================
  {
    slug: 'ai-cold-email-personalization',
    tldr: `So here's the thing—personalized emails get 5-8X higher response rates, but personalizing each one costs 8 minutes of research and writing. At 50 emails per week, that's nearly 9 full work weeks annually just doing research. We built an AI system using Make.com and GPT-4 that reads LinkedIn data and writes personalized icebreakers in 30 seconds. 325 hours recovered, $43K saved, 94% time reduction.`,
    keyTakeaways: [
      'Automate the research, not just the sending—GPT-4 reads LinkedIn context and writes icebreakers that reference specific roles and companies',
      'Build enrichment-first pipelines where Apollo, Clay, or Sales Navigator data feeds directly into AI prompts',
      'Break the quality-vs-volume tradeoff by engineering systems that scale personalization infinitely',
      'Calculate your real cost—8 minutes per email at agency rates is $46K/year in hidden labor',
      'Test with 50 emails/week first, then scale once you validate response rate lift'
    ],
    problemStatement: `So here's the brutal math every sales team ignores. Personalized emails get 5-8X higher response rates than templates—but personalizing each one costs 8 minutes of research and writing. LinkedIn stalking, company research, icebreaker crafting. At 50 emails per week, that's 6.7 hours gone. Annually? 350 hours. Nearly 9 full work weeks just doing research for cold outreach.

And the alternative is garbage. Generic templates guarantee sub-2% reply rates. You're either burning time or burning leads. Most teams pick volume over quality and wonder why their pipeline is dry.

We hit this wall ourselves. The personalization-vs-scale dilemma was killing our outreach velocity. We refused to accept either option—so we engineered a third path.`,
    solutionApproach: `We built an AI personalization engine using Make.com, GPT-4, and Google Sheets. The system ingests LinkedIn enrichment data—job titles, headlines, recent activity, company context—and deploys GPT-4 to generate custom icebreakers for every prospect.

The workflow runs daily, processing every lead missing an icebreaker. GPT-4 gets a custom prompt containing their LinkedIn context, industry vertical, and our service alignment. It outputs a 2-3 sentence opener that references something specific—their role, their company, their recent posts—and bridges naturally to our value prop.

The icebreakers write back to Google Sheets instantly. Now the sales team has fully researched, personalized opening lines ready to deploy. Copy-paste into any email platform. Consistent quality at infinite scale.`,
    resultsOutcome: `The numbers speak for themselves. We went from 8 minutes per email to 30 seconds—a 94% time reduction. That's 325 hours recovered annually, over 8 full work weeks returned to actual selling.

Financially, we're saving $43,387 per year in recovered productivity. The build took 3 hours. Break-even point? 29 emails—less than one week. First-year ROI hit 10,746%.

But the real win is quality at scale. Every icebreaker is context-aware and thoughtful. Zero writer's block. Junior reps now output senior-level research quality. We send 100 emails with the same quality as 5 hand-written ones.

That's not optimization. That's leverage.`,
    servicesUsed: ['ai-automation']
  },
  {
    slug: 'nonprofit-crm-volunteer-automation',
    tldr: `International nonprofit with 2,000+ volunteers scattered across 15 regional databases. Onboarding one person took 3-5 hours of manual work. We unified everything into GoHighLevel, automated the entire pipeline—intake forms, background checks, training delivery, scheduling. $40K in admin costs eliminated, coordinator position redeployed to program work, emergency deployment cut from days to hours.`,
    keyTakeaways: [
      'Consolidate fragmented databases first—you can\'t automate chaos, you need a single source of truth',
      'Build smart intake forms with conditional logic that routes volunteers by type, location, and availability',
      'Automate the compliance paper trail—waivers, NDAs, background checks should fire automatically',
      'Deploy skill-based matching for rapid emergency response when you need specific volunteers fast',
      'Create one-click reporting for grant applications—funders want data, not excuses about manual compilation'
    ],
    problemStatement: `This international nonprofit runs disaster relief across 15 countries. Their volunteer army of 2,000+ was their greatest asset—and their biggest operational nightmare. Data lived everywhere. Google Sheets. Email lists. 15 regional chapter databases with duplicates, conflicts, and data rot.

Onboarding a single volunteer consumed 3-5 hours of manual work. Background checks, training sequences, scheduling—100% human intervention required. And when enthusiastic signups got no follow-up? They vanished into the void.

The compliance exposure was real. Inconsistent records in sensitive humanitarian work meant liability gaps. Quarterly funder reports required weeks of manual data archaeology just to compile numbers.

When disaster strikes and you can't deploy the right people fast, lives are at stake. Fragmented volunteer data isn't an efficiency problem—it's a mission failure waiting to happen.`,
    solutionApproach: `We architected a comprehensive volunteer management platform in GoHighLevel. Single source of truth for all 2,000+ records.

First, we consolidated all 15 databases, eliminated duplicates, and engineered custom fields for skills, certifications, languages, and regional assignments. Role-based access lets chapter leads manage locally while HQ maintains global visibility.

Then we automated the entire onboarding pipeline. Smart intake forms with conditional logic. Automated background check triggers with status tracking. Sequential email training courses with embedded video and progress gates. AI-powered scheduling integrated with chapter calendars. Waivers, NDAs, and program-specific forms delivered automatically.

Finally, we deployed engagement automation. Skill-based matching identifies qualified volunteers by location and availability in seconds. Re-engagement campaigns target dormant volunteers. Recognition automation fires thank-you messages and milestone celebrations.`,
    resultsOutcome: `Within 90 days, the transformation was complete. $40,000 redirected to programs—we eliminated the full-time coordinator position so funds now serve the mission directly.

100% database unification. All 2,000+ volunteers in one CRM with complete history and certifications. 95% onboarding automation—from 3-5 hours of manual work to 15 minutes of human review per volunteer.

Emergency deployment dropped from days to hours. When disaster strikes, the system identifies qualified volunteers by skills, location, and availability in seconds. Retention increased 42% through automated engagement workflows.

Reporting time dropped 80%—from 2 weeks of manual compilation to 2 hours of data export. Zero compliance incidents since launch. Every liability gap closed.

Automation in nonprofits isn't about replacing human connection. It's about freeing humans for mission-critical work.`,
    servicesUsed: ['ai-automation', 'crm-infrastructure']
  },
  {
    slug: 'ai-proposal-generator-sales-workflow',
    tldr: `Every agency knows the pain—discovery call goes great, then you spend 2 hours formatting a proposal while the lead cools. We built an AI system using Make.com and Claude that transforms call notes into polished, branded proposals in 10 minutes. Typeform captures the inputs, Claude writes the narratives, Google Docs template gets populated automatically. 165 hours recovered, $22K saved, 92% time reduction.`,
    keyTakeaways: [
      'Capture discovery calls in structured Typeform inputs—garbage in, garbage out applies to AI too',
      'Use Claude for proposal narrative generation—it writes persuasive problem/solution copy that sounds human',
      'Build template injection, not template replacement—AI populates your existing branded docs',
      'Eliminate the perfectionism rabbit hole by constraining inputs to specific fields',
      'Measure break-even in proposals, not months—ours hit ROI at 2 proposals'
    ],
    problemStatement: `Every agency knows the pain. A prospect is hot, the discovery call went great, and now you need to send a proposal. Two hours later, you're still formatting bullet points. Meanwhile, the lead cools and the opportunity slips.

The damage was quantifiable. 2 hours per proposal—writing, formatting, obsessing over every detail. Rabbit hole syndrome where perfectionism steals time from actually closing deals. Brand inconsistency because every proposal looked different depending on who wrote it.

Multi-day delays between discovery calls and proposal delivery meant leads went cold. At our rate, that's $267 in opportunity cost per proposal burned on document creation.

We were losing deals not because our proposals were bad—but because they took too long to deliver. Speed matters in sales. Every hour spent formatting is an hour not spent closing.`,
    solutionApproach: `We engineered a fully automated proposal system using Make.com, Claude Opus 4, and Google Docs.

Post-call, sales completes a focused Typeform capturing prospect details, the bleeding-neck problem they described, the solution we proposed, deliverables, timeline, and pricing tier. Takes 5-10 minutes max.

Make.com triggers instantly, feeding form data to Claude Opus 4. The AI generates a compelling proposal title, writes persuasive problem and solution narratives, breaks deliverables into 5 crystal-clear scope items, and constructs a 4-milestone timeline with concrete dates. Output is structured JSON ready for template injection.

Structured data flows directly into a branded Google Docs template. Professional design, client-specific context, custom narrative, detailed scope, phased timeline, investment summary. Done.`,
    resultsOutcome: `The transformation was immediate. 2 hours per proposal dropped to 10 minutes—a 92% time reduction. That's 165 hours recovered annually, over 4 full work weeks returned to revenue-generating work.

Financially, we're saving $22,027 per year. The build took 2 hours. Break-even hit at 2 proposals—less than one week. First-year ROI was 8,150%.

But the operational wins matter more. Brand lock-in means every proposal now matches our professional standards. Same-day delivery—proposals sent hours after discovery calls, not days. The rabbit hole eliminated because structured input prevents perfectionism paralysis.

We can now handle 10x proposal volume with zero additional time. That's leverage. Pre-automation, doubling proposal volume would have meant hiring sales support staff. Now we scale without scaling payroll.`,
    servicesUsed: ['ai-automation']
  },
  {
    slug: 'marketing-analytics-reporting-automation',
    tldr: `Digital marketing agency's best strategist was spending 4 hours every day copying numbers from Facebook Ads Manager into spreadsheets. We built an automation using Google Sheets and Apps Script that pulls data via API, calculates metrics automatically, and surfaces opportunities. 96% time reduction, 990+ hours saved annually, $18K recovered. Bonus: we found tracking gaps that delivered a 4% conversion lift.`,
    keyTakeaways: [
      'Automate data ingestion first—manual copy-paste from Facebook Ads Manager is a symptom, not the disease',
      'Build derived metric calculations into the pipeline—CPL, ROAS, week-over-week deltas should calculate automatically',
      'Add error handling with Slack alerts so failed data pulls don\'t poison your reports',
      'Look for tracking gaps during automation builds—the 4% conversion lift came from finally seeing metrics that were always available',
      'Document everything in SOPs so the system survives team changes'
    ],
    problemStatement: `A digital marketing agency's best strategist was drowning in data entry. Four hours. Every single day. Instead of optimizing campaigns and growing client accounts, they were copying numbers from Facebook Ads Manager into spreadsheets.

The daily grind: multi-account data exports for multiple clients, manual metric transfers—spend, impressions, clicks, conversions, CPL, ROAS—all copied by hand. Then derived calculations. Week-over-week changes, running averages, client-specific KPIs. Each client demanded their data in specific formats.

The cost wasn't just wasted time. It was strategic paralysis. The person who should have been improving client results was trapped in data entry. That's not a process problem—that's a talent misallocation problem.

When your highest-paid team members do repetitive data work, you're not just wasting salary. You're losing the strategic thinking that actually moves the needle.`,
    solutionApproach: `We architected a comprehensive automation system using Google Sheets and custom Apps Script.

First, we built automated data ingestion—custom scripts pulling Facebook Ads data via API integration. Scheduled refreshes run every morning before the team arrives. Error handling with Slack alerts catches failed data pulls before they pollute reports.

Then we deployed intelligent data processing. Automated derived metric calculations—CPL, ROAS, week-over-week deltas. Dynamic date range comparisons across 7-day, 30-day, MTD, and QTD windows. Conditional formatting highlights anomalies and opportunities automatically.

Critical discovery during the build: we identified landing page tracking gaps that were costing conversions. Implemented additional conversion events that were never being captured. Created funnel visualization exposing drop-off points. That proactive discovery led directly to the 4% conversion lift.`,
    resultsOutcome: `The results were massive. 96% time reduction—4-hour daily process reduced to 10 minutes of review. 990+ hours saved annually. That's nearly 20 hours per week returned to strategic work.

$18,000 in annual savings from lead marketer time reallocated to revenue-generating activities. Zero manual data entry—completely eliminated copy-paste workflows.

But here's the real story: the 4% conversion improvement. That wasn't from a fancy new tool. It came from finally having visibility into metrics that were always available but never tracked.

The system scaled seamlessly as the agency added clients. New accounts onboard in minutes instead of adding to workload. Documentation and SOPs enabled smooth team transitions.

Sometimes the biggest wins come from automating the boring stuff so you can pay attention to what actually matters.`,
    servicesUsed: ['ai-automation', 'paid-acquisition']
  },
  {
    slug: 'ai-lead-response-autoresponder',
    tldr: `"Thank you for contacting us. We will respond within 24-48 hours." That email basically says nobody read your message. Harvard found leads contacted within 5 minutes are 21X more likely to convert. We built an AI auto-responder using Make.com and GPT-4 that actually reads every email, extracts the specific question, and crafts personalized replies in 24 seconds. Runs 24/7, captures leads while competitors sleep.`,
    keyTakeaways: [
      'Deploy dual-stage AI analysis—first call extracts the question, second call generates the personalized response',
      'Engineer psychological timing with 30-90 second random delays—instant replies scream "bot"',
      'Reference specific details from their message—"your 3-location dental practice" beats "your inquiry"',
      'Build different response templates for different inquiry types—sales vs support vs partnership',
      'Remember: feeling heard matters more than knowing whether a human or AI did the hearing'
    ],
    problemStatement: `"Thank you for contacting us. We will respond within 24-48 business hours." You've sent that email. You know what it means: nobody read your message, you're in a queue, your problem isn't a priority.

The data is brutal. Harvard Business Review found leads who receive a response within 5 minutes are 21X more likely to convert than those contacted 30 minutes later. But what about evenings? Weekends? Meetings? The lead doesn't care—they're already comparing competitors.

35% of web leads arrive outside business hours. Every hour of delay decreases conversion by 10%. And 60% of customers would rather wait for a human than receive a robotic auto-reply.

The impossible choice: respond instantly with generic garbage (and turn people off), or respond personally hours later (and lose hot leads). Most businesses pick one poison or the other.`,
    solutionApproach: `We engineered an intelligent email response system using Make.com and GPT-4 that doesn't just acknowledge receipt—it reads, analyzes, and personalizes every reply.

Make.com monitors the inbox continuously via IMAP. Smart filtering targets contact form submissions and specific keywords.

Then comes the dual-stage AI. First call reads the email body, extracts the core question, identifies inquiry category, determines urgency. Second call generates the response—references the specific question, provides context relevant to their industry, sets appropriate expectations, adds conversational human touch.

Critical insight: instant replies scream "bot." We engineered a 30-90 second random delay before sending. Feels more human, suggests someone actually read the message, bypasses spam filters.

The result: emails that feel human-written, delivered in 24 seconds, running 24/7.`,
    resultsOutcome: `The difference is visceral. Generic auto-reply: "Thank you for contacting RSL/A. We will respond within 24-48 hours." AI-personalized reply: "Thanks for reaching out about GoHighLevel CRM for your dental practice. We've helped several multi-location dental offices streamline their patient management. Someone from our team will reach out within 24-48 hours to discuss your 3-location setup."

Same response time. Completely different perception.

The generic reply says "you're a number." The personalized reply says "we read your message about X and here's what happens next." Specific acknowledgment. Relevant social proof. Intelligent routing. Conversational cadence.

The psychological gap is massive. Customers often know it's automated—but because it references their specific question, perception shifts entirely. Feeling heard matters more than knowing whether a human or AI did the hearing.

That's the 21X conversion multiplier at work.`,
    servicesUsed: ['ai-automation']
  },
  {
    slug: 'field-service-operations-automation',
    tldr: `Cleaning company with 50+ clients had operations scattered across 4 systems—Housecall Pro, Google Sheets, manual texts, email. Owner burning 20+ hours weekly on admin. They'd hired 2 employees just to answer phones. We rebuilt everything in GoHighLevel with bidirectional Housecall Pro sync. AI handles confirmations, review requests, rebooking automatically. 2 positions eliminated, 99% confirmation rate, reviews went from 14 to 132 in 60 days.`,
    keyTakeaways: [
      'Build bidirectional sync when clients can\'t abandon existing tools—Housecall Pro stayed, but GoHighLevel became the brain',
      'Automate the communication cascade—confirmations at 48hr, 24hr, and morning-of eliminate no-shows',
      'Deploy AI chat widgets for after-hours lead capture—37 leads captured, 18 converted while the team slept',
      'Send review requests 2 hours post-completion with service-specific messaging—timing matters',
      'Run rebooking workflows based on service frequency—weekly, bi-weekly, monthly triggers prevent revenue leakage'
    ],
    problemStatement: `White Glove Cleaning had grown to 50+ recurring clients, and operations were collapsing. Housecall Pro for scheduling. Google Sheets for customer notes. Manual texts for follow-ups. Email for invoicing. The owner was burning 20+ hours weekly on admin tasks. They'd hired 2 full-time employees just to answer phones and send confirmation texts.

Customer data fragmented across 4 systems—no single source of truth for history, preferences, or communications. Manual follow-up workflows meant employees typing the same confirmation texts, review requests, and rebooking messages hundreds of times monthly.

Weekly double-bookings from scheduling not synced with communication. Revenue leaking everywhere—no automated upsell, rebooking, or dormant client reactivation.

Scattered operations don't just waste time. They create blind spots that cost you customers. Every disconnected system is a leak in your revenue pipeline.`,
    solutionApproach: `We architected GoHighLevel as central command, but with a critical constraint: they needed to keep Housecall Pro for scheduling. So we engineered bidirectional sync.

Custom API integration via Make.com connects Housecall Pro and GoHighLevel. Jobs scheduled in Housecall Pro automatically create opportunities in GHL. All customer data, job history, and notes migrated into unified contacts. Custom fields track service type, frequency, property size, preferences.

Then we deployed AI-powered communication workflows. Automated appointment confirmations at 48 hours, 24 hours, and morning-of. AI-personalized review requests sent 2 hours post-completion. Smart rebooking sequences triggered by service frequency. 24/7 AI chat widget answers FAQs, books estimates, qualifies leads while the team sleeps.

Finally, operational command dashboard. Custom pipeline views. Daily digest emails. Automated reporting on customer lifetime value, rebooking rates, service profitability.`,
    resultsOutcome: `Within 60 days, the transformation was complete. 100% operations consolidated—all customer data, communications, and workflows in one system.

2 employees redeployed to fieldwork. The admin positions were eliminated, service capacity increased. 99% confirmation rate—automated reminders virtually eliminated no-shows.

The AI chat widget captured 37 leads while the team slept. 18 converted. Google reviews went from 14 to 132 in 60 days—automated review requests running on autopilot.

$15K recovered annually. Rebooking workflows reactivated 23 dormant clients who would have been forgotten.

The owner now gets a morning email showing exactly what's happening that day. Entire business visible in one place. The AI chat books estimates while they're sleeping.

The right operations platform doesn't just save time. It unlocks revenue you didn't know was leaking.`,
    servicesUsed: ['ai-automation', 'crm-infrastructure', 'local-seo']
  },
  {
    slug: 'media-content-operations-ai',
    tldr: `Singapore media company was winning—revenue up, content volume exploding—but operations couldn't keep pace. 60+ minutes per video for QC. 4-6 hours to repurpose one podcast. As Founding Engineer, we built three production AI systems: video QC automation, podcast-to-social pipeline, and YouTube analytics extension. 70% workload reduction, 10x content multiplication with the same team. These aren't prototypes—they're running daily operations.`,
    keyTakeaways: [
      'Engineer multi-stage AI pipelines—chunking → interpretation → transformation → editing beats single-prompt approaches',
      'Write 500+ line prompts for consistent brand voice—LLMs need exhaustive context for production-quality output',
      'Build compliance into automation—Netflix-level standards enforced automatically, not dependent on human vigilance',
      'Create content multiplication workflows—one 60-minute podcast becomes 10+ platform-specific pieces',
      'Remember: 70% workload reduction doesn\'t mean 70% fewer people—it means 10x more output'
    ],
    problemStatement: `CrazyTok Media was winning. Revenue up. Content volume exploding. But operations couldn't keep pace. Every video meant 60+ minutes of manual QC—frame-by-frame review for text overlays, audio sync, brand compliance. Every podcast episode meant 4-6 hours of content repurposing—transforming one podcast into Twitter threads, blogs, and short-form clips consumed entire days.

Analytics chaos. YouTube metrics scattered across dashboards. PRE/POST comparison nearly impossible. Netflix-level quality standards existed on paper, but manual review couldn't consistently enforce them.

The real problem? Linear scaling trap. Every new content piece required proportional increases in human labor. A death spiral at scale. Media companies face a brutal choice: scale headcount linearly with content volume, or build AI systems that break the linear relationship.

Manual operations that consume hours per asset become impossible at 100+ pieces monthly. The math doesn't lie.`,
    solutionApproach: `We designed, built, and deployed three production AI systems.

System 1: AI-powered video QC with Netflix standards. LLM-based text detection identifying on-screen overlays, spelling errors, brand violations. Multi-stage pipeline: frame extraction → OCR → LLM interpretation → compliance scoring.

System 2: Podcast-to-social content pipeline. 4-stage AI workflow: chunking → interpretation → tweetification → editing. 500+ line LLM prompts for consistent brand voice. AirTable integration for content management. One 60-minute podcast transforms into Twitter threads, blogs, short-form scripts.

System 3: YouTube analytics Chrome extension. Automated PRE/POST treatment comparison. 35-column data export. Cross-platform aggregation across YouTube, Twitter, LinkedIn.

Additional tools: profile matching via Playwright and Pillow for cross-platform guest identification, headline generators for CTR optimization, end-to-end content pipelines from raw footage to multi-platform distribution.`,
    resultsOutcome: `All three systems launched August 2024, now running as core operational infrastructure.

70% manual workload obliterated. Content team freed from hours of repetitive QC, repurposing, and analytics work.

Video QC efficiency: 60+ minutes → 5-10 minutes per video (83-92% gain). Content repurposing: 4-6 hours → 20 minutes per episode (93% acceleration). Analytics: 35-column reports in 5 minutes vs. 2+ hours manual compilation (96% reduction).

10x content multiplication. Single longform asset becomes 10+ platform-specific pieces automatically. Netflix-level enforcement automated—quality standards no longer dependent on human vigilance.

Here's the thing: AI automation doesn't replace creative teams. It eliminates the grunt work choking them. A 70% workload reduction doesn't mean 70% fewer people. It means 10x more output with the same team. The creative work gets done by humans. The repetitive work gets done by machines.`,
    servicesUsed: ['ai-automation', 'content-marketing']
  },
  {
    slug: 'iot-manufacturing-robot-tracking',
    tldr: `Automotive manufacturer deploying multi-million dollar autonomous mobile robots across factory floors—and operations teams couldn't see any of them. Zero real-time tracking, vendor systems incompatible with their digital twin platform. We engineered bidirectional IoT integration: MQTT for 10Hz position streaming, REST APIs for control commands, OAuth 2.0 per-device auth. Now monitoring robots across multiple plants in real-time with zero downtime.`,
    keyTakeaways: [
      'Design hybrid protocol architecture—MQTT for high-frequency data streaming, REST for command-and-control operations',
      'Implement OAuth 2.0 per-device authentication for enterprise-grade IoT security—one compromised device shouldn\'t compromise the network',
      'Build coordinate transformation pipelines when integrating systems with different spatial references',
      'Create vendor onboarding documentation that reduces integration time from weeks to days',
      'Engineer failover mechanisms—network interruptions happen, your monitoring can\'t go blind'
    ],
    problemStatement: `Factories of Future was deploying autonomous mobile robots for one of the region's largest automotive manufacturers. Multi-million dollar AMRs handling material transport across factory floors—and operations teams couldn't see any of them.

Zero real-time tracking. No visibility into robot positions, tasks, or states. The AMR vendor's proprietary interface was incompatible with the Twinzo digital twin platform the manufacturer used.

Multi-plant chaos. Multiple facilities with different coordinate systems and layouts. No unified view across locations. Enterprise security requirements meant production floor IoT demanded robust per-device authentication—you can't have robots on open networks in automotive manufacturing.

Performance demands were brutal. Factory monitoring needs near-instantaneous updates. We're talking 10Hz or faster—10 position updates per second per robot.

In smart manufacturing, real-time visibility isn't a nice-to-have. It's the foundation. If you can't see your factory floor in real-time, you're not running a smart factory. You're guessing.`,
    solutionApproach: `We engineered bidirectional integration between the AMR vendor's control system and Twinzo using a hybrid protocol architecture.

MQTT for high-frequency position data—10Hz streaming from multiple robots simultaneously. REST APIs for control commands. Message broker infrastructure built for real-time with failover mechanisms handling network interruptions gracefully.

OAuth 2.0 per-device authentication for secure AMR-to-platform communication. Credential management system for onboarding and token rotation. Plant-specific configuration layer handling different coordinate systems across facilities. Coordinate transformation pipeline mapping AMR positions to digital twin coordinates.

Built MQTT subscriber handling 10Hz updates from multiple robots. Data normalization for vendor-specific message formats. Integration with Twinzo for real-time robot visualization on factory layouts. Status tracking: battery levels, task assignments, error states.

Comprehensive documentation and vendor onboarding guides reduced integration time from weeks to days.`,
    resultsOutcome: `Live in production since August 2024 across multi-plant operations.

10Hz real-time tracking—position data updated 10 times per second for instantaneous visibility. Multi-plant deployment on a single platform monitoring AMRs across all facilities. Zero downtime thanks to failover mechanisms ensuring continuous monitoring through network issues.

Enterprise-grade security with OAuth 2.0 per-device tokens. No vulnerabilities from shared credentials or open networks.

Vendor-agnostic architecture. New AMR vendors onboard in days, not weeks. The documentation and guides we created became the standard for future integrations. Infinite scalability—add robots and plants without code changes.

This integration became the foundation for the manufacturer's smart factory monitoring infrastructure. Good architecture and documentation pay dividends every time you add a plant or vendor.

Industrial IoT integration isn't about connecting devices. It's about building secure, scalable infrastructure that works in production.`,
    servicesUsed: ['ai-automation']
  }
];

async function main() {
  console.log('Starting full case study update (all 12)...\n');

  let successCount = 0;
  let failCount = 0;

  for (const study of caseStudies) {
    console.log(`Processing: ${study.slug}`);

    try {
      // Find document by slug
      const doc = await client.fetch(
        `*[_type == "caseStudy" && slug.current == $slug][0]{ _id }`,
        { slug: study.slug }
      );

      if (!doc) {
        console.log(`  ❌ Not found in Sanity\n`);
        failCount++;
        continue;
      }

      console.log(`  Found: ${doc._id}`);

      // Update document
      await client
        .patch(doc._id)
        .set({
          tldr: study.tldr,
          keyTakeaways: study.keyTakeaways,
          problemStatement: study.problemStatement,
          solutionApproach: study.solutionApproach,
          resultsOutcome: study.resultsOutcome,
          servicesUsed: study.servicesUsed
        })
        .commit();

      console.log(`  ✅ Updated successfully\n`);
      successCount++;

    } catch (error) {
      console.log(`  ❌ Error: ${error.message}\n`);
      failCount++;
    }
  }

  console.log(`\nBatch update complete!`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
}

main().catch(console.error);
