import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import blogData from "./blogData";
import BlogCard from "./BlogCard";

export default function AllBlogs() {
  const categories = [
    "All",
    "Law enforcement",
    "PII",
    "Audio",
    "Healthcare",
    "Data Privacy",
    "OCR",
    "Digital Evidence",
    "Artificial Intelligence",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const itemsPerPage = 6;

  // -----------------------------
  // ⭐ FILTER BLOGS
  // -----------------------------
  const filteredBlogs = blogData.filter((blog) => {
    const matchCategory =
      selectedCategory === "All" ||
      blog.tags.some((tag) => tag === selectedCategory);

    const matchSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchCategory && matchSearch;
  });

  // -----------------------------
  // ⭐ PAGINATION BASED ON FILTERED BLOGS
  // -----------------------------
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;

  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  // Reset to page 1 when search or category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <section className="container mx-auto px-4">
      <hr />

      {/* Search + Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between py-8 gap-4">
        <div className="text-xl md:text-2xl font-semibold">
          Browse by categories
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
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors
                  ${
                    selectedCategory === cat
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

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
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors
                    ${
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

      {/* Blog Cards */}
      <BlogCard items={currentBlogs} />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 my-10">
        <button
          onClick={prevPage}
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
          onClick={nextPage}
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
