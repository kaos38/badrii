"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mountain, Church, Home } from "lucide-react";

export function InteractiveMap() {
  const [activePin, setActivePin] = useState(null);

  const attractions = [
    {
      id: 1,
      name: "KuberJi Mandir",
      description: "Main temple dedicated to Lord Kuber",
      x: 50,
      y: 50,
      icon: Church,
      color: "#D4AF37",
    },
    {
      id: 2,
      name: "Yog Badri",
      description: "One of the sacred Panch Badri temples",
      x: 35,
      y: 40,
      icon: Mountain,
      color: "#2D5F4C",
    },
    {
      id: 3,
      name: "Pandukeshwar Village",
      description: "Historic village settlement",
      x: 60,
      y: 65,
      icon: Home,
      color: "#C9A961",
    },
    {
      id: 4,
      name: "Alaknanda River",
      description: "Sacred river originating from Alkapuri",
      x: 30,
      y: 75,
      icon: Mountain,
      color: "#4A7C59",
    },
    {
      id: 5,
      name: "Joshimath",
      description: "Gateway to Badrinath and nearby temples",
      x: 70,
      y: 45,
      icon: Home,
      color: "#8B6F47",
    },
  ];

  return (
    <section className="py-20 relative" data-section="map">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-spiritual-gold mb-4 font-quicksand">
            Explore Nearby Attractions
          </h2>
          <p className="text-lg text-spiritual-green dark:text-spiritual-cream max-w-2xl mx-auto leading-relaxed">
            Discover the sacred sites and spiritual landmarks surrounding KuberJi Mandir
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="section-card max-w-5xl mx-auto p-8 relative"
        >
          {/* SVG Map */}
          <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-spiritual-cream to-spiritual-green/10 rounded-3xl overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background Mountain Shapes */}
              <defs>
                <radialGradient id="mapGradient">
                  <stop offset="0%" stopColor="#FAF7F2" />
                  <stop offset="100%" stopColor="#E8DCC8" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect width="100" height="100" fill="url(#mapGradient)" />

              {/* Mountain Silhouettes */}
              <motion.path
                d="M0,60 L15,30 L25,45 L40,15 L55,40 L70,20 L85,50 L100,35 L100,100 L0,100 Z"
                fill="#2D5F4C"
                opacity="0.1"
                animate={{
                  d: [
                    "M0,60 L15,30 L25,45 L40,15 L55,40 L70,20 L85,50 L100,35 L100,100 L0,100 Z",
                    "M0,58 L15,32 L25,43 L40,18 L55,38 L70,22 L85,48 L100,37 L100,100 L0,100 Z",
                    "M0,60 L15,30 L25,45 L40,15 L55,40 L70,20 L85,50 L100,35 L100,100 L0,100 Z",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* River Path */}
              <motion.path
                d="M25,70 Q35,72 45,68 T65,75 T85,70"
                stroke="#4A7C59"
                strokeWidth="0.5"
                fill="none"
                opacity="0.4"
                strokeDasharray="2,2"
                animate={{
                  strokeDashoffset: [0, -20],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Attraction Pins */}
              {attractions.map((attraction, index) => (
                <g key={attraction.id}>
                  {/* Pulsating Ring */}
                  <motion.circle
                    cx={attraction.x}
                    cy={attraction.y}
                    r="3"
                    fill="none"
                    stroke={attraction.color}
                    strokeWidth="0.5"
                    opacity="0.6"
                    animate={{
                      r: [3, 6],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />

                  {/* Pin Circle */}
                  <motion.circle
                    cx={attraction.x}
                    cy={attraction.y}
                    r="2.5"
                    fill={attraction.color}
                    filter="url(#glow)"
                    className="cursor-pointer map-pin-glow"
                    onMouseEnter={() => setActivePin(attraction.id)}
                    onMouseLeave={() => setActivePin(null)}
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      scale: activePin === attraction.id ? 1.5 : 1,
                    }}
                  />

                  {/* Pin Marker */}
                  <motion.path
                    d={`M${attraction.x},${attraction.y - 2.5} L${attraction.x},${attraction.y - 6}`}
                    stroke={attraction.color}
                    strokeWidth="0.8"
                    opacity="0.8"
                  />
                </g>
              ))}
            </svg>

            {/* Tooltips */}
            <AnimatePresence>
              {activePin && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${attractions.find((a) => a.id === activePin)?.x}%`,
                    top: `${
                      (attractions.find((a) => a.id === activePin)?.y || 0) - 15
                    }%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div className="bg-white dark:bg-spiritual-green shadow-2xl rounded-2xl p-4 min-w-[200px] border-2 border-spiritual-gold/20">
                    <div className="flex items-start gap-3">
                      {React.createElement(
                        attractions.find((a) => a.id === activePin)?.icon || MapPin,
                        {
                          className: "w-5 h-5 text-spiritual-gold flex-shrink-0 mt-0.5",
                        }
                      )}
                      <div>
                        <h4 className="font-bold text-spiritual-gold mb-1 font-quicksand">
                          {attractions.find((a) => a.id === activePin)?.name}
                        </h4>
                        <p className="text-sm text-spiritual-green dark:text-spiritual-cream">
                          {attractions.find((a) => a.id === activePin)?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {attractions.map((attraction) => (
              <motion.div
                key={attraction.id}
                className="flex items-center gap-2 p-3 rounded-xl bg-spiritual-cream dark:bg-spiritual-light-green/20 cursor-pointer transition-all hover:shadow-lg"
                onMouseEnter={() => setActivePin(attraction.id)}
                onMouseLeave={() => setActivePin(null)}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: attraction.color }}
                />
                <span className="text-sm font-medium text-spiritual-green dark:text-spiritual-cream truncate">
                  {attraction.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
