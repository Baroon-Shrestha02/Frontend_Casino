import React, { useState } from "react";

const sections = [
  {
    id: 1,
    title: "Complete Coverage",
    description:
      "From dealers and pit bosses to GRAs, cage, surveillance, FNB, and housekeeping — we provide a comprehensive team for all operational needs.",
    bgImage:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
  },
  {
    id: 2,
    title: "Global Experience & Alumni Network",
    description:
      "Our graduates are already employed in top casinos worldwide, providing a reliable pool of proven talent.",
    bgImage:
      "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=800&q=80",
  },
  {
    id: 3,
    title: "Ready-to-Deploy Professionals",
    description:
      "All staff are fully trained, certified, and immediately prepared to integrate into your casino operations.",
    bgImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    id: 4,
    title: "Custom Staffing Solutions",
    description:
      "Flexible options for short-term, long-term, or permanent staffing, tailored to the specific requirements of your casino.",
    bgImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    id: 5,
    title: "Professionalism & Standards",
    description:
      "Our workforce is trained in casino etiquette, guest service, operational procedures, and security protocols, ensuring your operations are run at the highest standard.",
    bgImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
  },
];

export default function WorkforceWhyUs() {
  const [activeSection, setActiveSection] = useState(1);

  return (
    <>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 mx-6 my-8 rounded-4xl">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Us
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto italic">
            "Bring the full casino experience to life with a trained,
            professional, and dedicated workforce from Casino Training Nepal —
            your trusted partner for every role, every table, and every guest
            interaction."
          </p>
        </div>

        {/* Desktop View - Sliding Sections */}
        <div className="hidden lg:flex max-w-7xl mx-auto h-[400px] gap-2 ">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <div
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ease-in-out ${
                  isActive ? "flex-[3]" : "flex-1"
                }`}
                style={{
                  backgroundImage: `url(${section.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Gradient Overlay - Darker at bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  {/* Title - Always visible */}
                  <h3
                    className={`font-bold text-white mb-3 transition-all duration-300 ${
                      isActive
                        ? "text-3xl"
                        : "text-xl writing-mode-veical transform rotae-180"
                    }`}
                  >
                    {section.title}
                  </h3>

                  {/* Description - Only visible when active */}
                  <div
                    className={`transition-all duration-500 ${
                      isActive
                        ? "opacity-100 max-h-96 translate-y-0"
                        : "opacity-0 max-h-0 translate-y-4"
                    }`}
                  >
                    <p className="text-gray-200 text-lg leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile/Tablet View - Stacked */}
        <div className="lg:hidden max-w-3xl mx-auto space-y-4">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <div
                key={section.id}
                onClick={() => setActiveSection(isActive ? null : section.id)}
                className="relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300"
                style={{
                  backgroundImage: `url(${section.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: isActive ? "300px" : "120px",
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {section.title}
                  </h3>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isActive ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
                    }`}
                  >
                    <p className="text-gray-200 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="italic max-w-3xl text-center mx-auto my-8">
        <p className="text-center text-xl">
          “Bring the full casino experience to life with a trained,
          professional, and dedicated workforce from Casino Training Nepal —
          your trusted partner for every role, every table, and every guest
          interaction.”
        </p>
      </div>
    </>
  );
}
