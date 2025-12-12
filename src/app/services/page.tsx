import Navigation from "@/components/Navigation";
import Link from "next/link";
import { ArrowRight, Bot, Code, Database, Globe, TrendingUp } from "lucide-react";

export const metadata = {
    title: "Services | RSL/A",
    description: "We architect intelligent marketing systems. Websites, AI, CRM, and Paid Acquisition.",
};

const services = [
    {
        icon: Globe,
        title: "Smart Websites",
        description: "Most agency websites are digital brochures. Ours are conversion engines. We build headless, SEO-native Next.js applications that load instantly and rank dominance.",
        features: ["Next.js & React Architecture", "100/100 Core Web Vitals", "Dynamic CMS Integration", "Cyber-Secure Structure"],
    },
    {
        icon: TrendingUp,
        title: "Paid Acquisition",
        description: "Traffic is a commodity. Qualified leads are the asset. We run closed-loop campaigns on Meta and Google that track revenue, not just clicks.",
        features: ["Meta (Facebook/Instagram) Ads", "Google Search & PPC", "Retargeting Infrastructure", "attribution Tracking"],
    },
    {
        icon: Bot,
        title: "AI Automation",
        description: "Replace manual grunt work with intelligent agents. We deploy 24/7 AI booking bots, support agents, and outreach systems that never sleep.",
        features: ["24/7 SMS Booking Bots", "Customer Support Agents", "Automated Lead Qualification", "Voice AI Systems"],
    },
    {
        icon: Database,
        title: "CRM Infrastructure",
        description: "A lead without a system is a lost opportunity. We architect complex GoHighLevel environments that automate follow-up for years, not days.",
        features: ["GoHighLevel Architecture", "Database Reactivation", "Automated Nurture Sequences", "Pipeline Management"],
    },
    {
        icon: Code,
        title: "Local SEO",
        description: "Dominate your local market. We engineer your digital footprint to ensure you are the only logical choice when customers search nearby.",
        features: ["GBP Optimization", "Review Management Systems", "Local Citation Building", "Schema Markup Engineering"],
    },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        System <br /> <span className="text-gradient">Architecture.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        We don&apos;t just &quot;do marketing.&quot; We build the digital infrastructure that powers your revenue growth.
                    </p>
                </div>
            </section>

            {/* Services List */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="space-y-24">
                        {services.map((service, index) => (
                            <div key={index} className="group grid grid-cols-1 md:grid-cols-12 gap-12 items-start border-b border-white/5 pb-24 last:border-0 last:pb-0">
                                {/* Icon & Title */}
                                <div className="md:col-span-4">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue/20 transition-colors duration-300">
                                        <service.icon className="w-8 h-8 text-brand-blue" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold mb-4">{service.title}</h2>
                                    <Link href="/contact" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-brand-blue transition-colors">
                                        Start Project <ArrowRight size={16} className="ml-2" />
                                    </Link>
                                </div>

                                {/* Description & Features */}
                                <div className="md:col-span-8">
                                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                        {service.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-500">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-white/10">
                <div className="container mx-auto max-w-4xl text-center px-6">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                        Stop guessing. <br /> Start engineering.
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all"
                    >
                        Audit My Digital Infrastructure
                    </Link>
                </div>
            </section>
        </main>
    );
}
