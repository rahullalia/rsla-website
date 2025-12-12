import CaseStudyLayout from "@/components/CaseStudyLayout";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Casagrande Salon Case Study | RSL/A",
    description: "How we engineered a $36k/year passive revenue stream for a Manhattan salon using automated lead nurturing.",
};

export default function Page() {
    const stats = [
        { value: "60X", label: "Return on Ad Spend" },
        { value: "$36k", label: "Annual Revenue Added" },
        { value: "100%", label: "Occupancy Achieved" },
    ];

    return (
        <CaseStudyLayout
            title="Automating Rental Revenue."
            subtitle="Turning vacant real estate into a passive income engine using targeted Meta Ads and rigorous CRM automation."
            stats={stats}
        >
            <h2>The Problem: Expensive Air</h2>
            <p>
                Laiz, owner of Casagrande Salon in Manhattan, had a problem common to brick-and-mortar: <strong>idle inventory</strong>. Two stylist suites sat empty for nearly two years. In NYC real estate terms, that is bleeding cash.
            </p>
            <p>
                Manual efforts failed. Posting on Instagram and word-of-mouth wasn&apos;t scalable. She needed a system that could identify qualified stylists, pitch them the space, and lease it—without her having to play leasing agent.
            </p>

            <div className="my-12 p-8 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl">
                <h3 className="text-brand-blue mt-0">The Audit</h3>
                <p className="mb-0">
                    The issue wasn&apos;t the space; it was the <strong>pipeline</strong>. There was no mechanism to capture interest or nurture leads. The &quot;follow-up&quot; lived in Laiz&apos;s head, which meant it didn&apos;t happen.
                </p>
            </div>

            <h2>The Engineering: A Closed-Loop System</h2>
            <p>
                We didn&apos;t just run ads. We built a leasing machine.
            </p>

            <h3>1. Hyper-Targeted Acquisition</h3>
            <p>
                We deployed Meta Ads specifically targeting beauty professionals within a tight radius of the salon. Creative focused on the specific pain points of renting: freedom, profit, and location.
            </p>

            <h3>2. The &quot;RSL Connect&quot; CRM Core</h3>
            <p>
                Leads didn&apos;t go to an inbox to die. They went into our automated CRM architecture.
            </p>
            <ul>
                <li><strong>Instant Response:</strong> Leads received an SMS within 30 seconds.</li>
                <li><strong>Qualification:</strong> Automated workflows filtered out time-wasters.</li>
                <li><strong>Booking:</strong> Only qualified candidates could schedule a tour.</li>
            </ul>

            <figure>
                <Image
                    src="/images/case-studies/casagrande-salon/ghl-workflow-example.png"
                    alt="GoHighLevel Workflow"
                    width={800}
                    height={500}
                    className="rounded-lg border border-white/10"
                />
                <figcaption className="text-center text-gray-500 text-sm mt-2">The automated nervous system behind the leasing process.</figcaption>
            </figure>

            <h2>The Outcome</h2>
            <p>
                Within 90 days, both suites were leased to high-quality tenants on 1-year contracts.
            </p>
            <p>
                <strong>The math is simple:</strong>
                <br />
                $600 Ad Spend → $3,000/mo Rental Income → <strong>$36,000/year ARR.</strong>
            </p>

            <div className="wistia-video-container my-12 relative w-full aspect-video rounded-xl overflow-hidden bg-brand-black border border-white/10">
                <iframe
                    src="https://fast.wistia.net/embed/iframe/hr0yfppjnl?seo=false&videoFoam=true"
                    title="Case Study Video"
                    allow="autoplay; fullscreen"
                    frameBorder="0"
                    className="absolute top-0 left-0 w-full h-full"
                ></iframe>
            </div>

            <p>
                Laiz moved from stress to surplus. The system didn&apos;t just fill the room; it bought back her time.
            </p>
        </CaseStudyLayout>
    );
}
