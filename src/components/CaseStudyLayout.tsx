"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AuroraBackground,
  NumberCounter,
} from "@/components/animations";

interface Stat {
    value: string;
    label: string;
}

interface CaseStudyLayoutProps {
    tag: string;
    title: string;
    description?: string;
    subtitle?: string;
    stats: Stat[];
    children: React.ReactNode;
}

export default function CaseStudyLayout({ tag, title, description, subtitle, stats, children }: CaseStudyLayoutProps) {
    // Support both description and subtitle for backward compatibility
    const descriptionText = description || subtitle || '';
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const copyLink = () => {
        const url = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');
        if (url) {
            navigator.clipboard.writeText(url);
        }
    };

    const shareOnLinkedIn = () => {
        const url = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');
        if (url) {
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        }
    };

    const shareOnTwitter = () => {
        const url = currentUrl || (typeof window !== 'undefined' ? window.location.href : '');
        if (url) {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        }
    };

    // Parse stat value for NumberCounter
    const parseStatValue = (value: string) => {
        // Match numbers including commas (e.g., "40,000" or "136,000")
        const numMatch = value.match(/[\d,]+\.?\d*/);
        if (!numMatch) return null;

        // Remove commas before parsing
        const numStr = numMatch[0].replace(/,/g, '');
        const num = parseFloat(numStr);
        const prefix = value.startsWith('$') ? '$' : value.startsWith('+') ? '+' : '';
        const suffix = value.includes('%') ? '%' : value.includes('X') ? 'X' : value.includes('K') ? 'K' : '';

        // Check if original had commas - if so, we need to format the output with commas
        const hasCommas = numMatch[0].includes(',');

        return { num, prefix, suffix, hasCommas };
    };

    return (
        <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white relative">
            <Navigation />
            <AuroraBackground />

            {/* Header - Centered like old site */}
            <section className="pt-32 md:pt-40 pb-10 px-6 relative z-10">
                <div className="max-w-[900px] mx-auto text-center">
                    <FadeIn>
                        <Link href="/work" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-blue mb-8 transition-colors group">
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Work
                        </Link>

                        <span className="text-xs text-brand-blue uppercase tracking-[1.5px] font-bold block mb-4">
                            {tag}
                        </span>

                        <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-display font-bold mb-5 leading-[1.2]">
                            {title}
                        </h1>
                        <p className="text-lg text-gray-400 max-w-[700px] mx-auto leading-relaxed">
                            {descriptionText}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Share Section - Horizontal bar like old site */}
            <FadeIn delay={0.1}>
                <div className="flex justify-center items-center gap-5 max-w-[900px] mx-auto py-6 px-[5%] border-t border-b border-white/10">
                    <p className="text-white text-sm font-semibold uppercase tracking-[0.5px] m-0">
                        Share This Case Study
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={shareOnLinkedIn}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-blue hover:bg-brand-blue/10 transition-all"
                            aria-label="Share on LinkedIn"
                        >
                            <svg viewBox="0 0 24 24" fill="#888" className="w-[18px] h-[18px]">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </button>
                        <button
                            onClick={shareOnTwitter}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-blue hover:bg-brand-blue/10 transition-all"
                            aria-label="Share on X"
                        >
                            <svg viewBox="0 0 24 24" fill="#888" className="w-[18px] h-[18px]">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </button>
                        <button
                            onClick={copyLink}
                            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-brand-blue hover:bg-brand-blue/10 transition-all"
                            aria-label="Copy link"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                        </button>
                    </div>
                </div>
            </FadeIn>

            {/* Two-column Layout - Sidebar left, content right */}
            <section className="py-10 px-[5%] relative z-10">
                <div className="max-w-[1200px] mx-auto lg:flex lg:gap-[60px]">
                    {/* Sidebar */}
                    <div className="lg:w-[280px] lg:flex-shrink-0 mb-10 lg:mb-0">
                        <div className="lg:sticky lg:top-36">
                            {/* Stats Bar */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10">
                                <h3 className="text-base text-white mb-5 pb-[10px] border-b border-white/10 uppercase tracking-[1px]">
                                    Key Results
                                </h3>
                                {stats.map((stat, index) => {
                                    const parsed = parseStatValue(stat.value);
                                    return (
                                        <div key={index} className="mb-6 last:mb-0">
                                            <span className="text-[2.2rem] text-brand-blue font-display font-bold leading-[1.1] block mb-0">
                                                {parsed ? (
                                                    <>
                                                        {parsed.prefix}
                                                        <NumberCounter value={parsed.num} suffix={parsed.suffix} formatWithCommas={parsed.hasCommas} />
                                                    </>
                                                ) : (
                                                    stat.value
                                                )}
                                            </span>
                                            <span className="text-sm text-gray-400 uppercase tracking-[0.5px]">
                                                {stat.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Sidebar Navigation */}
                            <div className="bg-transparent border border-white/10 rounded-2xl p-5 text-center hidden lg:block">
                                <Link href="/work" className="block py-[10px] border-b border-white/10 group">
                                    <small className="text-gray-500 text-xs uppercase block mb-1">← All Case Studies</small>
                                    <span className="text-base font-bold text-white group-hover:text-brand-blue transition-colors">Back to Index</span>
                                </Link>
                                <Link href="/#contact" className="block py-[10px] group">
                                    <small className="text-gray-500 text-xs uppercase block mb-1">Next: Your Project →</small>
                                    <span className="text-base font-bold text-white group-hover:text-brand-blue transition-colors">See How Much You Can Save</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="case-study-content text-gray-400 text-lg leading-[1.8]">
                            {children}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
