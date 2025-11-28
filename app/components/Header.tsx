"use client";

import Link from "next/link";
import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10 text-white">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo / Title */}
        <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
          Commandos18
          <span className="block text-xs font-normal text-gray-400 tracking-widest">
            Tattoo News
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wide">
          {["Latest", "Trending", "Artists", "Styles", "Gallery", "Contact"].map(
            (item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="hover:text-gray-400 transition-colors"
              >
                {item}
              </Link>
            )
          )}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-white hover:text-gray-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-white hover:text-gray-400 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="#"
            className="text-white hover:text-gray-400 transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={20} />
          </motion.a>
        </div>
      </div>
    </header>
  );
}
