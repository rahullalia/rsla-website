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
            url: authorUrl,
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
        keywords: categories.join(", "),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
