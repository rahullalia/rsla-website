"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import ImageLightbox from "@/components/ImageLightbox";
import Link from "next/link";

export default function RSLBlogContent() {
    const stats = [
        { value: "$18K", label: "Annual Cost Saved" },
        { value: "4X", label: "Posts per Month Achieved" },
        { value: "99%", label: "Manual Work Eliminated" },
    ];

    return (
        <CaseStudyLayout
            tag="AI Automation & Content Strategy"
            title="How We Eliminated $18K/Year in Copywriting Costs and Quadrupled Output"
            description="Copywriting at $75/article was bleeding us dry. We engineered an AI content pipeline using Make.com and GPT-4 that cut costs by 99% while publishing 4X more content, proving we eat our own cooking."
            stats={stats}
        >
            <h2>The Challenge: $75 Per Article Was Unsustainable</h2>
            <p>
                Content marketing is non-negotiable for demonstrating expertise. But at $75 per article, publishing four posts monthly cost $300/month, or $3,600 annually in raw copywriting fees. Factor in coordination, editing, and publishing time, and the true cost approached <strong>$18,000 per year</strong>.
            </p>
            <p>
                Beyond cost, two critical factors were failing:
            </p>
            <ul>
                <li><strong>Time drain:</strong> Manual editing and publishing choked the content pipeline</li>
                <li><strong>Consistency collapse:</strong> Weekly publishing schedules were aspirational, not operational</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Human labor in low-margin content production doesn&apos;t scale. Every hour spent on repetitive content tasks is an hour not spent on strategy. The math demands automation.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Fix Your Content Economics
                </Link>
            </div>

            <h2>The Solution: We Engineered an Autonomous Content Pipeline</h2>
            <p>
                We built this system for ourselves first, then opened it to clients. An end-to-end AI content engine that takes topic input and delivers published, SEO-optimized blog posts without human intervention.
            </p>

            <h3>Phase 1: Constructed Structured Input & AI Integration</h3>
            <ul>
                <li>Deployed Typeform frontend capturing blog topics, primary/secondary keywords, and internal/external links</li>
                <li>Configured Google Sheets as central tracking record for content pipeline visibility</li>
                <li>Engineered custom prompts instructing GPT-4 to generate SEO-optimized outlines and full posts matching our brand voice</li>
            </ul>

            <ImageLightbox
                src="/images/case-studies/rsl-blog-automation/typeform-screenshot.webp"
                alt="Typeform interface for blog topic input"
                caption="Typeform input interface (click to enlarge)"
                className="my-12"
                size="medium"
            />

            <h3>Phase 2: Deployed End-to-End Automation</h3>
            <p>
                The entire system runs on <strong>Make.com</strong>. Topic enters Typeform → AI generates content → Google Drive organizes assets → WordPress publishes automatically. Zero manual copying, pasting, or scheduling. Human involvement: optional quality review.
            </p>

            <ImageLightbox
                src="/images/case-studies/rsl-blog-automation/automation-screenshot.webp"
                alt="Make.com automation workflow for blog publishing"
                caption="Make.com automation workflow (click to enlarge)"
                className="my-12"
                size="large"
            />

            <div className="my-8 p-6 bg-white/[0.03] border border-white/10 rounded-lg max-w-2xl mx-auto">
                <h4 className="text-lg font-semibold mb-3">Want This Exact System?</h4>
                <p className="text-gray-400 mb-4">
                    We build custom AI content engines tailored to your brand voice, SEO strategy, and publishing workflow.
                </p>
                <p className="mb-4">
                    <a
                        href="/downloads/typeform-ai-content-generator.blueprint.json"
                        download
                        className="text-brand-blue hover:underline"
                    >
                        → Download the Make.com blueprint
                    </a>
                </p>
                <Link
                    href="/#contact"
                    className="inline-block bg-brand-blue px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors text-white"
                >
                    Get Started
                </Link>
            </div>

            <h2>The Results: $18K Saved, 4X Output, 99% Automation</h2>

            <div className="proof-box">
                <h3>Internal Reflection</h3>
                <p>
                    &quot;What used to cost the same as a part-time employee now runs for less than the cost of a single outsourced article. We don&apos;t just sell automation. We run on it.&quot;
                </p>
            </div>

            <p>
                The system delivered immediate, measurable impact:
            </p>

            <ul>
                <li><strong>$18,000 annual savings:</strong> Compared to fully-burdened manual copywriting costs</li>
                <li><strong>4X content velocity:</strong> Weekly publishing now operational, not aspirational</li>
                <li><strong>99% manual work eliminated:</strong> Data entry, writing, formatting, all automated</li>
                <li><strong>Consistent quality:</strong> Every post follows SEO best practices and brand voice guidelines</li>
            </ul>

            <div className="cta-section">
                <h2>Your Content Costs Are Eating Your Margins</h2>
                <p>
                    If you&apos;re paying $50-150 per article, or worse, not publishing consistently because it&apos;s too expensive, the math is broken. We build AI content systems that fix the economics permanently.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Fix Your Content Economics
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
