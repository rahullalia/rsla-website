import type { Metadata } from "next";
import AIMediaContent from "./AIMediaContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Founding Engineer: AI Automation Systems for Media Company | RSL/A",
    description: "How we built production AI systems as Founding Engineer for a Singapore media company, reducing manual workload by 70% through video QC automation, content generation pipelines, and analytics tools.",
    alternates: {
        canonical: "https://rsla.io/work/media-content-operations-ai",
    },
    openGraph: {
        title: "Founding Engineer: AI Automation Systems for Media Company",
        description: "As Founding Engineer for CrazyTok Media (Singapore), we architected and deployed three production AI systems that reduced manual content operations workload by 70%.",
        url: "https://rsla.io/work/media-content-operations-ai",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function Page() {
    return (
        <>
            <ArticleSchema
                title="Founding Engineer: AI Automation Systems for Media Company"
                description="How we built production AI systems for a Singapore media company, reducing manual workload by 70%."
                url="https://rsla.io/work/media-content-operations-ai"
                datePublished="2024-01-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "AI Media Automation", url: "https://rsla.io/work/media-content-operations-ai" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "What was the workload reduction achieved?",
                        answer: "The AI automation systems reduced manual content operations workload by 70% through video QC automation and content generation pipelines.",
                    },
                    {
                        question: "What AI systems were built?",
                        answer: "Three production AI systems were deployed: video quality control automation, AI content generation pipelines, and analytics tools.",
                    },
                    {
                        question: "What was the role at the media company?",
                        answer: "As Founding Engineer at CrazyTok Media (Singapore), we architected and deployed the entire AI automation infrastructure.",
                    },
                ]}
            />
            <AIMediaContent />
        </>
    );
}
