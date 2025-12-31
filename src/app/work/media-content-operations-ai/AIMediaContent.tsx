"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import Link from "next/link";

export default function AIMediaContent() {
    const stats = [
        { value: "70%", label: "Workload Reduction" },
        { value: "83-92%", label: "QC Time Saved" },
        { value: "3", label: "Production AI Systems" },
    ];

    return (
        <CaseStudyLayout
            tag="AI Engineering & Content Automation"
            title="How We Slashed 70% of a Media Company's Manual Workload with Three Production AI Systems"
            description="A Singapore media company was drowning in 60-minute video QC sessions, 6-hour content repurposing cycles, and fragmented analytics. As Founding Engineer, we architected three production AI systems that now run their daily operations, freeing the creative team to actually create."
            stats={stats}
        >
            <h2>The Challenge: Scaling Content Without Scaling Headcount</h2>
            <p>
                CrazyTok Media was winning. Revenue up. Content volume exploding. But their operations couldn&apos;t keep pace. Every video meant 60+ minutes of manual QC. Every podcast episode meant 4-6 hours of content repurposing. Analytics lived in a dozen fragmented dashboards with no unified view.
            </p>
            <p>
                The operational bleeding:
            </p>
            <ul>
                <li><strong>60+ minute video QC sessions:</strong> Manual frame-by-frame review for text overlays, audio sync, and brand compliance</li>
                <li><strong>4-6 hours per content repurpose:</strong> Transforming one podcast into Twitter threads, blogs, and short-form clips consumed entire days</li>
                <li><strong>Analytics chaos:</strong> YouTube metrics scattered across dashboards, PRE/POST comparison nearly impossible</li>
                <li><strong>No quality enforcement:</strong> Netflix-level standards existed on paper, but manual review couldn&apos;t consistently enforce them</li>
                <li><strong>Linear scaling trap:</strong> Every new content piece required proportional increases in human labor, a death spiral at scale</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Media companies face a brutal choice: scale headcount linearly with content volume, or build AI systems that break the linear relationship. Manual operations that consume hours per asset become impossible at 100+ pieces monthly. The math doesn&apos;t lie.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Break the Linear Trap
                </Link>
            </div>

            <h2>The Solution: We Architected Three Production AI Systems from Scratch</h2>
            <p>
                As Founding Engineer, we designed, built, and deployed three distinct AI automation systems, each targeting a critical operational bottleneck. These aren&apos;t prototypes. They&apos;re production systems running daily operations.
            </p>

            <h3>System 1: Deployed AI-Powered Video QC with Netflix Standards</h3>
            <ul>
                <li>Engineered LLM-based text detection system identifying on-screen overlays, spelling errors, and brand violations</li>
                <li>Architected multi-stage pipeline: frame extraction → OCR → LLM interpretation → compliance scoring</li>
                <li>Integrated industry-standard quality checks matching major streaming platform requirements</li>
                <li><strong>Impact:</strong> 60+ minutes → 5-10 minutes per video (83-92% efficiency gain)</li>
            </ul>

            <h3>System 2: Constructed Podcast → Social Content Pipeline</h3>
            <ul>
                <li>Architected 4-stage AI workflow: chunking → interpretation → tweetification → editing</li>
                <li>Engineered 500+ line LLM prompts for consistent brand voice across all outputs</li>
                <li>Built AirTable integration for content management and team review workflows</li>
                <li>Automated transformation: one 60-minute podcast → Twitter threads, blogs, short-form scripts</li>
                <li><strong>Impact:</strong> 4-6 hours → 20 minutes per episode</li>
            </ul>

            <h3>System 3: Built YouTube Analytics Chrome Extension</h3>
            <ul>
                <li>Developed custom Chrome extension for YouTube Studio with automated PRE/POST treatment comparison</li>
                <li>Constructed 35-column data export: views, CTR, watch time, traffic sources, engagement metrics</li>
                <li>Created cross-platform aggregation comparing performance across YouTube, Twitter, LinkedIn</li>
                <li><strong>Impact:</strong> 2+ hours → 5 minutes for comprehensive analytics reporting</li>
            </ul>

            <h3>Deployed Additional AI-Powered Tools</h3>
            <ul>
                <li><strong>Profile matching:</strong> Image recognition via Playwright and Pillow for cross-platform guest identification</li>
                <li><strong>Headline generators:</strong> LLM-powered title and thumbnail optimization for maximum CTR</li>
                <li><strong>Content workflow automation:</strong> End-to-end pipelines from raw footage to multi-platform distribution</li>
            </ul>

            <div className="proof-box">
                <h3>Engineering Philosophy</h3>
                <p>
                    These aren&apos;t prototypes. They&apos;re production systems handling daily operations for a scaling media company. Every system was engineered with error handling, quality validation, and team workflows baked in. The 70% workload reduction didn&apos;t eliminate jobs. It eliminated grunt work.
                </p>
            </div>

            <h2>The Results: 70% Workload Eliminated, Creative Team Unleashed</h2>
            <p>
                All three systems launched August 2024 through present, now running as core operational infrastructure:
            </p>
            <ul>
                <li><strong>70% manual workload obliterated:</strong> Content team freed from hours of repetitive QC, repurposing, and analytics work</li>
                <li><strong>83-92% video QC efficiency:</strong> 60+ minutes → 5-10 minutes per video</li>
                <li><strong>93% content repurposing acceleration:</strong> 4-6 hours → 20 minutes per episode</li>
                <li><strong>96% analytics time reduction:</strong> 35-column reports in 5 minutes vs. 2+ hours manual compilation</li>
                <li><strong>10x content multiplication:</strong> Single longform asset → 10+ platform-specific pieces automatically</li>
                <li><strong>Netflix-level enforcement:</strong> Automated quality standards no longer dependent on human vigilance</li>
                <li><strong>Data-driven iteration:</strong> Real-time analytics enable rapid content strategy pivots</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    AI automation doesn&apos;t replace creative teams. It eliminates the grunt work choking them. A 70% workload reduction doesn&apos;t mean 70% fewer people. It means 10x more output with the same team. The creative work gets done by humans. The repetitive work gets done by machines.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Unleash Your Creative Team
                </Link>
            </div>

            <h2>Technical Stack</h2>
            <ul>
                <li><strong>AI & LLMs:</strong> OpenAI GPT-4, 500+ line prompt engineering, multi-stage AI workflows</li>
                <li><strong>Computer Vision:</strong> Playwright, Pillow (PIL), OCR for image recognition and text detection</li>
                <li><strong>Automation:</strong> Python, AirTable API, Chrome Extension development (JavaScript)</li>
                <li><strong>Content Processing:</strong> Video frame extraction, audio transcription, text chunking and transformation</li>
                <li><strong>Analytics:</strong> YouTube Studio API, cross-platform metrics aggregation, data export automation</li>
            </ul>

            <div className="cta-section">
                <h2>Your Content Team Is Drowning in Grunt Work</h2>
                <p>
                    If your team is burning hours on manual QC, content repurposing, or analytics compilation, you&apos;re wasting their talent. We build production AI systems that eliminate the repetitive work and let your creative people create.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Free Your Creative Team
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
