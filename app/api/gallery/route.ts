import { NextResponse } from "next/server";
import { getGalleryItems, getGalleryItemsByCategory } from "@/app/lib/db/gallery";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (category) {
      const items = await getGalleryItemsByCategory(category);
      return NextResponse.json(items);
    }

    const items = await getGalleryItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
