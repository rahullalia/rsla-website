import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableTextBlock } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  recentBlogPostsQuery,
} from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import BlogPostContent from './BlogPostContent';

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

  // Transform data for client component (resolve image URLs on server)
  const transformedPost = {
    ...post,
    featuredImage: post.featuredImage?.asset
      ? {
          url: urlForImage(post.featuredImage.asset)?.width(1200).height(675).url() || '',
          alt: post.featuredImage.alt,
        }
      : undefined,
    author: {
      ...post.author,
      image: post.author.image?.asset
        ? {
            url: urlForImage(post.author.image.asset)?.width(80).height(80).url() || '',
            alt: post.author.image.alt,
          }
        : undefined,
    },
  };

  const transformedRecentPosts = recentPosts.map((p) => ({
    ...p,
    featuredImage: p.featuredImage?.asset
      ? {
          url: urlForImage(p.featuredImage.asset)?.width(400).height(225).url() || '',
          alt: p.featuredImage.alt,
        }
      : undefined,
  }));

  return (
    <BlogPostContent
      post={transformedPost}
      recentPosts={transformedRecentPosts}
    />
  );
}
