"use client";

import Navigation from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Stat {
    value: string;
    label: string;
}

interface CaseStudyLayoutProps {
    title: string;
    subtitle: string;
    stats: Stat[];
    children: React.ReactNode;
}

export default function CaseStudyLayout({ title, subtitle, stats, children }: CaseStudyLayoutProps) {
    return (
        <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
            <Navigation />

            {/* Header */}
            <section className="pt-32 pb-20 px-6 border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto max-w-4xl">
                    <Link href="/work" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-blue mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Work
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                        {title}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-12 px-6 border-b border-white/5 bg-white/5">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col">
                                <span className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-blue mb-2">
                                    {stat.value}
                                </span>
                                <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-3xl prose prose-invert prose-lg prose-headings:font-display prose-headings:font-bold prose-img:rounded-xl prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline">
                    {children}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 border-t border-white/10 text-center">
                <h2 className="text-3xl font-display font-bold mb-6">Ready to scale like this?</h2>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all"
                >
                    Start Your Project
                </Link>
            </section>
        </main>
    );
}
