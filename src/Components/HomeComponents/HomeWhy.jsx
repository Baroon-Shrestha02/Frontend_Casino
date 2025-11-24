import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, LampIcon, X } from "lucide-react";
import { video } from "motion/react-client";

const reasons = [
  {
    id: 1,
    title: "10+ Years of Training Experience",
    description:
      "With over a decade of expertise, we have successfully trained countless casino professionals who are now working in leading casinos and cruise ships across the globe.",
    image: "uploads/home/why/exp.jpg",
  },
  {
    id: 2,
    title: "Real Casino Equipment",
    description:
      "Train with authentic roulette wheels, blackjack tables, poker setups, and more. Our real equipment ensures you are fully prepared for actual casino environments.",
    image: "uploads/home/why/equip.jpg",
  },
  {
    id: 3,
    title: "Small Batch Sizes",
    description:
      "We maintain limited seats in each batch, allowing trainers to give personal guidance and ensure every student gets hands-on experience and faster learning outcomes.",
    image: "uploads/home/why/batch.jpg",
  },
  {
    id: 4,
    title: "Focused Casino Dealer Skills",
    description:
      "Our programs are entirely dedicated to casino dealing—covering game rules, professional etiquette, speed, and accuracy—without diluting focus on unrelated skills.",
    image: "uploads/home/why/dealer.jpg",
  },
  {
    id: 5,
    title: "Certified Trainers",
    description:
      "Learn directly from certified trainers with international exposure who bring real-world casino experience into the classroom.",
    image: "uploads/home/why/trainers.jpg",
  },
  {
    id: 6,
    title: "Global Career Pathways",
    description:
      "We provide not just training but career support, guiding you towards opportunities in casinos and cruise lines worldwide for a truly global future.",
    image: "uploads/home/why/path.jpg",
  },
];

export default function HomeWhy() {
  const [activeReason, setActiveReason] = useState(reasons[0]);
  const defaultImage =
    "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=600&h=400&fit=crop";

  const handleReasonClick = (reason) => {
    if (activeReason?.id === reason.id) {
      setActiveReason(null);
    } else {
      setActiveReason(reason);
    }
  };

  const getCurrentImage = () => {
    if (activeReason) return activeReason.image;
    return defaultImage;
  };

  const navigateReason = (direction) => {
    if (!activeReason) return;

    const currentIndex = reasons.findIndex((r) => r.id === activeReason.id);
    let newIndex;

    if (direction === "next") {
      newIndex = currentIndex === reasons.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? reasons.length - 1 : currentIndex - 1;
    }

    setActiveReason(reasons[newIndex]);
  };

  // Enhanced animation variants
  const reasonVariants = {
    collapsed: {
      scale: 1,
      opacity: 1,
    },
    expanded: {
      scale: 1.02,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    transitioning: {
      scale: 0.98,
      opacity: 0.7,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  const mediaVariants = {
    enter: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const contentVariants = {
    enter: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white ">
      <div className="container mx-auto px-6">
        {/* Header Section - Always Visible */}
        <div className="flex items-center flex-col mb-6">
          <div className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Why Choose Us?
          </div>
          <div className="max-w-3xl text-xl text-gray-600 leading-relaxed text-center">
            Master professional casino dealing with our comprehensive training
            programs. From classic table games to modern variants, build your
            expertise with industry professionals.
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-16 min-h-[75vh] ">
          {/* Left Side - Desktop: Show all reasons with expanded active, Mobile: Show active only */}
          <div className="flex flex-col justify-center">
            {/* Desktop Layout (lg and up) */}
            <div className="hidden lg:block space-y4">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="cursor-pointer"
                  onClick={() => handleReasonClick(reason)}
                >
                  <AnimatePresence mode="wait">
                    {activeReason?.id === reason.id ? (
                      <motion.div
                        key="expanded"
                        initial={{ scale: 0.98, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-slate-900 rounded-2xl p-8 relative text-white shadow-xl"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                        >
                          <div className="absolute right-3 top-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReasonClick(reason);
                              }}
                              className="text-white hover:text-white p-1 transition-colors"
                            >
                              <X />
                            </button>
                          </div>
                          <div className="text-blue-100 leading-relaxed">
                            {reason.description}
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="collapsed"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.98, opacity: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                        className="py-4"
                      >
                        <motion.div className="inline-flex px-6 py-3 rounded-full transition-all duration-300 bg-gray-100 text-gray-800 hover:bg-gray-200">
                          <span className="text-lg font-semibold">
                            {reason.title}
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Mobile Layout (below lg) */}
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                {!activeReason ? (
                  <motion.div
                    key="reasons-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {reasons.map((reason, index) => (
                      <motion.div
                        key={reason.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => handleReasonClick(reason)}
                      >
                        <div className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">
                              {reason.title}
                            </span>
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-300">
                              <svg
                                className="w-3 h-3 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="active-description"
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {/* Navigation Header */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setActiveReason(null)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Back to all reasons
                      </button>

                      {/* Mobile Navigation Arrows */}
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigateReason("prev")}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <ChevronLeft size={20} className="text-gray-600" />
                        </motion.button>
                        <span className="text-sm text-gray-500 px-2">
                          {reasons.findIndex((r) => r.id === activeReason.id) +
                            1}{" "}
                          / {reasons.length}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigateReason("next")}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <ChevronRight size={20} className="text-gray-600" />
                        </motion.button>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="bg-blue-50 border border-blue-200 rounded-2xl p-8"
                    >
                      <div className="text-2xl font-bold text-blue-900 mb-4">
                        {activeReason.title}
                      </div>
                      <div className="text-lg text-blue-800 leading-relaxed">
                        {activeReason.description}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Media */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <motion.div
                className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200"
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {activeReason?.image ? (
                    <motion.img
                      key={`img-${activeReason?.id || "default"}`}
                      src={getCurrentImage()}
                      alt="Casino Training"
                      className="w-full h-[500px] object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  ) : activeReason?.video ? (
                    activeReason.video.includes("vimeo.com") ||
                    activeReason.video.includes("youtube.com") ? (
                      <motion.iframe
                        key={`iframe-${activeReason.id}`}
                        src={activeReason.video}
                        className="w-full h-[500px] rounded-3xl"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    ) : (
                      <motion.video
                        key={`video-${activeReason.id}`}
                        src={activeReason.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-[500px] object-cover rounded-3xl"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    )
                  ) : (
                    <motion.video
                      key="default-image"
                      src="https://res.cloudinary.com/dxo8kfpp0/video/upload/v1758616991/Hansol_zfqqis.mov"
                      loop
                      autoPlay
                      muted
                      playsInline
                      alt="Default Casino"
                      className="w-full h-[500px] object-cover"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-4 left-4 w-full h-full bg-blue-100 rounded-3xl opacity-30" />
              <div className="absolute -z-20 top-8 left-8 w-full h-full bg-blue-200 rounded-3xl opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
