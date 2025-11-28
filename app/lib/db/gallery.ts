import { getDatabase } from "@/util/mongodb/mongodb";
import { ObjectId } from "mongodb";

export interface GalleryItem {
  _id: ObjectId | string;
  name: string;
  category: string;
  image: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  isActive: boolean;
}

const COLLECTION_NAME = "gallery";

/**
 * Get all active gallery items
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const db = await getDatabase();
  const items = await db
    .collection<GalleryItem>(COLLECTION_NAME)
    .find({ isActive: true })
    .sort({ createdAt: -1 })
    .toArray();
  
  return items.map(item => ({
    ...item,
    _id: item._id.toString()
  }));
}

/**
 * Get gallery items by category
 */
export async function getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
  const db = await getDatabase();
  const items = await db
    .collection<GalleryItem>(COLLECTION_NAME)
    .find({ category, isActive: true })
    .sort({ createdAt: -1 })
    .toArray();

  return items.map(item => ({
    ...item,
    _id: item._id.toString()
  }));
}
