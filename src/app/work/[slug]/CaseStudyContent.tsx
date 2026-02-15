"use client";

import Link from "next/link";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { PortableTextComponents } from "@/components/blog/PortableTextComponents";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AuroraBackground, NumberCounter } from "@/components/animations";

interface Metric {
    value: string;
    label: string;
}

interface RelatedCaseStudy {
    title: string;
    slug: string;
    tag: string;
    description: string;
    metrics: Metric[];
}

interface CaseStudy {
    title: string;
    slug: string;
    tag: string;
    description: string;
    metrics?: Metric[];
    featured: boolean;
    category: string;
    publishedAt?: string;
    content: PortableTextBlock[];
    industry?: string;
    timeframe?: number;
    // LLM-friendly structured fields
    tldr?: string;
    keyTakeaways?: string[];
    problemStatement?: string;
    solutionApproach?: string;
    resultsOutcome?: string;
    servicesUsed?: string[];
}

interface CaseStudyContentProps {
    caseStudy: CaseStudy;
    relatedCases: RelatedCaseStudy[];
}

const SERVICE_LABELS: Record<string, string> = {
    'ai-automation': 'AI Automation',
    'paid-acquisition': 'Paid Acquisition',
    'crm-infrastructure': 'CRM Infrastructure',
    'smart-websites': 'Smart Websites',
    'local-seo': 'Local SEO',
    'content-marketing': 'Content Marketing',
};

const INDUSTRY_LABELS: Record<string, string> = {
    'salon-spa': 'Salon/Spa',
    'restaurant': 'Restaurant',
    'auto-detailing': 'Auto Detailing',
    'real-estate': 'Real Estate',
    'contractor': 'Contractor/Home Services',
    'medical': 'Medical/Dental',
    'legal': 'Legal',
    'fitness': 'Fitness/Gym',
    'ecommerce': 'E-commerce',
    'saas': 'SaaS',
    'agency': 'Agency',
    'nonprofit': 'Non-Profit',
    'media': 'Media/Content',
    'manufacturing': 'Manufacturing',
};

export default function CaseStudyContent({ caseStudy, relatedCases }: CaseStudyContentProps) {

    // Parse stat value for NumberCounter - ported from CaseStudyLayout
    const parseStatValue = (value: string) => {
        // Match numbers including commas (e.g., "40,000" or "136,000")
        const numMatch = value.match(/[\d,]+\.?\d*/);
        if (!numMatch) return null;

        // Remove commas before parsing
        const numStr = numMatch[0].replace(/,/g, '');
        const num = parseFloat(numStr);
        const prefix = value.startsWith('$') ? '$' : value.startsWith('+') ? '+' : '';
        // Improved suffix logic to handle cases like '24 sec'
        let suffix = '';
        if (value.includes('%')) suffix = '%';
        else if (value.includes('X')) suffix = 'X';
        else if (value.includes('K')) suffix = 'K';
        else if (value.includes(' sec')) suffix = ' sec';

        // Check if original had commas - if so, we need to format the output with commas
        const hasCommas = numMatch[0].includes(',');

        return { num, prefix, suffix, hasCommas };
    };

    return (
        <main className="min-h-screen bg-brand-black text-white relative">
            <Navigation />

            {/* Aurora in fixed container */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <AuroraBackground />
            </div>

            <div className="max-w-4xl mx-auto py-32 px-6 relative z-10">
                <article>
                    {/* Back Link */}
                    <Link
                        href="/work"
                        className="inline-flex items-center gap-2 text-brand-blue hover:text-white mb-8 transition-colors"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5 15L7.5 10L12.5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Back to Case Studies
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <span className="text-brand-blue font-bold tracking-wider uppercase text-sm mb-4 block">
                            {caseStudy.tag}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                            {caseStudy.title}
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed">
                            {caseStudy.description}
                        </p>
                    </header>

                    {/* Metrics Grid */}
                    {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10 mb-12">
                            {caseStudy.metrics.map((metric, idx) => {
                                const parsed = parseStatValue(metric.value);
                                return (
                                    <div key={idx} className="text-center md:text-left">
                                        <strong className="block text-4xl md:text-5xl font-bold text-white mb-2">
                                            {parsed ? (
                                                <>
                                                    {parsed.prefix}
                                                    <NumberCounter
                                                        value={parsed.num}
                                                        suffix={parsed.suffix}
                                                        formatWithCommas={parsed.hasCommas}
                                                    />
                                                </>
                                            ) : (
                                                metric.value
                                            )}
                                        </strong>
                                        <span className="text-sm text-brand-blue uppercase tracking-wider">
                                            {metric.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* At a Glance Badges */}
                    {(caseStudy.servicesUsed?.length || caseStudy.timeframe || caseStudy.industry) && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {caseStudy.industry && (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60">
                                    {INDUSTRY_LABELS[caseStudy.industry] || caseStudy.industry}
                                </span>
                            )}
                            {caseStudy.timeframe && (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60">
                                    {caseStudy.timeframe} days
                                </span>
                            )}
                            {caseStudy.servicesUsed?.map((service) => (
                                <span
                                    key={service}
                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/60"
                                >
                                    {SERVICE_LABELS[service] || service}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* TL;DR Box */}
                    {caseStudy.tldr && (
                        <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-xl p-6 mb-8">
                            <h2 className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3">
                                TL;DR
                            </h2>
                            <p className="text-lg text-white/80 leading-relaxed">
                                {caseStudy.tldr}
                            </p>
                        </div>
                    )}

                    {/* Key Takeaways */}
                    {caseStudy.keyTakeaways && caseStudy.keyTakeaways.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Key Takeaways
                            </h2>
                            <ul className="space-y-3">
                                {caseStudy.keyTakeaways.map((takeaway, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="text-brand-blue font-bold min-w-[1.5rem]">{idx + 1}.</span>
                                        <span className="text-white/70">{takeaway}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Content Body */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        {caseStudy.content ? (
                            <PortableText value={caseStudy.content} components={PortableTextComponents} />
                        ) : (
                            <p className="text-white/40 italic"> [Content awaiting migration from Sanity] </p>
                        )}
                    </div>
                </article>
            </div>

            {/* Related Case Studies */}
            {relatedCases.length > 0 && (
                <section className="border-t border-white/10 relative z-10">
                    <div className="max-w-7xl mx-auto py-20 px-6">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-10">
                            More Case Studies
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedCases.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/work/${related.slug}`}
                                    className="group flex flex-col justify-between rounded-[20px] overflow-hidden border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-brand-blue"
                                >
                                    <div>
                                        <span className="text-[0.8rem] text-brand-blue uppercase tracking-[1.5px] mb-4 block font-bold">
                                            {related.tag}
                                        </span>
                                        <h3 className="text-xl leading-tight text-white mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                                            {related.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                                            {related.description}
                                        </p>
                                    </div>
                                    {related.metrics && related.metrics.length > 0 && (
                                        <div className="pt-4 border-t border-white/10 flex justify-between gap-4">
                                            {related.metrics.slice(0, 2).map((metric, idx) => (
                                                <div key={idx} className="text-center flex-1">
                                                    <strong className="block text-lg text-white">
                                                        {metric.value}
                                                    </strong>
                                                    <span className="block text-[0.7rem] text-brand-blue uppercase mt-1">
                                                        {metric.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
