import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    slug: "market-research-automation",
    tag: "Python Automation & AWS Development",
    title: "Automation Platform Saving $136K Annually for Market Research Firm",
    description: "Built distributed web scraping and OCR automation on AWS, reducing a 4-month manual process to 2 weeks with 97% accuracy.",
    metrics: [
      { value: "$136K", label: "Annual Savings" },
      { value: "87.5%", label: "Time Reduction" },
    ],
    featured: false,
  },
  {
    slug: "casagrande-salon",
    tag: "Digital Marketing & Lead Nurture",
    title: "$600 in Meta Ads Drove $36K in Rental Income",
    description: "Helped a Manhattan salon owner fill vacant suites, turning unused space into a reliable, passive revenue stream with a 60X return on ad spend.",
    metrics: [
      { value: "+60X", label: "Return on Ad Spend" },
      { value: "$36K", label: "Annual Income" },
    ],
    featured: true,
  },
  {
    slug: "email-ice-breaker-automation",
    tag: "AI Automation & Cold Email",
    title: "AI Cold Email Personalization Saves 325 Hours Annually",
    description: "Automated cold email personalization with AI, reducing research and writing time from 8 minutes to 30 seconds per email using LinkedIn enrichment data.",
    metrics: [
      { value: "94%", label: "Time Reduction" },
      { value: "$43K+", label: "Annual Savings" },
    ],
    featured: true,
  },
  {
    slug: "united-sikhs",
    tag: "Nonprofit CRM & Volunteer Management",
    title: "Automated Volunteer Onboarding, Saving $40K a Year",
    description: "Centralized volunteer and donor data for a humanitarian NGO, saving the cost of a full-time coordinator by implementing automated GHL workflows.",
    metrics: [
      { value: "$40,000", label: "Annual Cost Saved" },
      { value: "100%", label: "Database Unification" },
    ],
    featured: false,
  },
  {
    slug: "proposal-generator-automation",
    tag: "AI Automation & Workflow",
    title: "AI Proposal Generator Saves $22K Annually",
    description: "Automated proposal creation with AI, reducing production time from 2 hours to 10 minutes and recovering 165 hours annually through Make.com, Claude AI, and Google Docs.",
    metrics: [
      { value: "92%", label: "Time Reduction" },
      { value: "$22K+", label: "Annual Savings" },
    ],
    featured: true,
  },
  {
    slug: "spice-on-a-slice",
    tag: "Local SEO & Customer Nurture",
    title: "From 14 to 132 Google Reviews and $25K in 60 Days",
    description: "Transformed a local pizza shop's online visibility, generating over 100 new reviews and a significant revenue bump through automated customer sequences.",
    metrics: [
      { value: "+118", label: "New Google Reviews" },
      { value: "$25K", label: "Extra Revenue" },
    ],
    featured: false,
  },
  {
    slug: "facebook-ads-reporting-automation",
    tag: "Marketing Automation & Google Sheets",
    title: "Facebook Ads Reporting Automation Saves 990+ Hours Annually",
    description: "Automated a 4-hour daily Facebook Ads data tracking process down to 10 minutes, freeing up the lead marketer and boosting conversions by 4%.",
    metrics: [
      { value: "96%", label: "Time Reduction" },
      { value: "$18K", label: "Annual Savings" },
    ],
    featured: false,
  },
  {
    slug: "email-autoresponder-automation",
    tag: "AI Automation & Email Intelligence",
    title: "Never Lose Another Lead: AI Auto-Responder That Actually Reads Messages",
    description: "Built an intelligent AI email auto-responder that personalizes replies based on message content, responding in 24 seconds and capturing leads 24/7.",
    metrics: [
      { value: "24 sec", label: "Avg Response Time" },
      { value: "100%", label: "Personalized Replies" },
    ],
    featured: false,
  },
  {
    slug: "ai-media-automation-founding-engineer",
    tag: "AI Engineering & Content Automation",
    title: "Founding Engineer: AI Automation Systems for Media Company",
    description: "Architected three production AI systems reducing manual content operations by 70%, from video QC to social content generation.",
    metrics: [
      { value: "70%", label: "Workload Reduction" },
      { value: "83-92%", label: "QC Time Saved" },
    ],
    featured: false,
  },
  {
    slug: "cleaning-company-automation",
    tag: "GoHighLevel Business Operations",
    title: "Rebuilt Entire Operations With AI and Housecall Pro Sync",
    description: "Designed an end-to-end operational system using GHL, AI, and deep integration with HCP, eliminating manual tasks and creating a foundation for scaling.",
    metrics: [
      { value: "100%", label: "Operations Consolidated" },
      { value: "2 Employees", label: "Workload Saved" },
    ],
    featured: false,
  },
  {
    slug: "rsl-blog-automation",
    tag: "AI Automation & Content Strategy",
    title: "Saved $18K a Year with Make.com and ChatGPT",
    description: "An internal case study proving that AI-powered automation can consistently publish high-quality, SEO-optimized content, eliminating massive copywriting costs.",
    metrics: [
      { value: "$18,000", label: "Annual Cost Saved" },
      { value: "4X", label: "Content Velocity" },
    ],
    featured: false,
  },
  {
    slug: "smart-factory-robot-integration",
    tag: "IoT & Industrial Automation",
    title: "Real-Time Robot Tracking for Automotive Manufacturing",
    description: "Engineered MQTT + REST API integration for autonomous mobile robots, enabling 10Hz real-time tracking across manufacturing plants.",
    metrics: [
      { value: "10Hz", label: "Real-Time Streaming" },
      { value: "Multi-Plant", label: "Enterprise Scale" },
    ],
    featured: false,
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Proven <br /> <span className="text-gradient">Performance.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            We don&apos;t sell promises. We sell engineered outcomes. Here is the proof.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group flex flex-col justify-between rounded-[20px] overflow-hidden border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-brand-blue hover:-translate-y-[5px] hover:shadow-[0_10px_30px_rgba(0,112,243,0.15)]"
              >
                {/* Content */}
                <div>
                  {/* Featured Badge */}
                  {study.featured && (
                    <div className="inline-block mb-3">
                      <span className="text-[0.65rem] bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-2 py-1 rounded-full uppercase tracking-wider font-bold">
                        Featured
                      </span>
                    </div>
                  )}

                  <span className="text-[0.8rem] text-brand-blue uppercase tracking-[1.5px] mb-4 block font-bold">
                    {study.tag}
                  </span>
                  <h3 className="text-[1.8rem] leading-[1.2] text-white mb-3">
                    {study.title}
                  </h3>
                  <p className="text-base text-gray-400 mb-8">
                    {study.description}
                  </p>
                </div>

                {/* Results */}
                <div className="mt-5 pt-4 border-t border-white/10 flex justify-between gap-4">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center flex-1">
                      <strong className="block text-[1.6rem] text-white leading-[1.1]">
                        {metric.value}
                      </strong>
                      <span className="block text-[0.75rem] text-brand-blue uppercase mt-1">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to be the next <span className="text-brand-blue">case study?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let&apos;s build you an intelligent marketing system that delivers measurable results.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-full font-semibold text-lg shadow-[0_0_30px_rgba(0,112,243,0.4)] hover:shadow-[0_0_50px_rgba(0,112,243,0.6)] hover:-translate-y-1 transition-all duration-300"
          >
            Start Your Project <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
