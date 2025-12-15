'use client';

import Link from 'next/link';

function AdminHeader() {
  return (
    <header className="fixed top-0 w-full h-[90px] z-50 bg-[rgba(10,10,10,0.8)] backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-[5%] h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-10">
            <Link href="/admin" className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white font-satoshi">RSL/A</span>
              <span className="text-sm text-gray-400 font-normal tracking-wide uppercase">Admin</span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                href="/admin/blog"
                className="text-[0.9rem] font-medium tracking-[0.5px] text-gray-400 uppercase hover:text-white transition-all duration-300"
              >
                Blog Automation
              </Link>
              <Link
                href="/studio"
                className="text-[0.9rem] font-medium tracking-[0.5px] text-gray-400 uppercase hover:text-white transition-all duration-300"
              >
                Sanity Studio
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-5 py-2.5 text-[0.9rem] font-medium text-gray-400 border border-transparent rounded-md hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              View Site
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-black">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-[5%] pt-[120px] pb-16">
        {children}
      </main>
    </div>
  );
}
