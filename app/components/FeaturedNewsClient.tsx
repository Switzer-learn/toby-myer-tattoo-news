"use client";

import { useState } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Post } from "@/app/lib/db/posts";

interface FeaturedNewsClientProps {
    posts: Post[];
}

const POSTS_PER_PAGE = 4;

export default function FeaturedNewsClient({ posts }: FeaturedNewsClientProps) {
    const [currentPage, setCurrentPage] = useState(1);

    if (!posts || posts.length === 0) {
        return (
            <section className="bg-black text-white py-20 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <p className="text-gray-400 text-center">No featured posts available.</p>
                </div>
            </section>
        );
    }

    // Calculate pagination
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = posts.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <section className="bg-black text-white py-20 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="w-full">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold uppercase tracking-widest border-l-4 border-white pl-4">
                            Featured Stories
                        </h3>
                        {totalPages > 1 && (
                            <span className="text-sm text-gray-400">
                                Page {currentPage} of {totalPages}
                            </span>
                        )}
                    </div>

                    <div className="space-y-12">
                        {currentPosts.map((post) => (
                            <div key={post._id.toString()} className="group flex flex-col md:flex-row gap-6">
                                <div className="relative w-full md:w-1/3 aspect-4/3 overflow-hidden bg-gray-900">
                                    {post.image.includes("cloudinary") ? (
                                        <CldImage
                                            src={post.image.split("/upload/")[1]?.replace(/v\d+\//, "").split(".")[0] || post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-bold uppercase text-gray-400 border border-white/20 px-2 py-0.5">
                                            {post.author}
                                        </span>
                                        <span className="text-xs text-gray-500">{post.readTime} min read</span>
                                    </div>
                                    <Link href={`/posts/${post.slug}`}>
                                        <h4 className="text-2xl font-bold mb-3 leading-tight group-hover:text-gray-300 transition-colors">
                                            {post.title}
                                        </h4>
                                    </Link>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                    </p>
                                    <Link
                                        href={`/posts/${post.slug}`}
                                        className="inline-flex items-center text-xs font-bold uppercase tracking-widest hover:text-gray-300 transition-colors"
                                    >
                                        Read More <ArrowRight size={14} className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-12">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white"
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-full border transition-colors ${currentPage === page
                                                ? "bg-white text-black border-white"
                                                : "border-white/20 hover:border-white/40"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white"
                                aria-label="Next page"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
