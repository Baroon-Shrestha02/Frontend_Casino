import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Questionss() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      number: "01",
      question: "Which countries can KBM help me apply to?",
      subtitle: "Study abroad options",
      answer:
        "KBM Education Consultancy provides guidance for students and professionals who want to study or work in Japan, USA, Australia, UK, Canada, and other countries.",
    },
    {
      number: "02",
      question: "What visa types does KBM assist with?",
      subtitle: "Visa guidance",
      answer:
        "We assist with student visas, SSW, TITP, work permits, and other relevant visa categories depending on the destination country.",
    },
    {
      number: "03",
      question: "How long does the application process take?",
      subtitle: "Timeline info",
      answer:
        "The timeline depends on the country, visa type, and completeness of documents, but our team ensures you stay on track every step of the way.",
    },
    {
      number: "04",
      question: "Do you provide pre-departure training?",
      subtitle: "Preparation support",
      answer:
        "Yes! KBM provides comprehensive pre-departure sessions, including cultural adaptation, communication tips, and career guidance.",
    },
    {
      number: "05",
      question: "Is the consultancy only for students?",
      subtitle: "Eligibility",
      answer:
        "No, we also support working professionals seeking international career opportunities and specialized visa programs.",
    },
    {
      number: "06",
      question: "Can you help with university selection?",
      subtitle: "University guidance",
      answer:
        "Absolutely! We help students choose universities and programs that match their academic background, career goals, and budget.",
    },
    {
      number: "07",
      question: "Do you provide document verification?",
      subtitle: "Document assistance",
      answer:
        "Yes, our team reviews and verifies all required documents to reduce chances of visa rejection or application delays.",
    },
    {
      number: "08",
      question: "What is the cost of your services?",
      subtitle: "Fees and charges",
      answer:
        "KBM Education Consultancy offers transparent pricing. Costs vary depending on the country, visa type, and level of service required.",
    },
    {
      number: "09",
      question: "Do you offer online consultations?",
      subtitle: "Remote support",
      answer:
        "Yes, we provide consultations via Zoom or other platforms for students who cannot visit our office in person.",
    },
    {
      number: "10",
      question: "Can I track my application progress?",
      subtitle: "Application tracking",
      answer:
        "We provide regular updates and a dedicated point of contact to ensure you know exactly where your application stands.",
    },
    {
      number: "11",
      question: "Do you help with scholarships?",
      subtitle: "Financial aid guidance",
      answer:
        "Yes! KBM provides guidance on scholarship opportunities, eligibility, and application strategies to reduce financial burden.",
    },
    {
      number: "12",
      question: "What if my visa is rejected?",
      subtitle: "Visa support",
      answer:
        "We review rejected applications, provide feedback, and help you reapply with stronger documentation and guidance.",
    },
    {
      number: "13",
      question: "Do you offer career counseling?",
      subtitle: "Career support",
      answer:
        "Yes, our team provides career advice to help students and professionals align their international studies with future job opportunities.",
    },
    {
      number: "14",
      question: "Are your services personalized?",
      subtitle: "Tailored guidance",
      answer:
        "Every student receives personalized support based on their goals, background, and the specific country they are targeting.",
    },
    {
      number: "15",
      question: "How do I start my application with KBM?",
      subtitle: "Getting started",
      answer:
        "You can reach out via our website, email, or visit our office. Our team will schedule a consultation and guide you through the first steps.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen my-12 px-4 md:px-8">
      <div className="flex flex-col lg:flex-row">
        {/* Title Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white lg:sticky lg:top-0 lg:h-screen mb-8 lg:mb-0">
          <div className="max-w-md p-4 md:p-8 text-center lg:text-left">
            <div className="relative">
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  See Answer to Your Queries
                </h1>
                <p className="text-gray-600 text-base md:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                  incidunt, culpa, corrupti neque, nisi quidem atque consectetur
                  quo eveniet sit aut soluta cumque reprehenderit dolore
                  ratione.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="w-full lg:w-1/2">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
                  >
                    <div className="flex items-start gap-4 text-left flex-1">
                      {/* Number */}
                      <div className="text-text font-extrabold text-2xl">
                        {faq.number}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">
                          {faq.question}
                        </h3>
                        <p className="text-gray-500 text-sm">{faq.subtitle}</p>
                      </div>
                    </div>

                    {/* Toggle Icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 ml-4"
                    >
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </motion.div>
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.3, ease: "easeOut" },
                            opacity: { duration: 0.2, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.2, ease: "easeIn" },
                            opacity: { duration: 0.1 },
                          },
                        }}
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className="p-6 pl-20">
                          <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
