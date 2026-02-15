// JSON-LD Schema Components for SEO

interface ArticleSchemaProps {
    title: string;
    description: string;
    url: string;
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
    image?: string;
}

export function ArticleSchema({
    title,
    description,
    url,
    datePublished = "2024-01-01",
    dateModified,
    authorName = "RSL/A",
    image = "https://rsla.io/og-image.png",
}: ArticleSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        url: url,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
            "@type": "Organization",
            name: authorName,
            url: "https://rsla.io",
        },
        publisher: {
            "@type": "Organization",
            name: "RSL/A",
            logo: {
                "@type": "ImageObject",
                url: "https://rsla.io/favicon.svg",
            },
        },
        image: image,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbSchemaProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSchemaProps {
    faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface CaseStudySchemaProps {
    title: string;
    description: string;
    url: string;
    datePublished?: string;
    clientName?: string;
    industry?: string;
    metrics?: { value: string; label: string }[];
    image?: string;
}

export function CaseStudySchema({
    title,
    description,
    url,
    datePublished = "2024-01-01",
    clientName,
    industry,
    metrics = [],
    image = "https://rsla.io/og-image.png",
}: CaseStudySchemaProps) {
    // Main Article schema for case study
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description: description,
        url: url,
        datePublished: datePublished,
        author: {
            "@type": "Organization",
            "@id": "https://rsla.io/#organization",
            name: "RSL/A",
            url: "https://rsla.io",
        },
        publisher: {
            "@type": "Organization",
            "@id": "https://rsla.io/#organization",
            name: "RSL/A",
            logo: {
                "@type": "ImageObject",
                url: "https://rsla.io/favicon.svg",
            },
        },
        image: image,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        ...(clientName && {
            about: {
                "@type": "Organization",
                name: clientName,
            },
        }),
        ...(industry && {
            keywords: industry,
        }),
    };

    // Claims schema for metrics (helps with rich snippets)
    const claimsSchema = metrics.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${url}#results`,
        name: "Case Study Results",
        itemListElement: metrics.map((metric, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: `${metric.value} ${metric.label}`,
        })),
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {claimsSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(claimsSchema) }}
                />
            )}
        </>
    );
}

interface BlogPostSchemaProps {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified?: string;
    authorName: string;
    authorUrl?: string;
    image?: string;
    categories?: string[];
}

// Author E-E-A-T profiles for rich Person schema
const AUTHOR_PROFILES: Record<string, {
    jobTitle: string;
    worksFor: { name: string; url: string };
    sameAs: string[];
}> = {
    "Rahul Lalia": {
        jobTitle: "Founder & CEO",
        worksFor: { name: "RSL/A", url: "https://rsla.io" },
        sameAs: [
            "https://www.linkedin.com/in/rahullalia/",
            "https://github.com/rahullalia",
            "https://x.com/rsla_io",
        ],
    },
    "Siddharth Rodrigues": {
        jobTitle: "Co-Founder & CTO",
        worksFor: { name: "RSL/A", url: "https://rsla.io" },
        sameAs: [
            "https://www.linkedin.com/in/siddharthrodrigues/",
        ],
    },
};

export function BlogPostSchema({
    title,
    description,
    url,
    datePublished,
    dateModified,
    authorName,
    authorUrl,
    image = "https://rsla.io/og-image.png",
    categories = [],
}: BlogPostSchemaProps) {
    const authorProfile = AUTHOR_PROFILES[authorName];

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: description,
        url: url,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
            "@type": "Person",
            name: authorName,
            url: authorUrl || (authorProfile ? authorProfile.worksFor.url : undefined),
            ...(authorProfile && {
                jobTitle: authorProfile.jobTitle,
                worksFor: {
                    "@type": "Organization",
                    name: authorProfile.worksFor.name,
                    url: authorProfile.worksFor.url,
                },
                sameAs: authorProfile.sameAs,
            }),
        },
        publisher: {
            "@type": "Organization",
            "@id": "https://rsla.io/#organization",
            name: "RSL/A",
            logo: {
                "@type": "ImageObject",
                url: "https://rsla.io/favicon.svg",
            },
        },
        image: image,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        keywords: categories.join(", "),
        isPartOf: {
            "@type": "Blog",
            "@id": "https://rsla.io/blog",
            name: "RSL/A Blog",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
