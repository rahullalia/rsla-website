import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";

// Revalidate every 60 seconds
export const revalidate = 60;

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    mainImage: any;
    body: any;
    authorName: string;
}

// Custom components for Portable Text rendering
const components = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative w-full h-96 my-8 rounded-xl overflow-hidden">
                    <Image
                        src={urlForImage(value).url()}
                        alt={value.alt || "Blog Image"}
                        fill
                        className="object-cover"
                    />
                </div>
            );
        },
    },
    block: {
        h2: ({ children }: any) => <h2 className="text-3xl font-display font-bold mt-12 mb-6 text-white">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl font-display font-bold mt-8 mb-4 text-white">{children}</h3>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-brand-blue pl-6 italic text-xl text-gray-300 my-8 py-2 bg-white/5 rounded-r-lg">
                {children}
            </blockquote>
        ),
        normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-gray-300 text-lg">{children}</p>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-300">{children}</ol>,
    },
};

async function getPost(slug: string) {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    "mainImage": featuredImage,
    body,
    "authorName": author->name
  }`;
    return client.fetch(query, { slug });
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | RSL/A`,
        description: `Read ${post.title} on RSL/A Intelligence Log.`,
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post: Post = await getPost(params.slug);

    if (!post) {
        return (
            <main className="min-h-screen bg-brand-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">404</h1>
                    <p className="text-gray-400 mb-8">Intelligence not found.</p>
                    <Link href="/blog" className="text-brand-blue hover:underline">Return to Log</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white">
            <Navigation />

            <article className="pt-32 pb-20">
                {/* Header content */}
                <div className="container mx-auto max-w-4xl px-6">
                    <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-brand-blue mb-8 transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Intelligence Log
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-gray-400 border-b border-white/10 pb-8 mb-12">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-brand-blue" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        {post.authorName && (
                            <span className="flex items-center gap-2">
                                <User size={16} className="text-brand-blue" />
                                {post.authorName}
                            </span>
                        )}
                        <span className="flex items-center gap-2">
                            <Clock size={16} className="text-brand-blue" />
                            5 min read
                        </span>
                    </div>
                </div>

                {/* Featured Image */}
                {post.mainImage && (
                    <div className="container mx-auto max-w-5xl px-6 mb-16">
                        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10">
                            <Image
                                src={urlForImage(post.mainImage).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* Body */}
                <div className="container mx-auto max-w-3xl px-6">
                    <div className="prose prose-invert prose-lg max-w-none">
                        <PortableText value={post.body} components={components} />
                    </div>
                </div>
            </article>

            {/* Footer CTA */}
            <section className="py-20 border-t border-white/10 text-center bg-white/5">
                <h2 className="text-3xl font-display font-bold mb-6">Need this level of thinking?</h2>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-brand-blue hover:text-white transition-all"
                >
                    Work With RSL/A
                </Link>
            </section>
        </main>
    );
}
