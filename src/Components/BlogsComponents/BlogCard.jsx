import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../Redux/Slices/UserSlice";
import { Star, MoreVertical, Edit, Trash2 } from "lucide-react";
import api from "../../Utils/api";

export default function BlogCard({ items, onUpdate, onDelete }) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const admin = user?.role === "admin";
  const [dropdownOpen, setDropdownOpen] = useState({});

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Use a stable unique key for each blog (MongoDB _id or slug)
  const getItemKey = (item) => item._id || item.id || item.slug;

  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFeaturedToggle = async (item) => {
    const key = getItemKey(item);
    try {
      const response = await api.patch(`/featured/${item.slug}`);
      if (response.status === 200 && onUpdate) {
        // Update local state using the same field name as backend
        onUpdate(key, { isFeatured: !item.isFeatured });
      }
    } catch (error) {
      console.error("Error updating featured status:", error);
      alert("Failed to update featured status");
    }
  };

  const handleEdit = (slug) => {
    navigate(`/edit-blog/${slug}`);
    setDropdownOpen({});
  };

  const handleDelete = async (item) => {
    const key = getItemKey(item);
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        // Backend delete works with slug param
        const response = await api.delete(`/delete-blogs/${item.slug}`);
        if (response.status === 200 && onDelete) {
          onDelete(key);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog");
      }
    }
    setDropdownOpen({});
  };

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const key = getItemKey(item);
          return (
            <div
              key={key}
              className="border rounded-2xl border-gray-200 p-4 relative"
            >
              {/* Admin Controls */}
              {admin && (
                <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                  {/* Featured Toggle */}
                  <button
                    onClick={() => handleFeaturedToggle(item)}
                    className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                      item.isFeatured
                        ? "bg-yellow-500 text-white"
                        : "bg-white/90 text-gray-600 hover:bg-yellow-100"
                    }`}
                    title={
                      item.isFeatured
                        ? "Remove from featured"
                        : "Add to featured"
                    }
                  >
                    <Star
                      className="w-4 h-4"
                      fill={item.isFeatured ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(key)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {dropdownOpen[key] && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setDropdownOpen({})}
                        />
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-30">
                          <button
                            onClick={() => handleEdit(item.slug)}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Image */}
              <div
                className="relative cursor-pointer"
                onClick={() => navigate(`/blogs/${item.slug}`)}
              >
                <img
                  src={item.image[0].url}
                  alt={item.title}
                  className="object-cover object-center rounded-xl w-full aspect-[16/10]"
                />
                {/* Tags */}
                <div className="absolute bottom-2 left-2 flex gap-2 z-10">
                  {item.tags?.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-1 text-sm line-clamp-1"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-3 flex flex-col items-start space-y-2">
                <div className="text-sm text-gray-500">
                  {/* <span>{new Date(item.createdAt).toLocaleDateString()}</span> */}
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                <div
                  className="line-clamp-2 text-lg font-semibold cursor-pointer hover:text-purple-600 transition-colors"
                  onClick={() => navigate(`/blogs/${item.slug}`)}
                >
                  {item.title}
                </div>
                <div className="line-clamp-3 text-sm text-gray-600 text-justify">
                  {item.metaDescription}
                </div>
                <button
                  onClick={() => navigate(`/blogs/${item.slug}`)}
                  className="text-green-600 text-sm font-medium hover:underline"
                >
                  Read More
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
