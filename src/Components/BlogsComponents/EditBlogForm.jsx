import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Utils/api";
import { Upload, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function EditBlogForm() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    tags: [],
    category: [],
    isFeatured: false,
    image: null,
  });

  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");

  // ----------------------------------------
  // FETCH BLOG DATA
  // ----------------------------------------
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blogs/${slug}`);
        const blog = response.data;

        // Set form data with fetched blog data
        setFormData({
          title: blog.title || "",
          shortDescription: blog.shortDescription || "",
          description: blog.description || "",
          metaTitle: blog.metaTitle || "",
          metaDescription: blog.metaDescription || "",
          tags: blog.tags || [],
          category: blog.category || [],
          isFeatured: blog.isFeatured || false,
          image: null, // Don't set file, we'll use URL for preview
        });

        // Set image preview if image exists
        if (blog.image && blog.image.length > 0 && blog.image[0].url) {
          setOriginalImageUrl(blog.image[0].url);
          setImagePreview(blog.image[0].url);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to load blog data",
        });
        setTimeout(() => navigate("/blogs"), 2000);
      }
    };

    if (slug) {
      fetchBlogData();
    }
  }, [slug, navigate]);

  // ----------------------------------------
  // FETCH CATEGORIES
  // ----------------------------------------
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const catRes = await api.get("/blogs-categories");

        setAllCategories(
          catRes.data.categories.map((c) => ({
            label: c,
            value: c,
          }))
        );
      } catch (err) {
        console.error("Meta fetch failed", err);
      }
    };

    fetchMeta();
  }, []);

  // ----------------------------------------
  // HANDLE BASIC INPUT
  // ----------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleEditorChange = (description) => {
    setFormData((prev) => ({ ...prev, description }));
  };

  // ----------------------------------------
  // TAGS (MAX 3)
  // ----------------------------------------
  const handleAddTag = () => {
    const newTag = tagInput.trim();

    if (!newTag) return;

    if (formData.tags.length >= 3) {
      setMessage({
        type: "error",
        text: "You can only add up to 3 tags",
      });
      return;
    }

    if (formData.tags.includes(newTag)) {
      setMessage({
        type: "error",
        text: "Tag already added",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag],
    }));

    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // ----------------------------------------
  // IMAGE HANDLER
  // ----------------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select a valid image file" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Image size should be less than 5MB",
      });
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(originalImageUrl || "");
  };

  // ----------------------------------------
  // SUBMIT
  // ----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    // Validate category
    if (!formData.category || formData.category.length === 0) {
      setMessage({
        type: "error",
        text: "Please select at least one category",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("shortDescription", formData.shortDescription);
      submitData.append("description", formData.description);
      submitData.append("metaTitle", formData.metaTitle || "");
      submitData.append("metaDescription", formData.metaDescription || "");

      // Append tags if any
      if (formData.tags && formData.tags.length > 0) {
        formData.tags.forEach((tag) => submitData.append("tags[]", tag));
      }

      // Append categories
      formData.category.forEach((cat) => {
        if (cat && cat.trim()) {
          submitData.append("category[]", cat.trim());
        }
      });

      submitData.append("isFeatured", formData.isFeatured ? "true" : "false");

      // Only append image if a new one was selected
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      await api.patch(`/update-blogs/${slug}`, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ type: "success", text: "Blog updated successfully!" });

      setTimeout(() => navigate("/blogs"), 1500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update blog",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#9333ea" : "#e5e7eb",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(147, 51, 234, 0.1)" : "none",
      "&:hover": { borderColor: "#9333ea" },
      padding: "4px",
      borderRadius: "0.5rem",
    }),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 mt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 mt-20">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Edit Blog Post
          </h1>
          <p className="text-gray-600">Update your blog content</p>
        </div>

        {/* MESSAGES */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        {/* FORM */}
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100">
          {/* TITLE */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter an engaging title"
            />
          </div>

          {/* SHORT DESCRIPTION */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              maxLength={300}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
              placeholder="Write a brief summary (up to 300 characters)"
            />
          </div>

          {/* IMAGE */}
          {!imagePreview ? (
            <div>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-sm text-gray-600">Click to upload image</p>
              </label>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden border">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                type="button"
                title="Remove image"
              >
                <X className="w-5 h-5" />
              </button>
              {formData.image && (
                <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
                  New image selected
                </div>
              )}
            </div>
          )}

          {/* TAGS + CATEGORY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TAGS */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tags (max 3)
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Enter tag..."
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full flex items-center gap-2"
                  >
                    {tag}
                    <X
                      className="w-4 h-4 cursor-pointer hover:text-red-600"
                      onClick={() => removeTag(tag)}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* CATEGORY */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>

              <Select
                isMulti
                options={allCategories}
                value={formData.category.map((c) => ({ label: c, value: c }))}
                onChange={(selected) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: selected
                      ? selected.map((item) => item.value)
                      : [],
                  }))
                }
                placeholder="Select categories"
                styles={customSelectStyles}
              />

              <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const newCat = categoryInput.trim();
                    if (!newCat) return;
                    if (formData.category.includes(newCat)) return;
                    setFormData((prev) => ({
                      ...prev,
                      category: [...prev.category, newCat],
                    }));
                    setCategoryInput("");
                  }
                }}
                placeholder="Add new category and press Add"
                className="mt-2 w-full px-3 py-2 border rounded-lg"
              />

              <button
                type="button"
                onClick={() => {
                  const newCat = categoryInput.trim();
                  if (!newCat) return;

                  // prevent duplicates
                  if (formData.category.includes(newCat)) return;

                  setFormData((prev) => ({
                    ...prev,
                    category: [...prev.category, newCat],
                  }));

                  setCategoryInput("");
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg mt-2 hover:bg-purple-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* META TITLE */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              SEO Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="SEO Meta Title"
            />
          </div>

          {/* META DESCRIPTION */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              SEO Meta Description
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 border rounded-lg"
              placeholder="SEO Meta Description"
            />
          </div>

          {/* BLOG CONTENT */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Blog Content <span className="text-red-500">*</span>
            </label>
            <Editor
              apiKey="ydtp0lw09fpf7s9xyyrq1mykcs7go1xp994sjtypxghsx8d9"
              value={formData.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          {/* FEATURED */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600 rounded"
            />
            <span className="text-gray-700 font-medium">Featured Post</span>
          </label>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/blogs")}
              className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 bg-purple-600 text-white rounded-lg flex justify-center items-center gap-2 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Blog"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
