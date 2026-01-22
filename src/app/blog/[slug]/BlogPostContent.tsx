'use client';

import Link from 'next/link';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import { PortableTextComponents } from '@/components/blog/PortableTextComponents';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButton from '@/components/blog/ShareButton';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AuroraBackground } from '@/components/animations';
import FAQ from '@/components/blog/FAQ';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  featuredImage?: { url: string; alt: string };
  author: {
    name: string;
    slug: { current: string };
    role?: string;
    image?: { url: string; alt: string };
    bio?: string;
  };
  categories?: Array<{ name: string; slug: { current: string } }>;
  body: PortableTextBlock[];
}

interface RecentPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  featuredImage?: { url: string; alt: string };
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogPostContentProps {
  post: BlogPost;
  recentPosts: RecentPost[];
  faqs?: FAQItem[];
}

export default function BlogPostContent({ post, recentPosts, faqs }: BlogPostContentProps) {
  return (
    <main className="min-h-screen bg-brand-black text-white relative">
      <Navigation />

      {/* Aurora in fixed container to not break sticky */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <AuroraBackground />
      </div>

      <div className="max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          <article>
            <div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-brand-blue hover:text-white mb-8 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Blog
              </Link>
            </div>

            <div>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.categories.map((category) => (
                    <span key={category.slug.current} className="text-sm text-brand-blue border border-brand-blue/30 rounded-full px-3 py-1">
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-white mb-6">{post.title}</h1>

              <div className="flex items-center justify-between py-4 border-y border-white/10">
                <time className="text-sm text-white/50">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </time>
                <ShareButton title={post.title} />
              </div>
            </div>

            {post.featuredImage?.url && (
              <div className="my-12 rounded-2xl overflow-hidden">
                <img src={post.featuredImage.url} alt={post.featuredImage.alt} loading="lazy" className="w-full h-auto" />
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={post.body} components={PortableTextComponents} />
            </div>

            {faqs && faqs.length > 0 && <FAQ faqs={faqs} />}

            {post.author.bio && (
              <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl text-white mb-4">About the Author</h3>
                <div className="flex items-start gap-5">
                  {post.author.image?.url && (
                    <img src={post.author.image.url} alt={post.author.image.alt} loading="lazy" className="rounded-full shrink-0" />
                  )}
                  <div>
                    <p className="text-lg text-white font-semibold mb-1">{post.author.name}</p>
                    {post.author.role && <p className="text-sm text-brand-blue mb-3">{post.author.role}</p>}
                    <p className="text-white/60 leading-relaxed">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </article>

          <aside className="hidden lg:block sticky top-32 self-start">
            <TableOfContents content={post.body} recentPosts={recentPosts} currentPostId={post._id} />
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
