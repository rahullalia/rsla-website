import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));

  // Delete the admin-auth cookie
  response.cookies.delete('admin-auth');

  return response;
}
