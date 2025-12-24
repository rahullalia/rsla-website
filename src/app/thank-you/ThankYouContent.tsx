'use client';

import Link from 'next/link';
import { CheckCircle, Calendar, MessageSquare, Lightbulb, Play } from 'lucide-react';

export default function ThankYouContent() {
  const testimonials = [
    {
      quote: "RSL/A transformed our lead follow-up process. We went from losing 40% of leads to converting at nearly double our previous rate.",
      name: "Sarah Mitchell",
      title: "Owner, Mitchell Home Services",
      placeholder: true,
    },
    {
      quote: "The automation they built saves my team 15+ hours every week. That's time we now spend actually closing deals.",
      name: "Marcus Chen",
      title: "Sales Director, TechFlow Solutions",
      placeholder: true,
    },
    {
      quote: "I was skeptical about AI automation, but the ROI spoke for itself. 3X return in the first month.",
      name: "Jennifer Adams",
      title: "Founder, Coastal Marketing Co",
      placeholder: true,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#111111] text-white">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      {/* Header - minimal, just logo */}
      <header className="relative z-10 px-6 md:px-12 py-6">
        <Link href="/" className="inline-block">
          <img
            src="/lockup-transparent.png"
            alt="RSL/A"
            className="h-12 md:h-16 w-auto"
          />
        </Link>
      </header>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-12 pb-20">
        <div className="max-w-3xl mx-auto">

          {/* Confirmation Section */}
          <section className="text-center mb-16 pt-8 md:pt-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              You're all set
            </h1>

            <p className="text-xl text-white/70 mb-2">
              Your strategy call has been booked.
            </p>
            <p className="text-white/50">
              A confirmation email is on its way to your inbox.
            </p>
          </section>

          {/* What happens next */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-display mb-6 text-center">
              What happens next
            </h2>

            <div className="grid gap-4">
              {[
                {
                  icon: Calendar,
                  title: "Check your email",
                  description: "You'll receive a calendar invite with the meeting link.",
                },
                {
                  icon: MessageSquare,
                  title: "30-minute strategy session",
                  description: "We'll discuss your current challenges and goals. No pitch, just problem-solving.",
                },
                {
                  icon: Lightbulb,
                  title: "Leave with clarity",
                  description: "You'll walk away with actionable recommendations, whether we work together or not.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-white/60 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Video Testimonial */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-display mb-6 text-center">
              Hear from our clients
            </h2>

            {/* Video placeholder - replace with actual embed */}
            <div className="relative aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden mb-4">
              {/* Replace this div with your actual video embed */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                  <Play className="w-8 h-8 ml-1" />
                </div>
                <p className="text-sm">Video testimonial placeholder</p>
                <p className="text-xs text-white/30 mt-1">Replace with embed code</p>
              </div>
            </div>
          </section>

          {/* Written Testimonials */}
          <section className="mb-16">
            <div className="grid md:grid-cols-3 gap-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 relative"
                >
                  {testimonial.placeholder && (
                    <span className="absolute top-3 right-3 text-[10px] text-white/30 bg-white/10 px-2 py-0.5 rounded-full">
                      Placeholder
                    </span>
                  )}
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                    <p className="text-white/50 text-xs">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Soft CTA */}
          <section className="text-center">
            <p className="text-white/50 mb-4">While you wait...</p>
            <Link
              href="/work/casagrande-salon"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              See how we drove $36K in revenue with $600 in ads
              <span className="text-brand-blue">→</span>
            </Link>
          </section>

        </div>
      </div>

      {/* Minimal footer */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-white/10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <p className="text-white/40 text-sm">© 2025 RSL/A</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
