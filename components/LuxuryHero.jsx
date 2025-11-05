"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import GetStartedButton from "./HeroButton";

export function LuxuryHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative min-h-screen overflow-hidden" data-section="hero">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-spiritual-cream via-primary to-spiritual-green/10 animate-gradient" />
      
      {/* Floating Bokeh Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-spiritual-gold/20 blur-3xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Curved Shape Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute -top-40 -right-40 w-[800px] h-[800px] opacity-20"
          viewBox="0 0 800 800"
          fill="none"
        >
          <motion.path
            d="M400,50 Q700,200 650,500 T400,750 Q100,600 150,300 T400,50"
            fill="url(#gradient1)"
            animate={{
              d: [
                "M400,50 Q700,200 650,500 T400,750 Q100,600 150,300 T400,50",
                "M400,100 Q650,250 600,550 T400,700 Q150,550 200,250 T400,100",
                "M400,50 Q700,200 650,500 T400,750 Q100,600 150,300 T400,50",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D5F4C" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] opacity-15"
          viewBox="0 0 700 700"
          fill="none"
        >
          <motion.circle
            cx="350"
            cy="350"
            r="250"
            fill="url(#gradient2)"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <radialGradient id="gradient2">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2D5F4C" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Parallax Background Image Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: y1, scale }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/temple/temple-top-2.jpeg"
            alt="Temple Background"
            fill
            className="object-cover opacity-20"
            loading="eager"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-spiritual-cream/50 to-spiritual-cream" />
        </div>
      </motion.div>

      {/* Clipped Image Layer */}
      <motion.div
        className="absolute right-0 top-20 w-1/2 h-[80vh] z-10 hidden lg:block"
        style={{ y: y2, opacity }}
      >
        <div
          className="relative w-full h-full"
          style={{
            clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 20% 20%)",
          }}
        >
          <Image
            src="/images/kuberji/kuberji1.jpeg"
            alt="Kuber Temple"
            fill
            className="object-cover image-hover-glow"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-spiritual-gold/20 to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Curved Text Background */}
          <div className="relative">
            <div
              className="absolute -inset-8 bg-white/60 backdrop-blur-md -z-10"
              style={{
                borderRadius: "60% 40% 70% 30% / 60% 30% 70% 40%",
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-spiritual-gold/20 rounded-full text-spiritual-green font-semibold text-sm mb-4">
                Divine Treasury of Wealth & Prosperity
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-spiritual-green font-quicksand"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              KuberJi Mandir
              <br />
              <span className="text-spiritual-gold">Pandukeshwar</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-spiritual-green/80 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Experience the sacred presence of Lord Kuber, divine treasurer of the gods.
              Nestled in the Himalayas near Yog Badri, this ancient temple welcomes devotees
              seeking blessings of prosperity and spiritual wealth.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <GetStartedButton text="Plan Your Visit" />
              <button className="spiritual-button px-8 py-4 rounded-full border-2 border-spiritual-green text-spiritual-green hover:bg-spiritual-green hover:text-white font-semibold transition-all duration-300">
                Explore Temple
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="w-6 h-10 border-2 border-spiritual-gold rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-spiritual-gold rounded-full"
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
