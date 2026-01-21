
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { caseStudyBySlugQuery, caseStudySlugsQuery } from '@/sanity/lib/queries';
import CaseStudyContent from './CaseStudyContent';
import { ArticleSchema, BreadcrumbSchema } from '@/components/JsonLd';

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
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
    };
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

    return (
        <>
            <ArticleSchema
                title={caseStudy.title}
                description={caseStudy.description}
                url={`https://rsla.io/work/${slug}`}
                datePublished={caseStudy.publishedAt || '2024-01-01'}
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: caseStudy.title, url: `https://rsla.io/work/${slug}` },
                ]}
            />
            <CaseStudyContent caseStudy={caseStudy} />
        </>
    );
}
