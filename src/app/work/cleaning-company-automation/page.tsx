import type { Metadata } from "next";
import CleaningCompanyContent from "./CleaningCompanyContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Rebuilt Entire Operations With AI and Housecall Pro Sync | RSL/A",
    description: "How a cleaning company consolidated 100% of operations into GoHighLevel with AI automation and Housecall Pro integration, saving 2 employees worth of workload.",
    alternates: {
        canonical: "https://rsla.io/work/cleaning-company-automation",
    },
    openGraph: {
        title: "Rebuilt Entire Operations With AI and Housecall Pro Sync",
        description: "How a cleaning company consolidated 100% of operations into GoHighLevel with AI automation and Housecall Pro integration, saving 2 employees worth of workload.",
        url: "https://rsla.io/work/cleaning-company-automation",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function Page() {
    return (
        <>
            <ArticleSchema
                title="Rebuilt Entire Operations With AI and Housecall Pro Sync"
                description="How a cleaning company consolidated 100% of operations into GoHighLevel with AI automation and Housecall Pro integration."
                url="https://rsla.io/work/cleaning-company-automation"
                datePublished="2024-05-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "Cleaning Company Automation", url: "https://rsla.io/work/cleaning-company-automation" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How much workload was saved with the cleaning company automation?",
                        answer: "The automation saved the equivalent of 2 full-time employees worth of workload by consolidating all operations into GoHighLevel.",
                    },
                    {
                        question: "What systems were integrated?",
                        answer: "GoHighLevel was integrated with Housecall Pro for seamless scheduling, dispatching, and customer communication automation.",
                    },
                    {
                        question: "What percentage of operations was consolidated?",
                        answer: "100% of operations were consolidated into a single platform with AI-powered automation for customer service and scheduling.",
                    },
                ]}
            />
            <CleaningCompanyContent />
        </>
    );
}
