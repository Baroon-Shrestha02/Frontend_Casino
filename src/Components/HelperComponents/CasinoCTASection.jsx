// components/CasinoCTASection.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function CasinoCTASection({
  videoSrc,
  imageSrc,
  heading,
  highlight,
  subheading,
  description,
  buttonText,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2, rootMargin: "100px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] overflow-hidden flex items-center justify-center rounded-3xl"
    >
      {/* Background Container - Fixed positioning issue */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={imageSrc}
          alt="Background"
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-3xl ${
            videoSrc ? "z-[-1]" : "z-0"
          }`}
          style={{
            minHeight: "100%",
            minWidth: "100%",
          }}
          onError={(e) => {
            console.error("Image failed to load:", imageSrc);
            // Set a fallback background color
            e.target.parentElement.style.background =
              "linear-gradient(135deg, #1a1a1a, #2d2d2d)";
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Limited Seats Available
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {heading}
            {highlight && (
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                {highlight}
              </span>
            )}
          </h2>

          {/* Subheading */}
          {subheading && (
            <p className="text-xl md:text-2xl text-gray-200 mb-8 font-medium">
              {subheading}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* CTA Button */}
          {buttonText && (
            <div
              className={`transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <Link to="/contact">
                <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl px-12 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10">{buttonText}</span>
                  <div className="relative z-10 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </button>
              </Link>
            </div>
          )}

          {/* Trust Indicators */}
          <div
            className={`mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>2-4 Week Training</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span>100% Job Placement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>International Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent z-10" />
    </section>
  );
}
