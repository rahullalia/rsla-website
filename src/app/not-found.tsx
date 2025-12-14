import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-black text-white">
      <Navigation />

      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <h1 className="text-8xl md:text-9xl font-display font-bold text-brand-blue mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-white/50 text-lg mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all"
        >
          Go Home
        </Link>
      </div>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm">
            © {new Date().getFullYear()} RSL/A. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="text-white/40 hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-brand-blue transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
