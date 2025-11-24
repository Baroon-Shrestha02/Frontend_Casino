import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tests from "./Tests";
import SuccessStories from "./SuccessStories";

export default function CombineTests() {
  const [activeTab, setActiveTab] = useState("tests");

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const direction = activeTab === "successStories" ? 1 : -1;

  return (
    <div className="w-full container mx-auto px-4 py-8">
      {/* Tab Headers */}
      <div className="relative flex justify-center items-end">
        <div className="flex items-end">
          <button
            onClick={() => handleTabChange("tests")}
            className={`px-12 py-3 font-medium transition-all duration-300 relative ${
              activeTab === "tests"
                ? "text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
            style={{
              borderTopLeftRadius: "24px",
              borderTopRightRadius: activeTab === "tests" ? "24px" : "0px",
            }}
          >
            Testimonials
            {activeTab === "tests" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gray-900 -z-10"
                style={{
                  borderTopLeftRadius: "24px",
                  borderTopRightRadius: "24px",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => handleTabChange("successStories")}
            className={`px-12 py-3 font-medium transition-all duration-300 relative ${
              activeTab === "successStories"
                ? "text-white"
                : "text-gray-500 hover:text-gray-700 "
            }`}
            style={{
              borderTopLeftRadius:
                activeTab === "successStories" ? "24px" : "0px",
              borderTopRightRadius: "24px",
            }}
          >
            Success Stories
            {activeTab === "successStories" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gray-900 -z-10"
                style={{
                  borderTopLeftRadius: "24px",
                  borderTopRightRadius: "24px",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative overflow-hidden bg-gray-900 rounded-3xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div className="p-8">
              {activeTab === "tests" && <Tests />}
              {activeTab === "successStories" && <SuccessStories />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
