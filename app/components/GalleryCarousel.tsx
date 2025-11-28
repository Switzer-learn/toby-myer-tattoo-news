import { getGalleryItems } from "@/app/lib/db/gallery";
import GalleryCarouselClient from "./GalleryCarouselClient";

export default async function GalleryCarousel() {
    const galleryItems = await getGalleryItems();

    return <GalleryCarouselClient items={galleryItems} />;
}
