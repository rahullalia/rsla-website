"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import {
  TextScramble,
  AuroraBackground,
  MagneticButton,
  ParallaxBackground,
  LiquidText,
  GlitchText,
} from "@/components/animations";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 border-b border-white/10 relative overflow-hidden">
        <AuroraBackground />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <FadeIn>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-5xl md:text-7xl font-display font-bold mb-8"
            >
              We Replace Chaos <br /> <span className="text-gradient"><TextScramble text="With Code." /></span>
            </motion.h1>
          </FadeIn>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-20 px-6 border-b border-white/5 relative">
        <ParallaxBackground />
        <div className="container mx-auto max-w-3xl prose prose-invert prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-gray-300 prose-p:leading-relaxed relative z-10">
          <FadeIn>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl text-white font-display font-bold"
            >
              Most agencies operate on hope.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              They hope the ads work. They hope the leads convert. They hope you stick around long enough to forget the lack of ROI.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We don&apos;t operate on hope. We operate on <strong>infrastructure</strong>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              RSL/A was founded on a simple premise: Marketing isn&apos;t an art form anymore; it&apos;s an engineering problem. The solution isn&apos;t &quot;better creative&quot; (though that helps)—it&apos;s a better system.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We build the pipes that connect attention to revenue. From the first ad impression to the final CRM database reactivation, every step is tracked, automated, and optimized.
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              The Founders
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <strong>Rahul Lalia & Siddharth Rodrigues</strong> built RSL/A to serve businesses that are tired of the agency treadmill. We are technical founders who understand that in 2025, if you aren&apos;t leveraging AI and automation, you aren&apos;t competing—you&apos;re dying.
            </motion.p>
          </FadeIn>
        </div>
      </section>

      {/* Stats/Philosophy */}
      <section className="py-20 px-6 bg-white/5">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-5xl font-display font-bold text-brand-blue mb-2">
                  <LiquidText text="Systems" />
                </div>
                <div className="text-gray-500 font-medium">Over Tactics</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-5xl font-display font-bold text-brand-blue mb-2">
                  <LiquidText text="Data" />
                </div>
                <div className="text-gray-500 font-medium">Over Opinions</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-5xl font-display font-bold text-brand-blue mb-2">
                  <GlitchText text="Revenue" />
                </div>
                <div className="text-gray-500 font-medium">Over Vanity Metrics</div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 border-t border-white/10 text-center">
        <FadeIn>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-display font-bold mb-6"
          >
            Work with Architects
          </motion.h2>
          <MagneticButton
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all"
          >
            Partner With RSL/A
            <ArrowRight className="ml-2 w-5 h-5" />
          </MagneticButton>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
