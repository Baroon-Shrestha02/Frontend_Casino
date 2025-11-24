import { motion } from "framer-motion";
import React from "react";

export default function CareerPartners() {
  const images = [
    { id: 1, image: "uploads/career/bally.png" },
    { id: 2, image: "uploads/career/garud.png" },
    { id: 3, image: "uploads/career/img1.png" },
  ];

  // Duplicate multiple times for infinite feel
  const duplicatedImages = Array(10).fill(images).flat(); // 5x repetition

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Career Partners
          </h2>
          <p className="text-gray-600 text-lg">
            Trusted by leading organizations worldwide
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: ["0%", `-${100 * images.length}%`] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30, // slower scroll
                  ease: "linear",
                },
              }}
            >
              {duplicatedImages.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-72 h-32 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={item.image}
                    alt={`Career Partner ${item.id}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
}
