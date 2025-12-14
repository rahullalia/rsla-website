'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AuroraBackground, MagneticButton } from '@/components/animations';

export default function InsiderPage() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formLoadTime = useRef<number>(Date.now());

  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Bot Protection #1: Honeypot field
    if (honeypot) {
      setStatus('success');
      setMessage('Check your inbox! Your first insight is on the way.');
      setEmail('');
      return;
    }

    // Bot Protection #2: Time-based check (must wait at least 2 seconds)
    const timeSinceLoad = Date.now() - formLoadTime.current;
    if (timeSinceLoad < 2000) {
      setStatus('success');
      setMessage('Check your inbox! Your first insight is on the way.');
      setEmail('');
      return;
    }

    try {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/LcZc1omMqp9hMj30hWNl/webhook-trigger/a985382a-6139-44c3-983d-ccf2c22b3c80';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'insider_signup',
          timestamp: new Date().toISOString(),
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Check your inbox! Your first insight is on the way.');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Insider signup error:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#111111] flex items-end md:items-center justify-center px-4 py-8 md:py-0 relative overflow-hidden">
      {/* Aurora Background */}
      <AuroraBackground />

      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 right-20 w-72 h-72 bg-brand-blue/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative w-full max-w-lg mb-8 md:mb-0"
      >
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[2.5rem] md:text-[3rem] font-bold text-white mb-3 leading-tight font-display"
          >
            Automate smarter every week
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[1.1rem] text-white/70 mb-8 leading-relaxed"
          >
            Real automation strategies, case studies, and AI tools delivered straight to your inbox every week
          </motion.p>

          {/* Value bullets */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-2 mb-8"
          >
            {[
              'Case studies saving clients $20K-$136K annually',
              'Actionable automation tips you can use today',
              'Tool recommendations from real implementations',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 text-white/80"
              >
                <span className="text-brand-blue">✓</span>
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {/* Honeypot field */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              whileHover={{ scale: status === 'loading' || status === 'success' ? 1 : 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 rounded-2xl bg-brand-blue text-white font-semibold text-[1.05rem] shadow-[0_0_30px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)] transition-all duration-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent! Check your inbox' : 'Get weekly insights'}
            </motion.button>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm text-center ${status === 'success' ? 'text-brand-blue' : 'text-red-400'}`}
              >
                {message}
              </motion.p>
            )}
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white/50 text-xs text-center mt-6"
          >
            We respect your inbox. No spam, unsubscribe anytime.{' '}
            <Link href="/privacy-policy" className="text-brand-blue hover:underline">
              Privacy policy
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </main>
  );
}
