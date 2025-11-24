import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const HomeCourses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Professional Roulette Dealing",
      subtitle:
        "European & American versions • Ball spinning • Inside & outside bets • Fast payouts",
      description:
        "Learn professional roulette dealing techniques including ball spinning, inside & outside bets, and fast payouts.",
      image: "/uploads/home/roulette.jpg",
      href: "/courses/roulette",
    },
    {
      id: 2,
      title: "Blackjack Mastery Course",
      subtitle:
        "3:2 & 6:5 Blackjack • Insurance bets • Splits & doubles • Game protection",
      description:
        "Comprehensive blackjack dealing program covering insurance bets, splits, doubles, and advanced game protection.",
      image: "/uploads/home/blackjack.jpg",
      href: "/courses/blackjack",
    },
    {
      id: 3,
      title: "Poker (All Variants)",
      subtitle:
        "Texas Hold'em, Omaha, 7-Card Stud • Pot management • Tournament dealing",
      description:
        "Master Texas Hold'em, Omaha, 7-Card Stud dealing with professional pot management and tournament skills.",
      image: "/uploads/home/poker.jpg",
      href: "/courses/poker",
    },
    {
      id: 4,
      title: "Baccarat",
      subtitle: "Punto Banco style • Banker/Player/Tie payouts • 3rd card rule",
      description:
        "Professional Baccarat dealing certification focusing on Punto Banco style and 3rd card rules.",
      image: "/uploads/home/baccarat.jpg",
      href: "/courses/baccarat",
    },
    {
      id: 5,
      title: "Indian Flush (Teen Patti)",
      subtitle: "Boot & chaal bets • Blind vs seen play • Pot management",
      description:
        "Learn the art of dealing Teen Patti with proper hand rankings, side bets, and cultural etiquette.",
      image: "/uploads/home/teen.png",
      href: "/courses/teen-patti",
    },
    {
      id: 6,
      title: "Casino War",
      subtitle: "High-card game • War & surrender handling",
      description:
        "Master high-speed casino games including Casino War, Andar Bahar, and other quick-play formats.",
      image: "/uploads/home/war.jpg",
      href: "/courses/casino-war",
    },
    {
      id: 7,
      title: "Andar Bahar",
      subtitle: "Fast-paced dealing • Andar vs Bahar payouts",
      description:
        "Master high-speed casino games including Casino War, Andar Bahar, and other quick-play formats.",
      image: "/uploads/home/andar.avif",
      href: "/courses/andar-bahar",
    },
    {
      id: 8,
      title: "Marriage (Rummy Style)",
      subtitle: "21-card dealing • Pot splits & payouts",
      description:
        "Master high-speed casino games including Casino War, Andar Bahar, and other quick-play formats.",
      image: "/uploads/home/rummy.jpeg",
      href: "/courses/marriage",
    },
  ];

  const infiniteCourses = [...courses, ...courses, ...courses];
  const getSlideWidth = () => (isMobile ? 280 : 400);
  const getSlideGap = () => (isMobile ? 16 : 32);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    if (currentIndex >= courses.length * 2 || currentIndex < courses.length) {
      setCurrentIndex(courses.length);
    }
  }, [currentIndex, courses.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentIndex(courses.length);
  }, [courses.length]);

  const handleCardClick = (href) => {
    window.location.href = href;
  };

  return (
    <div className="mx-3 md:mx-6 rounded-3xl py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs text-amber-500 uppercase tracking-[0.2em] mb-2 font-medium"
        >
          Explore Our Courses
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-white"
        >
          Learn, Grow & Achieve With Us
        </motion.h2>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.button
          onClick={prevSlide}
          disabled={isTransitioning}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-2 transition-colors duration-300 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          disabled={isTransitioning}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-2 transition-colors duration-300 disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        <div className="overflow-hidden mx-8 md:mx-16">
          <motion.div
            className="flex"
            style={{ gap: `${getSlideGap()}px` }}
            animate={{ x: -currentIndex * (getSlideWidth() + getSlideGap()) }}
            transition={
              isTransitioning
                ? { type: "spring", stiffness: 300, damping: 30 }
                : { duration: 0 }
            }
            onAnimationComplete={handleTransitionEnd}
          >
            {infiniteCourses.map((course, index) => (
              <motion.div
                key={`${course.id}-${index}`}
                className="relative flex-shrink-0 group cursor-pointer"
                style={{
                  width: `${getSlideWidth()}px`,
                  height: isMobile ? "400px" : "500px",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(course.href)}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.h3
                      className="text-lg md:text-xl font-medium mb-2"
                      initial={{ opacity: 0.9 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {course.title}
                    </motion.h3>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <AnimatePresence>
                    {!isMobile && hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-amber-900/95 via-amber-800/80 to-transparent flex flex-col justify-end p-6 text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 }}
                        >
                          <h3 className="text-2xl font-medium mb-3">
                            {course.title}
                          </h3>
                          <p className="text-sm text-white/90 mb-4 leading-relaxed">
                            {course.description}
                          </p>
                          <div className="flex items-center gap-2 text-white font-medium">
                            <span>Learn More</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {isMobile && (
            <div className="flex justify-center mt-6 gap-2">
              {courses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(courses.length + index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex % courses.length === index
                      ? "bg-amber-500 w-8"
                      : "bg-gray-500 w-2"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <motion.div
        className="flex items-center justify-center mt-8 md:mt-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a href="/courses">
          <motion.button
            className="flex items-center gap-3 justify-between text-white hover:text-amber-500 transition-colors duration-300 group"
            whileHover={{ x: 5 }}
          >
            <span className="text-lg md:text-xl">View All Courses</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </a>
      </motion.div>
    </div>
  );
};

export default HomeCourses;
