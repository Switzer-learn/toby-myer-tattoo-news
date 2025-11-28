import ArtistGallery from "@/app/components/ArtistGallery";

export default function TestArtistGalleryPage() {
    return (
        <div className="bg-black min-h-screen text-white">
            <h1 className="text-center text-white text-4xl py-10">Artist Gallery Test</h1>
            <ArtistGallery />
        </div>
    );
}