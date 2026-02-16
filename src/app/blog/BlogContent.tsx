"use client";

import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import FadeInStagger from '@/components/FadeInStagger';
import {
  TextScramble,
  AuroraBackground,
} from '@/components/animations';
import BlogPostCard from '@/components/cards/BlogPostCard';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  featuredImage?: {
    asset: { _ref: string; _type: string };
    alt: string;
  };
  author: {
    name: string;
    slug: { current: string };
    role?: string;
    image?: {
      asset: { _ref: string; _type: string };
      alt: string;
    };
  };
  categories?: Array<{
    name: string;
    slug: { current: string };
  }>;
}

interface BlogContentProps {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
}

export default function BlogContent({ posts, currentPage, totalPages }: BlogContentProps) {
  return (
    <div className="relative overflow-hidden">
      <AuroraBackground />

      <section className="pt-32 pb-16 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <TextScramble text="Blog" />
            </h1>
            <p className="text-xl text-white/50 max-w-2xl">
              Insights on marketing automation, AI systems, local SEO, and strategies to scale your business.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogPostCard
                    key={post._id}
                    slug={post.slug.current}
                    title={post.title}
                    excerpt={post.excerpt}
                    publishedAt={post.publishedAt}
                    featuredImage={post.featuredImage ? {
                      asset: post.featuredImage.asset,
                      alt: post.featuredImage.alt,
                    } : undefined}
                    author={post.author}
                    categories={post.categories}
                  />
                ))}
              </FadeInStagger>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-16">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-brand-blue/30 transition-colors block"
                    >
                      Previous
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/blog?page=${page}`}
                      className={`px-4 py-2 rounded-lg transition-colors block ${
                        page === currentPage
                          ? 'bg-brand-blue text-white'
                          : 'bg-white/5 border border-white/10 hover:border-brand-blue/30'
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-brand-blue/30 transition-colors block"
                    >
                      Next
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
