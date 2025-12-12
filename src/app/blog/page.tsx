import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { ArrowRight, Calendar, User } from "lucide-react";

// Revalidate every 60 seconds
export const revalidate = 60;

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    imageUrl: string;
    authorName: string;
}

async function getPosts() {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "imageUrl": featuredImage.asset->url,
    "authorName": author->name
  }`;
    return client.fetch(query);
}

export default async function BlogPage() {
    const posts: BlogPost[] = await getPosts();

    return (
        <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
            <Navigation />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                        Intelligence <br /> <span className="text-gradient">Log.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl">
                        Insights on AI automation, system architecture, and the future of digital infrastructure.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post._id}
                                className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-blue/50 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-56 w-full overflow-hidden">
                                    {post.imageUrl ? (
                                        <Image
                                            src={post.imageUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-brand-blue/20 flex items-center justify-center">
                                            <span className="text-brand-blue font-display font-bold text-2xl">RSL/A</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </span>
                                        {post.authorName && (
                                            <span className="flex items-center gap-1">
                                                <User size={12} />
                                                {post.authorName}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold font-display mb-3 group-hover:text-brand-blue transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center text-brand-blue font-bold text-sm mt-auto">
                                        Read Intel
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
