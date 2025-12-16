import type { Metadata } from "next";
import RSLBlogContent from "./RSLBlogContent";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Saved $18K a Year with Make.com and ChatGPT | RSL/A",
    description: "Facing high copywriting costs, RSL/A built an internal automation system to consistently publish high-quality, SEO-optimized blog content, saving $18,000 annually.",
    alternates: {
        canonical: "https://rsla.io/work/rsl-blog-automation",
    },
    openGraph: {
        title: "Blog Automation Case Study: How RSL/A Saved $18K a Year with Make.com and ChatGPT",
        description: "Facing high copywriting costs, RSL/A built an internal automation system to consistently publish high-quality, SEO-optimized blog content, saving $18,000 annually.",
        url: "https://rsla.io/work/rsl-blog-automation",
        siteName: "RSL/A",
        type: "article",
    },
};

export default function RSLBlogAutomationPage() {
    return (
        <>
            <ArticleSchema
                title="Saved $18K a Year with Make.com and ChatGPT"
                description="Facing high copywriting costs, RSL/A built an internal automation system to consistently publish high-quality, SEO-optimized blog content."
                url="https://rsla.io/work/rsl-blog-automation"
                datePublished="2024-07-01"
            />
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://rsla.io" },
                    { name: "Case Studies", url: "https://rsla.io/work" },
                    { name: "Blog Automation", url: "https://rsla.io/work/rsl-blog-automation" },
                ]}
            />
            <FAQSchema
                faqs={[
                    {
                        question: "How much does the blog automation system save annually?",
                        answer: "The automation saves $18,000 annually by eliminating the need for external copywriters while maintaining high-quality, SEO-optimized content.",
                    },
                    {
                        question: "What tools power the blog automation?",
                        answer: "The system uses Make.com for workflow orchestration and ChatGPT for AI-powered content generation and optimization.",
                    },
                    {
                        question: "What type of content does the automation produce?",
                        answer: "The automation produces SEO-optimized blog posts that are consistently high-quality and aligned with content marketing best practices.",
                    },
                ]}
            />
            <RSLBlogContent />
        </>
    );
}
