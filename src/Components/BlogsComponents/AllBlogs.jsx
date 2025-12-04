import React, { useState, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import BlogCard from "./BlogCard";
import api from "../../Utils/api";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slices/UserSlice";

export default function AllBlogs() {
  const [categories, setCategories] = useState(["All"]);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector(selectUser);
  const itemsPerPage = 6;

  const admin = user?.role;

  // ------------------------------------------------
  // 🔥 Fetch categories dynamically
  // ------------------------------------------------
  const fetchCategories = async () => {
    try {
      const res = await api.get("/blogs-categories");
      const apiCategories = res.data?.categories || [];
      setCategories(["All", ...apiCategories]);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  // ------------------------------------------------
  // 🔥 Fetch blogs from backend
  // ------------------------------------------------
  const fetchBlogs = async () => {
    try {
      const params = {};
      if (selectedCategory !== "All") params.category = selectedCategory;
      if (searchQuery.trim() !== "") params.search = searchQuery;

      const res = await api.get("/blogs", { params });
      setBlogs(res.data.blogs || []);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    }
  };

  // ------------------------------------------------
  // 🔥 Handle blog updates (e.g. featured toggle)
  // ------------------------------------------------
  const handleUpdate = (id, updates) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        (blog._id || blog.id) === id ? { ...blog, ...updates } : blog
      )
    );
  };

  // ------------------------------------------------
  // 🔥 Handle blog deletion
  // ------------------------------------------------
  const handleDelete = (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => (blog._id || blog.id) !== id)
    );
  };

  // Load categories once
  useEffect(() => {
    fetchCategories();
  }, []);

  // Load blogs when filters change
  useEffect(() => {
    fetchBlogs();
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

  // -----------------------------
  // ⭐ PAGINATION
  // -----------------------------
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="container mx-auto px-4">
      <hr />
      {/* Search + Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-8 gap-4">
        <div className="text-xl md:text-2xl font-semibold">
          Browse by Categories
        </div>

        <div className="relative w-full md:w-auto">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search blogs"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        {/* Desktop Scrollable */}
        <div className="hidden md:block">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {admin && (
          <Link to="/blog-form">
            <button className="flex items-center gap-x-2 py-2 px-4 bg-primary text-white rounded-xl mt-4">
              <div>
                <FaPlus />
              </div>
              <div>Add Blog</div>
            </button>
          </Link>
        )}

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <span className="text-sm font-medium">{selectedCategory}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-[calc(100%-2rem)] bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                    selectedCategory === cat
                      ? "bg-green-50 text-green-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Blog Cards with Admin Controls */}
      <BlogCard
        items={currentBlogs}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 my-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Previous
        </button>

        <span className="font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === totalPages || totalPages === 0
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
}
