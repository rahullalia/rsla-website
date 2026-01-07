"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import FadeInStagger from "@/components/FadeInStagger";
import {
  Card3D,
  MagneticButton,
  TextScramble,
  NumberCounter,
  ParallaxBackground,
  ParallaxDivider,
  HeroParallax,
  AuroraBackground,
  GlitchText,
  SpotlightCard,
  InfiniteMarquee,
  LiquidText
} from "@/components/animations";
import Link from "next/link";
import { ArrowRight, Cpu, Globe, Rocket, Terminal } from "lucide-react";

/**
 * Homepage - Pure static rendering, no client-side state
 * All useEffect hooks removed to prevent hydration issues on iOS Safari
 */
export default function Home() {

  const team = [
    {
      name: 'Rahul Lalia',
      title: 'Founder & CEO',
      image: '/images/rahul.png',
      bio: 'A lifelong digital marketer, Rahul now architects sophisticated marketing automations. He is an expert at building scalable growth systems by leveraging powerful, all-in-one marketing platforms.'
    },
    {
      name: 'Siddharth Rodrigues',
      title: 'CTO',
      image: '/images/siddharth.png',
      bio: 'As a software engineer, Siddharth translates complex business logic into powerful software. His expertise in prompt engineering and AI automation is what gives our clients a critical, custom advantage.'
    }
  ];

  const caseStudies = [
    {
      tag: 'Digital Marketing & Lead Nurture',
      title: '$600 in Meta Ads Drove $36K in Rental Income',
      description: 'Helped a Manhattan salon owner fill vacant suites, turning unused space into a reliable, passive revenue stream with a 60X return on ad spend.',
      href: '/work/casagrande-salon',
      metrics: [
        { value: '+60X', label: 'Return on Ad Spend' },
        { value: '$36K', label: 'Annual Income' },
      ],
    },
    {
      tag: 'AI Automation & Cold Email',
      title: 'AI Cold Email Personalization Saves 325 Hours Annually',
      description: 'Automated cold email personalization with AI, reducing research and writing time from 8 minutes to 30 seconds per email using LinkedIn enrichment data.',
      href: '/work/email-ice-breaker-automation',
      metrics: [
        { value: '94%', label: 'Time Reduction' },
        { value: '$43K+', label: 'Annual Savings' },
      ],
    },
    {
      tag: 'AI Automation & Workflow',
      title: 'AI Proposal Generator Saves $22K Annually',
      description: 'Automated proposal creation with AI, reducing production time from 2 hours to 10 minutes and recovering 165 hours annually.',
      href: '/work/proposal-generator-automation',
      metrics: [
        { value: '92%', label: 'Time Reduction' },
        { value: '$22K+', label: 'Annual Savings' },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
      <div className="gradient-overlay" />

      <Navigation />

      {/* HERO SECTION with Parallax */}
      <HeroParallax>
        <section className="min-h-[75vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-16 relative overflow-hidden z-10">
          {/* Aurora Background */}
          <AuroraBackground />

          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-brand-blue font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></span>
              </span>
              Accepting New Clients
            </div>

            <h1 className="hero-heading font-display font-bold mb-10">
              We build<br />
              <span className="text-gradient">
                <TextScramble text="intelligent" />
              </span>
              <br />
              marketing systems
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-[700px] leading-relaxed font-light mb-12">
              Smart marketing meets AI automation. We build the infrastructure that scales your revenue, automates your fulfillment, and organizes your chaos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all group"
              >
                Build My System
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton
                href="/work"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white text-lg font-medium rounded-full hover:bg-white/10 transition-all"
              >
                View Case Studies
              </MagneticButton>
            </div>

            {/* Trust Badge */}
            <div className="mt-10 flex items-center gap-4">
              <span className="text-sm text-white/50 uppercase tracking-wider">Recognized by</span>
              <div className="bg-white rounded-lg px-4 py-3">
                <img
                  src="/images/designrush-badge.png"
                  alt="DesignRush"
                  className="h-16 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Animated line */}
          <div className="line-container">
            <div className="line-progress"></div>
          </div>
        </section>
      </HeroParallax>

      {/* Infinite Marquee */}
      <div className="py-8 border-y border-white/5 bg-[#080808]">
        <InfiniteMarquee speed={25}>
          <span className="text-4xl md:text-6xl font-display font-bold text-white/10 mx-8">
            AI AUTOMATION • PAID ADS • CRM SYSTEMS • LOCAL SEO • WEBSITE DEVELOPMENT •
          </span>
        </InfiniteMarquee>
      </div>

      {/* CORE DISCIPLINES */}
      <section className="py-20 md:py-32 border-t border-white/5 relative">
        <ParallaxBackground />
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-20">
              <h2 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-4">Core Disciplines</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold">
                <LiquidText text="Engineering" /> <GlitchText text="Growth." />
              </h3>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SpotlightCard className="glass-card p-8 rounded-2xl group hover:border-brand-blue/50 transition-colors">
              <Globe className="w-10 h-10 text-brand-blue mb-6" />
              <h4 className="text-xl font-bold mb-3">Smart Websites</h4>
              <p className="text-gray-400 leading-relaxed">
                High-performance architecture. Built for SEO domination and conversion, not just aesthetics.
              </p>
            </SpotlightCard>

            <SpotlightCard className="glass-card p-8 rounded-2xl group hover:border-brand-blue/50 transition-colors">
              <Rocket className="w-10 h-10 text-brand-blue mb-6" />
              <h4 className="text-xl font-bold mb-3">Paid Acquisition</h4>
              <p className="text-gray-400 leading-relaxed">
                Meta & Google ecosystems engineered to print ROI. We track every dollar back to revenue.
              </p>
            </SpotlightCard>

            <SpotlightCard className="glass-card p-8 rounded-2xl group hover:border-brand-blue/50 transition-colors">
              <Cpu className="w-10 h-10 text-brand-blue mb-6" />
              <h4 className="text-xl font-bold mb-3">AI Automation</h4>
              <p className="text-gray-400 leading-relaxed">
                Replicate your best employee. We build AI agents that handle bookings, support, and sales 24/7.
              </p>
            </SpotlightCard>

            <SpotlightCard className="glass-card p-8 rounded-2xl group hover:border-brand-blue/50 transition-colors">
              <Terminal className="w-10 h-10 text-brand-blue mb-6" />
              <h4 className="text-xl font-bold mb-3">CRM Infrastructure</h4>
              <p className="text-gray-400 leading-relaxed">
                The backbone of your business. Automated pipelines, database reactivation, and lead nurturing.
              </p>
            </SpotlightCard>
          </FadeInStagger>
        </div>
      </section>

      {/* Parallax Divider */}
      <ParallaxDivider />

      {/* RECENT WORK */}
      <section className="py-20 md:py-32 bg-[#080808] relative">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-4">Case Studies</h2>
                <h3 className="text-4xl md:text-6xl font-display font-bold">Recent Work</h3>
              </div>
              <Link
                href="/work"
                className="text-gray-400 border-b border-gray-600 pb-1 hover:text-white hover:border-white transition-all"
              >
                View All Cases →
              </Link>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {caseStudies.map((study, index) => (
              <Card3D key={index} className="h-full">
                <Link
                  href={study.href}
                  className="glass-card p-8 rounded-[20px] flex flex-col justify-between group hover:border-brand-blue transition-all duration-300 h-full"
                >
                  <div>
                    <span className="text-[0.8rem] text-brand-blue uppercase tracking-[1.5px] mb-4 block font-bold">
                      {study.tag}
                    </span>
                    <h4 className="text-[1.8rem] leading-[1.2] text-white mb-3">{study.title}</h4>
                    <p className="text-base text-gray-400 mb-8">
                      {study.description}
                    </p>
                  </div>

                  {/* Results with Number Counter */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex justify-between gap-4">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center flex-1">
                        <strong className="block text-[1.6rem] text-white leading-[1.1]">
                          {metric.value.startsWith('+') ? (
                            <><span>+</span><NumberCounter value={parseInt(metric.value.replace(/[^0-9]/g, ''))} suffix="X" /></>
                          ) : metric.value.startsWith('$') ? (
                            <NumberCounter value={parseInt(metric.value.replace(/[^0-9]/g, ''))} prefix="$" suffix="K" />
                          ) : metric.value.endsWith('%') ? (
                            <NumberCounter value={parseInt(metric.value.replace(/[^0-9]/g, ''))} suffix="%" />
                          ) : (
                            metric.value
                          )}
                        </strong>
                        <span className="block text-[0.75rem] text-brand-blue uppercase mt-1">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </Link>
              </Card3D>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* Parallax Divider */}
      <ParallaxDivider />

      {/* TEAM SECTION - hidden on mobile */}
      <section className="hidden md:block py-20 md:py-32 border-t border-white/5 relative">
        <ParallaxBackground />
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-16 text-center max-w-[600px] mx-auto">
              <h2 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-4">The Team</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-4">Meet the Architects</h3>
              <p className="text-gray-400 text-lg">The minds behind the mission.</p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl overflow-hidden group hover:border-brand-blue/50 transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
                  {/* Using img tag to avoid next/image iOS crash */}
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.title} of RSL/A`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-white mb-2">{member.name}</h4>
                  <span className="text-sm text-brand-blue uppercase tracking-widest block mb-4 font-semibold">
                    {member.title}
                  </span>
                  <p className="text-gray-400 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* CONTACT / CALENDAR SECTION */}
      <section id="contact" className="py-20 md:py-32 bg-[#080808]">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-16 text-center max-w-[600px] mx-auto">
              <h2 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-4">Get Started</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold mb-4">See how much you can save</h3>
              <p className="text-gray-400 text-lg">
                Talk to us <span className="text-brand-blue font-semibold">free</span>. We&apos;ll show you what&apos;s possible.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-[900px] mx-auto">
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/nKrQmOaliDo1haSUwgRS"
                style={{
                  width: '100%',
                  border: 'none',
                  overflow: 'hidden',
                }}
                scrolling="no"
                id="booking-calendar"
                title="Booking Calendar"
                className="rounded-2xl h-[1100px]"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
