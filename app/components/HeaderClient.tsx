"use client";

import Link from "next/link";
import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Config } from "@/app/lib/db/config";
import Image from "next/image";

interface HeaderClientProps {
    config: Config | null;
}

const menu = [
    { name: "Posts", link: "/#posts" },
    { name: "Artists", link: "https://www.balitattooheroes.com/" },
    { name: "Gallery", link: "/#gallery" },
    { name: "Contact", link: "https://www.commandos18tattoobali.com/contact" },
];

export default function HeaderClient({ config }: HeaderClientProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10 text-white">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo / Title */}
                <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
                    <div className="flex justify-center items-center gap-4">
                        <Image
                            src="/balitattonews_logo.webp"
                            alt="Bali Tattoo News"
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tighter uppercase">Bali Tattoo News</span>
                            <span className="block text-xs font-normal text-gray-400 tracking-widest">
                                Delivering Latest Tattoo News in Bali
                            </span>
                        </div>

                    </div>

                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wide">
                    {menu.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            className="hover:text-gray-400 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Social Icons */}
                <div className="flex items-center gap-4">
                    {config?.socialMedia.instagram && (
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={config.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-400 transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={20} />
                        </motion.a>
                    )}
                    {config?.socialMedia.whatsapp && (
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={config.socialMedia.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-400 transition-colors"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle size={20} />
                        </motion.a>
                    )}
                    {config?.socialMedia.youtube && (
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={config.socialMedia.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-400 transition-colors"
                            aria-label="YouTube"
                        >
                            <Youtube size={20} />
                        </motion.a>
                    )}
                </div>
            </div>
        </header>
    );
}
