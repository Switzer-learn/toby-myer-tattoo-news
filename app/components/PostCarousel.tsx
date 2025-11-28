import { getFeaturedPosts } from "@/app/lib/db/posts";
import PostCarouselClient from "./PostCarouselClient";

export default async function PostCarousel() {
    const posts = await getFeaturedPosts(6); // Fetch 6 featured posts

    return <PostCarouselClient posts={posts} />;
}
