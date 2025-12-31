"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import Link from "next/link";

export default function MarketResearchContent() {
    const stats = [
        { value: "$136K", label: "Annual Savings" },
        { value: "87.5%", label: "Time Reduction" },
        { value: "97%", label: "Data Accuracy" },
    ];

    return (
        <CaseStudyLayout
            tag="Python Automation & AWS Development"
            title="How We Recovered $136K/Year by Replacing 80 Manual Workers with AI"
            description="A national research firm was hemorrhaging $136K annually on a 4-month manual data collection nightmare. We engineered a distributed AWS scraping platform with AI-powered OCR that crushed the timeline to 2 weeks and eliminated the need for an 80-person workforce."
            stats={stats}
        >
            <h2>The Challenge: $136K Bleeding Out Every Year on Manual Data Entry</h2>
            <p>
                Eighty people. Four months. One spreadsheet at a time. That was the brutal reality for a national research firm running one of the region&apos;s largest readership surveys. They weren&apos;t just inefficient. They were trapped in a cost spiral that threatened the entire operation.
            </p>
            <p>
                The bleeding was severe:
            </p>
            <ul>
                <li><strong>Crippling labor drain:</strong> 320 person-months of work annually, enough to fund an entire department</li>
                <li><strong>CAPTCHA fortress:</strong> Government databases weaponized image CAPTCHAs that blocked every automation attempt</li>
                <li><strong>Data rot:</strong> Manual entry spawned typos, formatting chaos, and ghost records that corrupted downstream analysis</li>
                <li><strong>Glacial throughput:</strong> 15-20 minutes per record, a pace that guaranteed missed deadlines</li>
                <li><strong>Scaling death spiral:</strong> Every new data source multiplied costs linearly with no end in sight</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    If your core operation requires hundreds of person-months of manual labor, you&apos;re not running a business. You&apos;re subsidizing inefficiency. Automation isn&apos;t a nice-to-have. It&apos;s oxygen.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Stop the Bleeding
                </Link>
            </div>

            <h2>The Solution: We Engineered a 24/7 Data Extraction Machine</h2>
            <p>
                We architected a military-grade automation platform that combined distributed web scraping with AI-powered OCR to crack CAPTCHAs and extract data at industrial scale. The system ran on AWS infrastructure with self-healing capabilities and zero human intervention required.
            </p>

            <h3>Phase 1: Architected Scalable Cloud Infrastructure</h3>
            <ul>
                <li>Engineered distributed scraping architecture using Selenium Hub for parallel browser orchestration</li>
                <li>Deployed auto-scaling EC2 clusters that spin up instantly during peak extraction windows</li>
                <li>Integrated S3 for bulletproof data persistence and CloudWatch for real-time surveillance</li>
                <li>Constructed multi-threaded Python engine delivering 50x raw performance gains</li>
            </ul>

            <h3>Phase 2: Eliminated the CAPTCHA Barrier with AI</h3>
            <ul>
                <li>Deployed dual-engine OCR combining Tesseract and EasyOCR for maximum accuracy</li>
                <li>Engineered preprocessing pipeline with contrast enhancement and noise elimination</li>
                <li>Built confidence scoring system that automatically retries ambiguous CAPTCHAs</li>
                <li>Achieved 97% solve rate, matching or exceeding human accuracy</li>
            </ul>

            <h3>Phase 3: Constructed High-Throughput Data Pipeline</h3>
            <ul>
                <li>Engineered intelligent queue management handling 4,000 records per hour</li>
                <li>Implemented exponential backoff retry logic that never loses a record</li>
                <li>Built validation layer that catches data corruption before it reaches the database</li>
                <li>Created checkpoint system enabling instant resume from any failure point</li>
            </ul>

            <h3>Phase 4: Built Self-Healing Quality Assurance</h3>
            <ul>
                <li>Implemented comprehensive error taxonomy (network, CAPTCHA, validation) with auto-routing</li>
                <li>Constructed real-time admin dashboard tracking extraction velocity and error rates</li>
                <li>Deployed automated QA comparing extracted data against validation patterns</li>
                <li>Configured intelligent alerting that escalates only true emergencies</li>
            </ul>

            <div className="proof-box">
                <h3>Client Testimonial</h3>
                <p>
                    &quot;Engaging Siddharth for a critical software-automation project proved invaluable. He invested the time to understand our manual processes end-to-end and delivered a robust, efficient solution that saved us substantial time and resources. He&apos;s proactive, detail-oriented, and a fantastic collaborator. The communications and updates were very clear till the end, Siddharth is a fast executor, and equally strong on technical depth and business context. I recommend him without hesitation. Thanks again, Siddharth&quot;
                </p>
                <p className="text-sm text-gray-500 mt-4">
                    - Ranjit M., Head of Projects & Technology at Insight To Strategy
                </p>
                <p className="text-xs text-gray-600 mt-2">
                    <a
                        href="https://www.upwork.com/freelancers/~01f6af0c0a5e5e5e5e"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-brand-blue"
                    >
                        Verified on Upwork
                    </a>
                </p>
            </div>

            <h2>The Results: From 4 Months to 2 Weeks. From 80 People to Zero.</h2>
            <p>
                The platform went live and immediately obliterated the old way of working:
            </p>
            <ul>
                <li><strong>$136,000 recovered annually:</strong> Slashed labor from 320 person-months to 40, an 87.5% reduction</li>
                <li><strong>4 months → 2 weeks:</strong> Compressed the entire extraction cycle by 87.5%</li>
                <li><strong>1,000x throughput multiplier:</strong> From 4 records/hour manually to 4,000 records/hour automated</li>
                <li><strong>97% machine accuracy:</strong> AI matched or beat human performance on CAPTCHA solving</li>
                <li><strong>Zero manual CAPTCHAs:</strong> Eliminated the single most soul-crushing bottleneck entirely</li>
                <li><strong>10x headroom:</strong> Infrastructure scales to 10x current volume with no additional staff</li>
                <li><strong>Reusable asset:</strong> Platform now deployed across multiple data collection initiatives</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Six-figure savings from one automation project isn&apos;t exceptional. It&apos;s expected when you target the right process. The best automation investments pay back in weeks, not years.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Find Your $136K
                </Link>
            </div>

            <h2>Technical Stack</h2>
            <ul>
                <li><strong>Cloud Infrastructure:</strong> AWS (EC2, S3, Lambda, CloudWatch)</li>
                <li><strong>Web Automation:</strong> Selenium Hub, multi-threaded Python</li>
                <li><strong>OCR & Computer Vision:</strong> Tesseract, EasyOCR, PIL for image preprocessing</li>
                <li><strong>Data Processing:</strong> Python with async/await, message queues for distributed processing</li>
                <li><strong>Monitoring:</strong> CloudWatch alerts, custom admin dashboard</li>
            </ul>

            <div className="cta-section">
                <h2>Your Manual Process Is Costing You Six Figures</h2>
                <p>
                    If your team burns hundreds of hours on manual data collection, web scraping, or document processing, you&apos;re leaving money on the table. We engineer automation platforms that work 24/7 at a fraction of what you&apos;re paying now.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Calculate Your Savings
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
