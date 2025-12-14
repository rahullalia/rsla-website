"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Blog", href: "/blog" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for desktop
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
                    scrolled || isOpen
                        ? "bg-brand-black/95 backdrop-blur-xl border-white/10 py-4"
                        : "bg-transparent border-transparent py-6"
                }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo - using img tag to avoid next/image iOS crash */}
                    <Link href="/" className="z-50 relative" onClick={() => setIsOpen(false)}>
                        <img
                            src="/lockup.png"
                            alt="RSL/A"
                            className="h-12 md:h-16 lg:h-20 w-auto transition-all duration-300"
                        />
                    </Link>

                    {/* Desktop Menu - Center */}
                    <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-blue transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Right side: Login + Start a Project */}
                    <div className="hidden md:flex items-center bg-[#111] rounded-full p-1.5 border border-white/10">
                        <a
                            href="https://go.rsla.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-full"
                        >
                            Login
                        </a>
                        <Link
                            href="/#contact"
                            className="px-5 py-2.5 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all"
                        >
                            Start a Project
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        <div className="relative w-6 h-6">
                            <span
                                className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                                    isOpen ? "top-[11px] rotate-45" : "top-2"
                                }`}
                            />
                            <span
                                className={`absolute left-0 top-[11px] w-6 h-0.5 bg-white transition-all duration-300 ${
                                    isOpen ? "opacity-0 scale-0" : "opacity-100"
                                }`}
                            />
                            <span
                                className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                                    isOpen ? "top-[11px] -rotate-45" : "top-5"
                                }`}
                            />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Beautiful Full Screen */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
                    isOpen ? "visible" : "invisible"
                }`}
            >
                {/* Backdrop with blur */}
                <div
                    className={`absolute inset-0 bg-brand-black/98 backdrop-blur-xl transition-opacity duration-500 ${
                        isOpen ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Animated gradient orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className={`absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-brand-blue/20 blur-[100px] transition-all duration-1000 ${
                            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`}
                    />
                    <div
                        className={`absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full bg-[#7928ca]/15 blur-[80px] transition-all duration-1000 delay-200 ${
                            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`}
                    />
                </div>

                {/* Menu Content */}
                <div className="relative h-full flex flex-col justify-center items-center px-6">
                    {/* Navigation Links */}
                    <nav className="flex flex-col items-center gap-2 mb-12">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`group relative overflow-hidden transition-all duration-500 ${
                                    isOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                                style={{ transitionDelay: isOpen ? `${150 + index * 100}ms` : "0ms" }}
                            >
                                <span className="block text-5xl sm:text-6xl font-display font-bold text-white py-3 transition-transform duration-300 group-hover:translate-x-2">
                                    {link.name}
                                </span>
                                <span className="absolute bottom-2 left-0 w-0 h-1 bg-brand-blue transition-all duration-300 group-hover:w-full rounded-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div
                        className={`transition-all duration-500 ${
                            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: isOpen ? "450ms" : "0ms" }}
                    >
                        <Link
                            href="/#contact"
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-blue text-white text-lg font-bold rounded-full shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:shadow-[0_0_60px_rgba(0,112,243,0.6)] hover:scale-105 transition-all duration-300"
                        >
                            <span>Start a Project</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Footer info */}
                    <div
                        className={`absolute bottom-8 left-0 right-0 px-6 transition-all duration-500 ${
                            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: isOpen ? "550ms" : "0ms" }}
                    >
                        <div className="flex flex-col items-center gap-4 text-center">
                            <a
                                href="mailto:hello@rsla.io"
                                className="text-gray-400 hover:text-brand-blue transition-colors text-sm"
                            >
                                hello@rsla.io
                            </a>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.instagram.com/rahul.lalia/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-blue hover:bg-brand-blue/10 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/rahullalia/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-blue hover:bg-brand-blue/10 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                                <a
                                    href="https://www.tiktok.com/@rahul_lalia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-blue hover:bg-brand-blue/10 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
