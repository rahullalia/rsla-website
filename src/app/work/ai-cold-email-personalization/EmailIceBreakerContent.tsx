"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import ImageLightbox from "@/components/ImageLightbox";
import Link from "next/link";

export default function EmailIceBreakerContent() {
    const stats = [
        { value: "94%", label: "Time Reduction" },
        { value: "$43K+", label: "Annual Savings" },
        { value: "325hrs", label: "Recovered Per Year" },
    ];

    return (
        <CaseStudyLayout
            tag="AI Automation & Cold Email"
            title="How We Slashed Cold Email Research from 8 Minutes to 30 Seconds"
            description="We were burning 350 hours/year on manual cold email personalization. We engineered an AI system that generates LinkedIn-enriched icebreakers in seconds, recovering $43K annually and making every outreach feel hand-crafted."
            stats={stats}
        >
            <h2>The Challenge: 8 Minutes Per Email Was Killing Our Outreach</h2>
            <p>
                Here&apos;s the brutal math every sales team ignores: personalized emails get 5-8X higher response rates than templates. But personalizing each email costs 8 minutes of research and writing. At scale, that math breaks completely.
            </p>
            <p>
                We were hemorrhaging time. And choosing between quality and volume meant losing either way.
            </p>

            <h3>The Time Drain We Couldn&apos;t Ignore</h3>
            <p>
                Every single personalized cold email demanded:
            </p>
            <ul>
                <li><strong>LinkedIn stalking:</strong> 1-2 minutes scanning their profile, headline, and recent activity</li>
                <li><strong>Company research:</strong> 2-3 minutes understanding their business context and pain points</li>
                <li><strong>Icebreaker crafting:</strong> 3-5 minutes writing something that doesn&apos;t sound like a robot</li>
                <li><strong>Total per email:</strong> 8 minutes of pure friction</li>
            </ul>

            <h3>The Math That Demanded a Solution</h3>
            <p>
                At scale, this time sink became catastrophic:
            </p>
            <ul>
                <li><strong>50 emails/week</strong> × 8 minutes = 6.7 hours gone every week</li>
                <li><strong>Annual time burn:</strong> 350 hours, nearly 9 full work weeks</li>
                <li><strong>Cost at agency rate:</strong> $46,725/year vanishing into research</li>
            </ul>

            <p>
                The alternative? Generic templates that guaranteed sub-2% reply rates. We refused to accept either option.
            </p>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    The cold email trap: personalize manually (unsustainable) or blast templates (ineffective). Most teams pick volume over quality and wonder why their pipeline is dry. We chose neither. We engineered a third path.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Escape the Outreach Trap
                </Link>
            </div>

            <h2>The Solution: We Built an AI Personalization Engine</h2>
            <p>
                We architected an automated system that ingests LinkedIn enrichment data and deploys GPT-4 to generate custom icebreakers for every prospect. The output: emails that feel hand-crafted, produced in seconds instead of minutes.
            </p>

            <h3>The Architecture</h3>
            <ImageLightbox
                src="/images/case-studies/email-ice-breaker/workflow-screenshot.png"
                alt="AI Email Ice-Breaker Make.com Workflow"
                caption="The complete Make.com workflow: Google Sheets → OpenAI → Update Sheet (click to enlarge)"
                className="my-12"
                size="large"
            />

            <h3>Phase 1: Ingested LinkedIn Enrichment Data</h3>
            <p>
                We configured a Google Sheet pipeline fed by enriched prospect data:
            </p>
            <ul>
                <li><strong>Core identifiers:</strong> Name, email, company (the basics)</li>
                <li><strong>LinkedIn intelligence:</strong> Job title, headline, profile URL, recent activity</li>
                <li><strong>Business signals:</strong> Industry, company size, growth trajectory</li>
                <li><strong>Enrichment depth:</strong> Tech stack, funding status, hiring patterns</li>
            </ul>
            <p>
                Data sources:{" "}
                <a
                    href="https://get.apollo.io/rslmh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-blue hover:underline"
                >
                    Apollo.io
                </a>, LinkedIn Sales Navigator, or Clay.com. Richer context = sharper personalization.
            </p>

            <h3>Phase 2: Deployed GPT-4 for Icebreaker Generation</h3>
            <p>
                Make.com executes daily, processing every lead missing an icebreaker:
            </p>
            <ul>
                <li><strong>Extracts all enrichment data</strong> from the prospect row</li>
                <li><strong>Feeds GPT-4</strong> a custom prompt containing:
                    <ul>
                        <li>Their LinkedIn headline and current role</li>
                        <li>Company context and industry vertical</li>
                        <li>Recent LinkedIn activity or thought leadership</li>
                        <li>RSL/A service alignment (AI automation, CRM, marketing systems)</li>
                    </ul>
                </li>
                <li><strong>Outputs a 2-3 sentence icebreaker</strong> that:
                    <ul>
                        <li>References something specific to their role or company</li>
                        <li>Demonstrates genuine research investment</li>
                        <li>Bridges naturally to our value proposition</li>
                        <li>Reads like a human wrote it, not a template engine</li>
                    </ul>
                </li>
            </ul>

            <h3>Phase 3: Automated Pipeline Completion</h3>
            <p>
                AI-generated icebreakers write back to Google Sheets instantly. The sales team now has:
            </p>
            <ul>
                <li>Fully researched, personalized opening lines, ready to deploy</li>
                <li>Context annotations explaining why each icebreaker works</li>
                <li>Copy-paste content compatible with any email platform</li>
                <li>Consistent quality at infinite scale</li>
            </ul>

            <div className="proof-box">
                <h3>The Technology Stack</h3>
                <p>
                    <strong>Google Sheets:</strong> Lead database with LinkedIn enrichment data
                </p>
                <p>
                    <strong>
                        <a
                            href="https://www.make.com/en/register?pc=rslmediahub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-blue hover:underline"
                        >
                            Make.com
                        </a>:
                    </strong> Automation platform connecting all systems (3 modules)
                </p>
                <p>
                    <strong>OpenAI GPT-4:</strong> AI model that analyzes context and writes personalized icebreakers
                </p>
                <p>
                    <strong>
                        <a
                            href="https://get.apollo.io/rslmh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-blue hover:underline"
                        >
                            Apollo.io
                        </a>/LinkedIn enrichment:
                    </strong> Provides the context data AI needs for personalization
                </p>
                <p className="mt-4">
                    <a
                        href="/downloads/case-studies/email-ice-breaker/blueprint.json"
                        download
                        className="text-brand-blue hover:underline"
                    >
                        → Download the Make.com blueprint
                    </a>
                </p>
            </div>

            <h2>The Results: 325 Hours Recovered. $43K Saved. 94% Time Reduction.</h2>
            <p>
                The transformation was immediate:
            </p>

            <h3>Time Obliterated</h3>
            <ul>
                <li><strong>Before:</strong> 8 minutes per email (research + writing)</li>
                <li><strong>After:</strong> 30 seconds per email (quick review, copy, send)</li>
                <li><strong>Per-email savings:</strong> 7.5 minutes eliminated (94% reduction)</li>
                <li><strong>Weekly recovery:</strong> 6.25 hours reclaimed</li>
                <li><strong>Annual recovery:</strong> 325 hours, over 8 full work weeks returned</li>
            </ul>

            <h3>Financial Transformation</h3>
            <ul>
                <li><strong>Weekly value:</strong> $834 in recovered productivity</li>
                <li><strong>Annual value:</strong> $43,387 in time savings</li>
                <li><strong>Build investment:</strong> 3 hours ($400)</li>
                <li><strong>Break-even point:</strong> 29 emails, less than one week</li>
                <li><strong>First-year ROI:</strong> 10,746%</li>
            </ul>

            <h3>Quality + Scale Unlocked</h3>
            <ul>
                <li><strong>Consistent excellence:</strong> Every icebreaker is context-aware and thoughtful</li>
                <li><strong>Zero writer&apos;s block:</strong> AI generates fresh angles on demand</li>
                <li><strong>Infinite scalability:</strong> 10 leads or 10,000, same effort</li>
                <li><strong>5-8X response lift:</strong> Personalized emails crush templates (industry benchmark)</li>
                <li><strong>Team amplification:</strong> Junior reps now output senior-level research quality</li>
            </ul>

            <h3>Real Example</h3>
            <div className="proof-box">
                <h3>Sample AI-Generated Icebreaker</h3>
                <p><strong>Prospect:</strong> Sarah Chen, VP of Marketing at TechFlow Solutions (B2B SaaS, 50 employees)</p>
                <p><strong>LinkedIn Headline:</strong> &quot;Scaling growth marketing for early-stage B2B SaaS | Ex-HubSpot&quot;</p>
                <p><strong>AI-Generated Icebreaker:</strong></p>
                <p className="italic">
                    &quot;Hi Sarah, I noticed you&apos;re scaling growth marketing at TechFlow after your time at HubSpot. Given your experience with marketing automation at scale, I thought you might be interested in how we&apos;re helping B2B SaaS companies like yours automate their lead nurture workflows using AI, cutting manual work by 70% while improving conversion rates.&quot;
                </p>
                <p className="mt-4">
                    <strong>Why this works:</strong> References her specific background (HubSpot), acknowledges her current role (scaling growth), and positions our solution as relevant to her exact challenges.
                </p>
            </div>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    A 3-hour build now saves 325+ hours annually and $43K in labor. The personalization vs. scale dilemma? Solved. We now send 100 emails with the same quality as 5 hand-written ones. That&apos;s not optimization. That&apos;s leverage.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Build Your Outreach Engine
                </Link>
            </div>

            <h2>Built For: Teams That Refuse to Choose Between Quality and Volume</h2>
            <p>
                This system is engineered for anyone running cold outreach who refuses to sacrifice personalization for scale:
            </p>

            <h3>High-Impact Use Cases</h3>
            <ul>
                <li><strong>B2B Sales Teams:</strong> 50-500 cold emails weekly to C-suite decision-makers</li>
                <li><strong>Marketing Agencies:</strong> Multi-client outbound campaigns at agency velocity</li>
                <li><strong>Consultants & Freelancers:</strong> Pipeline building without the time tax</li>
                <li><strong>SaaS Companies:</strong> Personalized product messaging at PLG scale</li>
                <li><strong>Recruiters:</strong> Passive candidate outreach that actually gets replies</li>
            </ul>

            <h3>Requirements</h3>
            <ul>
                <li>Access to LinkedIn enrichment data ({" "}
                    <a
                        href="https://get.apollo.io/rslmh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline"
                    >
                        Apollo
                    </a>, Clay, Sales Navigator, etc.)</li>
                <li>Google Sheets for lead management</li>
                <li>
                    <a
                        href="https://www.make.com/en/register?pc=rslmediahub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline"
                    >
                        Make.com
                    </a> account (free tier works for smaller volumes)</li>
                <li>OpenAI API access (costs ~$0.01-0.03 per personalized icebreaker)</li>
            </ul>

            <h2>Why We Built This: We Eat Our Own Cooking</h2>
            <p>
                This wasn&apos;t built for a client. It was built for us. We hit the same personalization wall every sales team hits and refused to accept the tradeoff. After deploying internally and seeing the ROI, we started building variations for clients.
            </p>
            <p>
                Now it&apos;s one of our most requested automations. The ROI is undeniable, and the setup takes hours, not weeks.
            </p>
            <p>
                <strong>Deployed variations include:</strong>
            </p>
            <ul>
                <li>Real estate agents targeting property owners</li>
                <li>Recruiters reaching passive candidates</li>
                <li>E-commerce brands running B2B wholesale outreach</li>
                <li>Consultants building strategic connections</li>
            </ul>

            <div className="cta-section">
                <h2>Your Cold Email Is Either Personal or Ignored</h2>
                <p>
                    If you&apos;re still choosing between volume and quality, you&apos;re playing last decade&apos;s game. AI-powered personalization delivers both at a fraction of the cost.
                </p>
                <p className="mt-4">
                    We build custom email personalization engines tailored to your industry, ICP, and workflow.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Scale Your Outreach
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
