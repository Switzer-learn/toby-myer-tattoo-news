"use client";

import Link from "next/link";
import { Instagram, Youtube, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">
                    {/* Left Column */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-2xl font-bold tracking-tighter uppercase mb-2">
                            Commandos18
                            <span className="block text-xs font-normal text-gray-400 tracking-widest">
                                Tattoo News
                            </span>
                        </h2>
                        <p className="text-gray-400 text-sm mb-8 max-w-xs">
                            Stories, culture, and art from Bali&apos;s tattoo scene.
                        </p>

                        <nav className="flex flex-col gap-2 text-sm font-medium uppercase tracking-wide">
                            {["About", "Contact", "Gallery", "Artists", "Latest News"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                                    className="hover:text-gray-400 transition-colors w-fit"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-1/3 flex flex-col items-start md:items-end">
                        <div className="flex gap-6 mb-8">
                            <a href="#" className="hover:text-gray-400 transition-colors" aria-label="Instagram">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="hover:text-gray-400 transition-colors" aria-label="WhatsApp">
                                <MessageCircle size={24} />
                            </a>
                            <a href="#" className="hover:text-gray-400 transition-colors" aria-label="YouTube">
                                <Youtube size={24} />
                            </a>
                        </div>

                        <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
                        >
                            <MapPin size={18} />
                            Visit the Studio
                        </a>
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
                    <p>© 2025 Commandos18tattoos</p>
                </div>
            </div>
        </footer>
    );
}
