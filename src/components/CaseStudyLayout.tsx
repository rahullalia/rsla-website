"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AuroraBackground,
  MagneticButton,
  NumberCounter,
  ParallaxBackground,
} from "@/components/animations";

interface Stat {
    value: string;
    label: string;
}

interface CaseStudyLayoutProps {
    tag: string;
    title: string;
    subtitle: string;
    stats: Stat[];
    children: React.ReactNode;
}

export default function CaseStudyLayout({ tag, title, subtitle, stats, children }: CaseStudyLayoutProps) {
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
        const numMatch = value.match(/[\d.]+/);
        if (!numMatch) return null;

        const num = parseFloat(numMatch[0]);
        const prefix = value.startsWith('$') ? '$' : value.startsWith('+') ? '+' : '';
        const suffix = value.includes('%') ? '%' : value.includes('X') ? 'X' : value.includes('K') ? 'K' : '';

        return { num, prefix, suffix };
    };

    return (
        <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white relative overflow-hidden">
            <Navigation />
            <AuroraBackground />

            {/* Header */}
            <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 border-b border-white/10 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <FadeIn>
                        <Link href="/work" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-blue mb-8 transition-colors group">
                            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Work
                        </Link>

                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-xs text-brand-blue uppercase tracking-widest font-bold block mb-4"
                        >
                            {tag}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                            className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight max-w-4xl"
                        >
                            {title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl text-gray-400 max-w-2xl leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>
                    </FadeIn>

                    {/* Share buttons */}
                    <FadeIn delay={0.1}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex items-center gap-4 mt-8"
                        >
                            <span className="text-sm text-gray-500">Share:</span>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={shareOnLinkedIn}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-blue hover:bg-brand-blue/10 transition-all"
                                aria-label="Share on LinkedIn"
                            >
                                <svg viewBox="0 0 24 24" fill="#888" className="w-5 h-5">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={shareOnTwitter}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-blue hover:bg-brand-blue/10 transition-all"
                                aria-label="Share on X"
                            >
                                <svg viewBox="0 0 24 24" fill="#888" className="w-5 h-5">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={copyLink}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-blue hover:bg-brand-blue/10 transition-all"
                                aria-label="Copy link"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                            </motion.button>
                        </motion.div>
                    </FadeIn>
                </div>
            </section>

            {/* Two-column layout with sticky sidebar */}
            <section className="py-12 md:py-16 px-6 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Main Content - Shows first on mobile */}
                        <div className="lg:col-span-8 lg:order-2">
                            <FadeIn delay={0.3}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-img:rounded-xl prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-white"
                                >
                                    {children}
                                </motion.div>
                            </FadeIn>
                        </div>

                        {/* Sticky Sidebar - Shows after content on mobile */}
                        <aside className="lg:col-span-4 lg:order-1">
                            <div className="lg:sticky lg:top-28">
                                <FadeIn delay={0.2}>
                                    {/* Key Results */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6"
                                    >
                                        <h3 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-6">Key Results</h3>
                                        <div className="space-y-6">
                                            {stats.map((stat, index) => {
                                                const parsed = parseStatValue(stat.value);
                                                return (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                                        className="border-b border-white/5 pb-6 last:border-0 last:pb-0"
                                                    >
                                                        <span className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-blue block mb-1">
                                                            {parsed ? (
                                                                <>
                                                                    {parsed.prefix}
                                                                    <NumberCounter value={parsed.num} suffix={parsed.suffix} />
                                                                </>
                                                            ) : (
                                                                stat.value
                                                            )}
                                                        </span>
                                                        <span className="text-sm text-gray-500 uppercase tracking-wide">
                                                            {stat.label}
                                                        </span>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>

                                    {/* Navigation Links - Old Site Style */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                                    >
                                        <Link
                                            href="/work"
                                            className="block p-6 border-b border-white/10 hover:bg-white/5 transition-all group"
                                        >
                                            <span className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                                                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                                ALL CASE STUDIES
                                            </span>
                                            <span className="text-lg font-bold text-white group-hover:text-brand-blue transition-colors">
                                                Back to Index
                                            </span>
                                        </Link>

                                        <Link
                                            href="/#contact"
                                            className="block p-6 hover:bg-white/5 transition-all group"
                                        >
                                            <span className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                                                NEXT: YOUR PROJECT
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            <span className="text-lg font-bold text-white group-hover:text-brand-blue transition-colors">
                                                See How Much You Can Save
                                            </span>
                                        </Link>
                                    </motion.div>
                                </FadeIn>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-16 md:py-20 border-t border-white/10 relative z-10">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-4xl font-display font-bold mb-4"
                        >
                            Ready to achieve similar results?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-gray-400 mb-8 max-w-lg mx-auto"
                        >
                            Let&apos;s discuss how we can build a system that drives real growth for your business.
                        </motion.p>
                        <MagneticButton
                            href="/#contact"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all group"
                        >
                            Book a Call
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </MagneticButton>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </main>
    );
}
