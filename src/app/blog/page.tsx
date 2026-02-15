import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { blogPostsQuery, blogPostsCountQuery } from '@/sanity/lib/queries';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogContent from './BlogContent';
import { BreadcrumbSchema } from '@/components/JsonLd';

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
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://rsla.io" },
          { name: "Blog", url: "https://rsla.io/blog" },
        ]}
      />
      <Navigation />
      <BlogContent
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <Footer />
    </main>
  );
}
