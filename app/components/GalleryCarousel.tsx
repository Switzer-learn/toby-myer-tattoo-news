"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Mock Data
const galleryImages = [
    { id: "1", src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop", artist: "Agus Ink" },
    { id: "2", src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2070&auto=format&fit=crop", artist: "Sinta D." },
    { id: "3", src: "https://images.unsplash.com/photo-1590246130793-2e1f5cd801c6?q=80&w=2070&auto=format&fit=crop", artist: "Kadek S." },
    { id: "4", src: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=1974&auto=format&fit=crop", artist: "Made A." },
    { id: "5", src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop", artist: "Agus Ink" },
    { id: "6", src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2070&auto=format&fit=crop", artist: "Sinta D." },
];

export default function GalleryCarousel() {
    return (
        <section className="bg-black text-white py-20 border-t border-white/10">
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
                {galleryImages.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={`/artists/${item.artist.toLowerCase().replace(" ", "-")}`} className="group block relative aspect-square overflow-hidden border border-white/10 hover:border-white transition-colors duration-300">
                            <Image
                                src={item.src}
                                alt={`Tattoo by ${item.artist}`}
                                fill
                                className="object-cover grayscale group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-sm font-bold uppercase tracking-widest border-b border-white pb-1">
                                    View Artist
                                </span>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
