'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function BookingConfirmedContent() {
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
            src="/lockup.png"
            alt="RSL/A"
            className="h-[4.5rem] sm:h-20 md:h-20 lg:h-24 w-auto"
          />
        </Link>
      </header>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-12 pb-20">
        <div className="max-w-3xl mx-auto">

          {/* Confirmation Section */}
          <section className="text-center pt-16 md:pt-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              You're all set
            </h1>

            <p className="text-xl text-white/70 mb-2">
              Your call has been booked.
            </p>
            <p className="text-white/50">
              Check your inbox for a calendar invite with the meeting details.
            </p>
          </section>

        </div>
      </div>

      {/* Minimal footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 py-8 border-t border-white/10">
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
