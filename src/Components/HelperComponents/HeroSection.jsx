import React, { useState, useEffect } from "react";

export default function HeroSection({ title, subtitle, image, description }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden mx-3 md:mx-6 my-2 rounded-4xl">
        <div className="relative min-h-[70vh]">
          {/* Background Image Section with slide-down animation */}
          <div
            className={`absolute inset-0 transition-transform duration-1000 ease-out ${
              isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div
              className="relative inset-0 min-h-[90vh] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)), url(${image})`,
              }}
            ></div>
          </div>

          {/* Content Section */}
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
            <div className="max-w-7xl w-full">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Text Content with slide-up animation */}
                <div
                  className={`text-white transition-all duration-1000 ease-out delay-300 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-20 opacity-0"
                  }`}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                    <span className="text-primary">{title}</span> <br />
                  </h1>
                  <div className="text-2xl md:text-3xl mb-6">{subtitle}</div>

                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
