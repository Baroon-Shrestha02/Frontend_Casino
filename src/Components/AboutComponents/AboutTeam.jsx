import React, { useState } from "react";
import { FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function AboutTeam() {
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  const teamMembers = [
    {
      id: 0,
      name: "Rajesh Thapa",
      position: "Head of Casino Training",
      description:
        "With over 15 years of international casino experience, Rajesh leads our training programs with a deep understanding of gaming operations, dealer performance, and casino management. He is committed to mentoring students and preparing them for high-pressure, professional casino environments.",
      image: "uploads/about/team/team1.jpg",
      social: { twitter: "#", linkedin: "#", instagram: "#" },
    },
    {
      id: 1,
      name: "Sita Gurung",
      position: "Senior Roulette Trainer",
      description:
        "Sita specializes in advanced roulette dealing techniques, precision chip handling, and seamless game management. With more than a decade of hands-on casino experience, she trains students to handle real-world casino scenarios with confidence and professionalism.",
      image: "uploads/about/team/team2.jpg",
      social: { twitter: "#", linkedin: "#", instagram: "#" },
    },
    {
      id: 2,
      name: "Binod Shrestha",
      position: "Blackjack Trainer",
      description:
        "With over 10 years in professional blackjack tables, Binod provides in-depth training in dealing, table etiquette, and player interaction. He emphasizes accuracy, efficiency, and customer satisfaction, preparing students for a seamless transition to professional casino floors.",
      image: "uploads/about/team/team4.jpg",
      social: { twitter: "#", linkedin: "#", instagram: "#" },
    },
    {
      id: 3,
      name: "Priya Lama",
      position: "Baccarat & Poker Trainer",
      description:
        "Priya is an expert in baccarat and poker variants, bringing years of experience from top-tier casinos. She trains students in advanced dealing strategies, professional table etiquette, and real-time decision making to excel in competitive casino environments.",
      image: "uploads/about/team/team3.jpg",
      social: { twitter: "#", linkedin: "#", instagram: "#" },
    },
    {
      id: 4,
      name: "Anil Koirala",
      position: "Casino Operations Manager",
      description:
        "Anil oversees all practical training sessions and operational aspects of our casino programs. With extensive experience in casino management and operations, he ensures students gain authentic, hands-on experience while adhering to professional standards and industry best practices.",
      image: "uploads/about/team/team5.jpg",
      social: { twitter: "#", linkedin: "#", instagram: "#" },
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="w-24 h-1 bg-primary mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Casino Trainers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Our expert trainers bring years of real casino experience to prepare
            you for a professional career on the casino floor, teaching hands-on
            dealing, table management, and customer interaction skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Team Member Details */}
          <div className="">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              {teamMembers[activeTeamMember].name}
            </h3>
            <p className="text-xl text-gray-500 mb-6">
              {teamMembers[activeTeamMember].position}
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mb-8">
              <a
                href={teamMembers[activeTeamMember].social.twitter}
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors duration-300"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href={teamMembers[activeTeamMember].social.linkedin}
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href={teamMembers[activeTeamMember].social.instagram}
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-pink-500 transition-colors duration-300"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {teamMembers[activeTeamMember].description}
            </p>
          </div>

          {/* Right Side - Team Images */}
          <div className="relative">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={teamMembers[activeTeamMember].image}
                alt={teamMembers[activeTeamMember].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3 mt-6 overflow-x-auto pb-2">
              {teamMembers.map((member, index) => (
                <button
                  key={member.id}
                  onClick={() => setActiveTeamMember(index)}
                  className={`relative flex-shrink-0 w-20 h-30 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === activeTeamMember
                      ? "shadow-lg"
                      : "hover:scale-105 hover:shadow-md opacity-70 grayscale-100 hover:opacity-100"
                  }`}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  {index === activeTeamMember && (
                    <div className="absolute inset-0 bg-blue-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
