'use client';

import Link from 'next/link';
import { Calendar, Download } from 'lucide-react';

export default function GuideContent() {
  const handleDownload = () => {
    // TODO: Add actual PDF download
    window.open('/restaurant-guide.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Action Buttons - Top Right */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 text-gray-800 font-medium text-sm shadow-lg hover:bg-white transition-colors backdrop-blur-sm border border-gray-200"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download PDF</span>
        </button>
        <Link
          href="/inquiry-form"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-blue text-white font-medium text-sm shadow-lg hover:bg-blue-600 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Book a Call</span>
        </Link>
      </div>

      {/* Full-page iframe */}
      <iframe
        src="/restaurant-guide.html"
        className="w-full min-h-screen border-0"
        title="Restaurant Growth Guide"
      />
    </div>
  );
}
