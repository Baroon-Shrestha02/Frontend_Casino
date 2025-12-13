import React, { useState, useRef } from "react";
import api from "../../Utils/api";

export default function ContactForm() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    email: "",
    phone: "",
    message: "",
    files: null,
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // For phone field, only allow digits and limit to 10 digits
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, ""); // Remove non-digits
      if (digitsOnly.length <= 10) {
        setFormData({
          ...formData,
          [name]: digitsOnly,
        });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 8 || phoneDigits.length > 10) {
      setStatusMessage("❌ Phone number must be between 8 and 10 digits.");
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("course", formData.course || "Not Taken");
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("message", formData.message || "Not Provided");

      if (formData.files) data.append("files", formData.files);

      const res = await api.post("/send-mail", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setStatusMessage("✅ Form submitted successfully!");

        setFormData({
          name: "",
          course: "",
          email: "",
          phone: "",
          message: "",
          files: null,
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setStatusMessage("❌ Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("⚠️ Error submitting form. Please try later.");
    } finally {
      setLoading(false);
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
                Fill in your details and our team will connect with you soon.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white shadow-lg rounded-xl p-8 min-h-[600px] flex flex-col">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
              Fill the form
            </h3>
            <p className="text-sm text-red-600 mb-6">
              ⚠️ Please provide real information — this will be used to contact
              you later.
            </p>

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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white"
                >
                  <option value="">Select a course (optional)</option>
                  {courseOptions.map((course, idx) => (
                    <option key={idx} value={course}>
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="Enter your email"
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
                  minLength="8"
                  maxLength="10"
                  pattern="[0-9]{8,10}"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="Enter 8-10 digit phone number"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be 8-10 digits only
                </p>
              </div>

              {/* MESSAGE FIELD */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message / Description
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe about your current situation, skills, or qualifications"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 resize-none"
                ></textarea>
              </div>

              {/* FILE UPLOAD */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload File/CV
                </label>
                <input
                  type="file"
                  name="files"
                  ref={fileInputRef}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 file:bg-primary file:px-4 file:rounded-md file:text-white"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {formData.files && (
                  <p className="text-sm text-gray-600 mt-2">
                    📄 Selected: {formData.files.name}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Must Doc, Pdf or jpg only.
                </p>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-semibold text-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary text-white"
                }`}
              >
                {loading ? "Submitting..." : "Submit Form"}
              </button>

              {statusMessage && (
                <p className="text-center mt-4 text-sm text-gray-700">
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
