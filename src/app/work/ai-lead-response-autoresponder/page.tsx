import type { Metadata } from "next";
import EmailAutoresponderContent from "./EmailAutoresponderContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "AI Email Auto-Responder That Actually Reads Messages | RSL/A Case Study",
    description: "RSL/A built an intelligent AI email auto-responder that personalizes replies based on message content, responding in 24 seconds vs 24 hours. Built with Make.com and OpenAI for 24/7 lead capture.",
    keywords: "AI email auto responder, intelligent email automation, personalized auto reply, 24/7 email response, email automation Make.com, AI customer service, automated email replies, smart email responder",
    alternates: {
        canonical: "https://rsla.io/work/ai-lead-response-autoresponder",
    },
    openGraph: {
        title: "Never Lose Another Lead: AI Auto-Responder That Actually Reads Your Message",
        description: "RSL/A built an intelligent AI email auto-responder that personalizes replies by reading message content and responding in 24 seconds instead of 24 hours.",
        url: "https://rsla.io/work/ai-lead-response-autoresponder",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function EmailAutoresponderAutomationPage() {
    return (
        <>
            <ArticleSchema
                title="AI Email Auto-Responder That Actually Reads Messages"
                description="RSL/A built an intelligent AI email auto-responder that personalizes replies based on message content."
                url="https://rsla.io/work/ai-lead-response-autoresponder"
                datePublished="2024-09-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "AI Email Auto-Responder", url: "https://rsla.io/work/ai-lead-response-autoresponder" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How fast does the AI email auto-responder reply?",
                        answer: "The AI auto-responder replies in 24 seconds instead of the typical 24 hours, ensuring no lead is left waiting.",
                    },
                    {
                        question: "Does the auto-responder actually read the email content?",
                        answer: "Yes, the AI reads and understands the message content to generate personalized, contextually relevant replies.",
                    },
                    {
                        question: "What tools power the email auto-responder?",
                        answer: "The system is built with Make.com for orchestration and OpenAI for intelligent response generation.",
                    },
                ]}
            />
            <EmailAutoresponderContent />
        </>
    );
}
