"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import ImageLightbox from "@/components/ImageLightbox";
import Link from "next/link";

export default function SpiceOnASliceContent() {
    const stats = [
        { value: "+118", label: "New Google Reviews" },
        { value: "$25K", label: "Extra Revenue in 60 Days" },
        { value: "1st Page", label: "Google Maps Rank" },
    ];

    return (
        <CaseStudyLayout
            tag="Local SEO & Customer Nurture Automation"
            title="How We Drove 118 New Google Reviews and $25K Revenue in 60 Days"
            description="A Queens pizza shop was invisible online with just 14 Google reviews. We deployed automated review generation and customer nurture, adding 118 reviews and $25K in revenue in two months."
            stats={stats}
        >
            <h2>The Challenge: Great Pizza, Zero Visibility</h2>
            <p>
                Spice on a Slice made excellent pizza. Their regulars loved them. But online? They were invisible. With only <strong>14 Google reviews</strong>, they were buried beyond page two of local search results, effectively nonexistent to anyone discovering restaurants online.
            </p>
            <p>
                Every day, potential customers searched &quot;pizza near me&quot; and found their competitors instead. The shop&apos;s lack of digital social proof was strangling growth and leaving revenue on the table.
            </p>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Satisfied customers don&apos;t become reviewers automatically. Without a system to convert in-store loyalty into online advocacy, even great businesses stay invisible to new customers.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Fix Your Visibility Gap
                </Link>
            </div>

            <h2>The Solution: We Built an Automated Review Generation Engine</h2>
            <p>
                We engineered a complete local SEO system, optimizing their Google Business Profile and deploying automated review generation that converts happy customers into online advocates.
            </p>

            <h3>Phase 1: Deployed In-Store Lead Capture + CRM Pipeline</h3>
            <ul>
                <li>
                    Configured a frictionless in-store capture system: free slice in exchange for contact info
                </li>
                <li>
                    Every contact instantly flowed into CRM for automated follow-up
                </li>
                <li>
                    Launched a <strong>database reactivation campaign</strong> via SMS and email to re-engage past customers and kickstart review generation
                </li>
            </ul>

            <h3>Phase 2: Activated Automated Review + Nurture Sequences</h3>
            <p>
                The system ran autonomously: every new customer received polite, well-timed <strong>review requests</strong> via SMS and email. Ongoing nurture campaigns drove repeat visits with promotions and menu updates, generating consistent reviews and compounding revenue.
            </p>

            <h2>The Results: 118 New Reviews. $25K Revenue. Page 1 Ranking.</h2>

            <div className="proof-box">
                <h3>Client Testimonial</h3>
                <p>
                    &quot;People already liked our pizza, but not enough people knew about us. New customers are finding us now, old ones are coming back, and our Google reviews finally show the quality we&apos;ve always had.&quot;
                </p>
            </div>

            <p>
                In under 60 days, the shop&apos;s local presence transformed completely:
            </p>

            <ImageLightbox
                src="/images/case-studies/spice-on-a-slice/before-after-reviews.webp"
                alt="Spice on a Slice Google reviews growth: 14 to 132 reviews"
                caption="Before & After: 14 to 132 Google reviews in 60 days (click to enlarge)"
                className="my-12"
                size="large"
            />

            <ul>
                <li>
                    <strong>Reviews exploded from 14 to 132</strong>, establishing undeniable social proof
                </li>
                <li>
                    <strong>$25,000 in new revenue</strong> from increased visibility and repeat visits
                </li>
                <li>
                    <strong>First page Google Maps ranking</strong> for key local searches, capturing walk-in traffic
                </li>
                <li>
                    <strong>Repeat business compounding</strong> from automated nurture sequences
                </li>
            </ul>

            <div className="cta-section">
                <h2>Your Competitors Are Stealing Your Customers Online</h2>
                <p>
                    Every day without reviews is a day competitors capture your potential customers. We build automated review generation systems that turn your satisfied customers into your marketing engine.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Dominate Local Search
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
