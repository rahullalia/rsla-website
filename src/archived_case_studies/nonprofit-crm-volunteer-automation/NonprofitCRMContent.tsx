"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import Link from "next/link";

export default function NonprofitCRMContent() {
    const stats = [
        { value: "$40K", label: "Annual Cost Saved" },
        { value: "100%", label: "Database Unification" },
        { value: "2,000+", label: "Volunteers Managed" },
    ];

    return (
        <CaseStudyLayout
            tag="Nonprofit CRM & Volunteer Management"
            title="How We Eliminated a $40K/Year Position by Automating Volunteer Onboarding"
            description="A global humanitarian nonprofit was drowning in spreadsheets, managing 2,000+ volunteers across 15 countries. We unified their fragmented databases and automated the entire onboarding workflow, freeing $40K annually for direct program services."
            stats={stats}
        >
            <h2>The Challenge: 2,000 Volunteers Scattered Across 15 Databases</h2>
            <p>
                This international nonprofit runs disaster relief and humanitarian programs across 15 countries. Their volunteer army of 2,000+ was their greatest asset and their biggest operational nightmare. Data lived in Google Sheets, email lists, and local chapter databases. Onboarding a single volunteer consumed 3-5 hours of manual work.
            </p>
            <p>
                The operational bleeding was severe:
            </p>
            <ul>
                <li><strong>Database chaos:</strong> 15 regional chapters maintained separate lists with duplicates, conflicts, and data rot everywhere</li>
                <li><strong>Manual onboarding paralysis:</strong> Background checks, training, and scheduling required 100% human intervention</li>
                <li><strong>Volunteer leakage:</strong> No follow-up automation meant enthusiastic signups vanished into the void</li>
                <li><strong>Compliance exposure:</strong> Inconsistent records created liability gaps in sensitive humanitarian work</li>
                <li><strong>Reporting death march:</strong> Quarterly funder reports required weeks of manual data archaeology</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Fragmented volunteer data isn&apos;t an efficiency problem. It&apos;s a mission failure waiting to happen. When disaster strikes and you can&apos;t deploy the right people fast, lives are at stake. Unified systems aren&apos;t overhead; they&apos;re infrastructure.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Unify Your Operations
                </Link>
            </div>

            <h2>The Solution: We Built a Self-Running Volunteer Operations System</h2>
            <p>
                We architected a comprehensive volunteer management platform in GoHighLevel, creating a single source of truth, automated onboarding pipelines, and intelligent matching between volunteer skills and urgent program needs.
            </p>

            <h3>Phase 1: Unified All 15 Databases Into One CRM</h3>
            <ul>
                <li>Consolidated 2,000+ volunteer records from 15 regional databases into a single, clean system</li>
                <li>Eliminated duplicates and established data quality standards that prevent future rot</li>
                <li>Engineered custom fields for skills, certifications, availability, languages, and regional assignments</li>
                <li>Configured role-based access so chapter leads manage locally while HQ maintains global visibility</li>
            </ul>

            <h3>Phase 2: Automated the Entire Onboarding Pipeline</h3>
            <ul>
                <li><strong>Smart intake forms:</strong> Conditional logic routes volunteers based on type, location, and availability</li>
                <li><strong>Background check triggers:</strong> Automated verification requests with status tracking</li>
                <li><strong>Training delivery:</strong> Sequential email courses with embedded video, quizzes, and progress gates</li>
                <li><strong>AI-powered scheduling:</strong> Orientation booking integrated with chapter calendars</li>
                <li><strong>Document automation:</strong> Waivers, NDAs, and program-specific forms delivered and tracked automatically</li>
                <li><strong>Personalized welcome sequences:</strong> Custom journeys based on volunteer interests and capacity</li>
            </ul>

            <h3>Phase 3: Deployed Engagement & Rapid-Response Automation</h3>
            <ul>
                <li><strong>Skill-based matching:</strong> When emergencies hit, the system identifies qualified volunteers by skills, location, and availability in seconds</li>
                <li><strong>Re-engagement campaigns:</strong> Dormant volunteers receive personalized outreach based on their history</li>
                <li><strong>Recognition automation:</strong> Thank-you messages, milestone celebrations, and impact reports fire automatically</li>
                <li><strong>Growth pathing:</strong> Suggested training based on volunteer progression and program needs</li>
            </ul>

            <h3>Phase 4: Built Real-Time Reporting Infrastructure</h3>
            <ul>
                <li>Live dashboards tracking volunteer hours, program participation, and geographic distribution</li>
                <li>One-click quarterly reports for grant applications and board meetings with no manual compilation</li>
                <li>Retention analytics identifying at-risk volunteers before they disengage</li>
                <li>Impact tracking tied directly to volunteer contributions</li>
            </ul>

            <div className="proof-box">
                <h3>Client Testimonial</h3>
                <p>
                    &quot;Before RSL/A, onboarding a single volunteer took our coordinator 3-5 hours. Now it&apos;s completely automated, volunteers complete everything on their own, and we only step in for the final orientation call. We eliminated a full-time position and redirected that budget to direct program services. More importantly, when disaster strikes, we can deploy the right volunteers in minutes instead of days.&quot;
                </p>
                <p className="text-sm text-gray-500 mt-4">
                    - Operations Director
                </p>
            </div>

            <h2>The Results: $40K Freed. 95% Onboarding Automated. 3x Faster Deployment.</h2>
            <p>
                Within 90 days:
            </p>
            <ul>
                <li><strong>$40,000 redirected to programs:</strong> Eliminated full-time coordinator position so funds now serve the mission directly</li>
                <li><strong>100% database unification:</strong> All 2,000+ volunteers in one CRM with complete history and certifications</li>
                <li><strong>95% onboarding automation:</strong> From 3-5 hours of manual work to 15 minutes of human review per volunteer</li>
                <li><strong>3x faster emergency deployment:</strong> Volunteer mobilization reduced from days to hours</li>
                <li><strong>42% retention increase:</strong> Automated engagement workflows kept volunteers active and committed</li>
                <li><strong>80% reporting time eliminated:</strong> From 2 weeks of manual compilation to 2 hours of data export</li>
                <li><strong>Zero compliance incidents:</strong> Automated record-keeping eliminated every liability gap</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Automation in nonprofits isn&apos;t about replacing human connection. It&apos;s about freeing humans for mission-critical work. Every hour saved on data entry is an hour spent changing lives.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Free Your Team for Impact
                </Link>
            </div>

            <div className="cta-section">
                <h2>Your Spreadsheets Are Stealing From Your Mission</h2>
                <p>
                    Every hour spent on volunteer data entry is an hour not spent serving your cause. We build self-running volunteer management systems that let your team focus on what matters.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Automate Your Operations
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
