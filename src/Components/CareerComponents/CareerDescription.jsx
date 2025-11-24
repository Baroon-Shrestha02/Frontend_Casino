import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaUsers,
  FaCheckCircle,
  FaArrowLeft,
  FaBriefcase,
  FaCalendarAlt,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileUpload,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import api from "../../Utils/api";
import { User } from "lucide-react";

export default function CareerDescription() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        if (res.data.success) {
          setJob(res.data.findPost);
        }
      } catch (err) {
        console.error("Failed to load job:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedJobs = async () => {
      try {
        const res = await api.get(`/get-posts`);
        if (res.data.success) {
          const filtered = res.data.jobs
            .filter((post) => post._id !== id)
            .slice(0, 4);
          setRelatedJobs(filtered);
        }
      } catch (err) {
        console.error("Failed to load related jobs:", err);
      }
    };

    fetchJob();
    fetchRelatedJobs();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    setSelectedJob(null);
    setFormData({ fullName: "", email: "", phone: "", message: "" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-600 text-xl"
        >
          Job not found.
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Header Image Banner */}
      <div className=" p-3 md:px-6">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-80 md:h-[420px] overflow-hidden rounded-4xl"
        >
          <img
            src={job.image?.[0]?.url || "/fallback.jpg"}
            alt={job.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{job.title}</h1>
            <p className="flex items-center gap-2 text-lg text-white/90">
              <FaMapMarkerAlt /> {job.location} | <User /> Vacancy : 2
            </p>
          </motion.div>
        </motion.section>
      </div>

      {/* Main Content with Sidebar */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-10 font-medium transition-colors"
          >
            <FaArrowLeft /> Back to Jobs
          </Link>
        </motion.div>

        <div className="">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Single Unified Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white shadow-lg rounded-2xl p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
            >
              {/* Job Quick Info */}
              <div className="grid sm:grid-cols-3  gap-6 mb-8 pb-8 border-b border-gray-100 ">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <FaBriefcase className="text-red-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm  mb-1">Job Type</p>
                    <p className=" font-semibold">{job.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FaMoneyBillWave className="text-green-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm  mb-1">Salary</p>
                    <p className=" font-semibold">{job.salary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FaClock className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm  mb-1">Experience</p>
                    <p className=" font-semibold">{job.experience}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-">Job Description</h2>
                <p className=" leading-relaxed">{job.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 ">Highlights</h2>
                <ul className="space-y-3">
                  {job.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 ">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 ">Benefits</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className="text-red-600 mt-1 flex-shrink-0" />
                      <span className="">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deadline & Apply - Bottom Section */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-red-600 text-xl" />
                    <div>
                      <p className="text-sm ">Application Deadline</p>
                      <p className=" font-semibold">{job.deadline}</p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedJob(job)}
                    className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane /> Apply Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Apply Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Apply for Position
                  </h2>
                  <p className="text-lg text-red-600 font-semibold">
                    {selectedJob.title}
                  </p>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <FaTimes />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaUser className="inline mr-2 text-red-600" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaEnvelope className="inline mr-2 text-red-600" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaPhone className="inline mr-2 text-red-600" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="+1 234 567 8900"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">
                    Cover Letter / Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-500 focus:outline-none transition-colors resize-none"
                    rows="5"
                    placeholder="Tell us why you're a great fit for this position..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaFileUpload className="inline mr-2 text-red-600" />
                    Upload Resume (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-500 transition-colors cursor-pointer">
                    <FaFileUpload className="text-4xl text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4 justify-end mt-8 pt-6 border-t"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedJob(null)}
                    type="button"
                    className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <FaPaperPlane /> Submit Application
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto">
        <h1>Uplift your career with us</h1>
      </div>
    </>
  );
}
