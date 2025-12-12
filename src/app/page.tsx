import Navigation from "@/components/Navigation";
import Link from "next/link";
import { ArrowRight, Cpu, Globe, Rocket, Terminal } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
      <Navigation />

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 relative overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />

        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-brand-blue font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Accepting New Systems Clients for Q1 2026
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-8">
              We Architect <br />
              <span className="text-gradient">Intelligent Systems.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-12">
              Stop random acts of marketing. We build the infrastructure that scales your revenue, automates your fulfillment, and organizes your chaos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all group"
              >
                Build My System
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white text-lg font-medium rounded-full hover:bg-white/10 transition-all"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE DISCIPLINES */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-4">Core Disciplines</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Engineering Growth.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-8 rounded-2xl group hover:border-brand-blue/50 transition-colors">
              <Globe className="w-10 h-10 text-brand-blue mb-6" />
              <h4 className="text-xl font-bold mb-3">Smart Websites</h4>
              <p className="text-gray-400 leading-relaxed">
                High-performance architecture. Built for SEO domination and conversion, not just aesthetics.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl group hover:border-brand-blue/50 transition-colors">
              <Rocket className="w-10 h-10 text-brand-blue mb-6" />
              <h4 className="text-xl font-bold mb-3">Paid Acquisition</h4>
              <p className="text-gray-400 leading-relaxed">
                Meta & Google ecosystems engineered to print ROI. We track every dollar back to revenue.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl group hover:border-brand-blue/50 transition-colors">
              <Cpu className="w-10 h-10 text-brand-blue mb-6" />
              <h4 className="text-xl font-bold mb-3">AI Automation</h4>
              <p className="text-gray-400 leading-relaxed">
                Replicate your best employee. We build AI agents that handle bookings, support, and sales 24/7.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl group hover:border-brand-blue/50 transition-colors">
              <Terminal className="w-10 h-10 text-brand-blue mb-6" />
              <h4 className="text-xl font-bold mb-3">CRM Infrastructure</h4>
              <p className="text-gray-400 leading-relaxed">
                The backbone of your business. Automated pipelines, database reactivation, and lead nurturing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <span className="text-3xl font-display font-bold block mb-6">RSL/A</span>
            <p className="text-gray-500 max-w-sm">
              Architecting the future of marketing with intelligence and precision.
            </p>
            <div className="mt-8 text-gray-600 text-sm">
              &copy; 2025 RSL Media Hub, LLC. All rights reserved.
            </div>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-white">Company</h5>
              <Link href="/about" className="text-gray-400 hover:text-brand-blue">About</Link>
              <Link href="/work" className="text-gray-400 hover:text-brand-blue">Work</Link>
              <Link href="/contact" className="text-gray-400 hover:text-brand-blue">Contact</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-white">Connect</h5>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-brand-blue">LinkedIn</Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-brand-blue">Twitter</Link>
              <Link href="mailto:hello@rsla.io" className="text-gray-400 hover:text-brand-blue">Email</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
