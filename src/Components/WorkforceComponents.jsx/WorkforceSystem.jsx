import React, { useState, useEffect, useRef } from "react";

const roles = [
  {
    id: 1,
    title: "Dealers & Table Staff",
    description:
      "Skilled in Blackjack, Roulette, Baccarat, Poker, Flush, Dragon Tiger, and other popular games. Our dealers are trained in chip handling, payouts, table etiquette, customer interaction, and maintaining smooth gameplay.",
    icon: "🎰",
  },
  {
    id: 2,
    title: "Cashiers & Cage Operations",
    description:
      "Professionals managing chips, cash transactions, secure cage operations, and accurate accounting, ensuring the integrity of your casino's financial operations.",
    icon: "💰",
  },
  {
    id: 3,
    title: "Pit Bosses & Floor Supervisors",
    description:
      "Experienced supervisors overseeing table operations, staff performance, and high-stakes games, ensuring both customer satisfaction and operational efficiency.",
    icon: "👔",
  },
  {
    id: 4,
    title: "Surveillance & Security Personnel",
    description:
      "Trained personnel monitoring table play, guest behavior, and casino premises, ensuring a safe and fair environment for players and staff alike.",
    icon: "🔒",
  },
  {
    id: 5,
    title: "Guest Relations Assistants (GRA)",
    description:
      "Friendly, professional staff dedicated to delivering an exceptional VIP experience, handling guest inquiries, and providing personalized service to ensure your patrons feel valued.",
    icon: "⭐",
  },
  {
    id: 6,
    title: "Food & Beverage (FNB) Staff",
    description:
      "Highly trained service personnel providing premium hospitality, ensuring guests enjoy seamless dining and beverage experiences within the casino.",
    icon: "🍽️",
  },
  {
    id: 7,
    title: "Housekeeping & Support Staff",
    description:
      "Organized and professional personnel maintaining cleanliness, order, and hygiene standards throughout the casino, ensuring a welcoming environment for guests and staff.",
    icon: "✨",
  },
];

export default function CasinoEcosystem() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  return (
    <div ref={sectionRef} className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Workforce Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professionally trained staff covering every aspect of casino
            operations, from gaming tables to guest services and security.
          </p>
        </div>

        {/* Featured Role - First Card Large */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="text-7xl">{roles[0].icon}</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">{roles[0].title}</h3>
                <p className="text-blue-50 text-lg leading-relaxed">
                  {roles[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout for Next Two */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {roles.slice(1, 3).map((role, index) => (
            <div
              key={role.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${(index + 1) * 150}ms`,
              }}
            >
              <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 h-full transition-all duration-300">
                <div className="text-6xl mb-4">{role.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {role.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Three Column Layout for Remaining */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.slice(3).map((role, index) => (
            <div
              key={role.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${(index + 3) * 150}ms`,
              }}
            >
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 h-full transition-all duration-300">
                <div className="text-5xl mb-4 transition-transform duration-300">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {role.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
