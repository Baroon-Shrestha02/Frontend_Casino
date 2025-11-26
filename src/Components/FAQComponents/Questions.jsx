import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Questionss() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      number: "01",
      question: "What does a casino dealer actually do?",
      subtitle: "Role & Duties",
      answer:
        "A casino dealer operates the game—handling cards, chips, bets, payouts, and ensuring the game runs smoothly while maintaining professionalism at the table.",
    },
    {
      number: "02",
      question: "Do dealers gamble or use their own money?",
      subtitle: "Common concern",
      answer:
        "No. Dealers never gamble or use their own money. They only manage the game for players.",
    },
    {
      number: "03",
      question: "Do I need prior casino knowledge or experience?",
      subtitle: "Eligibility",
      answer:
        "No experience is required. We train students from zero, even if they have never been inside a casino before.",
    },
    {
      number: "04",
      question: "Is this job suitable for women?",
      subtitle: "Female applicants",
      answer:
        "Yes! Female dealers are highly sought after in the gaming industry and have excellent career prospects.",
    },
    {
      number: "05",
      question: "How long is the training period?",
      subtitle: "Training duration",
      answer:
        "Basic training usually lasts 2–4 weeks, while professional-level training may take 1–2 months depending on skills and game types.",
    },
    {
      number: "06",
      question: "What games will I learn during training?",
      subtitle: "Game knowledge",
      answer:
        "Students are trained in Roulette, Blackjack, Baccarat, 3 Card Poker, Flush, Poker, and other major casino table games.",
    },
    {
      number: "07",
      question: "What skills are required to become a dealer?",
      subtitle: "Skill requirements",
      answer:
        "Basic math, communication skills, confidence, discipline, and presentability are key requirements.",
    },
    {
      number: "08",
      question: "Do dealers need to be good at math?",
      subtitle: "Math requirement",
      answer:
        "Only basic arithmetic is needed. Complex calculations are not required.",
    },
    {
      number: "09",
      question: "Do dealers handle real cash?",
      subtitle: "Money handling",
      answer:
        "Dealers work with gaming chips at the table. Cash transactions are handled at the cashier counter.",
    },
    {
      number: "10",
      question: "Where can I find a job after completing training?",
      subtitle: "Job placement",
      answer:
        "Job opportunities are available in Nepal, India, and various international destinations depending on eligibility and casino requirements.",
    },
    {
      number: "11",
      question: "What documents are required for enrollment?",
      subtitle: "Required documents",
      answer:
        "Applicants typically need a CV, citizenship or passport, academic certificates, and a police clearance certificate.",
    },
    {
      number: "12",
      question: "How much salary can I expect as a beginner?",
      subtitle: "Salary expectations",
      answer:
        "Salary varies by country and casino. Dealers earn a base salary plus tips or service charges depending on the workplace.",
    },
    {
      number: "13",
      question: "Is there career growth in casino dealing?",
      subtitle: "Career path",
      answer:
        "Yes. You can grow from dealer to senior dealer, inspector, pit boss, supervisor, gaming manager, or even trainer.",
    },
    {
      number: "14",
      question: "Is casino work legal and safe?",
      subtitle: "Safety & legality",
      answer:
        "Yes, we work only with licensed and regulated casinos to ensure a safe and legal work environment.",
    },
    {
      number: "15",
      question: "Will I be trained in communication and etiquette?",
      subtitle: "Soft skills training",
      answer:
        "Yes. We provide grooming, communication, customer handling, and table etiquette training as part of the program.",
    },
    {
      number: "16",
      question: "I’m shy or introverted. Is this a problem?",
      subtitle: "Personality concerns",
      answer:
        "Not at all. Many trainees start shy—confidence naturally improves through practice and hands-on training.",
    },
    {
      number: "17",
      question: "Is English required for this job?",
      subtitle: "Language requirement",
      answer:
        "Basic conversational English helps, but it is not compulsory for every casino or job location.",
    },
    {
      number: "18",
      question: "Do I need a uniform or special equipment?",
      subtitle: "Uniform details",
      answer:
        "No. Casinos generally provide uniforms and the necessary accessories.",
    },
    {
      number: "19",
      question: "What is the age limit for becoming a dealer?",
      subtitle: "Age eligibility",
      answer:
        "Most casinos accept applicants between 18 and 35 years old, depending on country rules.",
    },
    {
      number: "20",
      question: "Do you guarantee job placement?",
      subtitle: "Placement guarantee",
      answer:
        "We cannot legally guarantee jobs, but our placement rate is extremely high for committed and disciplined trainees.",
    },
    {
      number: "21",
      question: "What makes your casino training institute different?",
      subtitle: "Why choose us?",
      answer:
        "We offer hands-on training, real-table simulation, expert instructors, strong casino connections, and personalized career guidance.",
    },
    {
      number: "22",
      question: "How do I enroll in the training program?",
      subtitle: "Enrollment process",
      answer:
        "Simply contact us—our team will guide you through admission, training, and placement step by step.",
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
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Find Answers to Your Casino Training Questions
                </h1>
                <p className="text-gray-600 text-base md:text-lg">
                  Get clear and reliable information about casino dealer
                  training, job placement, requirements, salary, and career
                  growth. Everything you need to know is answered here in simple
                  detail.
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
