"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

const artists = [
    {
        id: "1",
        name: "Agus 'Ink'",
        image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1974&auto=format&fit=crop",
        slug: "agus-ink",
    },
    {
        id: "2",
        name: "Sinta D.",
        image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=2070&auto=format&fit=crop",
        slug: "sinta-d",
    },
    {
        id: "3",
        name: "Kadek S.",
        image: "https://images.unsplash.com/photo-1590246130793-2e1f5cd801c6?q=80&w=2070&auto=format&fit=crop",
        slug: "kadek-s",
    },
    {
        id: "4",
        name: "Made A.",
        image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?q=80&w=1974&auto=format&fit=crop",
        slug: "made-a",
    },
];

export default function FollowArtists() {
    return (
        <section className="bg-black text-white py-20 border-t border-white/10">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">
                    Follow Our Artists
                </h3>
                <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                    Stay updated with their latest work and available slots.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {artists.map((artist) => (
                        <div key={artist.id} className="flex flex-col items-center group">
                            <Link href={`/artists/${artist.slug}`} className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/20 mb-4 group-hover:border-white transition-colors">
                                <Image
                                    src={artist.image}
                                    alt={artist.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </Link>
                            <h4 className="text-lg font-bold uppercase tracking-wide mb-2">
                                {artist.name}
                            </h4>
                            <div className="flex gap-3">
                                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                    <Instagram size={18} />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-white transition-colors">
                                    <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
