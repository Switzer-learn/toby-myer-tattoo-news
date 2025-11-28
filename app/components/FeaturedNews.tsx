import { getFeaturedPosts } from "@/app/lib/db/posts";
import FeaturedNewsClient from "./FeaturedNewsClient";

export default async function FeaturedNews() {
    // Fetch featured posts (excluding the one shown in Hero)
    const featuredPosts = await getFeaturedPosts(10);

    // Debug: Log how many featured posts we got
    console.log(`[FeaturedNews] Total featured posts fetched: ${featuredPosts.length}`);

    // Skip the first one as it's shown in Hero
    const posts = featuredPosts.slice(1);

    console.log(`[FeaturedNews] Posts after slice: ${posts.length}`);

    return <FeaturedNewsClient posts={posts} />;
}
