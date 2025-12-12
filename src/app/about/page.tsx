import Navigation from "@/components/Navigation";
import Link from "next/link";

export const metadata = {
    title: "About | RSL/A",
    description: "We are systems architects, not just marketers. Discover the philosophy behind RSL/A.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
                        We Replace Chaos <br /> <span className="text-gradient">With Code.</span>
                    </h1>
                </div>
            </section>

            {/* Manifesto */}
            <section className="py-20 px-6 border-b border-white/5">
                <div className="container mx-auto max-w-3xl prose prose-invert prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-gray-300 prose-p:leading-relaxed">
                    <p className="text-2xl text-white font-display font-bold">
                        Most agencies operate on hope.
                    </p>
                    <p>
                        They hope the ads work. They hope the leads convert. They hope you stick around long enough to forget the lack of ROI.
                    </p>
                    <p>
                        We don&apos;t operate on hope. We operate on <strong>infrastructure</strong>.
                    </p>
                    <p>
                        RSL/A was founded on a simple premise: Marketing isn&apos;t an art form anymore; it&apos;s an engineering problem. The solution isn&apos;t &quot;better creative&quot; (though that helps)—it&apos;s a better system.
                    </p>
                    <p>
                        We build the pipes that connect attention to revenue. From the first ad impression to the final CRM database reactivation, every step is tracked, automated, and optimized.
                    </p>

                    <h3>The Founders</h3>
                    <p>
                        <strong>Rahul Lalia & Siddharth Rodrigues</strong> built RSL/A to serve businesses that are tired of the agency treadmill. We are technical founders who understand that in 2025, if you aren&apos;t leveraging AI and automation, you aren&apos;t competing—you&apos;re dying.
                    </p>
                </div>
            </section>

            {/* Stats/Philosophy */}
            <section className="py-20 px-6 bg-white/5">
                <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                        <div className="text-5xl font-display font-bold text-brand-blue mb-2">Systems</div>
                        <div className="text-gray-500 font-medium">Over Tactics</div>
                    </div>
                    <div>
                        <div className="text-5xl font-display font-bold text-brand-blue mb-2">Data</div>
                        <div className="text-gray-500 font-medium">Over Opinions</div>
                    </div>
                    <div>
                        <div className="text-5xl font-display font-bold text-brand-blue mb-2">Revenue</div>
                        <div className="text-gray-500 font-medium">Over Vanity Metrics</div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 border-t border-white/10 text-center">
                <h2 className="text-3xl font-display font-bold mb-6">Work with Architects</h2>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all"
                >
                    Partner With RSL/A
                </Link>
            </section>
        </main>
    );
}
