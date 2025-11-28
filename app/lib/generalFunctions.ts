import { Artist } from "./db/artists";

export interface GalleryImage {
  imageUrl: string;
  artistName: string;
  artistId: string;
  uniqueKey: string;
}

/**
 * Flatten all artist gallery images into a single array
 */
export function flattenArtistGallery(artists: Artist[]): GalleryImage[] {
  return artists.flatMap(artist =>
    artist.gallery.map((imageUrl, index) => ({
      imageUrl,
      artistName: artist.name,
      artistId: artist._id.toString(),
      uniqueKey: `${artist._id.toString()}-${index}`
    }))
  );
}