import type { Metadata } from "next";
import EmailIceBreakerContent from "./EmailIceBreakerContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "AI Cold Email Personalization Saves 325 Hours Annually | RSL/A Case Study",
    description: "RSL/A automated cold email personalization with AI, reducing email research and writing time from 8 minutes to 30 seconds per email. Built with Make.com, OpenAI, and Google Sheets for LinkedIn-enriched outreach at scale.",
    keywords: "AI cold email personalization, automated email icebreakers, cold email automation, Make.com email automation, personalized cold outreach, B2B email automation, LinkedIn email personalization, sales email automation",
    alternates: {
        canonical: "https://rsla.io/work/ai-cold-email-personalization",
    },
    openGraph: {
        title: "AI Cold Email Personalization Saves 325 Hours Annually and Scales Outreach 10X",
        description: "RSL/A automated cold email personalization with AI, reducing email writing time from 8 minutes to 30 seconds per email using LinkedIn enrichment data.",
        url: "https://rsla.io/work/ai-cold-email-personalization",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function Page() {
    return (
        <>
            <ArticleSchema
                title="AI Cold Email Personalization Saves 325 Hours Annually"
                description="RSL/A automated cold email personalization with AI, reducing email research and writing time from 8 minutes to 30 seconds per email."
                url="https://rsla.io/work/ai-cold-email-personalization"
                datePublished="2024-07-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "Cold Email Personalization", url: "https://rsla.io/work/ai-cold-email-personalization" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How much time does AI cold email personalization save?",
                        answer: "The AI automation reduces email personalization time from 8 minutes to 30 seconds per email, saving 325 hours annually and enabling 10X more outreach.",
                    },
                    {
                        question: "What tools are used for the email personalization automation?",
                        answer: "The system uses Make.com for orchestration, OpenAI for AI-powered personalization, and Google Sheets for data management, with LinkedIn enrichment for prospect research.",
                    },
                    {
                        question: "What is the annual cost savings from this automation?",
                        answer: "The automation saves over $43,000 annually by eliminating manual research and writing time while improving email quality and response rates.",
                    },
                ]}
            />
            <EmailIceBreakerContent />
        </>
    );
}
