import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CoursesSection(props) {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const slideUpVariant = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideRightVariant = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const slideLeftVariant = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.section
      className="container mx-auto py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariant}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Main Content (2/3 width) */}
        <div className="lg:col-span-2 bg-white">
          <div className="p-8 space-y-12">
            {/* 1. Introduction */}
            <motion.div
              variants={slideUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2
                className="text-4xl font-bold mb-6 text-gray-800"
                variants={slideRightVariant}
              >
                {props.title} <br />
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 leading-relaxed text-justify mb-4 "
                variants={slideRightVariant}
              >
                {props.para1} <br />
              </motion.p>
              <motion.div
                className="h-[40vh] rounded-3xl"
                variants={slideUpVariant}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={props.image}
                  alt=""
                  className="coverflow-hidden h-full w-full object-cover rounded-3xl"
                />
              </motion.div>
            </motion.div>

            {/* 2. Course Timeline */}
            <motion.div
              variants={slideUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3
                className="text-2xl font-bold mb-6 text-gray-800"
                variants={slideRightVariant}
              >
                Course Timeline & What You'll Learn
              </motion.h3>
              <motion.div className="space-y-6" variants={staggerVariant}>
                <motion.div
                  className="border-l-4 border-blue-500 pl-6 pb-6"
                  variants={slideRightVariant}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      1
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700">
                      Weeks 1:{" "}
                      <span className="text-primary">{props.step1}</span>
                    </h4>
                  </div>
                  <p className="text-gray-600">{props.desc1}</p>
                </motion.div>

                <motion.div
                  className="border-l-4 border-green-500 pl-6 pb-6"
                  variants={slideRightVariant}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      2
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700">
                      Weeks 2:{" "}
                      <span className="text-primary">{props.step2}</span>
                    </h4>
                  </div>
                  <p className="text-gray-600">{props.desc2}</p>
                </motion.div>

                <motion.div
                  className="border-l-4 border-purple-500 pl-6 pb-6"
                  variants={slideRightVariant}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      3
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700">
                      Weeks 3:{" "}
                      <span className="text-primary">{props.step3}</span>
                    </h4>
                  </div>
                  <p className="text-gray-600">{props.desc3}</p>
                </motion.div>

                <motion.div
                  className="border-l-4 border-orange-500 pl-6 pb-6"
                  variants={slideRightVariant}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      4
                    </div>
                    <h4 className="text-xl font-semibold text-gray-700">
                      Weeks 4:{" "}
                      <span className="text-primary">{props.step4}</span>
                    </h4>
                  </div>
                  <p className="text-gray-600">{props.desc4}</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 3. Learning Outcomes */}
            <motion.div
              variants={slideUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3
                className="text-2xl font-bold mb-6 text-gray-800"
                variants={slideRightVariant}
              >
                Learning Outcomes
              </motion.h3>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerVariant}
              >
                <motion.div
                  className="bg-blue-50 p-6 rounded-lg"
                  variants={slideUpVariant}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-lg text-blue-800 mb-3">
                    {props.learn1}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out1}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out2}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out3}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out4}
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-green-50 p-6 rounded-lg"
                  variants={slideUpVariant}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-lg text-green-800 mb-3">
                    {props.learn2}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out5}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out6}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out7}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out8}
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-purple-50 p-6 rounded-lg"
                  variants={slideUpVariant}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-lg text-purple-800 mb-3">
                    {props.learn3}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>{" "}
                      {props.out9}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out10}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out11}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out12}
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-orange-50 p-6 rounded-lg"
                  variants={slideUpVariant}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-lg text-orange-800 mb-3">
                    {props.learn4}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out13}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out14}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out15}
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {props.out6}
                    </li>
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 4. Why Choose Us */}
            <motion.div
              variants={slideUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3
                className="text-2xl font-bold mb-6 text-gray-800"
                variants={slideRightVariant}
              >
                Why Choose Our Program
              </motion.h3>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerVariant}
              >
                <motion.div
                  className="flex items-start space-x-4"
                  variants={slideRightVariant}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      10+ Years of Training Experience
                    </h4>
                    <p className="text-gray-600">
                      Benefit from over a decade of expertise in training
                      professional casino dealers.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  variants={slideLeftVariant}
                  whileHover={{ x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Real Casino Equipment
                    </h4>
                    <p className="text-gray-600">
                      Train on authentic roulette tables and casino tools to
                      gain hands-on experience.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  variants={slideRightVariant}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Small Batch Sizes
                    </h4>
                    <p className="text-gray-600">
                      Enjoy personalized attention with limited class sizes for
                      effective learning.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  variants={slideLeftVariant}
                  whileHover={{ x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-orange-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      100% Focused on Casino Dealer Skills
                    </h4>
                    <p className="text-gray-600">
                      Our curriculum is fully dedicated to developing
                      professional casino dealer expertise.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 5. Tutor */}
          </div>
        </div>

        {/* Right Side - Course Info & Other Courses (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-8">
            {/* Course Info Card */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Course Info</h3>
              </div>

              <motion.div
                className="p-6 space-y-4"
                variants={staggerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  className="flex items-center justify-between"
                  variants={slideRightVariant}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                      />
                    </svg>
                    <span className="font-medium text-gray-700">Level</span>
                  </div>
                  <span className="text-gray-900">{props.level}</span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  variants={slideRightVariant}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium text-gray-700">Duration</span>
                  </div>
                  <span className="text-gray-900">{props.duration}</span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  variants={slideRightVariant}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span className="font-medium text-gray-700">State</span>
                  </div>
                  <span className="text-green-600 font-semibold">
                    {props.state}
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center justify-between"
                  variants={slideRightVariant}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="font-medium text-gray-700">Category</span>
                  </div>
                  <span className="text-gray-900">{props.category}</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Other Courses */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className="text-xl font-bold mb-6 text-gray-800"
                variants={slideRightVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                Popular Choices
              </motion.h3>

              <motion.div
                className="space-y-4"
                variants={staggerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link to="/courses/roulette">
                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
                    variants={slideRightVariant}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src="/uploads/courses/rou.jpg"
                        alt=""
                        className="h-full w-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">Roulette</h4>
                      <p className="text-gray-600 text-sm">
                        Duration: 1.5 months
                      </p>
                    </div>
                  </motion.div>
                </Link>
                <Link to="/courses/blackjack">
                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
                    variants={slideRightVariant}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src="/uploads/courses/popblack.png"
                        alt=""
                        className="h-full w-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">Blackjack</h4>
                      <p className="text-gray-600 text-sm">
                        Duration: 2 months
                      </p>
                    </div>
                  </motion.div>
                </Link>
                <Link to="/courses/poker">
                  <motion.div
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
                    variants={slideRightVariant}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src="/uploads/courses/info/poker2.jpeg"
                        alt=""
                        className="h-full w-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        Poker (All Variants)
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Duration: 2 months
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
