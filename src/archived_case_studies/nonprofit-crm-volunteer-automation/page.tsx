import type { Metadata } from "next";
import NonprofitCRMContent from "./NonprofitCRMContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Automated Volunteer Onboarding, Saving $40K a Year for International Nonprofit | RSL/A",
    description: "How an international humanitarian nonprofit unified 100% of their volunteer database and automated onboarding workflows, eliminating $40,000 in annual administrative costs.",
    alternates: {
        canonical: "https://rsla.io/work/nonprofit-crm-volunteer-automation",
    },
    openGraph: {
        title: "Automated Volunteer Onboarding, Saving $40K a Year for International Nonprofit",
        description: "How an international humanitarian nonprofit unified 100% of their volunteer database and automated onboarding workflows, eliminating $40,000 in annual administrative costs.",
        url: "https://rsla.io/work/nonprofit-crm-volunteer-automation",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function Page() {
    return (
        <>
            <ArticleSchema
                title="Automated Volunteer Onboarding, Saving $40K a Year for International Nonprofit"
                description="How an international humanitarian nonprofit unified 100% of their volunteer database and automated onboarding workflows."
                url="https://rsla.io/work/nonprofit-crm-volunteer-automation"
                datePublished="2024-04-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "International Nonprofit", url: "https://rsla.io/work/nonprofit-crm-volunteer-automation" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How much does this nonprofit save with the automated system?",
                        answer: "The organization saves $40,000 annually by automating volunteer onboarding and eliminating the need for a full-time coordinator.",
                    },
                    {
                        question: "What was unified in the volunteer database?",
                        answer: "100% of volunteer and donor data was unified into a single CRM with automated workflows for onboarding and communication.",
                    },
                    {
                        question: "What platform was used for the nonprofit CRM?",
                        answer: "GoHighLevel was implemented as the central CRM with custom automations for volunteer management.",
                    },
                ]}
            />
            <NonprofitCRMContent />
        </>
    );
}
