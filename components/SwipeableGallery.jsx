"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function SwipeableGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = [
    {
      src: "/images/kuberji/kuberji1.jpeg",
      title: "Main Temple Entrance",
      description: "Sacred entrance of KuberJi Mandir",
    },
    {
      src: "/images/temple/temple-top-2.jpeg",
      title: "Temple Architecture",
      description: "Beautiful temple structure against the sky",
    },
    {
      src: "/images/kuberji/kuber-chowk-3.jpeg",
      title: "Temple Courtyard",
      description: "Peaceful courtyard for devotees",
    },
    {
      src: "/images/milkbath2.jpeg",
      title: "Abhishekam Ceremony",
      description: "Sacred ritual performed at the temple",
    },
    {
      src: "/images/carryin2.jpeg",
      title: "Devotees' Offerings",
      description: "Community gathering and celebrations",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-20 relative overflow-hidden" data-section="gallery">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-spiritual-gold mb-4 font-quicksand">
            Temple Gallery
          </h2>
          <p className="text-lg text-spiritual-green dark:text-spiritual-cream max-w-2xl mx-auto leading-relaxed">
            Experience the divine beauty and sacred moments of KuberJi Mandir
          </p>
        </motion.div>

        {/* Desktop Grid Gallery */}
        <div className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer relative overflow-hidden rounded-3xl aspect-[4/3]"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-spiritual-green/90 via-spiritual-green/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute inset-0 shadow-2xl"
                initial={{ boxShadow: "0 0 0 rgba(212, 175, 55, 0)" }}
                whileHover={{
                  boxShadow: "0 20px 60px rgba(212, 175, 55, 0.4)",
                }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-bold text-xl mb-2 font-quicksand">
                  {image.title}
                </h3>
                <p className="text-spiritual-cream text-sm">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipeable Carousel */}
        <div className="lg:hidden relative max-w-2xl mx-auto">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x > 100 || velocity.x > 500) {
                    prevSlide();
                  } else if (offset.x < -100 || velocity.x < -500) {
                    nextSlide();
                  }
                }}
                className="relative w-full h-full cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-spiritual-green/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-xl mb-2 font-quicksand">
                    {images[currentIndex].title}
                  </h3>
                  <p className="text-spiritual-cream text-sm">
                    {images[currentIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-spiritual-green/90 flex items-center justify-center spiritual-button shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-spiritual-green dark:text-spiritual-gold" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-spiritual-green/90 flex items-center justify-center spiritual-button shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-spiritual-green dark:text-spiritual-gold" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-spiritual-gold w-8"
                    : "bg-spiritual-green/30 dark:bg-spiritual-cream/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].title}
                fill
                className="object-contain"
              />
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
