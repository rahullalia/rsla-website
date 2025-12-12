import Navigation from "@/components/Navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WorkPage() {
    return (
        <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        Proven <br /> <span className="text-gradient">Performance.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        We don&apos;t sell promises. We sell engineered outcomes. Here is the proof.
                    </p>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Casagrande Salon */}
                        <Link
                            href="/work/casagrande-salon"
                            className="group relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-brand-blue/50 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

                            {/* Abstract Background (Replace with image later) */}
                            <div className="absolute inset-0 bg-gray-900 group-hover:scale-105 transition-transform duration-700" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-brand-blue text-white rounded-full">Automated Revenue</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-2 group-hover:text-brand-blue transition-colors">
                                    Casagrande Salon
                                </h3>
                                <p className="text-gray-300 mb-6 max-w-md">
                                    How we engineered a $36k/year passive revenue stream using automated lead nurturing.
                                </p>
                                <div className="flex items-center text-white font-bold group-hover:gap-2 transition-all">
                                    View Case Study <ArrowRight size={20} className="ml-2" />
                                </div>
                            </div>
                        </Link>

                        {/* Placeholder for Next Study */}
                        <div className="group relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-2xl font-display font-bold text-gray-600 mb-2">More Coming Soon</h3>
                                <p className="text-gray-500">We are documenting our systems.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
