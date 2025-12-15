'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="px-5 py-2.5 text-[0.9rem] font-medium text-gray-400 border border-white/10 rounded-md bg-white/5 hover:text-white hover:bg-white/10 transition-all duration-300"
    >
      Sign Out
    </button>
  );
}
