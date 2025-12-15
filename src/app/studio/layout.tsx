import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication - must be logged in via /admin/login
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin-auth');
  const isAuthenticated = authCookie?.value === process.env.ADMIN_PASSWORD;

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
