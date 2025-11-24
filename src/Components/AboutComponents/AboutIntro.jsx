import React, { useState, useEffect, useRef } from "react";

export default function AboutIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);

  const stats = [
    { number: 1000, label: "Students Trained", suffix: "+" },
    { number: 11, label: "Years Experience", suffix: "+" },
    { number: 100, label: "Placement Support", suffix: "%" },
    { number: 10, label: "Professional Trainers", suffix: "+" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.number;
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16); // 60fps

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }

          setAnimatedStats((prev) => {
            const newStats = [...prev];
            newStats[index] = start;
            return newStats;
          });
        }, 16);

        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  const formatStatNumber = (value, index) => {
    if (index === 2) {
      // Rating stat
      return value.toFixed(1);
    }
    return Math.floor(value);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden px-6 md:px-0"
      >
        <div className="container mx-auto py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 relative transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-6 relative z-10">
                <h1
                  className={`text-4xl md:text-5xl font-bold text-gray-900 leading-tight transition-all duration-1000 delay-200 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  About{" "}
                  <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                    Casino Training Nepal
                  </span>
                </h1>

                <div
                  className={`space-y-4 text-justify transition-all duration-1000 delay-400 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Welcome to Nepal's premier casino training institute, Since
                    2014, we have been preparing aspiring dealers for
                    professional careers in Nepal and abroad. Our focus is
                    simple – practical, hands-on training so you can walk into a
                    casino and start dealing confidently from day one.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    We specialize in casino table games only, so you learn
                    exactly what employers need. Our graduates work in leading
                    casinos across Nepal, cruise ships, and resorts around the
                    world.
                  </p>
                </div>
              </div>

              {/* Stats Section */}
              <div
                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 relative z-10 transition-all duration-1000 delay-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-10 scale-95"
                }`}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  Our Achievements
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-2xl md:text-3xl font-bold text-primary transition-colors duration-300">
                        {formatStatNumber(animatedStats[index], index)}
                        {stat.suffix}
                      </div>
                      <div className="text-sm md:text-base text-gray-600 font-medium mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="h-[500px] lg:h-[700px] bg-gradient-to-br from-slate-400 via-slate-800 to-slate-900 rounded-2xl  overflow-hidden">
                <video
                  src="https://res.cloudinary.com/dxo8kfpp0/video/upload/v1758616991/Hansol_zfqqis.mov"
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-center rounded-2xl"
                ></video>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
