import { getFeaturedPosts } from "@/app/lib/db/posts";
import HeroClient from "./HeroClient";

export default async function Hero() {
    // Fetch the latest featured post
    const featuredPosts = await getFeaturedPosts(1);
    const latestFeatured = featuredPosts[0] || null;

    return <HeroClient post={latestFeatured} />;
}
