"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HeartIcon, Menu, X, Sun, Moon } from "lucide-react";
import RotatingLogo from "./RotatingLogo";

export default function StickyNavbar({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Visit", link: "/howtoreachus" },
    { name: "Events", link: "/events" },
    { name: "Media", link: "/media" },
    { name: "Shop", link: "/shop" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-spiritual-green/95 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group"
              data-nav="logo"
            >
              <RotatingLogo />
              <div>
                <div className="font-bold text-spiritual-green dark:text-spiritual-gold text-xl font-quicksand group-hover:text-spiritual-gold dark:group-hover:text-gold-accent transition-colors">
                  KuberJi Mandir
                </div>
                <div className="text-sm font-medium text-gold-accent dark:text-spiritual-cream">
                  Pandukeshwar
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="px-4 py-2 rounded-full text-spiritual-green dark:text-spiritual-cream hover:bg-spiritual-cream dark:hover:bg-spiritual-light-green transition-all duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-spiritual-gold group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-spiritual-cream dark:hover:bg-spiritual-light-green transition-colors"
                aria-label="Toggle dark mode"
                data-button="dark-mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-spiritual-gold" />
                ) : (
                  <Moon className="w-5 h-5 text-spiritual-green" />
                )}
              </button>

              {/* Desktop Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <Link href="/userlogin">
                  <button className="spiritual-button px-6 py-2 rounded-full border-2 border-spiritual-gold text-spiritual-gold dark:text-spiritual-gold hover:bg-spiritual-gold hover:text-white transition-all duration-300 font-semibold">
                    Login
                  </button>
                </Link>

                {/* Pulsing Donate Button */}
                <button
                  className="spiritual-button relative px-6 py-2 rounded-full bg-spiritual-gold text-white font-semibold overflow-hidden group"
                  data-button="donate-pulse"
                >
                  <motion.div
                    className="absolute inset-0 bg-gold-accent"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <span className="relative flex items-center gap-2">
                    <HeartIcon size={16} fill="currentColor" />
                    Donate
                  </span>
                  
                  {/* Pulse Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-spiritual-gold"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-spiritual-cream dark:hover:bg-spiritual-light-green transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-spiritual-green dark:text-spiritual-cream" />
                ) : (
                  <Menu className="w-6 h-6 text-spiritual-green dark:text-spiritual-cream" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white dark:bg-spiritual-green shadow-xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-6 space-y-4">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-spiritual-green dark:text-spiritual-cream hover:bg-spiritual-cream dark:hover:bg-spiritual-light-green transition-all font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-spiritual-cream dark:border-spiritual-light-green">
                  <Link href="/userlogin">
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full spiritual-button px-6 py-3 rounded-full border-2 border-spiritual-gold text-spiritual-gold hover:bg-spiritual-gold hover:text-white transition-all font-semibold"
                    >
                      Login
                    </button>
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full spiritual-button px-6 py-3 rounded-full bg-spiritual-gold text-white font-semibold"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <HeartIcon size={16} fill="currentColor" />
                      Donate
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Floating Donate CTA */}
      <motion.div
        className="fixed bottom-8 right-8 z-40 lg:hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          className="spiritual-button relative w-16 h-16 rounded-full bg-spiritual-gold text-white shadow-2xl flex items-center justify-center"
          data-button="floating-donate"
        >
          <HeartIcon size={24} fill="currentColor" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-spiritual-gold"
            animate={{
              scale: [1, 1.5],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </button>
      </motion.div>
    </>
  );
}
