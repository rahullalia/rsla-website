
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { caseStudyBySlugQuery, caseStudySlugsQuery, relatedCaseStudiesQuery, relatedBlogPostsForCaseStudyQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import CaseStudyContent from './CaseStudyContent';
import { CaseStudySchema, BreadcrumbSchema, FAQSchema } from '@/components/JsonLd';

interface CaseStudy {
    title: string;
    slug: string;
    tag: string;
    description: string;
    metrics: { value: string; label: string }[];
    featured: boolean;
    category: string;
    priority: number;
    annualSavings: number;
    publishedAt?: string;
    content: any;
    clientName?: string;
    industry?: string;
    timeframe?: number;
    faqSchema?: { question: string; answer: string }[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        socialImage?: { asset?: { url?: string } };
    };
    // LLM-friendly structured fields
    tldr?: string;
    keyTakeaways?: string[];
    problemStatement?: string;
    solutionApproach?: string;
    resultsOutcome?: string;
    servicesUsed?: string[];
    relatedCases?: RelatedCaseStudy[];
    relatedBlogPosts?: Array<{
        _id: string;
        title: string;
        slug: { current: string };
        excerpt?: string;
        publishedAt: string;
        featuredImage?: {
            asset: { _ref: string; _type: string };
            alt: string;
        };
        categories?: Array<{ name: string; slug: { current: string } }>;
    }>;
}

interface RelatedCaseStudy {
    title: string;
    slug: string;
    tag: string;
    description: string;
    metrics: { value: string; label: string }[];
}

export async function generateStaticParams() {
    const slugs = await client.fetch<string[]>(caseStudySlugsQuery);
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const caseStudy = await client.fetch<CaseStudy>(caseStudyBySlugQuery, { slug });

    if (!caseStudy) {
        return {
            title: 'Case Study Not Found | RSL/A',
        };
    }

    const title = caseStudy.seo?.metaTitle || `${caseStudy.title} | RSL/A`;
    const description = caseStudy.seo?.metaDescription || caseStudy.description;

    return {
        title,
        description,
        alternates: {
            canonical: `https://rsla.io/work/${slug}`,
        },
        openGraph: {
            title,
            description,
            type: 'article',
            url: `https://rsla.io/work/${slug}`,
            siteName: 'RSL/A',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function CaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const caseStudy = await client.fetch<CaseStudy>(caseStudyBySlugQuery, { slug });

    if (!caseStudy) {
        notFound();
    }

    // Fetch fallback related cases if none are manually set
    let relatedCases = caseStudy.relatedCases;
    if (!relatedCases || relatedCases.length === 0) {
        relatedCases = await client.fetch<RelatedCaseStudy[]>(relatedCaseStudiesQuery, {
            slug,
            category: caseStudy.category,
        });
    }

    // Use manually curated blog posts if set, otherwise fall back to category match
    let relatedBlogPostsRaw = caseStudy.relatedBlogPosts || [];

    if (relatedBlogPostsRaw.length === 0) {
        const CATEGORY_TO_BLOG_SLUGS: Record<string, string[]> = {
            'AI Automation': ['ai-automation', 'marketing-automation', 'lead-nurture'],
            'Marketing': ['marketing-automation', 'google-reviews', 'reputation-management', 'sms-marketing', 'lead-nurture'],
            'CRM & Operations': ['crm', 'go-high-level', 'marketing-automation', 'business-tools'],
            'Development': ['ai-automation', 'business-tools'],
        };
        const categoryKeywords = caseStudy.category
            ? CATEGORY_TO_BLOG_SLUGS[caseStudy.category] || []
            : [];
        relatedBlogPostsRaw = categoryKeywords.length > 0
            ? await client.fetch(relatedBlogPostsForCaseStudyQuery, { categoryKeywords })
            : [];
    }

    const relatedBlogPosts = (relatedBlogPostsRaw || []).map((p: any) => ({
        ...p,
        featuredImage: p.featuredImage?.asset
            ? {
                url: p.featuredImage.asset.url || urlForImage(p.featuredImage.asset)?.width(400).height(225).url() || '',
                alt: p.featuredImage.alt,
            }
            : undefined,
    }));

    return (
        <>
            <CaseStudySchema
                title={caseStudy.title}
                description={caseStudy.description}
                url={`https://rsla.io/work/${slug}`}
                datePublished={caseStudy.publishedAt || '2024-01-01'}
                clientName={caseStudy.clientName}
                industry={caseStudy.industry}
                metrics={caseStudy.metrics}
                image={caseStudy.seo?.socialImage?.asset?.url}
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: caseStudy.title, url: `https://rsla.io/work/${slug}` },
                ]}
            />
            {caseStudy.faqSchema && caseStudy.faqSchema.length > 0 && (
                <FAQSchema faqs={caseStudy.faqSchema} />
            )}
            <CaseStudyContent caseStudy={caseStudy} relatedCases={relatedCases || []} relatedBlogPosts={relatedBlogPosts} />
        </>
    );
}
