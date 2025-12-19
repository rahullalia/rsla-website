'use client';

import Link from 'next/link';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import { PortableTextComponents } from '@/components/blog/PortableTextComponents';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButton from '@/components/blog/ShareButton';
import Navigation from '@/components/Navigation';
import { AuroraBackground } from '@/components/animations';

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

interface BlogPostContentProps {
  post: BlogPost;
  recentPosts: RecentPost[];
}

export default function BlogPostContent({ post, recentPosts }: BlogPostContentProps) {
  return (
    <main className="min-h-screen bg-brand-black text-white relative overflow-hidden">
      <Navigation />
      <AuroraBackground />

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
              <div className="relative aspect-video my-12 rounded-2xl overflow-hidden">
                <img src={post.featuredImage.url} alt={post.featuredImage.alt} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={post.body} components={PortableTextComponents} />
            </div>

            {post.author.bio && (
              <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl text-white mb-4">About the Author</h3>
                <div className="flex items-start gap-5">
                  {post.author.image?.url && (
                    <img src={post.author.image.url} alt={post.author.image.alt} className="rounded-full shrink-0" />
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

          <aside className="hidden lg:block h-fit">
            <TableOfContents content={post.body} recentPosts={recentPosts} currentPostId={post._id} />
          </aside>
        </div>
      </div>

      <footer className="border-t border-white/5 py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">© {new Date().getFullYear()} RSL/A. All rights reserved.</div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="text-white/40 hover:text-brand-blue transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/40 hover:text-brand-blue transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
