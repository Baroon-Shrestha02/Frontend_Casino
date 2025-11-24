import React, { useState } from "react";
import axios from "axios";
import api from "../../Utils/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    email: "",
    phone: "",
    description: "",
    file: null, // optional
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      file: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("course", formData.course);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("description", formData.description);
      if (formData.file) {
        data.append("file", formData.file);
      }

      // Replace with your backend endpoint
      const response = await api.post("/contact", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("Form submitted successfully!");
        setFormData({
          name: "",
          course: "",
          email: "",
          phone: "",
          description: "",
          file: null,
        });
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const courseOptions = [
    "Roulette",
    "Blackjack",
    "Poker (All Variants)",
    "Baccarat",
    "Andar Bahar",
    "Marriage (Rummy Style)",
    "Indian Flush (Teen Patti)",
    "Casino War",
    "Other",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Side */}
          <div className="relative rounded-xl overflow-hidden min-h-[600px] flex">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/uploads/contact/form1.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col justify-center items-center text-center p-8 text-white w-full">
              <h2 className="text-4xl font-bold mb-6">Submit Your Details</h2>
              <p className="text-lg leading-relaxed max-w-md">
                Fill in your details and our team will connect with you for the
                next steps.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white shadow-lg rounded-xl p-8 min-h-[600px] flex flex-col">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Fill the form
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 flex-1 flex flex-col"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Course Taken
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-white"
                >
                  <option value="">Select a course</option>
                  {courseOptions.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Description Section */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                  placeholder="Write a brief description..."
                />
              </div>

              {/* Optional File Upload */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload File (Optional)
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white"
                />
                {formData.file && (
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500">
                      Selected: {formData.file.name}
                    </p>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105 bg-primary text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
