import React, { useState, useRef } from "react";
import api from "../../Utils/api";

export default function CareerCV() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    email: "",
    phone: "",
    message: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("course", formData.course || "Not Taken");
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("message", formData.message || "Not Provided");

      if (formData.file) data.append("file", formData.file);

      const res = await api.post("/send-cv", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setStatusMessage("✅ CV sent successfully!");

        setFormData({
          name: "",
          course: "",
          email: "",
          phone: "",
          message: "",
          file: null,
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setStatusMessage("❌ Failed to send CV. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("⚠️ Error sending CV. Please try later.");
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
          {/* LEFT CARD */}
          <div className="relative rounded-xl overflow-hidden min-h-[600px] flex">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/uploads/contact/form2.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col justify-center items-center text-center p-8 text-white w-full">
              <h2 className="text-4xl font-bold mb-6">Send Us Your CV</h2>
              <p className="text-lg leading-relaxed max-w-md">
                Upload your CV and our team will connect with you for the next
                steps.
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
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
              {/* NAME */}
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

              {/* COURSE */}
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

              {/* EMAIL */}
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

              {/* PHONE */}
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* MESSAGE FIELD (NEW) */}
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
                  Upload CV
                </label>
                <input
                  type="file"
                  name="file"
                  ref={fileInputRef}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 file:bg-red-600 file:text-white"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {formData.file && (
                  <p className="text-sm text-gray-600 mt-2">
                    📄 Selected: {formData.file.name}
                  </p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-semibold text-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {loading ? "Sending..." : "Submit CV"}
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
