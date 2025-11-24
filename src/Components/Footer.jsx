import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CasinoFooter() {
  const handleCopyPhone = async (phone) => {
    try {
      if (!phone) return;
      await navigator.clipboard.writeText(phone);
      alert("Phone number copied to clipboard");
    } catch (error) {
      console.error("Failed to copy phone:", error);
    }
  };

  const handleOpenEmail = (email) => {
    if (!email) return;
    window.location.href = `mailto:${email}`;
  };

  const handleOpenMaps = (address) => {
    if (!address) return;
    const url = `https://maps.app.goo.gl/KjS7Rihne8H2K9u36`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const footerLinks = {
    quickLinks: [
      { name: "Home", to: "/" },
      { name: "About Us", to: "/about" },
      { name: "Careers", to: "/careers" },
      { name: "Contact", to: "/contact" },
    ],
    courses: [
      { name: "Roulette", to: "/courses/roulette" },
      { name: "Blackjack", to: "/courses/blackjack" },
      { name: "Poker (All Variants)", to: "/courses/poker" },
      { name: "Indian Flush (Teen Patti)", to: "/courses/teen-patti" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden rounded-t-4xl">
      {/* Hero Section with Image and Overlay */}
      <div className="relative h-[70vh] overflow-hidden rounded-t-4xl">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/uploads/main/footer.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay - blends image with bottom section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900"></div>

        {/* Main Headline */}
        <div className="absolute inset-0 flex items-end justify-start pl-12 z-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl">
              We can help you
              <br />
              <span className="text-yellow-300">shape your future</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Content Section - blended with image via gradient */}
      <div className="relative z-10 px-12 py-16 bg-gradient-to-b from-slate-900 to-transparent">
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Column 1: Introduction */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/uploads/main/logo2.png"
                  alt="Casino Academy"
                  className="w-12 h-12"
                />
                <h3 className="text-2xl font-bold text-yellow-300">
                  Casino Traning Nepal
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Empowering the next generation of casino professionals with
                comprehensive training programs and industry expertise.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition-colors"
                  onClick={() =>
                    handleOpenMaps(
                      "Talchikhel Gate, Satdobato, Lalitpur, Hansol Building 1st floor"
                    )
                  }
                  role="button"
                  tabIndex={0}
                  aria-label="Open address in Google Maps"
                >
                  <MapPin className="w-4 h-4 text-yellow-300" />
                  <span>
                    Talchikhel Gate, Satdobato, Lalitpur, Hansol Building 1st
                    floor
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition-colors"
                  onClick={() => handleCopyPhone("+977 985-1407135")}
                  role="button"
                  tabIndex={0}
                  aria-label="Copy phone number"
                >
                  <Phone className="w-4 h-4 text-yellow-300" />
                  <span>+977 985-1407135</span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition-colors"
                  onClick={() =>
                    handleOpenEmail("casinotrainingnepal@gmail.com")
                  }
                  role="button"
                  tabIndex={0}
                  aria-label="Send email"
                >
                  <Mail className="w-4 h-4 text-yellow-300" />
                  <span>casinotrainingnepal@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-yellow-300 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.to}
                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Course Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-yellow-300 mb-6">
              Our Courses
            </h4>
            <ul className="space-y-3">
              {footerLinks.courses.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-yellow-300 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full group-hover:scale-150 transition-transform"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-yellow-300 mb-6">
              Get Started
            </h4>
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                Ready to begin your career in the casino industry?
              </p>
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 font-bold text-sm px-6 py-3 rounded-lg hover:from-yellow-400 hover:to-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left: Company Name and Copyright */}
            <div className="text-sm text-gray-400">
              <p className="font-semibold text-white mb-1">
                Casino Traning Nepal
              </p>
              <p>&copy; 2025 Casino Traning Nepal. All rights reserved.</p>
            </div>

            {/* Right: Social Media Links */}
            {/* <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 mr-2">Follow us:</span>
              <a
                href="#"
                className="w-9 h-9 bg-slate-700 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook className="w-4 h-4 text-gray-300 group-hover:text-slate-900" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-700 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter className="w-4 h-4 text-gray-300 group-hover:text-slate-900" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-700 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 text-gray-300 group-hover:text-slate-900" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-slate-700 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 text-gray-300 group-hover:text-slate-900" />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
