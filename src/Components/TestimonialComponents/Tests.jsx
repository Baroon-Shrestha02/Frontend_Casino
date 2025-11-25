import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react";
import TestimonialsForm from "../Forms/TestimonialsForm";
import api from "../../Utils/api";
import { selectUser } from "../../Redux/Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Tests() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [totalTestimonials, setTotalTestimonials] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const admin = user?.role;

  useEffect(() => {
    loadTestimonials(6);
  }, []);

  const loadTestimonials = async (count = 6) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/testimonials`, {
        params: { limit: count },
      });
      setTestimonials(response.data.data);
      setTotalTestimonials(
        Math.min(response.data.total, 30) // only count up to 30
      );
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const newCount = visibleCount + 6;
    setVisibleCount(newCount);
    loadTestimonials(newCount);
  };

  const handleDeleteClick = (testimonial) => {
    setDeleteConfirm(testimonial);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    setIsDeleting(true);
    try {
      await api.delete(`/delete/${deleteConfirm._id}`, {
        withCredentials: true,
      });

      setTestimonials((prev) =>
        prev.filter((t) => t._id !== deleteConfirm._id)
      );
      setTotalTestimonials((prev) => prev - 1);

      // Close dialog
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-2 text-white">
            What Our Students Say
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Real experiences from students who aced their tests
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial._id}-${index}`}
              variants={item}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-gray-600 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl" />

              {admin === "admin" && (
                <div className="absolute bg-gradient-to-t from-white/30 to-white bottom-0 left-0 right-0 p-2 z-49  flex justify-center rounded-b-2xl">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteClick(testimonial)}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-colors z-10"
                    title="Delete testimonial"
                  >
                    <Trash2 className="w-4 h-4 inline-block mr-1" />
                    Delete
                  </motion.button>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    src={testimonial.profImg?.[0]?.url}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-gray-600 transition-colors"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-600 text-lg group-hover:text-slate-700 transition-colors">
                      {testimonial.name}
                    </h3>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </motion.svg>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 text-gray-700 group-hover:text-gray-600 transition-colors">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                  {testimonial.description}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {totalTestimonials > 6 && testimonials.length < totalTestimonials && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Loading...</span>
                </>
              ) : (
                <span>Load More Stories</span>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Showing count indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 mt-6 text-sm"
        >
          Showing {testimonials.length} of {totalTestimonials} testimonials
        </motion.p>
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleDeleteCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            >
              {/* Close button */}
              <button
                onClick={handleDeleteCancel}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Delete Testimonial?
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Are you sure you want to delete the testimonial from{" "}
                <span className="font-semibold">{deleteConfirm.name}</span>?
                This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteCancel}
                  disabled={isDeleting}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete</span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TestimonialsForm />
    </>
  );
}
