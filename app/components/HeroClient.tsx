"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Post } from "@/app/lib/db/posts";

interface HeroClientProps {
    post: Post | null;
}

export default function HeroClient({ post }: HeroClientProps) {
    return (
        <section className="relative min-h-screen bg-black text-white pt-20 overflow-hidden">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="container mx-auto px-4 h-full flex flex-col md:flex-row">
                {/* Left Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center py-12 md:py-20 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                            BALI
                            <br />
                            TATTOO
                            <br />
                            NEWS
                        </h1>
                        <p className="text-lg text-gray-400 mb-8 max-w-md">
                            Insights on ink, artists, culture, and trends.
                        </p>

                        {post ? (
                            <div className="bg-white/5 border border-white/10 p-6 rounded-sm max-w-md backdrop-blur-sm">
                                <div className="flex gap-2 mb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider bg-white text-black px-2 py-1">
                                        Featured
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 border border-white/20 px-2 py-1">
                                        {post.author}
                                    </span>
                                </div>
                                <Link href={`/posts/${post.slug}`}>
                                    <h2 className="text-2xl font-bold mb-3 leading-tight hover:text-gray-300 transition-colors cursor-pointer">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                                    {/* Strip HTML tags for preview */}
                                    {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                </p>
                                <Link href={`/posts/${post.slug}`}>
                                    <button className="text-sm font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors">
                                        Read Full Story
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-white/5 border border-white/10 p-6 rounded-sm max-w-md backdrop-blur-sm">
                                <p className="text-gray-400">No featured posts available.</p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-auto">
                    <div className="absolute inset-0 bg-linear-to-l from-transparent to-black z-10 md:w-1/4"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-black to-transparent z-10 h-1/4 bottom-0"></div>

                    <div className="relative w-full h-full grayscale contrast-125 brightness-75">
                        {post && post.image ? (
                            post.image.includes("cloudinary") ? (
                                <CldImage
                                    src={post.image.split("/upload/")[1]?.replace(/v\d+\//, "").split(".")[0] || post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="50vw"
                                />
                            ) : (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            )
                        ) : (
                            <Image
                                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop"
                                alt="Tattoo Artist"
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                        {/* Vignette */}
                        <div className="absolute inset-0 bg-radial from-transparent to-black opacity-60"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
