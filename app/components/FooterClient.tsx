"use client";

import Link from "next/link";
import { Instagram, Youtube, MessageCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Config } from "@/app/lib/db/config";

interface FooterClientProps {
    config: Config | null;
}

const menu = [
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Gallery", link: "/gallery" },
    { name: "Artists", link: "/artists" },
    { name: "Latest News", link: "/latest-news" },
];

export default function FooterClient({ config }: FooterClientProps) {
    return (
        <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
                    {/* Left Column */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-2xl font-bold tracking-tighter uppercase mb-2">
                            {config?.siteConfig.name || "Commandos18"}
                            <span className="block text-xs font-normal text-gray-400 tracking-widest">
                                Tattoo News
                            </span>
                        </h2>
                        <p className="text-gray-400 text-sm mb-8 max-w-xs">
                            {config?.siteConfig.description || "Stories, culture, and art from Bali's tattoo scene."}
                        </p>

                        <nav className="flex flex-col gap-2 text-sm font-medium uppercase tracking-wide">
                            {menu.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.link}
                                    className="hover:text-gray-400 transition-colors w-fit"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-1/3 flex flex-col items-start md:items-end">
                        <div className="flex gap-6 mb-8">
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

                        {config?.contactInfo.address && (
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
                            >
                                <MapPin size={18} />
                                Visit the Studio
                            </motion.a>
                        )}
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-wider">
                    <div className="flex gap-6">
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                    <p>© 2025 {config?.siteConfig.name || "Commandos18tattoos"}</p>
                </div>
            </div>
        </footer>
    );
}
