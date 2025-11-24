import React from "react";
import { motion } from "framer-motion";
import { FaFileAlt, FaUserCheck, FaHandshake } from "react-icons/fa";

export default function CareerHowWeHelp() {
  const steps = [
    {
      id: 1,
      title: "Professional CV Creation",
      description:
        "We craft a polished, casino-ready CV that highlights your skills, experience, and training to stand out with recruiters.",
      icon: <FaFileAlt className="text-white" />,
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Screening & Mock Interviews",
      description:
        "We assess your table etiquette, math speed, and communication. Then we prepare you with realistic mock interviews.",
      icon: <FaUserCheck className="text-white" />,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: 3,
      title: "Referrals to Partner Casinos",
      description:
        "Gain direct referrals to our partner casinos across Nepal with prioritized interview slots for our graduates.",
      icon: <FaHandshake className="text-white" />,
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
      gradient: "from-emerald-500 to-emerald-600",
    },
  ];

  const whatsappNumber = "9779851407135";

  const onContact = () => {
    const message = `Hello! I'm interested in your career support (CV, screening, referrals). Please share details.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Career Support Program
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How We Help You Get{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hired
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            End-to-end career support—from profile building to referrals and
            placement.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24"
        >
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.id}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-16 items-center`}
              >
                <motion.div
                  variants={itemVariants}
                  className="flex-1 space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <span className="text-2xl">{step.icon}</span>
                    </motion.div>

                    <div className="flex-1 flex items-center gap-3">
                      <div className="h-1 flex-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full"></div>
                      <span className="text-5xl font-bold text-gray-100">
                        0{step.id}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {step.description}
                  </p>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className={`h-1 bg-gradient-to-r ${step.gradient} rounded-full max-w-xs`}
                  ></motion.div>
                </motion.div>

                <motion.div variants={imageVariants} className="flex-1 w-full">
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-3xl shadow-2xl group"
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300`}
                    ></div>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 flex flex-col items-center justify-center gap-6 text-center"
        >
          <div className="space-y-2">
            <p className="text-gray-900 text-xl font-semibold">
              Ready to fast-track your casino career?
            </p>
            <p className="text-gray-600">
              Get expert guidance from industry professionals
            </p>
          </div>

          <motion.button
            onClick={onContact}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center px-10 py-5 rounded-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all duration-200 shadow-xl hover:shadow-2xl group"
          >
            <span>Talk to a Career Advisor</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-2 text-xl"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
