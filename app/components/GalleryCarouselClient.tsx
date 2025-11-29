"use client";

import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { GalleryItem } from "@/app/lib/db/gallery";

interface GalleryCarouselClientProps {
    items: GalleryItem[];
}

export default function GalleryCarouselClient({ items }: GalleryCarouselClientProps) {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <section id="gallery" className="bg-black text-white py-20 border-t border-white/10">
            <div className="container mx-auto px-4 mb-10">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                    Tattoo Gallery
                </h3>
            </div>

            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1.5}
                centeredSlides={true}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2.5 },
                    1024: { slidesPerView: 4.5 },
                }}
                className="w-full"
            >
                {items.map((item) => (
                    <SwiperSlide key={item._id.toString()}>
                        <div className="group block relative aspect-square overflow-hidden border border-white/10 hover:border-white transition-colors duration-300">
                            {item.image.includes("cloudinary") ? (
                                <CldImage
                                    src={item.image.split("/upload/")[1]?.replace(/v\d+\//, "").split(".")[0] || item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                />
                            ) : (
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-sm font-bold uppercase tracking-widest">
                                    {item.category.replace(/_/g, ' ')}
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
