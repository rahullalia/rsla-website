"use client";

import { useState } from "react";

interface GatedDownloadProps {
    /** Display title for the resource */
    title: string;
    /** Short description of what they'll get */
    description: string;
    /** URL to the downloadable file */
    downloadUrl: string;
    /** Button text */
    buttonText?: string;
}

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/LcZc1omMqp9hMj30hWNl/webhook-trigger/a985382a-6139-44c3-983d-ccf2c22b3c80";

export default function GatedDownload({
    title,
    description,
    downloadUrl,
    buttonText = "Download Free Resource",
}: GatedDownloadProps) {
    const [showForm, setShowForm] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStartTime, setFormStartTime] = useState(0);

    // Check if user already unlocked this resource
    const storageKey = `gated-download-${downloadUrl}`;
    const isUnlocked = typeof window !== "undefined" && localStorage.getItem(storageKey);

    const handleOpenForm = () => {
        if (isUnlocked) {
            triggerDownload();
            return;
        }
        setFormStartTime(Date.now());
        setShowForm(true);
        setIsClosing(false);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowForm(false);
            setIsClosing(false);
        }, 300);
    };

    const triggerDownload = () => {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Bot protection: form filled too quickly (< 2 seconds)
        if (Date.now() - formStartTime < 2000) return;

        // Honeypot check
        const honeypot = (document.getElementById("gated-website-field") as HTMLInputElement)?.value;
        if (honeypot) return;

        setIsSubmitting(true);

        try {
            await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    first_name: firstName,
                    source: "gated-download",
                    resource: title,
                    download_url: downloadUrl,
                    page: typeof window !== "undefined" ? window.location.pathname : "",
                }),
            });

            // Mark as unlocked
            localStorage.setItem(storageKey, Date.now().toString());

            // Trigger download
            triggerDownload();

            // Close modal
            handleClose();
        } catch (error) {
            console.error("Gated download form error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Inline Card */}
            <div className="my-10 relative overflow-hidden rounded-2xl border border-brand-blue/30 bg-gradient-to-br from-brand-blue/10 via-transparent to-[#7928ca]/10">
                {/* Glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-8 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-brand-blue/20 flex items-center justify-center">
                        <svg className="w-7 h-7 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-1 block">Free Resource</span>
                        <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
                        <p className="text-sm text-white/50">{description}</p>
                    </div>
                    <button
                        onClick={handleOpenForm}
                        className="group relative flex-shrink-0 px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl overflow-hidden hover:bg-brand-blue/90 transition-all hover:shadow-[0_0_30px_rgba(0,112,243,0.4)]"
                    >
                        <span className="relative z-10">{isUnlocked ? "Download Again" : buttonText}</span>
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showForm && (
                <>
                    {/* Backdrop */}
                    <div
                        className={`fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
                        onClick={handleClose}
                    />

                    {/* Form */}
                    <div
                        className={`fixed z-[201] transition-all duration-500 ease-out ${
                            isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
                        } inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md flex items-center justify-center md:block`}
                    >
                        <div className="relative w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-[#7928ca] to-brand-blue rounded-t-2xl" />

                            {/* Close */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all z-10"
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="p-6 md:p-8">
                                <div className="text-center mb-6">
                                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-blue/20 flex items-center justify-center">
                                        <svg className="w-7 h-7 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                                    <p className="text-sm text-white/50">{description}</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Honeypot */}
                                    <input
                                        type="text"
                                        id="gated-website-field"
                                        name="website"
                                        className="hidden"
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />

                                    <input
                                        type="text"
                                        placeholder="First name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                                    />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative w-full px-6 py-3.5 text-base font-semibold text-white rounded-xl overflow-hidden bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_30px_rgba(0,112,243,0.4)]"
                                    >
                                        <span className="relative z-10">
                                            {isSubmitting ? "Preparing download..." : "Get Instant Access"}
                                        </span>
                                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    </button>

                                    <p className="text-center text-xs text-gray-500">
                                        No spam. Unsubscribe anytime.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
