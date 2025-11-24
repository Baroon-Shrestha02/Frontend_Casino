import React, { useState, useEffect, useRef } from "react";

export default function HomeHighlights() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const highlights = [
    {
      icon: "🎰",
      title: "Learn All Casino Games",
      description:
        "Master Roulette, Blackjack, Poker, Baccarat, Flush, Andar Bahar & more",
    },
    {
      icon: "⏳",
      title: "Get Job-Ready in Weeks",
      description: "Complete 2–4 week intensive dealer training programs",
    },
    {
      icon: "🌏",
      title: "Placement Support",
      description:
        "Opportunities in Nepal, Cruise Ships, and International Casinos",
    },
  ];

  return (
    <section className="container mx-auto relative " ref={sectionRef}>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-[20vh] relative -top-20 rounded-4xl shadow-lg overflow-hidden mx-3 md:mx-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>

        <div className="relative z-10 p-8 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className={`bg-white backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="text-center">
                  <div
                    className="text-4xl mb-3 animate-bounce"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {highlight.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
