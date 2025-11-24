import React from "react";
import { Quote } from "lucide-react";

export default function AboutDirector() {
  return (
    <div className=" container mx-auto min-h-screen my-12 px-4 md:px-8">
      {/* Title Section */}
      <div className="text-center mb-12">
        <div className="w-24 h-1 bg-blue-600 mb-6 mx-auto"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Hear from Our Director
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          A message from our experienced director who has dedicated years to
          shaping the future of casino professionals.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Sticky Image */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24 lg:h-fit">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 blur-2xl"></div>
              <img
                src="uploads/about/team/team1.jpg"
                alt="director"
                className="relative rounded-xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Director's Name
              </h3>
              <p className="text-gray-600 mt-2">Founder & Director</p>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                With over 20 years of experience in the casino industry, our
                director brings unparalleled expertise and dedication to
                training the next generation of professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable Content */}
        <div className="w-full lg:w-1/2">
          <div className="space-y-6">
            {/* Introduction Card */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Welcome to our academy. For over two decades, I've witnessed
                  the transformation of the casino industry from traditional
                  gaming floors to sophisticated entertainment destinations.
                  This evolution has created unprecedented opportunities for
                  skilled professionals who understand both the art and science
                  of casino operations.
                </p>

                <p className="text-lg">
                  Our mission extends beyond teaching technical skills. We
                  cultivate professionalism, integrity, and excellence in every
                  student who walks through our doors. The casino industry
                  demands individuals who can think critically, maintain
                  composure under pressure, and deliver exceptional service
                  consistently. These are the qualities we instill in our
                  comprehensive training programs.
                </p>

                <p className="text-lg">
                  What sets us apart is our commitment to practical, hands-on
                  learning. Our state-of-the-art facilities replicate real
                  casino environments, allowing students to practice and perfect
                  their skills before entering the workforce. We maintain strong
                  partnerships with leading casinos, ensuring our curriculum
                  stays current with industry standards and trends.
                </p>

                <p className="text-lg">
                  Every student brings unique potential to our academy. Whether
                  you're starting your career or seeking advancement, we provide
                  personalized guidance and mentorship throughout your journey.
                  Our graduates don't just find jobs—they build lasting careers
                  in one of the world's most dynamic industries.
                </p>
              </div>
            </div>

            {/* Quote Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-lg border border-blue-100">
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-16 h-16 text-blue-600 opacity-20" />
                <blockquote className="relative pl-8">
                  <p className="text-xl md:text-2xl font-semibold text-gray-900 italic mb-6 leading-relaxed">
                    "Excellence is not a destination, it's a continuous journey.
                    In the casino industry, your reputation is built one
                    interaction at a time, one game at a time, one satisfied
                    guest at a time."
                  </p>
                  <footer className="flex items-center gap-4 pt-6 border-t border-blue-200">
                    <div className="w-12 h-0.5 bg-blue-600"></div>
                    <div>
                      <p className="font-bold text-gray-900">Director's Name</p>
                      <p className="text-sm text-gray-600">
                        Founder & Director
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                <p className="text-gray-900 font-semibold">Years Experience</p>
                <p className="text-sm text-gray-600 mt-2">
                  In casino management and professional training
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  500+
                </div>
                <p className="text-gray-900 font-semibold">Students Trained</p>
                <p className="text-sm text-gray-600 mt-2">
                  Successfully placed in top casinos worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
