import { NextResponse } from "next/server";
import { getAllArtists, getAllFlattenedGalleryImages, getArtistBySlug } from "@/app/lib/db/artists";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const artist = await getArtistBySlug(slug);
      if (!artist) {
        return NextResponse.json({ error: "Artist not found" }, { status: 404 });
      }
      return NextResponse.json(artist);
    }

    // Check if requesting flattened gallery (special parameter)
    const flattened = searchParams.get("flattened");
    if (flattened === "true") {
      const galleryImages = await getAllFlattenedGalleryImages();
      return NextResponse.json({
        status: 200,
        data: galleryImages
      });
    }

    const artists = await getAllArtists();
    return NextResponse.json(artists);
  } catch (error) {
    console.error("Error fetching artists:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
