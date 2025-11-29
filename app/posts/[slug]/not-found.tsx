import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">404</h1>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-6">
                    Post Not Found
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    The post you're looking for doesn't exist or has been removed.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-white pb-2 hover:text-gray-300 hover:border-gray-300 transition-all"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
