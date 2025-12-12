import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText, PortableTextBlock } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  recentBlogPostsQuery,
} from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import { PortableTextComponents } from '@/components/blog/PortableTextComponents';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButton from '@/components/blog/ShareButton';
import Navigation from '@/components/Navigation';

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
    bio?: string;
  };
  categories?: Array<{
    name: string;
    slug: { current: string };
  }>;
  body: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface RecentPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  featuredImage?: {
    asset: { _ref: string; _type: string };
    alt: string;
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(blogPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<BlogPost>(blogPostBySlugQuery, { slug });

  if (!post) {
    return {
      title: 'Post Not Found | RSL/A',
    };
  }

  const title = post.seo?.metaTitle || `${post.title} | RSL/A`;
  const description = post.seo?.metaDescription || post.excerpt;
  const imageUrl = post.featuredImage?.asset
    ? urlForImage(post.featuredImage.asset)?.width(1200).height(630).url()
    : 'https://rsla.io/og-image.png';

  return {
    title,
    description,
    alternates: {
      canonical: `https://rsla.io/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      url: `https://rsla.io/blog/${slug}`,
      siteName: 'RSL/A',
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, recentPosts] = await Promise.all([
    client.fetch<BlogPost>(blogPostBySlugQuery, { slug }),
    client.fetch<RecentPost[]>(recentBlogPostsQuery),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-black text-white">
      <Navigation />

      <div className="max-w-7xl mx-auto py-24 md:py-32 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Content */}
          <article>
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-blue hover:text-white mb-8 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Blog
            </Link>

            {/* Categories & Title */}
            <div>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.categories.map((category) => (
                    <span
                      key={category.slug.current}
                      className="text-sm text-brand-blue border border-brand-blue/30 rounded-full px-3 py-1"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-white mb-6">
                {post.title}
              </h1>

              {/* Publish Date & Share */}
              <div className="flex items-center justify-between py-4 border-y border-white/10">
                <time className="text-sm text-white/50">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <ShareButton title={post.title} />
              </div>
            </div>

            {/* Featured Image */}
            {post.featuredImage?.asset && (
              <div className="relative aspect-video my-12 rounded-2xl overflow-hidden">
                <Image
                  src={urlForImage(post.featuredImage.asset)?.width(1200).height(675).url() || ''}
                  alt={post.featuredImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Body Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText value={post.body} components={PortableTextComponents} />
            </div>

            {/* Author Bio */}
            {post.author.bio && (
              <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-xl text-white mb-4">About the Author</h3>
                <div className="flex items-start gap-5">
                  {post.author.image?.asset && (
                    <Image
                      src={urlForImage(post.author.image.asset)?.width(80).height(80).url() || ''}
                      alt={post.author.image.alt}
                      width={80}
                      height={80}
                      className="rounded-full flex-shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-lg text-white font-semibold mb-1">
                      {post.author.name}
                    </p>
                    {post.author.role && (
                      <p className="text-sm text-brand-blue mb-3">{post.author.role}</p>
                    )}
                    <p className="text-white/60 leading-relaxed">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents
              content={post.body}
              recentPosts={recentPosts}
              currentPostId={post._id}
            />
          </aside>
        </div>
      </div>

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
