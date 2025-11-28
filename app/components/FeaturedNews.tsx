"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Mock Data based on user's JSON structure + design requirements
const recentPosts = [
    {
        _id: "1",
        title: "The Evolution of Blackwork in Southeast Asia",
        slug: "evolution-blackwork-sea",
        image: "https://images.unsplash.com/photo-1590246130793-2e1f5cd801c6?q=80&w=2070&auto=format&fit=crop",
        excerpt: "From tribal roots to modern geometric masterpieces, we trace the lineage of blackwork.",
        category: "Culture",
        readTime: 5,
    },
    {
        _id: "2",
        title: "Interview: The Master of Realism",
        slug: "interview-master-realism",
        image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2070&auto=format&fit=crop",
        excerpt: "A deep dive into the techniques that bring ink to life with stunning precision.",
        category: "Artist Spotlight",
        readTime: 8,
    },
];

const topStories = [
    { id: "1", title: "5 Studios You Must Visit in Canggu", category: "Guide" },
    { id: "2", title: "Tattoo Aftercare: The Tropical Edition", category: "Health" },
    { id: "3", title: "Upcoming Convention Dates 2025", category: "Events" },
    { id: "4", title: "The Meaning Behind Traditional Barong Masks", category: "Culture" },
    { id: "5", title: "Guest Spot: International Artists Arriving Soon", category: "News" },
];

export default function FeaturedNews() {
    return (
        <section className="bg-black text-white py-20 border-t border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Recent Articles */}
                    <div className="w-full lg:w-2/3">
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-8 border-l-4 border-white pl-4">
                            Latest Features
                        </h3>
                        <div className="space-y-12">
                            {recentPosts.map((post) => (
                                <div key={post._id} className="group flex flex-col md:flex-row gap-6">
                                    <div className="relative w-full md:w-1/3 aspect-4/3 overflow-hidden bg-gray-900">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-bold uppercase text-gray-400 border border-white/20 px-2 py-0.5">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-gray-500">{post.readTime} min read</span>
                                        </div>
                                        <Link href={`/posts/${post.slug}`}>
                                            <h4 className="text-2xl font-bold mb-3 leading-tight group-hover:text-gray-300 transition-colors">
                                                {post.title}
                                            </h4>
                                        </Link>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {post.excerpt}
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
                    </div>

                    {/* Right Column: Top Stories */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white/5 border border-white/10 p-8 sticky top-24">
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-6">
                                Top Stories This Week
                            </h3>
                            <ul className="space-y-6">
                                {topStories.map((story, index) => (
                                    <li key={story.id} className="group cursor-pointer">
                                        <div className="flex items-start gap-4">
                                            <span className="text-2xl font-black text-white/20 group-hover:text-white/40 transition-colors">
                                                0{index + 1}
                                            </span>
                                            <div>
                                                <span className="text-xs font-bold uppercase text-gray-500 mb-1 block group-hover:text-gray-400">
                                                    {story.category}
                                                </span>
                                                <h5 className="font-bold leading-snug group-hover:text-gray-300 transition-colors">
                                                    {story.title}
                                                </h5>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
