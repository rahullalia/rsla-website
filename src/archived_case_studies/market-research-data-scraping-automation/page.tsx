import type { Metadata } from "next";
import MarketResearchContent from "./MarketResearchContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Automation Platform Saving $136K Annually for Market Research Firm | RSL/A",
    description: "How we built a distributed web scraping and OCR automation platform on AWS, reducing a 4-month manual process to 2 weeks and saving $136,000 per year.",
    alternates: {
        canonical: "https://rsla.io/work/market-research-data-scraping-automation",
    },
    openGraph: {
        title: "Automation Platform Saving $136K Annually for Market Research Firm",
        description: "How we built a distributed web scraping and OCR automation platform on AWS, reducing a 4-month manual process to 2 weeks and saving $136,000 per year.",
        url: "https://rsla.io/work/market-research-data-scraping-automation",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function Page() {
    return (
        <>
            <ArticleSchema
                title="Automation Platform Saving $136K Annually for Market Research Firm"
                description="How we built a distributed web scraping and OCR automation platform on AWS, reducing a 4-month manual process to 2 weeks."
                url="https://rsla.io/work/market-research-data-scraping-automation"
                datePublished="2024-03-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "Market Research Automation", url: "https://rsla.io/work/market-research-data-scraping-automation" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How much does the market research automation save annually?",
                        answer: "The automation platform saves $136,000 annually by reducing a 4-month manual data collection process to just 2 weeks with 97% accuracy.",
                    },
                    {
                        question: "What technology was used to build the automation?",
                        answer: "The platform was built using Python, AWS Lambda for distributed processing, and OCR technology for document scanning.",
                    },
                    {
                        question: "What was the time reduction achieved?",
                        answer: "Processing time was reduced by 87.5%, from 4 months of manual work to 2 weeks of automated processing.",
                    },
                ]}
            />
            <MarketResearchContent />
        </>
    );
}
