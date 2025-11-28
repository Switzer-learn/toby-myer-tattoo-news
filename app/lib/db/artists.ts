import { getDatabase } from "@/util/mongodb/mongodb";
import { ObjectId } from "mongodb";
import { flattenArtistGallery, GalleryImage } from "../generalFunctions";

export interface Artist {
  _id: ObjectId | string;
  name: string;
  photo: string;
  tagline: string;
  gallery: string[];
  updatedAt: string | Date;
  isActive: boolean;
  slug: string;
}

const COLLECTION_NAME = "artist";

/**
 * Get all active artists
 */
export async function getAllArtists(options: {
  isActive?: boolean;
} = {}): Promise<object> {
  try {
    const db = await getDatabase();
    const dbCollection = db.collection('artists');
    
    // Build query filter
    const filter: any = {};
    if (options.isActive !== undefined) {
      filter.isActive = options.isActive;
    }
    
    // Fetch all artists
    const artists = await dbCollection
      .find(filter)
      .sort({ updatedAt: -1 })
      .toArray();

      console.log("artist db", artists)
    
    return {  
      status:200,
      data:artists
    };
  } catch (error) {
    console.error('Error getting all artists:', error);
    return {
      error: 'Failed to retrieve artists',
      status: 500
    };
  }
}

/**
 * Get all flattened gallery images from all active artists
 */
export async function getAllFlattenedGalleryImages(): Promise<GalleryImage[]> {
  try {
    const db = await getDatabase();
    const dbCollection = db.collection('artists');
    
    // Fetch all active artists
    const artists = await dbCollection
      .find({ isActive: true })
      .sort({ updatedAt: -1 })
      .toArray();
    
    // Convert MongoDB documents to Artist type and flatten all gallery images
    const formattedArtists: Artist[] = artists.map((artist: any) => ({
      _id: artist._id.toString(),
      name: artist.name,
      photo: artist.photo,
      tagline: artist.tagline,
      gallery: artist.gallery,
      updatedAt: artist.updatedAt,
      isActive: artist.isActive,
      slug: artist.slug
    }));
    
    return flattenArtistGallery(formattedArtists);
  } catch (error) {
    console.error('Error getting flattened gallery images:', error);
    return [];
  }
}

/**
 * Get a single artist by slug
 */
export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  const db = await getDatabase();
  const artist = await db.collection<Artist>(COLLECTION_NAME).findOne({ slug, isActive: true });
  
  if (!artist) return null;

  return {
    ...artist,
    _id: artist._id.toString()
  };
}
