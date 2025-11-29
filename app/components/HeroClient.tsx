"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Post } from "@/app/lib/db/posts";
import { useState, useEffect } from "react";

interface Promotion {
    _id: string;
    name: string;
    image: string;
    isActive: boolean;
}

interface HeroClientProps {
    post: Post | null;
}

export default function HeroClient({ post }: HeroClientProps) {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch promotions
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await fetch("/api/promotions");
                if (response.ok) {
                    const data = await response.json();
                    setPromotions(data);
                }
            } catch (error) {
                console.error("Error fetching promotions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    // Auto-rotate carousel every 5 seconds
    useEffect(() => {
        if (promotions.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentPromoIndex((prev) => (prev + 1) % promotions.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [promotions.length]);

    const currentPromotion = promotions[currentPromoIndex];

    return (
        <section className="relative min-h-screen bg-black text-white pt-20 overflow-hidden">
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Logo */}


            <div className="container mx-auto px-4 h-full flex flex-col md:flex-row">
                {/* Left Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center py-12 md:py-20 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <div className="flex gap-2 items-center">
                            <Image
                                src="/balitattonews_logo.webp"
                                alt="Bali Tattoo News"
                                width={200}
                                height={80}
                                className="object-contain"
                                priority
                            />
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                                BALI
                                <br />
                                TATTOO
                                <br />
                                NEWS
                            </h1>
                        </div>
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

                {/* Right Side - What is Hot in Town Carousel */}
                <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-auto flex flex-col justify-center items-center py-8 px-4">
                    <div className="absolute inset-0 bg-linear-to-l from-transparent to-black z-10 md:w-1/4"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-black to-transparent z-10 h-1/4 bottom-0"></div>

                    {/* What is Hot in Town Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-6 z-20 text-center"
                    >
                        What is Hot in Town
                    </motion.h2>

                    {/* Promotion Carousel */}
                    <div className="relative w-full max-w-2xl h-[60vh] md:h-[75vh] z-20">
                        {isLoading ? (
                            <div className="w-full h-full flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                                <p className="text-gray-400">Loading promotions...</p>
                            </div>
                        ) : promotions.length > 0 ? (
                            <AnimatePresence mode="wait">
                                <motion.a
                                    key={currentPromoIndex}
                                    href="https://commandos18tattoobali.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full relative bg-white/5 border border-white/10 rounded-sm overflow-hidden backdrop-blur-sm block cursor-pointer hover:border-white/30 transition-all group"
                                >
                                    {currentPromotion.image.includes("cloudinary") ? (
                                        <CldImage
                                            src={currentPromotion.image.split("/upload/")[1]?.replace(/v\d+\//, "").split(".")[0] || currentPromotion.image}
                                            alt={currentPromotion.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    ) : (
                                        <Image
                                            src={currentPromotion.image}
                                            alt={currentPromotion.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    )}
                                </motion.a>
                            </AnimatePresence>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/5 border border-white/10 rounded-sm">
                                <p className="text-gray-400">No promotions available</p>
                            </div>
                        )}

                        {/* Carousel Indicators */}
                        {promotions.length > 1 && (
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                                {promotions.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPromoIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentPromoIndex
                                            ? "bg-white w-8"
                                            : "bg-white/30 hover:bg-white/50"
                                            }`}
                                        aria-label={`Go to promotion ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
