"use client";

import { useState } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Post } from "@/app/lib/db/posts";

interface PostCarouselClientProps {
    posts: Post[];
}

const POSTS_PER_PAGE = 6;

export default function PostCarouselClient({ posts }: PostCarouselClientProps) {
    const [currentPage, setCurrentPage] = useState(1);

    if (!posts || posts.length === 0) {
        return null;
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
        <section id="posts" className="bg-black text-white py-20 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">
                            STORIES
                        </h3>
                        <p className="text-gray-400">Latest articles from Bali&apos;s tattoo scene.</p>
                    </div>

                    {totalPages > 1 && (
                        <span className="text-sm text-gray-400">
                            Page {currentPage} of {totalPages}
                        </span>
                    )}
                </div>

                {/* Grid Layout - 2 columns, 3 rows */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {currentPosts.map((post) => (
                        <Link
                            key={post._id.toString()}
                            href={`/posts/${post.slug}`}
                            className="group block border border-white/10 hover:border-white/30 transition-all duration-300 bg-zinc-900/50 hover:bg-zinc-900"
                        >
                            <div className="flex gap-6 p-6">
                                {/* Thumbnail Image - Small */}
                                <div className="relative w-32 h-32 shrink-0 overflow-hidden border border-white/10">
                                    {post.image.includes("cloudinary") ? (
                                        <CldImage
                                            src={post.image.split("/upload/")[1]?.replace(/v\d+\//, "").split(".")[0] || post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="128px"
                                        />
                                    ) : (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    )}
                                </div>

                                {/* Text Content - Dominant */}
                                <div className="flex-1 flex flex-col justify-between min-h-[128px]">
                                    <div>
                                        {/* Meta Info */}
                                        <div className="flex items-center gap-4 mb-3">
                                            {post.category && (
                                                <span className="text-xs font-bold uppercase tracking-wider bg-white text-black px-2 py-0.5">
                                                    {post.category}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                                <User size={14} />
                                                {post.author}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                                <Clock size={14} />
                                                {post.readTime} min read
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h4 className="text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:text-gray-300 transition-colors line-clamp-2">
                                            {post.title}
                                        </h4>

                                        {/* Excerpt */}
                                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                            {post.content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                                        </p>
                                    </div>

                                    {/* Read More Link */}
                                    <div className="mt-4">
                                        <span className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-gray-300 transition-colors border-b border-white/20 group-hover:border-white/40 pb-1">
                                            Read Article →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
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
        </section>
    );
}
