import React, { useState } from "react";

// Sample gym data (replace URLs with your actual gym photos)
const GYM_PHOTOS = [
  {
    id: 1,
    title: "Heavy Lifting Zone",
    category: "Weightlifting",
    url: "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 2,
    title: "Treadmill & Cardio Deck",
    category: "Cardio",
    url: "https://images.unsplash.com/photo-1616279967983-ec413476e824?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 3,
    title: "Functional Turf Area",
    category: "CrossFit",
    url: "https://t4.ftcdn.net/jpg/20/60/30/49/240_F_2060304941_HzM7z0Bu3dOnufBMYHMt6qJVO06YHAJY.jpg",
  },
  {
    id: 4,
    title: "Dumbbell Rack",
    category: "Weightlifting",
    url: "https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg",
  },
  {
    id: 5,
    title: "Mind & Body Studio",
    category: "Yoga",
    url: "https://images.pexels.com/photos/25596889/pexels-photo-25596889.jpeg",
  },
  {
    id: 6,
    title: "Battle Ropes & HIIT",
    category: "CrossFit",
    url: "https://media.istockphoto.com/id/1149241543/photo/mature-strong-man-battling-with-rope.jpg?s=612x612&w=0&k=20&c=Eytohh4p0vR9KIhPQ8FHPbHQRbWjce_u8MJSVzwTYOU=",
  },
];

const CATEGORIES = ["All", "Weightlifting", "Cardio", "CrossFit", "Yoga"];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredPhotos =
    selectedCategory === "All"
      ? GYM_PHOTOS
      : GYM_PHOTOS.filter((photo) => photo.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight uppercase text-white sm:text-5xl">
            Our <span className="text-amber-400">Facility</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-zinc-400">
            Explore our state-of-the-art equipment, training zones, and recovery
            spaces.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === category
                  ? "bg-amber-400 text-white shadow-lg shadow-red-600/30"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedImage(photo)}
              className="group relative overflow-hidden rounded-xl bg-zinc-900 cursor-pointer aspect-video"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {photo.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-5 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase text-red-500">
                  {selectedImage.category}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedImage.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
