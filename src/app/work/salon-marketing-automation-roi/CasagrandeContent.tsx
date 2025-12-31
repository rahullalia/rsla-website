"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import ImageLightbox from "@/components/ImageLightbox";
import Link from "next/link";

export default function CasagrandeContent() {
    const stats = [
        { value: "+60X", label: "Return on Ad Spend" },
        { value: "$36,000", label: "Annual Rental Income" },
        { value: "2", label: "Suites Rented (Long-Term)" },
    ];

    return (
        <CaseStudyLayout
            tag="Digital Marketing & Automated Lead Nurture"
            title="How $600 in Meta Ads Generated $36K in Annual Rental Income"
            description="A Manhattan salon owner spent two years failing to fill vacant suites. We deployed precision-targeted Meta Ads and automated lead nurture that secured $36,000 in annual revenue, a 60X return on ad spend."
            stats={stats}
        >
            <h2>The Challenge: Two Years of Empty Rooms Bleeding Money</h2>
            <p>
                Two vacant suites. Two years of trying. Zero results. That was Laiz&apos;s reality at Casagrande Salon in Manhattan. Premium space sitting idle wasn&apos;t just an inconvenience. It was a $3,000/month wound that wouldn&apos;t stop bleeding.
            </p>
            <p>
                She&apos;d tried everything: scattered social posts, unfocused ads, word-of-mouth prayers. Nothing stuck. The leads that did trickle in vanished into a black hole of missed messages and forgotten follow-ups. Meanwhile, the financial pressure compounded month after month.
            </p>

            {/* Key Takeaway Box */}
            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Vacant space isn&apos;t a marketing problem. It&apos;s a <strong>systems problem</strong>. Without targeted outreach and automated nurture, even premium real estate becomes a liability instead of an asset.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Fix Your Lead Leakage
                </Link>
            </div>

            <h2>The Solution: Precision Targeting + Automated Conversion Machine</h2>
            <p>
                We structured a performance-based partnership: Laiz covered a modest $600 ad spend, and we&apos;d only earn the first month&apos;s rent upon securing year-long tenants. Skin in the game with aligned incentives.
            </p>

            <h3>Phase 1: Deployed Hyper-Targeted Meta Ads + CRM Infrastructure</h3>
            <ul>
                <li>
                    Engineered <strong>laser-focused Meta Ads</strong> targeting stylists, barbers, and beauty professionals within a tight Manhattan radius with no wasted impressions.
                </li>
                <li>
                    Configured instant lead capture flowing directly into GoHighLevel CRM with zero manual data entry.
                </li>
                <li>
                    Activated automated SMS/email sequences with qualification questions, appointment scheduling, and follow-up triggers so every lead was engaged within minutes.
                </li>
            </ul>

            <ImageLightbox
                src="/images/case-studies/casagrande-salon/ghl-workflow-example.png"
                alt="GoHighLevel CRM workflow setup for Casagrande Salon"
                caption="Automated CRM workflow in GoHighLevel (click to enlarge)"
                className="my-12"
                size="medium"
            />

            <h3>Phase 2: Built Hands-Free Lead Nurture Pipeline</h3>
            <p>
                The system ran <strong>completely hands-off</strong> for Laiz. Automated workflows tracked every conversation, scheduled salon tours, and managed all communication until prospects were ready to sign. No more scattered notes. No more missed messages. No more leads slipping through the cracks.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
                <ImageLightbox
                    src="/images/case-studies/casagrande-salon/sms-workflow-example.png"
                    alt="Automated SMS follow-up sequence"
                    caption="Automated SMS sequence (click to enlarge)"
                    size="full"
                />
                <ImageLightbox
                    src="/images/case-studies/casagrande-salon/email-workflow-example.png"
                    alt="Automated email follow-up sequence"
                    caption="Automated email sequence (click to enlarge)"
                    size="full"
                />
            </div>

            <h2>The Results: From Two-Year Failure to $36K Annual Revenue in 90 Days</h2>

            {/* Proof Box */}
            <div className="proof-box">
                <h3>Client Testimonial</h3>

                <div className="my-8 max-w-[350px] mx-auto">
                    <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
                        <iframe
                            src="https://fast.wistia.net/embed/iframe/hr0yfppjnl?seo=false&videoFoam=true"
                            title="Casagrande Salon Testimonial"
                            allow="autoplay; fullscreen"
                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                        ></iframe>
                    </div>
                </div>

                <p className="mt-6">
                    &quot;I tried for years to rent my salon space and nothing worked. After Rahul and RSL/A, in just a few months both my rooms were filled. Now I don&apos;t stress about rent anymore.&quot;
                </p>
            </div>

            <p>
                Within three months, both suites were locked in with quality, long-term stylists on one-year leases. $3,000/month in rental income (<strong>$36,000 annually</strong>) secured with a $600 ad investment.
            </p>

            <ul>
                <li>
                    <strong>60X return on ad spend:</strong> $600 in, $36,000 out. That&apos;s not marketing. That&apos;s a money machine.
                </li>
                <li>
                    <strong>Liability → Asset:</strong> Empty suites transformed into a predictable, passive revenue stream.
                </li>
                <li>
                    <strong>Stress → Surplus:</strong> Laiz went from worrying about rent to counting profit.
                </li>
            </ul>

            {/* CTA Section */}
            <div className="cta-section">
                <h2>Your Vacant Space Is Costing You $3K+ Every Month</h2>
                <p>
                    Whether it&apos;s salon suites, office space, or rental units, empty rooms are burning money. We build targeted ad + automated nurture systems that fill vacancies fast and keep them filled.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Fill Your Vacancies
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
