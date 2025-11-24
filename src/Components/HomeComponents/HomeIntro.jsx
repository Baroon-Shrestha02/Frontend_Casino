import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useIsLargeScreen } from "../../Hooks/useIsLargeScreen";

export default function HomeIntro() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimatedCards, setHasAnimatedCards] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.5 &&
          !hasAnimatedCards
        ) {
          setHasAnimatedCards(true); // Animate cards only once
        }
      },
      { threshold: [0, 0.5, 1], rootMargin: "0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimatedCards]);

  const titleWords = "Casino Training Center".split(" ");

  const CardStack = ({ isCardInView }) => {
    const isLargeScreen = useIsLargeScreen(1024);

    const cardData = [
      {
        id: 1,
        type: "video",
        src: "/uploads/home/intro1.mp4",
        alt: "Casino training",
        bgColor: "bg-gradient-to-br from-blue-500 to-purple-600",
        rotation: -8,
        x: isLargeScreen ? -80 : -40,
        y: isLargeScreen ? -140 : -120,
        zIndex: 1,
        scale: 1.05,
      },
      {
        id: 2,
        type: "image",
        src: "/uploads/main/fulllogo.jpg",
        alt: "Training demo",
        bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
        rotation: 5,
        x: isLargeScreen ? 30 : 10,
        y: isLargeScreen ? 10 : 0,
        zIndex: 4,
        scale: 0.95,
      },
      {
        id: 3,
        type: "video",
        src: "/uploads/home/intro2.mp4",
        alt: "Casino career",
        bgColor: "bg-gradient-to-br from-orange-500 to-red-500",
        rotation: -3,
        x: isLargeScreen ? 160 : 100,
        y: isLargeScreen ? 140 : 120,
        zIndex: 3,
        scale: 0.9,
      },
    ];

    const renderMedia = (card) =>
      card.type === "video" ? (
        <video
          src={card.src}
          poster={card.poster}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={card.src}
          alt={card.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      );

    return (
      <div className="relative w-80 h-80 mx-auto">
        {cardData.map((card, index) => (
          <motion.div
            key={card.id}
            className={`absolute w-64 h-48 md:h-80 rounded-2xl shadow-2xl overflow-hidden ${card.bgColor}`}
            style={{ zIndex: card.zIndex, transformOrigin: "center center" }}
            initial={{ y: 200, opacity: 0, rotate: 0, x: 0, scale: 0.8 }}
            animate={{
              y: isCardInView ? card.y : 200,
              opacity: isCardInView ? 1 : 0,
              rotate: isCardInView ? card.rotation : 0,
              x: isCardInView ? card.x : 0,
              scale: isCardInView ? card.scale : 0.8,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 80,
              delay: index * 0.2,
              duration: 1.5,
            }}
          >
            <div className="relative w-full h-full">
              {renderMedia(card)}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        ))}

        <motion.div
          className="absolute -inset-8 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isCardInView ? 1 : 0,
            opacity: isCardInView ? 1 : 0,
          }}
          transition={{
            delay: 0.8,
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="bg-seconary py-20 container mx-auto rounded-4xl px-4"
    >
      <div className="container mx-auto">
        <div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          {/* Left Text */}
          <div className="order-2 lg:order-1 flex-1 w-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left ">
            {/* Animated Title */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              {titleWords.map((word, i) => (
                <motion.h1
                  key={i}
                  className="text-[#131313] font-black text-5xl lg:text-7xl drop-shadow-2xl"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{
                    y: isLoaded ? 0 : 50,
                    opacity: isLoaded ? 1 : 0,
                  }}
                  transition={{
                    delay: i * 0.3,
                    duration: 1.1,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.h1>
              ))}
            </div>

            <motion.p
              className="text-[#131313] text-lg lg:text-xl mb-8  text-justify leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isLoaded ? 0 : 20,
                opacity: isLoaded ? 1 : 0,
              }}
              transition={{ delay: 1.5, duration: 0.9, ease: "easeOut" }}
            >
              Unlock your potential with our expert-led casino training
              programs. We equip students with practical skills, industry
              insights, and hands-on experience, transforming their passion into
              rewarding careers. Our graduates step confidently into the world
              of casinos, ready to thrive and achieve life-changing
              opportunities.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isLoaded ? 0 : 20,
                opacity: isLoaded ? 1 : 0,
              }}
              transition={{ delay: 2.0, duration: 0.9, ease: "easeOut" }}
            >
              <Link to="/about">
                <button className="px-8 py-4 bg-primary text-white text-xl font-bold rounded-2xl shadow-xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300">
                  Explore More
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Animated Cards */}
          <div className="order-1 lg:order-2 flex-1 w-full flex items-center justify-center lg:justify-end">
            <CardStack isCardInView={hasAnimatedCards} />
          </div>
        </div>
      </div>
    </section>
  );
}
