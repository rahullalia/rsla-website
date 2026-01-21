"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import Link from "next/link";

export default function CleaningCompanyContent() {
    const stats = [
        { value: "100%", label: "Operations Consolidated" },
        { value: "2 Employees", label: "Workload Saved" },
        { value: "24/7", label: "Automated Support" },
    ];

    return (
        <CaseStudyLayout
            tag="GoHighLevel Business Operations"
            title="How We Eliminated 2 Full-Time Positions by Rebuilding Operations from Scratch"
            description="A cleaning company was hemorrhaging money: 20+ hours weekly on admin, double-bookings weekly, and 2 employees just to handle scheduling and follow-ups. We rebuilt their entire operations in GoHighLevel with AI automation and Housecall Pro sync. Those 2 positions? Redeployed to revenue-generating fieldwork."
            stats={stats}
        >
            <h2>The Challenge: 50+ Clients, 4 Systems, Zero Visibility</h2>
            <p>
                White Glove Cleaning had grown to 50+ recurring clients, and their operations were collapsing under the weight. Housecall Pro for scheduling. Google Sheets for customer notes. Manual texts for follow-ups. Email for invoicing. The owner was burning 20+ hours weekly on admin tasks. They&apos;d hired 2 full-time employees just to answer phones and send confirmation texts.
            </p>
            <p>
                The operational bleeding:
            </p>
            <ul>
                <li><strong>Customer data fragmented across 4 systems:</strong> No single source of truth for history, preferences, or communications</li>
                <li><strong>Manual follow-up workflows:</strong> Employees typing the same confirmation texts, review requests, and rebooking messages hundreds of times monthly</li>
                <li><strong>Weekly double-bookings:</strong> Scheduling not synced with communication, conflicts guaranteed</li>
                <li><strong>Revenue leaking everywhere:</strong> No automated upsell, rebooking, or dormant client reactivation</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Scattered operations don&apos;t just waste time. They create blind spots that cost you customers. Every disconnected system is a leak in your revenue pipeline. You can&apos;t fix what you can&apos;t see.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Eliminate Your Blind Spots
                </Link>
            </div>

            <h2>The Solution: We Architected GoHighLevel as Central Command</h2>
            <p>
                We rebuilt their entire operations infrastructure in GoHighLevel, creating a single source of truth for all customer interactions, scheduling, and communications. Critical constraint: they needed to keep Housecall Pro for scheduling. We engineered bidirectional sync so both systems stayed in lockstep.
            </p>

            <h3>Phase 1: Engineered Housecall Pro Integration & Data Migration</h3>
            <ul>
                <li>Built custom API integration between Housecall Pro and GoHighLevel using Make.com</li>
                <li>Migrated all customer data, job history, and notes into unified GoHighLevel contacts</li>
                <li>Deployed bidirectional sync: jobs scheduled in Housecall Pro automatically create opportunities in GoHighLevel</li>
                <li>Constructed custom fields tracking service type, frequency, property size, and preferences</li>
            </ul>

            <h3>Phase 2: Deployed AI-Powered Communication Workflows</h3>
            <ul>
                <li><strong>Automated appointment confirmations:</strong> SMS/email at 48 hours, 24 hours, and morning-of</li>
                <li><strong>AI-personalized review requests:</strong> Sent 2 hours post-completion with service-specific messaging</li>
                <li><strong>Smart rebooking sequences:</strong> Workflows triggered by service frequency (weekly, bi-weekly, monthly)</li>
                <li><strong>24/7 AI chat widget:</strong> Answers FAQs, books estimates, qualifies leads while the team sleeps</li>
                <li><strong>Emergency request handling:</strong> After-hours inquiries get instant responses with next-available slots</li>
            </ul>

            <h3>Phase 3: Constructed Operational Command Dashboard</h3>
            <ul>
                <li>Custom pipeline views: New Leads, Active Jobs, Follow-Ups, Recurring Clients</li>
                <li>Daily digest emails: jobs scheduled, completions, review scores, revenue at a glance</li>
                <li>Automated reporting: customer lifetime value, rebooking rates, service profitability</li>
                <li>Team task automation: quality checks and special requests routed automatically</li>
            </ul>

            <div className="proof-box">
                <h3>Client Testimonial</h3>
                <p>
                    &quot;We went from needing 2 people just to answer phones and schedule jobs to having everything run automatically. I get a morning email showing exactly what&apos;s happening that day, and I can see our entire business in one place. The AI chat even books estimates while I&apos;m sleeping. This paid for itself in the first month.&quot;
                </p>
                <p className="text-sm text-gray-500 mt-4">
                    - Owner, White Glove Cleaning
                </p>
            </div>

            <h2>The Results: 2 Positions Eliminated, $15K Revenue Recovered</h2>
            <p>
                Within 60 days of go-live:
            </p>
            <ul>
                <li><strong>100% operations consolidated:</strong> All customer data, communications, and workflows in one system</li>
                <li><strong>2 employees redeployed to fieldwork:</strong> Admin positions eliminated, service capacity increased</li>
                <li><strong>99% confirmation rate:</strong> Automated reminders virtually eliminated no-shows</li>
                <li><strong>37 leads captured, 18 converted:</strong> AI chat widget booking estimates while the team sleeps</li>
                <li><strong>14 → 132 Google reviews in 60 days:</strong> Automated review requests running on autopilot</li>
                <li><strong>$15K recovered annually:</strong> Rebooking workflows reactivated 23 dormant clients</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    The right operations platform doesn&apos;t just save time. It unlocks revenue you didn&apos;t know was leaking. Automating the routine work frees your team for high-value activities that actually grow the business.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Unlock Your Hidden Revenue
                </Link>
            </div>

            <div className="cta-section">
                <h2>Your Operations Are Scattered. Your Revenue Is Leaking.</h2>
                <p>
                    If you&apos;re managing your business across multiple platforms, you&apos;re paying for inefficiency you can&apos;t even see. We build centralized operations hubs that run 24/7 and pay for themselves in weeks.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Consolidate Your Operations
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
