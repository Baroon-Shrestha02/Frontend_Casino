import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  TimerIcon,
} from "lucide-react";
import React from "react";
import { BsWhatsapp } from "react-icons/bs";

export default function ContactVisit() {
  const interactiveTitles = new Set(["Address", "Phone", "Email"]);

  const handleCardClick = async (item) => {
    try {
      if (item.title === "Phone") {
        const phone = item.details?.[0] || "";
        if (phone) {
          await navigator.clipboard.writeText(phone);
          alert("Phone number copied to clipboard");
        }
        return;
      }
      if (item.title === "Email") {
        const email = item.details?.[0] || "";
        if (email) {
          window.location.href = `mailto:${email}`;
        }
        return;
      }
      if (item.title === "Address") {
        const address = item.details?.[0] || "";
        if (address) {
          const mapsUrl = `https://maps.app.goo.gl/KjS7Rihne8H2K9u36`;
          window.open(mapsUrl, "_blank", "noopener,noreferrer");
        }
      }
    } catch (error) {
      console.error("Interaction failed:", error);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin />,
      title: "Address",
      details: [
        "Talchikhel Gate, Satdobato, Lalitpur, Hansol Building 1st floor",
      ],
    },
    {
      icon: <Phone />,
      title: "Phone",
      details: ["+977 985-1407135"],
    },
    {
      icon: <Mail />,
      title: "Email",
      details: ["casinotrainingnepal@gmail.com"],
    },
    {
      icon: <TimerIcon />,
      title: "Office Hours",
      details: ["Sunday - Friday: 9:00 AM - 5:00 PM", "Saturday: Closed"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Visit Us in Person
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to meet you in person. Drop by our office or get in touch
            with us using the contact information below.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Contact Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-8">
                Whether you have questions about our courses, need technical
                support, or want to discuss partnership opportunities, we're
                here to help.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    interactiveTitles.has(item.title) && handleCardClick(item)
                  }
                  role={
                    interactiveTitles.has(item.title) ? "button" : undefined
                  }
                  tabIndex={interactiveTitles.has(item.title) ? 0 : undefined}
                  aria-label={
                    interactiveTitles.has(item.title)
                      ? `${item.title} - click to interact`
                      : undefined
                  }
                  className={`flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors ${
                    interactiveTitles.has(item.title) ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <div className="space-y-1">
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook />
                </a>

                <a
                  href="#"
                  className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <Instagram />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <BsWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Embedded Map */}
          <div className="lg:pl-8">
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg h-full min-h-[600px]">
              {/* Replace this iframe with your actual Google Maps embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.97093706996!2d85.31923819065544!3d27.659788289475983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cde03059fb%3A0xa3234286380fc73f!2sHANSOL%20Learning%20Center%20Pvt.%20Ltd.!5e1!3m2!1sen!2snp!4v1758878117656!5m2!1sen!2snp"
                width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Office Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
