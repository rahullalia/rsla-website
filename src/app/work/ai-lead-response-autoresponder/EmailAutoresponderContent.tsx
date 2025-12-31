"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import ImageLightbox from "@/components/ImageLightbox";
import Link from "next/link";

export default function EmailAutoresponderContent() {
    const stats = [
        { value: "24 sec", label: "Avg Response Time" },
        { value: "24/7", label: "Lead Capture" },
        { value: "100%", label: "Personalized" },
    ];

    return (
        <CaseStudyLayout
            tag="AI Automation & Email Intelligence"
            title="How We Built a 24-Second Response System That Converts 21X Better Than Manual Follow-Up"
            description="Generic auto-replies scream 'nobody's reading this.' We engineered an AI system that reads incoming emails and generates personalized responses in 24 seconds, making leads feel heard while you sleep, close deals, or live your life."
            stats={stats}
        >
            <h2>The Challenge: Every Minute of Silence Costs You Money</h2>
            <p>
                &quot;Thank you for contacting us. We will respond within 24-48 business hours.&quot; You&apos;ve sent that email. And you&apos;ve received it. We all know what it really means: nobody read your message, you&apos;re in a queue, and your problem isn&apos;t a priority.
            </p>
            <p>
                The data is brutal. Harvard Business Review found that <strong>leads who receive a response within 5 minutes are 21X more likely to convert</strong> than those contacted 30 minutes later. But what if you&apos;re offline? Sleeping? In meetings? The lead doesn&apos;t care. They&apos;re already comparing competitors.
            </p>

            <h3>The Lead Hemorrhage</h3>
            <ul>
                <li><strong>35% of web leads arrive outside business hours</strong> (evenings, weekends, holidays) according to InsideSales.com</li>
                <li><strong>Every hour of delay decreases conversion by 10%</strong> (Drift)</li>
                <li><strong>60% of customers would rather wait for a human</strong> than receive a robotic auto-reply (Zendesk)</li>
            </ul>
            <p>
                The impossible choice: respond instantly with generic garbage (and turn people off), or respond personally hours later (and lose hot leads). Most businesses pick one poison or the other and wonder why their pipeline leaks.
            </p>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Speed without personalization feels robotic. Personalization without speed loses deals. Traditional auto-replies fail at both. The market rewards businesses that crack this paradox and punishes those that don&apos;t.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Crack the Response Paradox
                </Link>
            </div>

            <h2>The Solution: We Engineered an AI That Actually Reads Every Email</h2>
            <p>
                We architected an intelligent email response system that doesn&apos;t just acknowledge receipt. It <strong>reads, analyzes, and personalizes</strong> every reply in real-time. The AI extracts the sender&apos;s specific question, identifies their industry, and crafts a response that references what they actually asked about.
            </p>
            <p>
                The result: emails that feel human-written, delivered in 24 seconds, 24/7.
            </p>

            <h3>The Architecture</h3>
            <ImageLightbox
                src="/images/case-studies/email-autoresponder/workflow-screenshot.png"
                alt="AI Email Auto-Responder Make.com Workflow"
                caption="The complete Make.com workflow: Email Trigger → AI Analysis → Personalized Reply (click to enlarge)"
                className="my-12"
                size="large"
            />

            <h3>Phase 1: Deployed 24/7 Inbox Surveillance</h3>
            <ul>
                <li>Configured Make.com to monitor inbox continuously via IMAP/Gmail connection</li>
                <li>Engineered smart filtering rules targeting contact form submissions, specific keywords, and sender patterns</li>
                <li>Implemented instant trigger with typical 15-30 second response latency</li>
            </ul>

            <h3>Phase 2: Deployed Dual-Stage AI Analysis</h3>
            <p>
                Instead of canned responses, we engineered a two-pass AI system using OpenAI GPT-4:
            </p>
            <ul>
                <li><strong>First AI call (Intelligence Extraction):</strong> Reads email body and subject, extracts the core question, identifies inquiry category (sales, support, partnership), determines urgency</li>
                <li><strong>Second AI call (Response Generation):</strong> References the specific question identified, provides context relevant to their industry, sets expectations with appropriate timelines, adds conversational human touch</li>
            </ul>

            <h3>Phase 3: Engineered Psychological Timing</h3>
            <p>
                Critical insight: instant replies (0-5 seconds) scream &quot;bot.&quot; We engineered a 30-90 second random delay before sending.
            </p>
            <ul>
                <li><strong>Feels more human:</strong> Suggests someone actually read the message</li>
                <li><strong>Creates perception of consideration:</strong> A 60-second delay implies thought, not automation</li>
                <li><strong>Bypasses spam filters:</strong> Slight delays reduce automated flagging</li>
            </ul>

            <div className="proof-box">
                <h3>The Technology Stack</h3>
                <p>
                    <strong>Email (IMAP/Gmail):</strong> Inbox monitoring and trigger mechanism
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
                    </strong> Automation orchestration platform (5 modules)
                </p>
                <p>
                    <strong>OpenAI GPT-4:</strong> Dual AI calls for message analysis and reply generation
                </p>
                <p>
                    <strong>Smart delay function:</strong> Random 30-90 second wait for human-like timing
                </p>
                <p className="mt-4">
                    <a
                        href="/downloads/case-studies/email-autoresponder/blueprint.json"
                        download
                        className="text-brand-blue hover:underline"
                    >
                        → Download the Make.com blueprint
                    </a>
                </p>
            </div>

            <h2>The Results: Generic vs. Intelligent, Night and Day</h2>
            <p>
                The difference is visceral. See it in action:
            </p>

            <h3>Example 1: Service Inquiry</h3>
            <div className="proof-box">
                <p><strong>Incoming Email:</strong></p>
                <p className="italic mb-4">
                    &quot;Hi, I&apos;m interested in learning more about your GoHighLevel CRM setup services. We&apos;re a dental practice with 3 locations and currently using outdated software. Do you work with healthcare businesses?&quot;
                </p>

                <p><strong>Generic Auto-Reply (Bad):</strong></p>
                <p className="italic mb-4 text-gray-500">
                    &quot;Thank you for contacting RSL/A. We have received your message and will respond within 24-48 business hours.&quot;
                </p>

                <p><strong>AI-Personalized Auto-Reply (Good):</strong></p>
                <p className="italic">
                    &quot;Hi there! Thanks for reaching out about our GoHighLevel CRM services for your dental practice. We absolutely work with healthcare businesses. In fact, we&apos;ve helped several multi-location dental offices streamline their patient management and appointment systems using GHL. Someone from our team will reach out within 24-48 hours to discuss how we can help modernize your 3-location setup. Looking forward to connecting!&quot;
                </p>
            </div>

            <h3>Example 2: Partnership Inquiry</h3>
            <div className="proof-box">
                <p><strong>Incoming Email:</strong></p>
                <p className="italic mb-4">
                    &quot;I run a web design agency and we have clients asking for automation work that&apos;s outside our expertise. Would you be open to discussing a partnership or referral arrangement?&quot;
                </p>

                <p><strong>Generic Auto-Reply (Bad):</strong></p>
                <p className="italic mb-4 text-gray-500">
                    &quot;Thank you for contacting RSL/A. We have received your message and will respond within 24-48 business hours.&quot;
                </p>

                <p><strong>AI-Personalized Auto-Reply (Good):</strong></p>
                <p className="italic">
                    &quot;Hey! Thanks for thinking of us for a potential partnership around automation work. We love working with web design agencies. It&apos;s a natural fit since many of your clients need the automation and CRM backend to match their new websites. One of our partners will reach out within 24-48 hours to discuss referral arrangements and how we can support your clients together. Excited to explore this!&quot;
                </p>
            </div>

            <h3>Why This Converts</h3>
            <ul>
                <li><strong>Specific acknowledgment:</strong> References &quot;dental practice,&quot; &quot;3 locations,&quot; &quot;GoHighLevel,&quot; &quot;web design agency&quot;</li>
                <li><strong>Relevant social proof:</strong> &quot;We&apos;ve helped several dental offices&quot; signals expertise in their vertical</li>
                <li><strong>Intelligent routing:</strong> Different team members for different inquiry types</li>
                <li><strong>Conversational cadence:</strong> Reads like a human who quickly replied, not a robot</li>
                <li><strong>Trust signal:</strong> The sender knows their message was actually read and understood</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    &quot;We got your message&quot; vs. &quot;We read your message about X and here&apos;s what happens next.&quot; The gap is massive. One feels robotic. The other feels attentive. Attentiveness = trust = conversion. The AI makes it possible at scale.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Build Your Intelligent Responder
                </Link>
            </div>

            <h2>Built For: Any Business Bleeding Leads to Slow Response</h2>
            <p>
                This system works for any business receiving email inquiries who refuses to choose between speed and quality:
            </p>

            <h3>High-Impact Use Cases</h3>
            <ul>
                <li><strong>Service Businesses:</strong> Agencies, consultants, freelancers losing evening/weekend leads</li>
                <li><strong>E-commerce:</strong> Product questions, wholesale inquiries, partnership requests at scale</li>
                <li><strong>Local Businesses:</strong> Dental offices, salons, contractors with after-hours form submissions</li>
                <li><strong>SaaS Companies:</strong> Demo requests, support tickets, partnership inquiries 24/7</li>
                <li><strong>Real Estate:</strong> Property inquiries that arrive while you&apos;re showing other properties</li>
                <li><strong>Professional Services:</strong> Law firms, accountants, advisors who can&apos;t always answer immediately</li>
            </ul>

            <h3>Technical Requirements</h3>
            <ul>
                <li>Email account with IMAP access (Gmail, Outlook, etc.)</li>
                <li>
                    <a
                        href="https://www.make.com/en/register?pc=rslmediahub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue hover:underline"
                    >
                        Make.com
                    </a> account (free tier works for low-volume)</li>
                <li>OpenAI API access (~$0.02-0.05 per personalized auto-reply)</li>
                <li>Clear criteria defining which emails trigger the system</li>
            </ul>

            <h2>The Psychology: Why &quot;Smart&quot; Auto-Replies Convert</h2>
            <p>
                Here&apos;s the fascinating part: customers often know it&apos;s automated. But because it references their specific question, perception shifts entirely.
            </p>
            <p>
                <strong>Generic auto-reply:</strong> &quot;They didn&apos;t read my email. I&apos;m just a number in a queue.&quot;
            </p>
            <p>
                <strong>Personalized auto-reply:</strong> &quot;Someone quickly read my message and sent a thoughtful response. They&apos;re paying attention.&quot;
            </p>
            <p>
                The psychological gap is massive. <strong>Feeling heard matters more than knowing whether a human or AI did the hearing.</strong>
            </p>

            <div className="cta-section">
                <h2>Your Leads Are Cooling While You Read This</h2>
                <p>
                    Every minute without a response costs you money. Every generic auto-reply erodes trust. This system solves both simultaneously.
                </p>
                <p className="mt-4">
                    We build production-ready intelligent responders with custom reply logic, smart routing rules, and CRM integration. Your leads feel heard. Your team stays focused.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Stop Bleeding Leads
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
