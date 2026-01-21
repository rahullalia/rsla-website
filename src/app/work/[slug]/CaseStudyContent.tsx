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
}

interface CaseStudyContentProps {
    caseStudy: CaseStudy;
}

export default function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {

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

            <Footer />
        </main>
    );
}
