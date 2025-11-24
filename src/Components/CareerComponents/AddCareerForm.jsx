import axios from "axios";
import React, { useState } from "react";
import api from "../../Utils/api";
import { useNavigate } from "react-router-dom";

export default function AddCareerForm() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
    experience: "Entry Level",
    deadline: "",
    highlights: [""],
    requirements: [""],
    benefits: [""],
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value) => {
    const updatedArr = [...form[field]];
    updatedArr[index] = value;
    setForm({ ...form, [field]: updatedArr });
  };

  const addArrayItem = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayItem = (field, index) => {
    const updatedArr = [...form[field]];
    updatedArr.splice(index, 1);
    setForm({ ...form, [field]: updatedArr });
  };

  const handleImageUpload = (e) => {
    const files = [...e.target.files];
    setImages(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append normal fields
      formData.append("title", form.title);
      formData.append("location", form.location);
      formData.append("type", form.type);
      formData.append("salary", form.salary);
      formData.append("description", form.description);
      formData.append("experience", form.experience);
      formData.append("deadline", form.deadline);

      // Append array fields
      form.highlights.forEach((item) => formData.append("highlights[]", item));
      form.requirements.forEach((item) =>
        formData.append("requirements[]", item)
      );
      form.benefits.forEach((item) => formData.append("benefits[]", item));

      // Append images
      images.forEach((img) => formData.append("image", img));

      // API request
      const res = await api.post("/add-posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("Success:", res.data);
      alert("Career post added successfully!");
      navigate("/careers");

      // Optionally clear form after submit
      // setForm({ ...initialFormState });
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const fieldIcons = {
    highlights: "✨",
    requirements: "📋",
    benefits: "🎁",
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/uploads/main/footer.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Add Career Post</h1>
              <p className="text-blue-100 mt-2">
                Create a new job opening for your organization
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="title"
                      placeholder="e.g. Senior Software Engineer"
                      value={form.title}
                      onChange={handleFieldChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="location"
                      placeholder="e.g. New York, NY"
                      value={form.location}
                      onChange={handleFieldChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleFieldChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range
                    </label>
                    <input
                      name="salary"
                      placeholder="e.g. $80,000 - $120,000"
                      value={form.salary}
                      onChange={handleFieldChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <input
                      name="experience"
                      placeholder="e.g. Entry Level, Mid-Level, Senior"
                      value={form.experience}
                      onChange={handleFieldChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Deadline
                    </label>
                    <input
                      name="deadline"
                      type="date"
                      value={form.deadline}
                      onChange={handleFieldChange}
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Provide a detailed description of the role, responsibilities, and what makes this position exciting..."
                    value={form.description}
                    onChange={handleFieldChange}
                    rows={6}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    required
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Images
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Job Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="text-gray-500">
                        <svg
                          className="mx-auto h-12 w-12 mb-3"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-sm font-medium">
                          Click to upload images
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Array Fields */}
              {["highlights", "requirements", "benefits"].map((field) => (
                <div key={field} className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                    <span>{fieldIcons[field]}</span>
                    <span className="capitalize">{field}</span>
                  </h2>

                  <div className="space-y-3">
                    {form[field].map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-8 h-10 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
                            {index + 1}
                          </span>
                        </div>
                        <input
                          value={item}
                          onChange={(e) =>
                            handleArrayChange(index, field, e.target.value)
                          }
                          className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          placeholder={`Enter ${field.slice(0, -1)}...`}
                        />
                        {form[field].length > 1 && (
                          <button
                            type="button"
                            className="flex-shrink-0 px-3 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition border border-red-200"
                            onClick={() => removeArrayItem(field, index)}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition border border-blue-200 font-medium flex items-center gap-2"
                      onClick={() => addArrayItem(field)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add {field.slice(0, -1)}
                    </button>
                  </div>
                </div>
              ))}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-bold transition-all shadow-lg 
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
    }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="animate-spin h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                      ></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit Job Post"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
