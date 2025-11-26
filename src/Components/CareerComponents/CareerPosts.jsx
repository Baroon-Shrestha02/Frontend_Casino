import React, { useState, useEffect, useRef } from "react";
import {
  FaBriefcase,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaArrowRight,
  FaTimes,
  FaUsers,
  FaStar,
  FaGraduationCap,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileUpload,
  FaPaperPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../Utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slices/UserSlice";
import { Plus } from "lucide-react";

export default function CareerPosts() {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [selectedJob, setSelectedJob] = useState(null);
  const observerRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    files: null,
  });

  const user = useSelector(selectUser);
  const admin = user?.role;

  const [jobs, setJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/get-posts");

        if (response.data.success) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Enhanced Intersection Observer that properly handles newly loaded cards
  useEffect(() => {
    if (!jobs.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.cardId;
            setVisibleCards((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    // Observe all cards within the visible range
    const cardsToObserve = document.querySelectorAll("[data-card-id]");
    cardsToObserve.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [jobs, visibleCount]); // Added visibleCount as dependency

  const openModal = (job) => {
    setSelectedJob(job);
    document.body.style.overflow = "auto";
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("name", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("message", formData.message);
      fd.append("jobTitle", selectedJob?.title);
      fd.append("jobId", selectedJob?._id);

      if (formData.files) {
        fd.append("file", formData.files);
      }

      await api.post("/send-mail", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Application sent successfully!");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        files: null,
      });

      setSelectedJob(null);
    } catch (error) {
      console.error("Error sending application:", error);
      alert("Failed to send application. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoadMore = () => {
    setIsLoading(true);

    // Simulate loading state for smooth UX
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoading(false);

      // Smooth scroll to the new content after a brief delay
      setTimeout(() => {
        if (loadMoreRef.current) {
          loadMoreRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }, 100);
    }, 300);
  };

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-3xl shadow-lg border border-gray-200 h-[420px]">
      <div className="h-64 bg-gray-200 rounded-t-3xl"></div>
      <div className="p-8 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  // Get the currently visible jobs
  const visibleJobs = jobs.slice(0, visibleCount);
  const hasMoreJobs = visibleCount < jobs.length;

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/30 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/20 rounded-full translate-y-40 -translate-x-40"></div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
              Career <span className="text-primary">Opportunities</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Join our team and build an exciting career in the gaming industry
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
          </div>

          {admin && (
            <Link to="/add-post">
              <button className="cursor-pointer flex items-center mb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-2 px-4 rounded-lg">
                <Plus />
                <span>Add Posts</span>
              </button>
            </Link>
          )}

          {/* Cards Grid */}
          <div className="grid gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {jobs.length === 0
              ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              : visibleJobs.map((job, index) => {
                  // Calculate delay based on position in current batch
                  const batchIndex = index % 6; // Reset every 6 items
                  const row = Math.floor(batchIndex / 3);
                  const delay = batchIndex * 150;

                  return (
                    <div
                      key={job._id}
                      data-card-id={job._id}
                      className={`group cursor-default transform transition-all duration-500 ${
                        visibleCards.has(job._id)
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                      style={{
                        transitionDelay: visibleCards.has(job._id)
                          ? `${delay}ms`
                          : "0ms",
                      }}
                    >
                      <article className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100 hover:border-red-200 transform hover:-translate-y-2">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={job?.image?.[0]?.url || "/fallback.jpg"}
                            alt={job.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          <div className="absolute top-4 right-4">
                            <span className="bg-white/95 text-primary px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                              {job.type}
                            </span>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-white text-2xl font-bold mb-2 leading-tight">
                              {job.title}
                            </h3>
                            <div className="flex items-center text-white/90 text-sm">
                              <FaMapMarkerAlt className="mr-2" />
                              {job.location}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1 flex flex-col">
                          <div className="space-y-3 mb-8 flex-1">
                            <h4 className="font-semibold text-gray-800 text-lg mb-4">
                              Key Requirements
                            </h4>

                            {job.requirements.map((point, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-3 hover:border-red-200 transition-colors duration-200"
                              >
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-3"></div>
                                <span className="text-gray-700 leading-relaxed">
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="text-red-600 flex items-start gap-3 md:gap-0 md:flex-col mb-3">
                            <div className="text-slate-700">
                              Application Deadline:
                            </div>
                            <div>{job.deadline}</div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Link
                              to={`/careers/${job._id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl text-center transition-all duration-300 flex items-center justify-center gap-2"
                            >
                              View Details
                              <FaArrowRight />
                            </Link>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal(job);
                              }}
                              className="bg-primary text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                            >
                              Apply
                            </button>
                          </div>

                          {/* Delete Button for Admin */}
                          {admin && (
                            <button
                              onClick={async () => {
                                try {
                                  if (
                                    !window.confirm(
                                      "Are you sure you want to delete this post?"
                                    )
                                  )
                                    return;

                                  await api.delete(`/delete-posts/${job._id}`);

                                  setJobs((prev) =>
                                    prev.filter((p) => p._id !== job._id)
                                  );
                                } catch (err) {
                                  console.error("Delete failed:", err);
                                }
                              }}
                              className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-all duration-300 shadow-md"
                            >
                              Delete Post
                            </button>
                          )}
                        </div>
                      </article>
                    </div>
                  );
                })}
          </div>

          {/* Load More Section */}
          <div ref={loadMoreRef} className="text-center mt-16 space-y-6">
            {hasMoreJobs && (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className={`
                    group relative overflow-hidden
                    bg-gradient-to-r from-red-600 to-red-700 
                    hover:from-red-700 hover:to-red-800
                    text-white py-4 px-10 rounded-xl text-lg font-semibold 
                    transition-all duration-300 shadow-lg hover:shadow-xl
                    transform hover:-translate-y-1
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    flex items-center gap-3
                  `}
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>View More Opportunities</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>

                <p className="text-gray-500 text-sm">
                  Showing {visibleCount} of {jobs.length} positions
                </p>
              </div>
            )}

            {!hasMoreJobs && jobs.length > 6 && (
              <div className="py-4">
                <p className="text-gray-600 text-lg font-medium mb-2">
                  You've viewed all available positions
                </p>
                <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
              </div>
            )}

            <div className="pt-8 border-t border-gray-200 mt-8">
              <p className="text-gray-600 mb-4 text-lg">
                Don't see the right position? We're always looking for talented
                individuals.
              </p>
              <Link to="/contact">
                <button className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-lg transition-colors">
                  Get in touch <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-[6px] z-50 flex items-center justify-center p-4 transition-all"
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

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    id="resumeUpload"
                    name="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div
                    onClick={() =>
                      document.getElementById("resumeUpload").click()
                    }
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-500 transition-colors cursor-pointer"
                  >
                    <FaFileUpload className="text-4xl text-gray-400 mx-auto mb-2" />

                    {formData.files ? (
                      <p className="text-gray-700 font-medium">
                        {formData.files.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </>
                    )}
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
                    disabled={submitting}
                    className={`px-8 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all
                      ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }
                    `}
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <>
                        <FaPaperPlane /> Submit Application
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
