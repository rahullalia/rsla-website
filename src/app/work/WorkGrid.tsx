"use client";

import { useState } from "react";
import FadeInStagger from "@/components/FadeInStagger";
import CaseStudyCard from "@/components/cards/CaseStudyCard";

export type CaseStudy = {
    slug: string;
    tag: string;
    title: string;
    description: string;
    metrics: { value: string; label: string }[];
    featured: boolean;
    category: "AI Automation" | "Marketing" | "CRM & Operations" | "Development";
    priority: number;
    annualSavings: number;
};

const categories = ["all", "AI Automation", "Marketing", "CRM & Operations", "Development"];

export default function WorkGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [sortBy, setSortBy] = useState<"priority" | "savings">("priority");

    // Filter and sort case studies
    const filteredAndSortedStudies = caseStudies
        .filter((study) => selectedCategory === "all" || study.category === selectedCategory)
        .sort((a, b) => {
            if (sortBy === "priority") {
                return a.priority - b.priority;
            }
            return (b.annualSavings || 0) - (a.annualSavings || 0);
        });

    return (
        <>
            {/* Filters & Sorting */}
            <section className="py-8 px-6 border-b border-white/5 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`
                    px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider
                    transition-all duration-300 hover:scale-[1.02] active:scale-95
                    focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:ring-offset-2 focus:ring-offset-black
                    ${selectedCategory === category
                                            ? "bg-brand-blue text-white"
                                            : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-brand-blue"
                                        }
                  `}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm uppercase tracking-wider">Sort by:</span>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as "priority" | "savings")}
                                    className="
                    bg-white/5 border border-white/10 text-white
                    px-4 py-2 pr-10 rounded-full text-sm font-semibold
                    cursor-pointer transition-all duration-300
                    hover:border-brand-blue focus:outline-none focus:border-brand-blue
                    appearance-none
                  "
                                >
                                    <option value="priority">Featured First</option>
                                    <option value="savings">Highest ROI</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <p className="text-gray-500 text-center mt-6">
                        Showing <span className="text-brand-blue font-semibold">{filteredAndSortedStudies.length}</span> case {filteredAndSortedStudies.length === 1 ? "study" : "studies"}
                    </p>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-16 md:py-24 lg:py-32 px-6 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {filteredAndSortedStudies.map((study) => (
                            <CaseStudyCard
                                key={study.slug}
                                slug={study.slug}
                                tag={study.tag}
                                title={study.title}
                                description={study.description}
                                metrics={study.metrics}
                                featured={study.featured}
                                maxMetrics={study.metrics.length}
                            />
                        ))}
                    </FadeInStagger>
                </div>
            </section>
        </>
    );
}
