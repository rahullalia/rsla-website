"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Blog", href: "/blog" },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/10 py-4">
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="z-50">
                    <Image
                        src="/lockup.png"
                        alt="RSL/A"
                        width={350}
                        height={93}
                        className="h-16 md:h-20 lg:h-24 w-auto"
                        priority
                    />
                </Link>

                {/* Desktop Menu - Center */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                        >
                            {link.name}
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
                    className="md:hidden z-50 text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 bg-brand-black flex flex-col items-center justify-center gap-8 md:hidden">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-display font-bold text-white hover:text-brand-blue"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 px-8 py-3 bg-white text-black text-lg font-bold rounded-full"
                        >
                            Start a Project
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
