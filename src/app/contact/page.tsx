import Navigation from "@/components/Navigation";
import { Mail, MapPin } from "lucide-react";

export const metadata = {
    title: "Contact | RSL/A",
    description: "Start your digital transformation. Contact RSL/A.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
            <Navigation />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Left: Info */}
                    <div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">
                            Start <br /> <span className="text-gradient">The Shift.</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed">
                            We only work with a limited number of partners at a time to ensure deep focus. If you&apos;re ready to engineer your growth, let&apos;s talk.
                        </p>

                        <div className="space-y-8">
                            <a href="mailto:info@rslmediahub.com" className="flex items-center gap-4 text-xl group hover:text-brand-blue transition-colors">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <span>info@rslmediahub.com</span>
                            </a>
                            <div className="flex items-center gap-4 text-xl text-gray-400">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <span>New York, NY</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form (Placeholder for GHL Integration) */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
                        <h2 className="text-2xl font-display font-bold mb-6">Inquiry Form</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Name</label>
                                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-brand-blue transition-colors" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Email</label>
                                    <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-brand-blue transition-colors" placeholder="john@company.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Website URL</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-brand-blue transition-colors" placeholder="https://company.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Current Monthly Revenue</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-brand-blue transition-colors appearance-none text-gray-300">
                                    <option>Select Range...</option>
                                    <option>$0 - $10k</option>
                                    <option>$10k - $50k</option>
                                    <option>$50k - $200k</option>
                                    <option>$200k+</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">What systems do you need?</label>
                                <textarea className="w-full bg-black/50 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-brand-blue transition-colors h-32" placeholder="Tell us about your current bottlenecks..." />
                            </div>

                            <button type="button" className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-brand-blue hover:text-white transition-all">
                                Submit Inquiry
                            </button>
                        </form>
                    </div>

                </div>
            </section>
        </main>
    );
}
