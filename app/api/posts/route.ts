import { NextResponse } from "next/server";
import { getPosts, getPostBySlug, getFeaturedPosts } from "@/app/lib/db/posts";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const featured = searchParams.get("featured");

    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    if (featured === "true") {
      const posts = await getFeaturedPosts();
      return NextResponse.json(posts);
    }

    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
