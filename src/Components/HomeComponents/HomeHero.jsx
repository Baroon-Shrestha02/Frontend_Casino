import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomeHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden mx-3 md:mx-6 mt-2 rounded-4xl">
        <div className="relative min-h-[90vh]">
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://res.cloudinary.com/dxo8kfpp0/video/upload/v1758869290/hero_yovnc6.mov"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-40"></div>

          {/* Content Section */}
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
            <div className="max-w-6xl w-full">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Text Content */}
                <div
                  className={`text-white transition-all duration-1000 ease-out delay-300 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-20 opacity-0"
                  }`}
                >
                  <div className="text-xl inline-block rounded-full">
                    Train - Deal - Succeed
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                    <span className="text-primary">Become a Professional </span>
                    Casino Dealer.
                  </h1>

                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg">
                    Nepal's #1 Casino Dealer Training Center since 2014 – Get
                    job-ready in weeks with expert training and industry
                    connections.
                  </p>
                </div>

                {/* Right Side - CTA Button */}
                <div
                  className={`flex justify-center md:justify-end transition-all duration-1000 ease-out delay-500 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-20 opacity-0"
                  }`}
                >
                  <Link to="/contact">
                    <button className="group relative bg-primary py-6 px-8 text-xl font-bold text-white rounded-2xl shadow-2xl hover:scale-105 hover:shadow-3xl">
                      <span className="relative z-10">Start Training Now</span>
                      <div className="absolute inset-0 bg-white opacity-20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
