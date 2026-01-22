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
import { BlogPostSchema, BreadcrumbSchema, FAQSchema } from '@/components/JsonLd';

// Hardcoded FAQ data for specific blog posts (for rich snippets)
const blogFAQs: Record<string, Array<{ question: string; answer: string }>> = {
  'go-high-level-pricing': [
    {
      question: 'How much does GoHighLevel cost per month?',
      answer: 'GoHighLevel pricing starts at $97/month for the Starter plan, $297/month for the Unlimited plan, and $497/month for the SaaS Pro plan. Annual billing saves approximately 17% on all plans.',
    },
    {
      question: "What's included in GoHighLevel Starter vs Unlimited?",
      answer: 'The Starter plan ($97/mo) includes 1 sub-account, limited contacts, and basic features. The Unlimited plan ($297/mo) includes unlimited sub-accounts, unlimited contacts, API access, and white-labeling capabilities. The SaaS Pro plan ($497/mo) adds SaaS mode for reselling GoHighLevel to your clients.',
    },
    {
      question: 'Is there a GoHighLevel free trial?',
      answer: 'Yes, GoHighLevel offers a 14-day free trial on all plans. No credit card is required to start the trial, and you get full access to all features during the trial period.',
    },
    {
      question: 'What are the hidden costs of GoHighLevel?',
      answer: 'Beyond the base subscription, additional costs include: LC Phone charges for calls/SMS ($0.0140-0.0168/min for calls, $0.0079-0.0950/text), LC Email ($0.000675/email after 10K free), AI features like Conversation AI ($0.02/message) and Voice AI ($0.13/min), premium triggers/actions ($0.01/execution), and content AI ($0.09/1K words).',
    },
  ],
  'go-high-level-new-features-2025': [
    {
      question: 'What are the biggest GoHighLevel updates in 2025?',
      answer: 'The three biggest updates are: 1) AI Employee Suite - automated booking, support, and sales agents, 2) Voice AI with natural conversation capabilities for inbound/outbound calls, and 3) the Desktop App for Windows and Mac with native notifications and faster performance.',
    },
    {
      question: 'How do I enable GoHighLevel AI features?',
      answer: 'Go to Settings > Labs in your GHL account to enable experimental AI features. For Voice AI, navigate to Settings > Phone Numbers > AI Configuration. AI Employee features are found under Automation > AI Agents. Note that AI features have usage-based pricing.',
    },
    {
      question: 'Is GoHighLevel Voice AI available on all plans?',
      answer: 'Voice AI is available on all GoHighLevel plans, but it has usage-based pricing at $0.13/minute for conversations. You need to configure it separately for each phone number and can set custom prompts and behaviors.',
    },
    {
      question: 'What GoHighLevel features were added in December 2025?',
      answer: 'December 2025 updates include: improved workflow builder with AI suggestions, enhanced reporting dashboards, new social media posting features, updated mobile app with offline mode, and expanded API capabilities for custom integrations.',
    },
  ],
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

  const imageUrl = post.featuredImage?.asset
    ? urlForImage(post.featuredImage.asset)?.width(1200).height(630).url()
    : undefined;

  return (
    <>
      <BlogPostSchema
        title={post.title}
        description={post.excerpt}
        url={`https://rsla.io/blog/${slug}`}
        datePublished={post.publishedAt}
        authorName={post.author.name}
        image={imageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://rsla.io" },
          { name: "Blog", url: "https://rsla.io/blog" },
          { name: post.title, url: `https://rsla.io/blog/${slug}` },
        ]}
      />
      {blogFAQs[slug] && <FAQSchema faqs={blogFAQs[slug]} />}
      <BlogPostContent
        post={transformedPost}
        recentPosts={transformedRecentPosts}
        faqs={blogFAQs[slug]}
      />
    </>
  );
}
