"use client";

import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Post } from "@/app/lib/db/posts";

interface PostCarouselClientProps {
    posts: Post[];
}

export default function PostCarouselClient({ posts }: PostCarouselClientProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const swiperRef = useRef<any>(null);

    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section className="bg-black text-white py-20 border-t border-white/10 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">
                            Spotlight on Artists
                        </h3>
                        <p className="text-gray-400">Masters of the craft in Bali.</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full"
                            aria-label="Previous slide"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="p-3 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full"
                            aria-label="Next slide"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full"
                >
                    {posts.map((post) => (
                        <SwiperSlide key={post._id.toString()}>
                            <Link href={`/posts/${post.slug}`} className="group block h-full">
                                <div className="relative aspect-3/4 overflow-hidden border-4 border-black outline outline-1 outline-white/20 mb-6">
                                    {post.image.includes("cloudinary") ? (
                                        <CldImage
                                            src={post.image.split("/upload/")[1]?.replace(/v\d+\//, "").split(".")[0] || post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase text-gray-500 mb-2 block">
                                        {post.author}
                                    </span>
                                    <h4 className="text-xl font-bold uppercase tracking-wide group-hover:text-gray-300 transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
