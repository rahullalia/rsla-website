import type { Metadata } from "next";
import SpiceOnASliceContent from "./SpiceOnASliceContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "From 14 to 132 Google Reviews and $25K in 60 Days | RSL/A",
    description: "Spice on a Slice, a neighborhood pizza shop, transformed its online visibility to generate over 100 new reviews and $25,000 in extra business in just two months.",
    alternates: {
        canonical: "https://rsla.io/work/local-seo-reputation-management",
    },
    openGraph: {
        title: "Restaurant Marketing Case Study: From 14 to 132 Google Reviews and $25K in 60 Days",
        description: "Spice on a Slice, a neighborhood pizza shop, transformed its online visibility to generate over 100 new reviews and $25,000 in extra business in just two months.",
        url: "https://rsla.io/work/local-seo-reputation-management",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function SpiceOnASlicePage() {
    return (
        <>
            <ArticleSchema
                title="From 14 to 132 Google Reviews and $25K in 60 Days"
                description="Spice on a Slice, a neighborhood pizza shop, transformed its online visibility to generate over 100 new reviews and $25,000 in extra business."
                url="https://rsla.io/work/local-seo-reputation-management"
                datePublished="2024-11-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "Spice on a Slice", url: "https://rsla.io/work/local-seo-reputation-management" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How many Google reviews did Spice on a Slice gain?",
                        answer: "The restaurant went from 14 to 132 Google reviews in just 60 days, an increase of over 800%.",
                    },
                    {
                        question: "How much additional revenue was generated?",
                        answer: "The improved online visibility and review count generated $25,000 in extra business within two months.",
                    },
                    {
                        question: "What strategies were used to increase reviews?",
                        answer: "A combination of Google Business Profile optimization, automated review request systems, and local SEO tactics were implemented.",
                    },
                ]}
            />
            <SpiceOnASliceContent />
        </>
    );
}
