import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../Utils/api";

const AboutTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    loadTestimonials(6);
  }, []);

  const loadTestimonials = async (count = 6) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/testimonials`, {
        params: { limit: count },
      });
      setTestimonials(response.data.data);
      // setTotalTestimonials(
      //   Math.min(response.data.total, 30) // only count up to 30
      // );
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      const cardWidth = 320; // w-80 = 320px
      const gap = 24; // gap-6 = 24px
      const scrollPosition = index * (cardWidth + gap);
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const nextTestimonial = () => {
    const nextIndex =
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    scrollToIndex(nextIndex);
  };

  const prevTestimonial = () => {
    const prevIndex =
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  return (
    <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 py-16 px-4 mx-3 md:mx-6 rounded-3xl mb-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 flex items-center flex-col">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Hear From Our Students
          </h2>
          <p className="max-w-4xl text-base md:text-lg text-white">
            Our students share their learning experiences at Casino Training
            Nepal— from gaining confidence through hands-on practice to
            receiving career guidance and job placement support that helped them
            take the next step in their journey.
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 hidden md:block -ml-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 hidden md:block -mr-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Testimonials */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex-none w-80 bg-white rounded-2xl p-8 shadow-xl"
              >
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center mb-6">
                  <img
                    src={testimonial.profImg[0]?.url}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 ring-4 ring-red-100"
                  />
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>

                {/* Title */}
                <h4 className="font-semibold text-primary text-center mb-4 leading-tight">
                  {testimonial.title}
                </h4>

                {/* Quote */}
                <div className="relative">
                  <div className="text-4xl text-gray-300 absolute -top-2 -left-2">
                    "
                  </div>
                  <p className="text-gray-700 leading-relaxed pl-6">
                    {testimonial.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/testimonials">
            <button className="text-xl md:text-2xl text-white bg-primary px-6 py-2 mt-6 rounded-xl">
              More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutTestimonials;
