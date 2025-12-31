import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 py-8 md:py-10 bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Desktop: Single row */}
                <div className="hidden md:flex items-center justify-between">
                    <Link href="/" className="group">
                        <img
                            src="/lockup.png"
                            alt="RSL/A"
                            className="h-14 w-auto opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                        />
                    </Link>

                    <div className="bg-white/90 rounded-lg px-3 py-2">
                        <img
                            src="/images/designrush-badge.png"
                            alt="DesignRush"
                            className="h-12 w-auto"
                        />
                    </div>

                    <div className="flex items-center gap-6 text-sm text-white/50">
                        <Link
                            href="/privacy-policy"
                            className="hover:text-white transition-colors duration-300"
                        >
                            Privacy
                        </Link>
                        <span className="text-white/20">·</span>
                        <Link
                            href="/terms"
                            className="hover:text-white transition-colors duration-300"
                        >
                            Terms
                        </Link>
                        <span className="text-white/20 ml-2">© {currentYear} RSL/A</span>
                    </div>
                </div>

                {/* Mobile: Stacked, centered */}
                <div className="md:hidden flex flex-col items-center gap-5">
                    <Link href="/" className="group">
                        <img
                            src="/lockup.png"
                            alt="RSL/A"
                            className="h-12 w-auto opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                        />
                    </Link>

                    <div className="flex items-center gap-4 text-sm text-white/50">
                        <Link
                            href="/privacy-policy"
                            className="hover:text-white transition-colors duration-300"
                        >
                            Privacy
                        </Link>
                        <span className="text-white/20">·</span>
                        <Link
                            href="/terms"
                            className="hover:text-white transition-colors duration-300"
                        >
                            Terms
                        </Link>
                    </div>

                    <div className="bg-white/90 rounded-lg px-3 py-2">
                        <img
                            src="/images/designrush-badge.png"
                            alt="DesignRush"
                            className="h-10 w-auto"
                        />
                    </div>

                    <p className="text-sm text-white/40">
                        © {currentYear} RSL/A
                    </p>
                </div>
            </div>
        </footer>
    );
}
