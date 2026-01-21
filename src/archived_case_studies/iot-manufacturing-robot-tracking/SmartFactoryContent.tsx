"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import Link from "next/link";

export default function SmartFactoryContent() {
    const stats = [
        { value: "10Hz", label: "Real-Time Data Streaming" },
        { value: "Multi-Plant", label: "Enterprise Scalability" },
        { value: "OAuth 2.0", label: "Secure Authentication" },
    ];

    return (
        <CaseStudyLayout
            tag="IoT & Industrial Automation"
            title="How We Built Real-Time Robot Tracking for a Major Automotive Manufacturer"
            description="A regional automotive giant was flying blind: autonomous robots operating across multiple plants with zero real-time visibility. We engineered MQTT + REST integration with their digital twin platform with 10Hz position streaming, multi-plant support, and enterprise-grade OAuth 2.0 security."
            stats={stats}
        >
            <h2>The Challenge: Millions in Robots, Zero Visibility</h2>
            <p>
                Factories of Future was deploying autonomous mobile robots (AMRs) for one of the region&apos;s largest automotive manufacturers. Multi-million dollar robots handling material transport across factory floors, and operations teams couldn&apos;t see any of them. No centralized monitoring. No real-time position data. No status visibility.
            </p>
            <p>
                The operational blind spots:
            </p>
            <ul>
                <li><strong>Zero real-time tracking:</strong> No visibility into robot positions, tasks, or states</li>
                <li><strong>Siloed vendor systems:</strong> AMR vendor&apos;s proprietary interface incompatible with the Twinzo digital twin platform</li>
                <li><strong>Multi-plant chaos:</strong> Multiple facilities with different coordinate systems and layouts with no unified view</li>
                <li><strong>Enterprise security requirements:</strong> Production floor IoT demanded robust per-device authentication</li>
                <li><strong>Performance demands:</strong> Factory monitoring needed near-instantaneous updates (10Hz or faster)</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    In smart manufacturing, real-time visibility isn&apos;t a nice-to-have. It&apos;s the foundation of operational efficiency. If you can&apos;t see your factory floor in real-time, you&apos;re not running a smart factory. You&apos;re guessing.
                </p>
                <Link href="/#contact" className="btn-cta">
                    End the Guessing
                </Link>
            </div>

            <h2>The Solution: We Architected Bidirectional Industrial IoT Integration</h2>
            <p>
                We engineered bidirectional integration between the Hi-tech AMR vendor&apos;s control system and the manufacturer&apos;s Twinzo digital twin platform. MQTT for real-time data streaming. REST APIs for command-and-control. Multi-plant support with secure per-device authentication.
            </p>

            <h3>Phase 1: Designed Hybrid Protocol Architecture</h3>
            <ul>
                <li>Architected MQTT + REST hybrid: MQTT for high-frequency position data, REST for control commands</li>
                <li>Collaborated with Hi-tech AMR vendor to map their data format and API capabilities</li>
                <li>Engineered message broker infrastructure supporting 10Hz real-time position streaming</li>
                <li>Built failover mechanisms handling network interruptions and broker downtime gracefully</li>
            </ul>

            <h3>Phase 2: Deployed OAuth 2.0 & Multi-Plant Support</h3>
            <ul>
                <li>Implemented OAuth 2.0 per-device authentication for secure AMR-to-platform communication</li>
                <li>Constructed credential management system for onboarding and token rotation</li>
                <li>Built plant-specific configuration layer handling different coordinate systems and layouts</li>
                <li>Engineered coordinate transformation pipeline mapping AMR positions to digital twin coordinates</li>
            </ul>

            <h3>Phase 3: Engineered Real-Time Streaming & Visualization</h3>
            <ul>
                <li>Built MQTT subscriber handling 10Hz position updates from multiple AMRs simultaneously</li>
                <li>Constructed data normalization layer for vendor-specific message formats</li>
                <li>Integrated with Twinzo platform for real-time robot visualization on factory layouts</li>
                <li>Implemented status tracking: battery levels, task assignments, error states</li>
            </ul>

            <h3>Phase 4: Created Documentation & Vendor Onboarding</h3>
            <ul>
                <li>Authored comprehensive API integration documentation for AMR vendors</li>
                <li>Wrote step-by-step onboarding guides with code examples</li>
                <li>Developed troubleshooting playbook for common integration issues</li>
                <li>Conducted technical training sessions with client operations and AMR vendor engineers</li>
            </ul>

            <div className="proof-box">
                <h3>System Impact</h3>
                <p>
                    This integration became the foundation for the manufacturer&apos;s smart factory monitoring infrastructure. OAuth-based authentication and comprehensive documentation reduced vendor onboarding from weeks to days, enabling rapid AMR deployment scaling.
                </p>
            </div>

            <h2>The Results: Real-Time Visibility Across Multi-Plant Operations</h2>
            <p>
                Live in production since August 2024:
            </p>
            <ul>
                <li><strong>10Hz real-time tracking:</strong> Position data updated 10 times per second for instantaneous visibility</li>
                <li><strong>Multi-plant deployment:</strong> Single platform monitoring AMRs across all facilities</li>
                <li><strong>Zero downtime:</strong> Failover mechanisms ensure continuous monitoring through network issues</li>
                <li><strong>Enterprise-grade security:</strong> OAuth 2.0 per-device tokens eliminate vulnerabilities</li>
                <li><strong>Vendor-agnostic architecture:</strong> New AMR vendors onboard in days, not weeks</li>
                <li><strong>Infinite scalability:</strong> Add robots and plants without code changes</li>
            </ul>

            <div className="key-takeaway-box">
                <h3>Executive Axiom</h3>
                <p>
                    Industrial IoT integration isn&apos;t about connecting devices. It&apos;s about building secure, scalable infrastructure that works in production. Good architecture and documentation pay dividends every time you add a plant or vendor.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Build Your IoT Infrastructure
                </Link>
            </div>

            <h2>Technical Stack</h2>
            <ul>
                <li><strong>Communication Protocols:</strong> MQTT for real-time streaming, REST APIs for control commands</li>
                <li><strong>Authentication:</strong> OAuth 2.0 per-device token management</li>
                <li><strong>Integration Platform:</strong> Twinzo digital twin platform</li>
                <li><strong>Data Processing:</strong> Real-time coordinate transformation, multi-threaded message handling</li>
                <li><strong>Vendor Collaboration:</strong> Hi-tech AMR systems, automotive manufacturing operations infrastructure</li>
            </ul>

            <div className="cta-section">
                <h2>Your Factory Floor Is a Black Box</h2>
                <p>
                    If you&apos;re deploying IoT devices, robots, or sensors without real-time visibility, you&apos;re guessing, not managing. We build the integration infrastructure that turns black boxes into dashboards. Secure. Scalable. Production-ready.
                </p>
                <Link href="/#contact" className="btn-cta">
                    Illuminate Your Operations
                </Link>
            </div>
        </CaseStudyLayout>
    );
}
