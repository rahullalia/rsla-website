"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlForImage } from '@/sanity/lib/image';
import FadeIn from '@/components/FadeIn';
import FadeInStagger from '@/components/FadeInStagger';
import {
  Card3D,
  TextScramble,
  AuroraBackground,
  SpotlightCard,
  ParallaxBackground,
} from '@/components/animations';

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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-5xl md:text-6xl font-display font-bold mb-6"
            >
              <TextScramble text="Blog" />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-white/50 max-w-2xl"
            >
              Insights on marketing automation, AI systems, local SEO, and strategies to scale your business.
            </motion.p>
          </FadeIn>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/50 text-lg">No blog posts yet. Check back soon!</p>
            </motion.div>
          ) : (
            <>
              <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <Card3D key={post._id} className="h-full">
                    <SpotlightCard className="h-full">
                      <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-blue/30 transition-all h-full"
                      >
                        <Link href={`/blog/${post.slug.current}`} className="flex flex-col h-full">
                          {post.featuredImage?.asset && (
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={urlForImage(post.featuredImage.asset)?.width(600).height(340).url() || ''}
                                alt={post.featuredImage.alt || post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="p-6 flex flex-col flex-1">
                            {post.categories && post.categories.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.categories.slice(0, 2).map((category) => (
                                  <span
                                    key={category.slug.current}
                                    className="text-xs text-brand-blue border border-brand-blue/30 rounded-full px-2 py-0.5"
                                  >
                                    {category.name}
                                  </span>
                                ))}
                              </div>
                            )}
                            <h2 className="text-xl font-bold text-white group-hover:text-brand-blue transition-colors mb-3 line-clamp-2">
                              {post.title}
                            </h2>
                            <p className="text-white/50 text-sm line-clamp-2 mb-4 flex-1">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-white/40 mt-auto">
                              <span>{post.author.name}</span>
                              <time>
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </time>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    </SpotlightCard>
                  </Card3D>
                ))}
              </FadeInStagger>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex justify-center gap-2 mt-16"
                >
                  {currentPage > 1 && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={`/blog?page=${currentPage - 1}`}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-brand-blue/30 transition-colors block"
                      >
                        Previous
                      </Link>
                    </motion.div>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.div key={page} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={`/blog?page=${page}`}
                        className={`px-4 py-2 rounded-lg transition-colors block ${
                          page === currentPage
                            ? 'bg-brand-blue text-white'
                            : 'bg-white/5 border border-white/10 hover:border-brand-blue/30'
                        }`}
                      >
                        {page}
                      </Link>
                    </motion.div>
                  ))}
                  {currentPage < totalPages && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={`/blog?page=${currentPage + 1}`}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-brand-blue/30 transition-colors block"
                      >
                        Next
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
