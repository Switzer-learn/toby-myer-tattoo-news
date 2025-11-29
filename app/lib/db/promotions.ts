import { getDatabase } from "@/util/mongodb/mongodb";
import { ObjectId } from "mongodb";

export interface Promotion {
  _id: ObjectId | string;
  name: string;
  image: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

const COLLECTION_NAME = "promotion";

/**
 * Get all active promotions
 */
export async function getActivePromotions(): Promise<Promotion[]> {
  const db = await getDatabase();
  const promotions = await db
    .collection<Promotion>(COLLECTION_NAME)
    .find({ isActive: true })
    .sort({ createdAt: -1 })
    .toArray();
  
  return promotions.map(promo => ({
    ...promo,
    _id: promo._id.toString()
  }));
}

/**
 * Get all promotions (for admin)
 */
export async function getAllPromotions(): Promise<Promotion[]> {
  const db = await getDatabase();
  const promotions = await db
    .collection<Promotion>(COLLECTION_NAME)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  
  return promotions.map(promo => ({
    ...promo,
    _id: promo._id.toString()
  }));
}
