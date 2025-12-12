import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { blogPostsQuery, blogPostsCountQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'Blog | RSL/A',
  description: 'Insights on marketing automation, AI systems, local SEO, and business growth strategies from RSL/A.',
  alternates: {
    canonical: 'https://rsla.io/blog',
  },
  openGraph: {
    title: 'Blog | RSL/A',
    description: 'Insights on marketing automation, AI systems, local SEO, and business growth strategies.',
    url: 'https://rsla.io/blog',
    siteName: 'RSL/A',
    type: 'website',
  },
};

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

const POSTS_PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [posts, totalCount] = await Promise.all([
    client.fetch<BlogPost[]>(blogPostsQuery, { start, end }),
    client.fetch<number>(blogPostsCountQuery),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <main className="min-h-screen bg-brand-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Blog
          </h1>
          <p className="text-xl text-white/50 max-w-2xl">
            Insights on marketing automation, AI systems, local SEO, and strategies to scale your business.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-blue/30 transition-all"
                  >
                    <Link href={`/blog/${post.slug.current}`}>
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
                      <div className="p-6">
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
                        <p className="text-white/50 text-sm line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-white/40">
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
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-16">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-brand-blue/30 transition-colors"
                    >
                      Previous
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/blog?page=${page}`}
                      className={`px-4 py-2 rounded-lg transition-colors ${
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
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-brand-blue/30 transition-colors"
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

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} RSL/A. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="text-white/40 hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-brand-blue transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
