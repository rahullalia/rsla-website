'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formLoadTime] = useState<number>(() => Date.now());

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Bot Protection: Honeypot
        if (honeypot) {
            setStatus('success');
            setEmail('');
            console.log('Bot detected: Honeypot filled');
            return;
        }

        // Bot Protection: Time-based
        const timeSinceLoad = Date.now() - formLoadTime;
        if (timeSinceLoad < 2000) {
            setStatus('success');
            setEmail('');
            console.log('Bot detected: Submitted too fast');
            return;
        }

        try {
            const webhookUrl = 'https://services.leadconnectorhq.com/hooks/LcZc1omMqp9hMj30hWNl/webhook-trigger/a985382a-6139-44c3-983d-ccf2c22b3c80';

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    source: 'footer_newsletter',
                    timestamp: new Date().toISOString(),
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            console.error('Newsletter signup error:', error);
        }
    };

    return (
        <footer className="border-t border-white/10 pt-20 pb-10 bg-[#020202]">
            <div className="max-w-[1200px] mx-auto px-[5%]">
                {/* Logo */}
                {/* Logo - using img tag to avoid next/image iOS crash */}
                <div className="mb-16 md:mb-20 flex justify-center md:justify-start md:-ml-6">
                    <Link href="/" className="inline-block">
                        <img
                            src="/lockup.png"
                            alt="RSL/A"
                            className="h-16 md:h-20 lg:h-24 w-auto"
                        />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {/* Contact Section */}
                <div className="text-center md:text-left">
                    <h4 className="text-gray-500 text-[0.9rem] font-medium uppercase tracking-wider mb-4">
                        Write to us
                    </h4>
                    <a
                        href="mailto:hello@rsla.io"
                        className="text-[1.1rem] text-white border-b border-[#333] hover:text-brand-blue hover:border-brand-blue transition-all duration-300"
                    >
                        hello@rsla.io
                    </a>
                </div>

                {/* Social Section */}
                <div className="text-center md:text-right">
                    <h4 className="text-gray-500 text-[0.9rem] font-medium uppercase tracking-wider mb-4">
                        Follow us
                    </h4>
                    <div className="flex gap-4 justify-center md:justify-end">
                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/rahul.lalia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300"
                        >
                            <svg viewBox="0 0 24 24" fill="#888" className="w-5 h-5">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>

                        {/* TikTok */}
                        <a
                            href="https://www.tiktok.com/@rahul_lalia"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300"
                        >
                            <svg viewBox="0 0 24 24" fill="#888" className="w-5 h-5">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/rahullalia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300"
                        >
                            <svg viewBox="0 0 24 24" fill="#888" className="w-5 h-5">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    </div>
                </div>
                </div>

                {/* Newsletter Signup Section */}
                <div className="max-w-[600px] mx-auto mb-12 pb-12 border-b border-white/5">
                <div className="text-center mb-6">
                    <h3 className="text-white text-[1.5rem] md:text-[1.8rem] font-semibold mb-2">
                        Get weekly automation tips
                    </h3>
                    <p className="text-gray-500 text-sm">
                        Real strategies, case studies, and tools. No spam.
                    </p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email..."
                        required
                        disabled={status === 'loading' || status === 'success'}
                        className="
                            flex-1 px-4 py-3 rounded-full
                            bg-white/5 border border-white/10
                            text-white placeholder:text-gray-500 text-sm
                            focus:outline-none focus:border-brand-blue
                            transition-all duration-300
                            disabled:opacity-50
                        "
                    />

                    {/* Honeypot */}
                    <input
                        type="text"
                        name="website"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="absolute opacity-0 pointer-events-none"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                    />

                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="
                            px-6 py-3 rounded-full
                            bg-brand-blue text-white font-semibold text-sm
                            hover:translate-y-[-2px]
                            transition-all duration-300
                            disabled:opacity-50 disabled:transform-none
                            whitespace-nowrap
                        "
                    >
                        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Subscribed!' : 'Get Insights'}
                    </button>
                </form>

                {status === 'success' && (
                    <p className="text-brand-blue text-xs text-center mt-3">
                        Check your inbox for your first insight!
                    </p>
                )}
                {status === 'error' && (
                    <p className="text-red-400 text-xs text-center mt-3">
                        Something went wrong. Please try again.
                    </p>
                )}

                <p className="text-gray-500 text-xs text-center mt-4">
                    Want more details?{' '}
                    <Link href="/insider" className="text-brand-blue hover:underline">
                        Visit our insider page
                    </Link>
                </p>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
                    <div className="text-gray-500 text-sm">
                        <span>© 2025 RSL/A</span>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link
                            href="/privacy-policy"
                            className="text-gray-500 hover:text-white transition-all duration-300"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-gray-500 hover:text-white transition-all duration-300"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
