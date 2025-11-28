import { getDatabase } from "@/util/mongodb/mongodb";

export interface Config {
  _id?: string;
  socialMedia: {
    whatsapp: string;
    instagram: string;
    facebook: string;
    email: string;
    website: string;
    youtube: string;
    tiktok: string;
    linktree: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    instagramHandle: string;
    facebookHandle: string;
    address: string;
  };
  siteConfig: {
    name: string;
    description: string;
    url: string;
  };
  updatedAt?: string | Date;
}

const COLLECTION_NAME = "config";

/**
 * Get site config (there should only be one config document)
 */
export async function getConfig(): Promise<Config | null> {
  const db = await getDatabase();
  const config = await db.collection<Config>(COLLECTION_NAME).findOne({});
  
  if (!config) return null;

  return {
    ...config,
    _id: config._id?.toString()
  };
}
