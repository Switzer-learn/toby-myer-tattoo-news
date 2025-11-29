import { getPostBySlug, getPosts } from "@/app/lib/db/posts";
import { notFound } from "next/navigation";
import PostClient from "./PostClient";

interface PostPageProps {
    params: {
        slug: string;
    };
}

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps) {
    const slug = await params;
    const post = await getPostBySlug(slug.slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: `${post.title} | Bali Tattoo News`,
        description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.content.replace(/<[^>]*>/g, '').substring(0, 160),
            images: [post.image],
        },
    };
}

// Server Component - handles data fetching and metadata
export default async function PostPage({ params }: PostPageProps) {
    const slug = await params;
    const post = await getPostBySlug(slug.slug);

    if (!post) {
        notFound();
    }

    // Pass data to client component for rendering
    return <PostClient post={post} />;
}
