"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { GalleryImage } from "@/app/lib/generalFunctions";

export default function ArtistGallery() {
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGalleryImages = async () => {
            try {
                const response = await fetch('/api/artists?flattened=true');

                if (!response.ok) {
                    throw new Error('Failed to fetch gallery images');
                }

                const result = await response.json();

                // Handle the response structure from our new API endpoint
                if (result.status === 200 && result.data) {
                    setGalleryImages(result.data);
                } else {
                    setError('Failed to load gallery images');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchGalleryImages();
    }, []);

    if (loading) {
        return (
            <section className="bg-black text-white py-20 border-t border-white/10">
                <div className="container mx-auto px-4">
                    <div className="text-center">Loading gallery...</div>
                </div>
            </section>
        );
    }

    if (error || galleryImages.length === 0) {
        return null;
    }

    return (
        <section className="bg-black text-white py-20 border-t border-white/10">
            <div className="container mx-auto px-4 mb-10">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                    Artists Gallery
                </h3>
                <p className="mt-2 text-gray-400">Explore work from all our talented artists</p>
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
                    <SwiperSlide key={item.uniqueKey}>
                        <Link
                            href={`https://balitattooheroes.com/${item.artistId}`}
                            className="group block relative aspect-square overflow-hidden border border-white/10 hover:border-white transition-colors duration-300"
                        >
                            {item.imageUrl.includes("cloudinary") ? (
                                <CldImage
                                    src={item.imageUrl.split("/upload/")[1]?.replace(/v\d+\//, "").split(".")[0] || item.imageUrl}
                                    alt={`${item.artistName} tattoo work`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                />
                            ) : (
                                <Image
                                    src={item.imageUrl}
                                    alt={`${item.artistName} tattoo work`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-sm font-bold uppercase tracking-widest">
                                    {item.artistName}
                                </span>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}