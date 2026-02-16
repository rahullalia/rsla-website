"use client";

import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import {
    Card3D,
    SpotlightCard,
} from "@/components/animations";

interface BlogPostCardProps {
    slug: string;
    title: string;
    excerpt?: string;
    publishedAt: string;
    featuredImage?: {
        asset?: { _ref: string; _type?: string };
        url?: string;
        alt?: string;
    };
    author?: {
        name: string;
    };
    categories?: Array<{
        name: string;
        slug?: { current: string };
    }>;
}

export default function BlogPostCard({
    slug,
    title,
    excerpt,
    publishedAt,
    featuredImage,
    author,
    categories,
}: BlogPostCardProps) {
    const imageUrl = featuredImage?.url
        || (featuredImage?.asset?._ref
            ? urlForImage(featuredImage.asset)?.width(600).height(340).url() || ''
            : '');

    return (
        <Card3D className="h-full">
            <SpotlightCard className="h-full">
                <article className="group bg-white/5 border border-white/10 rounded-[20px] overflow-hidden hover:border-brand-blue/30 transition-all h-full">
                    <Link href={`/blog/${slug}`} className="flex flex-col h-full">
                        {imageUrl && (
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={imageUrl}
                                    alt={featuredImage?.alt || title}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}
                        <div className="p-6 flex flex-col flex-1">
                            {categories && categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {categories.slice(0, 2).map((category, idx) => (
                                        <span
                                            key={category.slug?.current || idx}
                                            className="text-xs text-brand-blue border border-brand-blue/30 rounded-full px-2 py-0.5"
                                        >
                                            {category.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <h2 className="text-xl font-bold text-white group-hover:text-brand-blue transition-colors mb-3 line-clamp-2">
                                {title}
                            </h2>
                            {excerpt && (
                                <p className="text-white/50 text-sm line-clamp-2 mb-4 flex-1">
                                    {excerpt}
                                </p>
                            )}
                            <div className="flex items-center justify-between text-xs text-white/40 mt-auto">
                                {author?.name && <span>{author.name}</span>}
                                <time>
                                    {new Date(publishedAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </time>
                            </div>
                        </div>
                    </Link>
                </article>
            </SpotlightCard>
        </Card3D>
    );
}
