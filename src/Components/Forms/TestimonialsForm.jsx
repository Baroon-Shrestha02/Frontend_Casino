import axios from "axios";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../Utils/api";

export default function TestimonialsForm() {
  const [formData, setFormData] = useState({
    name: "",
    profImg: null,
    rating: 0,
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("description", formData.description);

      if (formData.profImg) {
        formDataToSend.append("profImg", formData.profImg);
      }

      // ✅ Axios POST request
      const response = await api.post("/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);

      setSubmitSuccess(true);
      setFormData({ name: "", profImg: null, rating: 0, description: "" });
      setImagePreview(null);
      setErrors({});

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Failed to submit review. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profImg: "Image size must be less than 5MB",
        }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          profImg: "Please upload a valid image file",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, profImg: file }));
      setImagePreview(URL.createObjectURL(file));

      if (errors.profImg) {
        setErrors((prev) => ({ ...prev, profImg: "" }));
      }
    }
  };

  const handleStarClick = (star) => {
    setFormData((prev) => ({ ...prev, rating: star }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white max-w-7xl mx-auto rounded-3xl py-12 px-4 sm:px-6 lg:px-8 my-8 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Info */}
        <div className="flex items-center flex-col justify-center gap-6 text-center lg:text-left px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight">
              Review Your Experience
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg text-base sm:text-lg text-gray-300 leading-relaxed"
          >
            Your feedback helps us improve and assists others in making informed
            decisions. Share your honest thoughts and experiences with our
            community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-8 mt-4"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">4.8 ⭐️</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">2.5K+</div>
              <div className="text-sm text-gray-400">Reviews</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">⭐️</span>
            Share Your Review
          </h2>

          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-green-800 font-medium flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  Review submitted successfully!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-800 font-medium">{errors.submit}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-5">
            {/* Name Field */}
            <motion.div
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Profile Image Upload */}
            <motion.div
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Image (Optional)
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all text-gray-900 ${
                      errors.profImg ? "border-red-500" : "border-gray-200"
                    } hover:border-blue-400 flex items-center justify-center`}
                  >
                    <span className="text-gray-600">
                      {formData.profImg
                        ? formData.profImg.name
                        : "Choose image..."}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, profImg: null }));
                        setImagePreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {errors.profImg && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.profImg}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Rating *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    {star <= (hoveredStar || formData.rating) ? (
                      <span className="text-yellow-400 drop-shadow-lg">⭐</span>
                    ) : (
                      <span className="text-gray-300">☆</span>
                    )}
                  </motion.button>
                ))}
                <AnimatePresence>
                  {formData.rating > 0 && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-2 text-sm text-gray-600 self-center"
                    >
                      ({formData.rating}/5)
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {errors.rating && (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.rating}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Description */}
            <motion.div
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Share your experience with us..."
                rows="4"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400 resize-none ${
                  errors.description ? "border-red-500" : "border-gray-200"
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                <AnimatePresence mode="wait">
                  {errors.description ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: [0, -5, 5, -5, 5, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-red-600"
                    >
                      {errors.description}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="count"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-gray-500"
                    >
                      {formData.description.length} characters
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              transition={{ duration: 0.2 }}
              className={`w-full bg-primary -to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
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
                  </motion.svg>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
