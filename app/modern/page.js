"use client";
import { useState, useEffect } from "react";
import { LuxuryHero } from "@/components/LuxuryHero";
import StickyNavbar from "@/components/StickyNavbar";
import { Hero } from "@/components/Hero";
import { TimelineDemo } from "@/components/EventSection";
import { DonationSection } from "@/components/DonationSection";
import ContactSection from "@/components/ContactSection";
import { InteractiveMap } from "@/components/InteractiveMap";
import { SwipeableGallery } from "@/components/SwipeableGallery";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ModernHome() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative overflow-x-hidden transition-colors duration-500">
      <StickyNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-0">
        {/* Luxury Hero Section */}
        <LuxuryHero />

        {/* About Section with Staggered Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Hero />
        </motion.div>

        {/* Interactive Map */}
        <InteractiveMap />

        {/* Swipeable Gallery */}
        <SwipeableGallery />

        {/* Events Timeline with Staggered Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <TimelineDemo />
        </motion.div>

        {/* Donation Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <DonationSection />
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <ContactSection />
        </motion.div>
      </main>

      <Footer />

      {/* Back to Top Button */}
      <motion.button
        className="fixed bottom-24 lg:bottom-8 right-8 w-12 h-12 rounded-full bg-spiritual-gold text-white shadow-2xl flex items-center justify-center z-30 spiritual-button"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
}
