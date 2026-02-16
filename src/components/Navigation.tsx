"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Home", href: "/", number: "01" },
    { name: "Work", href: "/work", number: "02" },
    { name: "Blog", href: "/blog", number: "03" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const progressRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 20);
                    const winScroll = document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    if (progressRef.current) {
                        progressRef.current.style.transform = `scaleX(${height > 0 ? winScroll / height : 0})`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    // Check if link is active
    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled || isOpen
                        ? "bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(255,255,255,0.05),0_4px_30px_rgba(0,0,0,0.3)] py-3"
                        : "bg-brand-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none py-5"
                }`}
            >
                {/* Scroll Progress Indicator */}
                <div
                    ref={progressRef}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-[#7928ca] to-brand-blue will-change-transform origin-left"
                    style={{ transform: 'scaleX(0)' }}
                />

                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="z-50 relative group" onClick={() => setIsOpen(false)}>
                        <img
                            src="/lockup.png"
                            alt="RSL/A"
                            className="h-[4.5rem] sm:h-20 md:h-20 lg:h-24 w-auto transition-all duration-300 group-hover:opacity-90"
                        />
                    </Link>

                    {/* Desktop Menu - Center */}
                    <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-white/[0.03] backdrop-blur-sm rounded-full px-2 py-1.5 border border-white/5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                                    isActive(link.href)
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {/* Active background pill */}
                                {isActive(link.href) && (
                                    <span className="absolute inset-0 bg-white/10 rounded-full" />
                                )}
                                {/* Hover background */}
                                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-full transition-colors duration-300" />
                                <span className="relative">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Right side - Premium Buttons */}
                    <div className="hidden md:flex items-center bg-[#111]/80 backdrop-blur-sm rounded-full p-1.5 border border-white/10 hover:border-white/20 transition-all duration-500">
                        {/* Login Button - Subtle hover */}
                        <a
                            href="https://go.rsla.io"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 rounded-full overflow-hidden"
                        >
                            <span className="relative z-10">Login</span>
                            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-full" />
                        </a>

                        {/* Start a Project - Animated gradient border */}
                        <Link
                            href="/#contact"
                            className="group relative px-5 py-2.5 text-sm font-medium rounded-full overflow-hidden"
                        >
                            {/* Animated gradient border */}
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-blue via-[#7928ca] to-brand-blue bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-gradient-x" />

                            {/* Inner background */}
                            <span className="absolute inset-[1px] rounded-full bg-[#111] group-hover:bg-[#0a0a0a] transition-colors duration-300" />

                            {/* Text with glow */}
                            <span className="relative z-10 text-white group-hover:text-white transition-all duration-300">
                                Start a Project
                            </span>

                            {/* Shimmer effect on hover */}
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </Link>
                    </div>

                    {/* Mobile Toggle - Premium Minimal */}
                    <button
                        className="md:hidden z-50 relative w-14 h-14 flex items-center justify-center group"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {/* Outer ring that appears on hover/active */}
                        <span className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                            isOpen
                                ? "border-brand-blue/50 scale-100"
                                : "border-white/0 scale-90 group-active:border-white/20 group-active:scale-100"
                        }`} />

                        {/* Inner background */}
                        <span className={`absolute inset-1 rounded-full transition-all duration-500 ${
                            isOpen
                                ? "bg-brand-blue/10"
                                : "bg-white/5 group-active:bg-white/10"
                        }`} />

                        {/* Hamburger lines */}
                        <div className="relative w-6 h-5 flex flex-col justify-between">
                            <span
                                className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out origin-center ${
                                    isOpen
                                        ? "rotate-45 translate-y-[9px] w-6"
                                        : "w-6"
                                }`}
                            />
                            <span
                                className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                                    isOpen
                                        ? "opacity-0 scale-x-0"
                                        : "opacity-100 w-4 ml-auto"
                                }`}
                            />
                            <span
                                className={`block h-[2px] bg-white rounded-full transition-all duration-500 ease-out origin-center ${
                                    isOpen
                                        ? "-rotate-45 -translate-y-[9px] w-6"
                                        : "w-5"
                                }`}
                            />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu - Premium Full Screen */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-700 ${
                    isOpen ? "visible" : "invisible pointer-events-none"
                }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-[#050508] transition-opacity duration-700 ${
                        isOpen ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Animated gradient mesh */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Primary blue orb */}
                    <div
                        className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full transition-all duration-1000 ease-out ${
                            isOpen
                                ? "opacity-100 translate-x-[20%] -translate-y-[20%]"
                                : "opacity-0 translate-x-[50%] -translate-y-[50%]"
                        }`}
                        style={{
                            background: 'radial-gradient(circle, rgba(0,112,243,0.15) 0%, transparent 70%)',
                        }}
                    />
                    {/* Secondary purple orb */}
                    <div
                        className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full transition-all duration-1000 delay-150 ease-out ${
                            isOpen
                                ? "opacity-100 -translate-x-[20%] translate-y-[20%]"
                                : "opacity-0 -translate-x-[50%] translate-y-[50%]"
                        }`}
                        style={{
                            background: 'radial-gradient(circle, rgba(121,40,202,0.12) 0%, transparent 70%)',
                        }}
                    />
                    {/* Subtle noise texture overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between px-8 py-24">
                    {/* Navigation Links */}
                    <nav className="flex-1 flex flex-col justify-center">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`group relative flex items-baseline gap-4 py-4 transition-all duration-700 ease-out ${
                                    isOpen
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-8"
                                }`}
                                style={{ transitionDelay: isOpen ? `${200 + index * 100}ms` : "0ms" }}
                            >
                                {/* Number */}
                                <span className={`text-xs font-mono tabular-nums transition-colors duration-300 ${
                                    isActive(link.href) ? "text-brand-blue" : "text-brand-blue/40"
                                }`}>
                                    {link.number}
                                </span>

                                {/* Link text with hover line */}
                                <span className="relative">
                                    <span className={`block text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-display font-bold leading-none tracking-tight transition-all duration-300 ${
                                        isActive(link.href)
                                            ? "text-brand-blue"
                                            : "text-white group-hover:text-brand-blue"
                                    }`}>
                                        {link.name}
                                    </span>
                                    {/* Active/hover underline */}
                                    <span className={`absolute -bottom-1 left-0 h-[3px] bg-brand-blue rounded-full transition-all duration-500 ease-out ${
                                        isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                                    }`} />
                                </span>

                                {/* Arrow that appears on hover or active */}
                                <svg
                                    className={`w-7 h-7 text-brand-blue transition-all duration-300 ${
                                        isActive(link.href)
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom section */}
                    <div
                        className={`transition-all duration-700 ${
                            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: isOpen ? "500ms" : "0ms" }}
                    >
                        {/* CTA Button */}
                        <Link
                            href="/#contact"
                            onClick={() => setIsOpen(false)}
                            className="group relative inline-flex items-center gap-3 w-full justify-center mb-10"
                        >
                            <span className="relative px-10 py-5 bg-brand-blue text-white text-lg font-bold rounded-full overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(0,112,243,0.5)]">
                                {/* Shimmer effect */}
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <span className="relative flex items-center gap-3">
                                    Start a Project
                                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </span>
                        </Link>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                        {/* Footer info */}
                        <div className="flex flex-col items-center gap-5">
                            <a
                                href="mailto:hello@rsla.io"
                                className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
                            >
                                hello@rsla.io
                            </a>

                            <div className="flex gap-3">
                                <a
                                    href="https://www.instagram.com/rahul.lalia/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/rahullalia/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                                <a
                                    href="https://www.tiktok.com/@rahul_lalia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
