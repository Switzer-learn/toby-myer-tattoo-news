import { getPosts } from "@/app/lib/db/posts";
import PostCarouselClient from "./PostCarouselClient";

export default async function PostCarousel() {
    const posts = await getPosts(); // Fetch all active posts

    return <PostCarouselClient posts={posts} />;
}
