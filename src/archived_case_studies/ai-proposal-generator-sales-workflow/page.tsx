import type { Metadata } from "next";
import ProposalGeneratorContent from "./ProposalGeneratorContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "AI Proposal Generator Saves $22K Annually for RSL/A | Case Study",
    description: "RSL/A automated proposal creation with AI, reducing production time from 2 hours to 10 minutes and recovering 165 hours annually through Make.com, Claude AI, and Google Docs integration.",
    alternates: {
        canonical: "https://rsla.io/work/ai-proposal-generator-sales-workflow",
    },
    openGraph: {
        title: "AI Proposal Generator Saves $22K Annually and Recovers 165 Hours Per Year",
        description: "RSL/A automated proposal creation with AI, reducing production time from 2 hours to 10 minutes per proposal. Built with Make.com, Claude AI, and Google Docs.",
        url: "https://rsla.io/work/ai-proposal-generator-sales-workflow",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function ProposalGeneratorAutomationPage() {
    return (
        <>
            <ArticleSchema
                title="AI Proposal Generator Saves $22K Annually"
                description="RSL/A automated proposal creation with AI, reducing production time from 2 hours to 10 minutes."
                url="https://rsla.io/work/ai-proposal-generator-sales-workflow"
                datePublished="2024-10-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "AI Proposal Generator", url: "https://rsla.io/work/ai-proposal-generator-sales-workflow" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How much time does the AI proposal generator save?",
                        answer: "The automation reduces proposal creation from 2 hours to 10 minutes, recovering 165 hours annually.",
                    },
                    {
                        question: "What is the annual cost savings?",
                        answer: "The AI proposal generator saves $22,000 annually by eliminating manual proposal writing time.",
                    },
                    {
                        question: "What tools power the proposal generator?",
                        answer: "The system uses Make.com for orchestration, Claude AI for intelligent writing, and Google Docs for document generation.",
                    },
                ]}
            />
            <ProposalGeneratorContent />
        </>
    );
}
