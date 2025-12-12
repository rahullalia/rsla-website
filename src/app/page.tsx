"use client";

import Navigation from "@/components/Navigation";
import FadeIn from "@/components/FadeIn";
import FadeInStagger from "@/components/FadeInStagger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Globe, Rocket, Terminal } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = cursorGlowRef.current;
    if (!glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };

    const handleMouseLeave = () => {
      glow.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      glow.style.opacity = "1";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Load LeadConnector calendar script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-leadconnector-embed', 'true');
    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-leadconnector-embed="true"]');
      if (scriptToRemove && document.body.contains(scriptToRemove)) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, []);

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
      tag: 'PAID ADS + CRM',
      title: 'Casagrande Salon',
      description: '$600 ad spend turned into $36,000/year in rental revenue. 60X ROAS in 90 days.',
      href: '/work/casagrande-salon'
    },
    {
      tag: 'AI AUTOMATION',
      title: 'Dental Practice Revenue System',
      description: 'AI-powered lead nurturing system that increased appointment bookings by 340%.',
      href: '/work'
    },
    {
      tag: 'CRM INFRASTRUCTURE',
      title: 'Real Estate Pipeline Automation',
      description: 'Automated follow-up sequences that recovered $2.3M in previously lost deals.',
      href: '/work'
    }
  ];

  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
      <div className="gradient-overlay" />
      <div ref={cursorGlowRef} className="cursor-glow" />

      <Navigation />

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 relative overflow-hidden z-10">
        <div className="max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-brand-blue font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></span>
            </span>
            Accepting New Systems Clients for Q1 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="hero-heading font-display font-bold mb-10"
          >
            We build<br />
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-gradient whitespace-nowrap"
            >
              intelligent systems
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/50 max-w-[700px] leading-relaxed font-light mb-12"
          >
            Smart marketing meets AI automation. We build the infrastructure that scales your revenue, automates your fulfillment, and organizes your chaos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/#contact"
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
          </motion.div>
        </div>

        {/* Animated line */}
        <div className="line-container">
          <div className="line-progress"></div>
        </div>
      </section>

      {/* CORE DISCIPLINES */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-20">
              <h2 className="text-sm font-bold tracking-widest text-brand-blue uppercase mb-4">Core Disciplines</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold">Engineering Growth.</h3>
            </div>
          </FadeIn>

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          </FadeInStagger>
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="py-32 bg-[#080808]">
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

          <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <Link
                key={index}
                href={study.href}
                className="glass-card p-10 rounded-2xl flex flex-col justify-start min-h-[280px] group hover:border-brand-blue/50 transition-all hover:-translate-y-1"
              >
                <span className="text-xs text-brand-blue uppercase tracking-widest mb-3 font-bold">
                  {study.tag}
                </span>
                <h4 className="text-2xl font-bold mb-3 group-hover:text-brand-blue transition-colors">{study.title}</h4>
                <p className="text-gray-400 leading-relaxed mt-auto">
                  {study.description}
                </p>
              </Link>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-32 border-t border-white/5">
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
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.title} of RSL/A`}
                    width={400}
                    height={500}
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
      <section id="contact" className="py-32 bg-[#080808]">
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
                  overflow: 'hidden'
                }}
                scrolling="no"
                id="booking-calendar"
                title="Booking Calendar"
                className="min-h-[650px] rounded-2xl"
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

function Footer() {
  return (
    <footer className="py-20 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <FadeIn>
            <div>
              <span className="text-3xl font-display font-bold block mb-6">RSL/A</span>
              <p className="text-gray-500 max-w-sm mb-8">
                Architecting the future of marketing with intelligence and precision.
              </p>
              <div>
                <h5 className="text-gray-500 text-sm uppercase tracking-wider mb-4">Write to us</h5>
                <a
                  href="mailto:hello@rsla.io"
                  className="text-white border-b border-gray-600 hover:text-brand-blue hover:border-brand-blue transition-all"
                >
                  hello@rsla.io
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col md:flex-row gap-16 md:justify-end">
              <div className="flex flex-col gap-4">
                <h5 className="font-bold text-white">Company</h5>
                <Link href="/services" className="text-gray-400 hover:text-brand-blue transition-colors">Services</Link>
                <Link href="/work" className="text-gray-400 hover:text-brand-blue transition-colors">Work</Link>
                <Link href="/blog" className="text-gray-400 hover:text-brand-blue transition-colors">Blog</Link>
                <Link href="/#contact" className="text-gray-400 hover:text-brand-blue transition-colors">Contact</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="font-bold text-white">Connect</h5>
                <a href="https://www.linkedin.com/in/rahullalia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors">LinkedIn</a>
                <a href="https://www.instagram.com/rahul.lalia/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors">Instagram</a>
                <a href="https://www.tiktok.com/@rahul_lalia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-blue transition-colors">TikTok</a>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} RSL Media Hub, LLC. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-brand-blue transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
