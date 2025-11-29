"use client";

import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Post } from "@/app/lib/db/posts";

interface PostClientProps {
    post: Post;
}

export default function PostClient({ post }: PostClientProps) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Back Button */}
            <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>

            {/* Article Container */}
            <article className="container mx-auto px-4 pb-20 relative z-10">
                {/* Header Section */}
                <header className="max-w-4xl mx-auto mb-12">
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        {post.category && (
                            <span className="text-xs font-bold uppercase tracking-wider bg-white text-black px-3 py-1">
                                {post.category}
                            </span>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <User size={14} />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar size={14} />
                            <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock size={14} />
                            <span>{post.readTime} min read</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Featured Image */}
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-900 border border-white/10 mb-8">
                        {post.image.includes("cloudinary") ? (
                            <CldImage
                                src={post.image.split("/upload/")[1]?.replace(/v\d+\//, "").split(".")[0] || post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                priority
                            />
                        ) : (
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                    </div>
                </header>

                {/* Article Content */}
                <div className="max-w-3xl mx-auto">
                    <div
                        className="prose prose-invert prose-lg max-w-none
                            prose-headings:font-black prose-headings:tracking-tight
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-a:text-white prose-a:underline prose-a:decoration-white/30 hover:prose-a:decoration-white
                            prose-strong:text-white prose-strong:font-bold
                            prose-ul:list-disc prose-ul:ml-6 prose-ul:text-gray-300
                            prose-ol:list-decimal prose-ol:ml-6 prose-ol:text-gray-300
                            prose-li:mb-2
                            prose-blockquote:border-l-4 prose-blockquote:border-white prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-400
                            prose-img:rounded-sm prose-img:border prose-img:border-white/10"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>

                {/* Footer */}
                <footer className="max-w-3xl mx-auto mt-16 pt-8 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            Published by <span className="text-white font-bold">{post.author}</span>
                        </div>
                        <Link
                            href="/"
                            className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </footer>
            </article>
        </main>
    );
}
