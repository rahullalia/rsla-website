"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Static demo page - no framer-motion
export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#0070f3] mb-8 inline-block hover:underline">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4">Animation Demos</h1>
        <p className="text-white/60 mb-16">
          Animations have been temporarily disabled for mobile compatibility.
          <br />
          Visit our main site to see the full experience on desktop.
        </p>

        <div className="grid gap-8">
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-[#0070f3]">Demo Page</h2>
            <p className="text-white/60">
              This page previously contained interactive animation demos.
              They have been simplified to ensure mobile compatibility.
            </p>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">Why were animations removed?</h3>
            <p className="text-white/60">
              framer-motion has compatibility issues with React 19 and Next.js 15+
              that cause hydration mismatches and crashes on iOS Safari.
              To ensure a stable mobile experience, we&apos;ve simplified animations.
            </p>
          </div>
        </div>

        <div className="h-32" />
      </div>
    </main>
  );
}
