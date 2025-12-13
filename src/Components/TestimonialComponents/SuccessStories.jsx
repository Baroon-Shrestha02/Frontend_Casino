import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react";
import api from "../../Utils/api";
import SuccessStoriesForm from "../Forms/SuccessStoriesForm";
import { selectUser } from "../../Redux/Slices/UserSlice";
import { useSelector } from "react-redux";

export default function SuccessStories() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [successStories, setSuccessStories] = useState([]);
  const [totalStories, setTotalStories] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const user = useSelector(selectUser);
  const admin = user?.role;

  // Initial data load
  useEffect(() => {
    loadSuccessStories(8);
  }, []);

  // Real API call
  const loadSuccessStories = async (count) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/success-stories`, {
        params: { limit: count },
      });
      setSuccessStories(response.data.data);
      setTotalStories(response.data.total);
    } catch (error) {
      console.error("Error fetching success stories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const newCount = visibleCount + 8;
    setVisibleCount(newCount);
    loadSuccessStories(newCount);
  };

  const handleDeleteClick = (story) => {
    setDeleteConfirm(story);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    setIsDeleting(true);
    try {
      await api.delete(`/success-stories/delete/${deleteConfirm._id}`, {
        withCredentials: true,
      });

      setSuccessStories((prev) =>
        prev.filter((s) => s._id !== deleteConfirm._id)
      );
      setTotalStories((prev) => prev - 1);

      // Close dialog
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting success story:", error);
      alert("Failed to delete success story. Please try again.");
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
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center mb-2 text-white">
          Success Stories
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Meet the achievers who landed their dream jobs
        </p>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        key={`success-stories-grid-${successStories.length}`}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {successStories.map((story, index) => (
          <motion.div
            key={`${story._id || story.id}-${index}`}
            variants={item}
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative"
          >
            {/* Poster Image with Overlay */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                src={story.posterImage?.[0]?.url || story.posterImage}
                alt={`${story.name} success story`}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Company Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <p className="text-xs font-bold text-gray-800">
                  {story.company}
                </p>
              </motion.div>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1, rotate: 0 }}
                className="absolute top-3 right-3 bg-green-500 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="p-4 flex items-start gap-3 bg-gradient-to-br from-gray-50 to-white">
              <motion.img
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                src={story.profileImage?.[0]?.url || story.profileImage}
                alt={story.name}
                className="w-12 h-12 rounded-full border-3 border-white shadow-md flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all object-cover aspect-square"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors text-base">
                  {story.name}
                </h3>
                <p className="text-sm text-blue-600 font-semibold truncate mt-0.5 flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  {story.company}
                </p>
                <p className="text-sm text-gray-600 truncate mt-0.5">
                  {story.role}
                </p>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-100/50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Admin Delete Button */}
            {admin === "admin" && (
              <div className="absolute bg-gradient-to-t from-white/30 to-white bottom-0 left-0 right-0 p-2 z-49 flex justify-center rounded-b-2xl">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteClick(story)}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-colors z-10"
                  title="Delete success story"
                >
                  <Trash2 className="w-4 h-4 inline-block mr-1" />
                  Delete
                </motion.button>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
      {/* Load More Button */}
      {successStories.length < totalStories && (
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
              <>
                <span>Load More Success Stories</span>
              </>
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
        Showing {successStories.length} of {totalStories} success stories
      </motion.p>

      {admin === "admin" && <SuccessStoriesForm />}

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
                Delete Success Story?
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Are you sure you want to delete the success story from{" "}
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
    </div>
  );
}
