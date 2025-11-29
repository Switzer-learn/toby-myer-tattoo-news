"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Post } from "@/app/lib/db/posts";

interface FeaturedNewsClientProps {
    posts: Post[];
}

export default function FeaturedNewsClient({ posts }: FeaturedNewsClientProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!posts || posts.length === 0) {
        return (
            <section className="bg-black text-white py-20 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <p className="text-gray-400 text-center">No featured posts available.</p>
                </div>
            </section>
        );
    }

    // Auto-rotate carousel every 7 seconds
    useEffect(() => {
        if (posts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % posts.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [posts.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    const currentPost = posts[currentIndex];

    return (
        <section id="headline" className="relative bg-black text-white py-12 md:py-20 border-t border-white/10 overflow-hidden">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex justify-between items-center mb-8 md:mb-12">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-white pl-4"
                    >
                        HEADLINE
                    </motion.h3>
                    {posts.length > 1 && (
                        <span className="text-sm text-gray-400">
                            {currentIndex + 1} / {posts.length}
                        </span>
                    )}
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col md:flex-row gap-8 md:gap-12"
                        >
                            {/* Image Side */}
                            <div className="w-full md:w-1/2 relative aspect-4/3 md:aspect-16/10 overflow-hidden bg-gray-900 border border-white/10">
                                <Link href={`/posts/${currentPost.slug}`} className="block w-full h-full group">
                                    {currentPost.image.includes("cloudinary") ? (
                                        <CldImage
                                            src={currentPost.image.split("/upload/")[1]?.replace(/v\d+\//, "").split(".")[0] || currentPost.image}
                                            alt={currentPost.title}
                                            fill
                                            className="object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                        />
                                    ) : (
                                        <Image
                                            src={currentPost.image}
                                            alt={currentPost.title}
                                            fill
                                            className="object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                                            priority
                                        />
                                    )}
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-100 group-hover:opacity-50 transition-opacity duration-500"></div>
                                </Link>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 flex flex-col justify-center">
                                {/* Meta Information */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider bg-white text-black px-3 py-1">
                                        FEATURED
                                    </span>
                                    <span className="text-xs font-bold uppercase text-gray-400 border border-white/20 px-3 py-1">
                                        {currentPost.author}
                                    </span>
                                    <span className="text-xs text-gray-500">{currentPost.readTime} min read</span>
                                </div>

                                {/* Title */}
                                <Link href={`/posts/${currentPost.slug}`}>
                                    <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 hover:text-gray-300 transition-colors cursor-pointer">
                                        {currentPost.title}
                                    </h2>
                                </Link>

                                {/* Excerpt */}
                                <p className="text-base md:text-lg text-gray-400 mb-8 line-clamp-4 leading-relaxed">
                                    {currentPost.content.replace(/<[^>]*>/g, '').substring(0, 250)}...
                                </p>

                                {/* CTA Button */}
                                <Link
                                    href={`/posts/${currentPost.slug}`}
                                    className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-b-2 border-white pb-2 hover:text-gray-300 hover:border-gray-300 transition-all w-fit group"
                                >
                                    Read Full Story
                                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    {posts.length > 1 && (
                        <>
                            {/* Arrow Buttons */}
                            <div className="flex justify-center md:justify-end items-center gap-4 mt-8 md:mt-12">
                                <button
                                    onClick={handlePrev}
                                    className="p-4 border border-white/20 hover:bg-white hover:text-black transition-all rounded-sm group"
                                    aria-label="Previous headline"
                                >
                                    <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="p-4 border border-white/20 hover:bg-white hover:text-black transition-all rounded-sm group"
                                    aria-label="Next headline"
                                >
                                    <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
                                </button>
                            </div>

                            {/* Dot Indicators */}
                            <div className="flex justify-center gap-2 mt-6">
                                {posts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-1 rounded-full transition-all ${index === currentIndex
                                            ? "bg-white w-12"
                                            : "bg-white/30 w-8 hover:bg-white/50"
                                            }`}
                                        aria-label={`Go to headline ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
