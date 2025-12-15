'use client';

import Link from 'next/link';
import { AuthGuard, useAuth } from '@/components/AuthGuard';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

function AdminHeader() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

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
            <span className="text-sm text-gray-400 hidden md:block">
              {user?.email}
            </span>
            <Link
              href="/"
              className="px-5 py-2.5 text-[0.9rem] font-medium text-gray-400 border border-transparent rounded-md hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              View Site
            </Link>
            <button
              onClick={handleSignOut}
              className="px-5 py-2.5 text-[0.9rem] font-medium text-gray-400 border border-white/10 rounded-md bg-white/5 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-brand-black">
        <AdminHeader />
        <main className="max-w-7xl mx-auto px-[5%] pt-[120px] pb-16">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
