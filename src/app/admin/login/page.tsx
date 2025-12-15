import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center px-5 relative">
      {/* Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0070f3]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-[#0070f3]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-lg w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-satoshi">
            RSL<span className="text-[#0070f3]">/</span>A
          </h1>
          <div className="border border-[#0070f3]/30 bg-[#0070f3]/10 text-[#0070f3] px-5 py-2 rounded-full text-[0.85rem] font-semibold uppercase tracking-[1.5px] inline-block">
            Admin Access
          </div>
        </div>

        {/* Login Form */}
        <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
          <LoginForm />
        </Suspense>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Restricted Area - Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
