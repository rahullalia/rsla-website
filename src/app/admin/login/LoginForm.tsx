'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/admin/blog';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push(redirectTo);
        router.refresh();
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-10 rounded-[20px]">
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-semibold text-white mb-3">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070f3] focus:border-[#0070f3]/50 text-white placeholder:text-gray-500 transition-all duration-300 text-lg"
          placeholder="Enter admin password"
          required
          autoFocus
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0070f3] hover:bg-[#0060d3] text-white font-semibold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none text-lg"
      >
        {loading ? 'Authenticating...' : 'Access Admin'}
      </button>
    </form>
  );
}
