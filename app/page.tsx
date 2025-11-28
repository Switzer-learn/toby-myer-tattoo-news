import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedNews from "./components/FeaturedNews";
import PostCarousel from "./components/PostCarousel";
import FollowArtists from "./components/FollowArtists";
import GalleryCarousel from "./components/GalleryCarousel";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <Header />
      <Hero />
      <FeaturedNews />
      <PostCarousel />
      <FollowArtists />
      <GalleryCarousel />
      <Footer />
    </main>
  );
}
