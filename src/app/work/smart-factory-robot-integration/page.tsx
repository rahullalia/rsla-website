import type { Metadata } from "next";
import SmartFactoryContent from "./SmartFactoryContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Real-Time Robot Tracking for Automotive Manufacturing | RSL/A",
    description: "How we engineered MQTT + REST API integration for autonomous mobile robots with digital twin platform, enabling 10Hz real-time tracking across manufacturing plants.",
    alternates: {
        canonical: "https://rsla.io/work/smart-factory-robot-integration",
    },
    openGraph: {
        title: "Real-Time Robot Tracking for Automotive Manufacturing",
        description: "How we engineered MQTT + REST API integration for autonomous mobile robots with digital twin platform, enabling 10Hz real-time tracking across manufacturing plants.",
        url: "https://rsla.io/work/smart-factory-robot-integration",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function Page() {
    return (
        <>
            <ArticleSchema
                title="Real-Time Robot Tracking for Automotive Manufacturing"
                description="How we engineered MQTT + REST API integration for autonomous mobile robots with digital twin platform."
                url="https://rsla.io/work/smart-factory-robot-integration"
                datePublished="2024-08-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "Smart Factory Integration", url: "https://rsla.io/work/smart-factory-robot-integration" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "What is the tracking frequency achieved?",
                        answer: "The system enables 10Hz real-time tracking of autonomous mobile robots across manufacturing plants.",
                    },
                    {
                        question: "What technologies were used?",
                        answer: "MQTT protocol and REST API integration were engineered to connect autonomous mobile robots with a digital twin platform.",
                    },
                    {
                        question: "What industry was this built for?",
                        answer: "The system was built for automotive manufacturing plants requiring real-time visibility into robot operations.",
                    },
                ]}
            />
            <SmartFactoryContent />
        </>
    );
}
