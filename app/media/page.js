"use client";
import { useState } from "react";
import MyNav from "@/components/MyNav";
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function MediaPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryImages = [
    {
      src: "/images/temple/temple-top-2.jpeg",
      title: "Temple Exterior",
      category: "temple",
    },
    {
      src: "/images/kuberji/kuberji1.jpeg",
      title: "Main Sanctum",
      category: "temple",
    },
    {
      src: "/images/kuberji/kuber-chowk-3.jpeg",
      title: "Temple Courtyard",
      category: "temple",
    },
    {
      src: "/images/milkbath2.jpeg",
      title: "Abhishekam Ceremony",
      category: "rituals",
    },
    {
      src: "/images/carryin2.jpeg",
      title: "Devotees Gathering",
      category: "rituals",
    },
    {
      src: "/images/kalas-high.jpg",
      title: "Sacred Kalash",
      category: "rituals",
    },
    {
      src: "/images/sitting.jpeg",
      title: "Temple Priests",
      category: "people",
    },
    {
      src: "/images/carrying.jpeg",
      title: "Temple Procession",
      category: "rituals",
    },
    {
      src: "/images/riverfront.jpg",
      title: "Alaknanda River",
      category: "nature",
    },
    {
      src: "/images/village.jpg",
      title: "Pandukeshwar Village",
      category: "nature",
    },
    {
      src: "/images/pandukeshwar-snow.jpeg",
      title: "Winter Season",
      category: "nature",
    },
    {
      src: "/images/firewalk.jpeg",
      title: "Fire Ceremony",
      category: "rituals",
    },
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "temple", label: "Temple" },
    { id: "rituals", label: "Rituals" },
    { id: "people", label: "People" },
    { id: "nature", label: "Nature" },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="bg-white min-h-screen">
      <MyNav />

      {/* Hero Banner */}
      <div className="relative h-[300px] bg-spiritual-green">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl font-bold mb-4 font-quicksand">
              Temple Gallery
            </h1>
            <p className="text-xl text-gray-100">
              Moments of devotion and divine beauty
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-20 z-40 bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-spiritual-gold text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image, idx) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative h-80 rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-white text-2xl font-bold">
                  {selectedImage.title}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
