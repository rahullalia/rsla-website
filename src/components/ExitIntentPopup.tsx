"use client";

import { useState, useEffect, useCallback } from "react";

interface ExitIntentPopupProps {
    /** Only show on specific pages (e.g., /blog, /work) */
    enabledPaths?: string[];
}

export default function ExitIntentPopup({ enabledPaths = ["/blog", "/work"] }: ExitIntentPopupProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formStartTime, setFormStartTime] = useState(0);

    // Check if current path matches enabled paths
    const isEnabledPath = useCallback(() => {
        if (typeof window === "undefined") return false;
        const path = window.location.pathname;
        return enabledPaths.some(p => path.startsWith(p));
    }, [enabledPaths]);

    useEffect(() => {
        // Don't run on disabled paths
        if (!isEnabledPath()) return;

        // Check if user already dismissed or submitted
        const dismissed = localStorage.getItem("exit-popup-dismissed");
        const submitted = localStorage.getItem("exit-popup-submitted");
        if (dismissed || submitted) return;

        // Track form start time for bot protection
        setFormStartTime(Date.now());

        let hasTriggered = false;

        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger when mouse leaves through the top of the viewport
            if (e.clientY <= 0 && !hasTriggered) {
                hasTriggered = true;
                setIsVisible(true);
            }
        };

        // Mobile: trigger on scroll up (attempting to leave)
        let lastScrollY = window.scrollY;
        let scrollUpCount = 0;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // User is scrolling up quickly
            if (currentScrollY < lastScrollY - 50) {
                scrollUpCount++;

                // After 3 scroll-up attempts near the top, show popup
                if (scrollUpCount >= 3 && currentScrollY < 200 && !hasTriggered) {
                    hasTriggered = true;
                    setIsVisible(true);
                }
            } else if (currentScrollY > lastScrollY) {
                scrollUpCount = 0; // Reset on scroll down
            }

            lastScrollY = currentScrollY;
        };

        // Desktop: mouse leave detection
        document.addEventListener("mouseleave", handleMouseLeave);

        // Mobile: scroll-based detection
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isEnabledPath]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            // Don't show again for 7 days
            localStorage.setItem("exit-popup-dismissed", Date.now().toString());
        }, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Bot protection: check if form was filled too quickly (< 2 seconds)
        if (Date.now() - formStartTime < 2000) {
            return;
        }

        // Check honeypot field
        const honeypot = (document.getElementById("website-field") as HTMLInputElement)?.value;
        if (honeypot) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Submit to LeadConnector webhook
            const response = await fetch("https://services.leadconnectorhq.com/hooks/dDJPHULc6chnVhtX9Pq5/webhook-trigger/e8f6c36f-5f8a-4c6a-87e2-bce6c9c02f97", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    first_name: firstName,
                    source: "exit-intent-popup",
                    page: typeof window !== "undefined" ? window.location.pathname : "",
                    lead_magnet: "automation-health-check",
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                localStorage.setItem("exit-popup-submitted", Date.now().toString());

                // Push GA4 event for checklist download
                if (typeof window !== "undefined" && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
                    (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
                        event: "checklist_download",
                        lead_magnet: "automation-health-check",
                        source: "exit-intent-popup",
                        page_path: window.location.pathname,
                    });
                }

                // Auto-close after 3 seconds
                setTimeout(() => {
                    handleClose();
                }, 3000);
            }
        } catch (error) {
            console.error("Popup form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
                    isClosing ? "opacity-0" : "opacity-100"
                }`}
                onClick={handleClose}
            />

            {/* Popup */}
            <div
                className={`fixed z-[201] transition-all duration-500 ease-out ${
                    isClosing
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                }
                inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                md:w-full md:max-w-lg
                flex items-center justify-center md:block
                `}
            >
                <div className="relative w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
                    {/* Gradient accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-[#7928ca] to-brand-blue rounded-t-2xl" />

                    {/* Glow effects */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#7928ca]/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-300 z-10"
                        aria-label="Close popup"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative p-6 md:p-8">
                        {!isSubmitted ? (
                            <>
                                {/* Header */}
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-medium mb-4">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        5-Minute Assessment
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                        Before you go...
                                    </h2>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                        Find the hidden leaks costing your business hours every week.
                                        Get our free <span className="text-white font-medium">Automation Health Check</span>.
                                    </p>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-3 mb-6">
                                    {[
                                        "Identify your biggest time-wasters",
                                        "Score your automation maturity",
                                        "Get a custom improvement roadmap",
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-5 h-5 rounded-full bg-brand-blue/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            {benefit}
                                        </div>
                                    ))}
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Honeypot field - hidden from users */}
                                    <input
                                        type="text"
                                        id="website-field"
                                        name="website"
                                        className="hidden"
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />

                                    <div>
                                        <input
                                            type="text"
                                            placeholder="First name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all duration-300"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative w-full px-6 py-3.5 text-base font-semibold text-white rounded-xl overflow-hidden bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,112,243,0.4)]"
                                    >
                                        <span className="relative z-10">
                                            {isSubmitting ? "Sending..." : "Send Me the Checklist"}
                                        </span>
                                        {/* Shimmer */}
                                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </button>

                                    <p className="text-center text-xs text-gray-500">
                                        No spam. Unsubscribe anytime.
                                    </p>
                                </form>
                            </>
                        ) : (
                            /* Success State */
                            <div className="text-center py-8">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Check your inbox!</h3>
                                <p className="text-gray-400">
                                    We've sent the Automation Health Check to <span className="text-white">{email}</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
