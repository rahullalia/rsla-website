import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-brand-black relative overflow-hidden">
            <Navigation />

            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

            <section className="relative z-10 min-h-[80vh] flex items-center justify-center px-[5%] pt-32">
                <div className="text-center max-w-2xl mx-auto">
                    {/* 404 Number */}
                    <h1 className="text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                            4
                        </span>
                        <span className="text-white/20">0</span>
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            4
                        </span>
                    </h1>

                    {/* Message */}
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mt-4 mb-4">
                        Page not found
                    </h2>
                    <p className="text-white/60 text-lg mb-8 max-w-md mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/"
                            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors"
                        >
                            Go Home
                        </Link>
                        <Link
                            href="/work"
                            className="px-8 py-3 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-colors"
                        >
                            View Our Work
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <p className="text-white/40 text-sm mb-4">Popular pages</p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/work" className="text-white/60 hover:text-white transition-colors text-sm">
                                Case Studies
                            </Link>
                            <span className="text-white/20">•</span>
                            <Link href="/blog" className="text-white/60 hover:text-white transition-colors text-sm">
                                Blog
                            </Link>
                            <span className="text-white/20">•</span>
                            <Link href="/#contact" className="text-white/60 hover:text-white transition-colors text-sm">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
