import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-12 font-satoshi">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Blog Automation Card */}
        <Link
          href="/admin/blog"
          className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-[20px] hover:bg-white/10 hover:border-[#0070f3]/30 hover:shadow-[0_0_30px_rgba(0,112,243,0.15)] hover:translate-y-[-4px] transition-all duration-300 group"
        >
          <div className="text-6xl mb-6">📝</div>
          <h2 className="text-3xl font-bold text-white mb-3 font-satoshi group-hover:text-[#0070f3] transition-colors">
            Blog Automation
          </h2>
          <p className="text-gray-400 text-lg">
            Generate AI-powered blog posts in minutes with SEO optimization
          </p>
        </Link>

        {/* Sanity Studio Card */}
        <Link
          href="/studio"
          className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-[20px] hover:bg-white/10 hover:border-[#0070f3]/30 hover:shadow-[0_0_30px_rgba(0,112,243,0.15)] hover:translate-y-[-4px] transition-all duration-300 group"
        >
          <div className="text-6xl mb-6">🎨</div>
          <h2 className="text-3xl font-bold text-white mb-3 font-satoshi group-hover:text-[#0070f3] transition-colors">
            Sanity Studio
          </h2>
          <p className="text-gray-400 text-lg">
            Manage content, edit posts, and publish to the live site
          </p>
        </Link>
      </div>
    </div>
  );
}
