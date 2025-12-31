import type { Metadata } from "next";
import FacebookAdsContent from "./FacebookAdsContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Facebook Ads Reporting Automation Saves 990+ Hours Annually | RSL/A",
    description: "How we automated a 4-hour daily Facebook Ads reporting process down to 10 minutes using Google Sheets and custom scripts, saving $18K annually and boosting conversions by 4%.",
    alternates: {
        canonical: "https://rsla.io/work/marketing-analytics-reporting-automation",
    },
    openGraph: {
        title: "Facebook Ads Reporting Automation Saves 990+ Hours Annually",
        description: "How we automated a 4-hour daily Facebook Ads reporting process down to 10 minutes using Google Sheets and custom scripts, saving $18K annually and boosting conversions by 4%.",
        url: "https://rsla.io/work/marketing-analytics-reporting-automation",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function Page() {
    return (
        <>
            <ArticleSchema
                title="Facebook Ads Reporting Automation Saves 990+ Hours Annually"
                description="How we automated a 4-hour daily Facebook Ads reporting process down to 10 minutes using Google Sheets and custom scripts."
                url="https://rsla.io/work/marketing-analytics-reporting-automation"
                datePublished="2024-02-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "Facebook Ads Reporting", url: "https://rsla.io/work/marketing-analytics-reporting-automation" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How much time does the Facebook Ads reporting automation save?",
                        answer: "The automation saves 990+ hours annually by reducing daily reporting from 4 hours to just 10 minutes.",
                    },
                    {
                        question: "What tools were used for the reporting automation?",
                        answer: "Google Sheets with custom Apps Script automation pulls data directly from Facebook Ads API for real-time reporting.",
                    },
                    {
                        question: "What was the impact on conversions?",
                        answer: "The improved reporting insights led to a 4% boost in conversions and $18K in annual savings.",
                    },
                ]}
            />
            <FacebookAdsContent />
        </>
    );
}
