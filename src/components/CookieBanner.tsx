"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Small delay for smooth entrance
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setIsClosing(true);
        setTimeout(() => {
            localStorage.setItem("cookie-consent", "accepted");
            setIsVisible(false);
        }, 300);
    };

    const handleDecline = () => {
        setIsClosing(true);
        setTimeout(() => {
            localStorage.setItem("cookie-consent", "declined");
            setIsVisible(false);
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Desktop Banner */}
            <div
                className={`hidden md:block fixed bottom-6 left-6 right-6 z-[100] transition-all duration-500 ease-out ${
                    isClosing
                        ? "opacity-0 translate-y-4"
                        : "opacity-100 translate-y-0"
                }`}
            >
                <div className="max-w-4xl mx-auto">
                    <div className="relative overflow-hidden rounded-2xl bg-[#111]/95 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                        {/* Gradient accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-[#7928ca] to-brand-blue" />

                        {/* Subtle glow effect */}
                        <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#7928ca]/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative px-8 py-6 flex items-center justify-between gap-8">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-[#7928ca]/20 border border-white/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-base mb-1">We value your privacy</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    We use cookies to enhance your browsing experience and analyze site traffic.
                                    By clicking "Accept", you consent to our use of cookies.{" "}
                                    <a href="/privacy-policy" className="text-brand-blue hover:text-brand-blue/80 transition-colors underline underline-offset-2">
                                        Learn more
                                    </a>
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex-shrink-0 flex items-center gap-3">
                                <button
                                    onClick={handleDecline}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                                >
                                    Only Necessary
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="group relative px-6 py-2.5 text-sm font-medium text-white rounded-full overflow-hidden bg-brand-blue hover:bg-brand-blue/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,112,243,0.4)]"
                                >
                                    <span className="relative z-10">Accept All</span>
                                    {/* Shimmer */}
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Banner - covers chat widget */}
            <div
                className={`md:hidden fixed bottom-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
                    isClosing
                        ? "opacity-0 translate-y-full"
                        : "opacity-100 translate-y-0"
                }`}
            >
                <div className="bg-[#111]/98 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
                    {/* Gradient accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-brand-blue via-[#7928ca] to-brand-blue" />

                    <div className="px-5 pt-5 pb-8">
                        <p className="text-gray-300 text-sm mb-4 text-center leading-relaxed">
                            We use cookies to enhance your experience.{" "}
                            <a href="/privacy-policy" className="text-brand-blue underline underline-offset-2">
                                Learn more
                            </a>
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={handleDecline}
                                className="flex-1 px-4 py-3 text-sm font-medium text-gray-400 rounded-xl border border-white/10 active:bg-white/5 transition-all"
                            >
                                Only Necessary
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 px-4 py-3 text-sm font-medium text-white rounded-xl bg-brand-blue active:bg-brand-blue/80 transition-all"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
