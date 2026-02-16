"use client";

import Link from "next/link";
import {
    Card3D,
    NumberCounter,
    SpotlightCard,
} from "@/components/animations";

interface Metric {
    value: string;
    label: string;
}

interface CaseStudyCardProps {
    slug: string;
    tag: string;
    title: string;
    description: string;
    metrics: Metric[];
    featured?: boolean;
    /** Max metrics to display (default: 2) */
    maxMetrics?: number;
}

function parseMetricValue(value: string) {
    const numMatch = value.match(/[\d,]+\.?\d*/);
    if (!numMatch) return null;

    const numStr = numMatch[0].replace(/,/g, '');
    const num = parseFloat(numStr);
    const prefix = value.startsWith('$') ? '$' : value.startsWith('+') ? '+' : '';
    let suffix = '';
    if (value.includes('%')) suffix = '%';
    else if (value.includes('X')) suffix = 'X';
    else if (value.includes('K')) suffix = 'K';
    else if (value.includes(' sec')) suffix = ' sec';

    const hasCommas = numMatch[0].includes(',');

    return { num, prefix, suffix, hasCommas };
}

export default function CaseStudyCard({
    slug,
    tag,
    title,
    description,
    metrics,
    featured,
    maxMetrics = 2,
}: CaseStudyCardProps) {
    const displayMetrics = metrics?.slice(0, maxMetrics) || [];

    return (
        <Card3D className="h-full">
            <SpotlightCard className="h-full">
                <Link
                    href={`/work/${slug}`}
                    className="group flex flex-col justify-between rounded-[20px] overflow-hidden border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-brand-blue h-full"
                >
                    <div>
                        {featured && (
                            <div className="inline-block mb-3">
                                <span className="text-[0.65rem] bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-2 py-1 rounded-full uppercase tracking-wider font-bold">
                                    Featured
                                </span>
                            </div>
                        )}

                        <span className="text-[0.8rem] text-brand-blue uppercase tracking-[1.5px] mb-4 block font-bold">
                            {tag}
                        </span>
                        <h3 className="text-[1.8rem] leading-[1.2] text-white mb-3 group-hover:text-brand-blue transition-colors line-clamp-3">
                            {title}
                        </h3>
                        <p className="text-base text-gray-400 mb-8 line-clamp-3">
                            {description}
                        </p>
                    </div>

                    {displayMetrics.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-white/10 flex justify-between gap-4">
                            {displayMetrics.map((metric, idx) => {
                                const parsed = parseMetricValue(metric.value);
                                return (
                                    <div key={idx} className="text-center flex-1">
                                        <strong className="block text-[1.6rem] text-white leading-[1.1]">
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
                                        <span className="block text-[0.75rem] text-brand-blue uppercase mt-1">
                                            {metric.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Link>
            </SpotlightCard>
        </Card3D>
    );
}
