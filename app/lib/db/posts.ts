import { getDatabase } from "@/util/mongodb/mongodb";
import { ObjectId } from "mongodb";

export interface Post {
  _id: ObjectId | string;
  title: string;
  slug: string;
  content: string;
  image: string;
  author: string;
  wordCount: number;
  readTime: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  isActive: boolean;
  featured: boolean;
}

const COLLECTION_NAME = "posts";

/**
 * Get all active posts
 */
export async function getPosts(): Promise<Post[]> {
  const db = await getDatabase();
  const posts = await db
    .collection<Post>(COLLECTION_NAME)
    .find({ isActive: true })
    .sort({ createdAt: -1 })
    .toArray();
  
  // Convert _id to string to be serializable if needed, though usually fine in server components
  return posts.map(post => ({
    ...post,
    _id: post._id.toString()
  }));
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = await getDatabase();
  const post = await db.collection<Post>(COLLECTION_NAME).findOne({ slug, isActive: true });
  
  if (!post) return null;

  return {
    ...post,
    _id: post._id.toString()
  };
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  const db = await getDatabase();
  const posts = await db
    .collection<Post>(COLLECTION_NAME)
    .find({ isActive: true, featured: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return posts.map(post => ({
    ...post,
    _id: post._id.toString()
  }));
}
