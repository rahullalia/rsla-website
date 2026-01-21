
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import {
  MagneticButton,
  TextScramble,
  AuroraBackground,
} from "@/components/animations";
import WorkGrid, { CaseStudy } from "./WorkGrid";

import { client } from "@/sanity/lib/client";
import { caseStudiesQuery } from "@/sanity/lib/queries";

export const revalidate = 60; // Revalidate every minute

export default async function WorkPage() {
  const caseStudies = await client.fetch<CaseStudy[]>(caseStudiesQuery);

  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white relative overflow-hidden">
      <Navigation />
      <AuroraBackground />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 border-b border-white/10 relative z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Proven <br /> <span className="text-gradient"><TextScramble text="Performance." /></span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              We don&apos;t sell promises. We sell engineered outcomes. Here is the proof.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Grid with filters */}
      <WorkGrid caseStudies={caseStudies} />

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/10 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to be the next <span className="text-brand-blue">case study?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let&apos;s build you an intelligent marketing system that delivers measurable results.
            </p>
            <MagneticButton
              href="/#contact"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-8 py-4 rounded-full font-semibold text-lg shadow-[0_0_30px_rgba(0,112,243,0.4)] hover:shadow-[0_0_50px_rgba(0,112,243,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Project <ArrowRight size={20} />
            </MagneticButton>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
