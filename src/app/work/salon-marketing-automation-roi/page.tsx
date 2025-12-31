import type { Metadata } from "next";
import CasagrandeContent from "./CasagrandeContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "$600 in Meta Ads Drove $36K in Rental Income for Casagrande Salon | RSL/A",
    description: "Manhattan-based Casagrande Salon leveraged unused space and RSL/A's targeted advertising to generate $36,000 in passive annual revenue.",
    alternates: {
        canonical: "https://rsla.io/work/salon-marketing-automation-roi",
    },
    openGraph: {
        title: "$600 in Meta Ads Drove $36K in Rental Income for Casagrande Salon",
        description: "Manhattan-based Casagrande Salon leveraged unused space and RSL/A's targeted advertising to generate $36,000 in passive annual revenue.",
        url: "https://rsla.io/work/salon-marketing-automation-roi",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function Page() {
    return (
        <>
            <ArticleSchema
                title="$600 in Meta Ads Drove $36K in Rental Income for Casagrande Salon"
                description="Manhattan-based Casagrande Salon leveraged unused space and RSL/A's targeted advertising to generate $36,000 in passive annual revenue."
                url="https://rsla.io/work/salon-marketing-automation-roi"
                datePublished="2024-06-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "Casagrande Salon", url: "https://rsla.io/work/salon-marketing-automation-roi" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How much did Casagrande Salon spend on Meta Ads?",
                        answer: "Casagrande Salon invested only $600 in Meta Ads to generate $36,000 in annual rental income, achieving a 60X return on ad spend.",
                    },
                    {
                        question: "What results did RSL/A achieve for Casagrande Salon?",
                        answer: "RSL/A helped Casagrande Salon fill vacant suites and generate $36,000 in passive annual revenue with a 60X return on ad spend through targeted Meta advertising.",
                    },
                    {
                        question: "How long did it take to see results?",
                        answer: "Results began within weeks of launching the targeted Meta Ads campaign, with qualified stylist leads flowing into the CRM for automated follow-up.",
                    },
                ]}
            />
            <CasagrandeContent />
        </>
    );
}
