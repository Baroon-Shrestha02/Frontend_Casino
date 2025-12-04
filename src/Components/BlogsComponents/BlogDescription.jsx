import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaTag,
  FaFolder,
  FaClock,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { Share2, Star } from "lucide-react";
import api from "../../Utils/api";

export default function BlogDescription() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [randomBlogs, setRandomBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Reading progress bar
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blogs/${slug}`);
        setBlog(response.data);
        setImageError(false);
      } catch (err) {
        console.error("Failed to load blog:", err);
        setImageError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchRandomBlogs = async () => {
      try {
        const res = await api.get("/blogs", {
          params: { page: 1, limit: 20 },
        });
        if (res.data?.blogs) {
          // Filter out current blog and shuffle to get random blogs
          const filtered = res.data.blogs.filter((post) => post.slug !== slug);
          // Shuffle array
          const shuffled = filtered.sort(() => 0.5 - Math.random());
          // Get 3-4 random blogs
          const randomCount = Math.min(4, shuffled.length);
          setRandomBlogs(shuffled.slice(0, randomCount));
        }
      } catch (err) {
        console.error("Failed to load random blogs:", err);
      }
    };

    if (slug) {
      fetchBlogData();
      fetchRandomBlogs();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadTime = (text) => {
    if (!text) return "5 min read";
    const wordsPerMinute = 200;
    const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleShare = async (platform) => {
    setShowShareMenu(false);
    const url = window.location.href;
    const title = blog.title;
    const text = blog.metaDescription || blog.shortDescription;

    if (platform === "native" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!blog || imageError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaFolder className="text-4xl text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Blog Not Found
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The blog you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all hover:shadow-lg font-medium"
          >
            <FaArrowLeft /> Back to Blogs
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section - No Parallax */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0">
          <img
            src={blog.image?.[0]?.url || "/fallback.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Top Navigation Bar */}
        <div className="relative z-10 container mx-auto px-6 pt-8">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-gray-800 px-5 py-2.5 rounded-xl hover:bg-white transition-all font-medium shadow-lg hover:shadow-xl"
              >
                <FaArrowLeft className="text-sm" /> Back
              </Link>
            </motion.div>

            {blog.isFeatured && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-lg"
              >
                <Star className="w-4 h-4 fill-current" />
                Featured
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="container mx-auto px-4 md:px-6 py-12 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Top Content - Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-gray-600 mb-6"
          >
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-purple-600" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={toggleBookmark}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-all"
                title={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
              >
                {isBookmarked ? (
                  <FaBookmark className="w-4 h-4 text-yellow-400" />
                ) : (
                  <FaRegBookmark className="w-4 h-4" />
                )}
              </button>

              {/* Share Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl p-2 min-w-[160px] z-20"
                  >
                    <button
                      onClick={() => handleShare("twitter")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700 text-sm font-medium transition-colors"
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700 text-sm font-medium transition-colors"
                    >
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700 text-sm font-medium transition-colors"
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg text-gray-700 text-sm font-medium transition-colors"
                    >
                      Copy Link
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-gray-900"
          >
            {blog.title}
          </motion.h1>

          {/* Short Description */}
          {blog.shortDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                {blog.shortDescription}
              </p>
            </motion.div>
          )}

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:shadow-md transition-all cursor-pointer hover:scale-105"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Main Blog Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100"
          >
            <div
              dangerouslySetInnerHTML={{ __html: blog.description }}
              className="blog-content"
            />
          </motion.article>

          {/* Call-to-Action Section */}
        </div>
      </section>

      {/* Read More Section - Random Blogs */}
      {randomBlogs.length > 0 && (
        <section className="container mx-auto px-4 md:px-6 py- ">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FaArrowRight className="text-white text-xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  More To Read
                </h2>
              </div>
              <p className="text-gray-600 text-lg ml-16">
                Discover more interesting articles
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {randomBlogs.map((item, index) => (
                <motion.div
                  key={item._id || item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link
                    to={`/blogs/${item.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 block h-full"
                  >
                    {/* Image */}
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={item.image?.[0]?.url || "/fallback.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Category Badge */}
                      {item.category && item.category.length > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-700 rounded-full text-xs font-semibold">
                            {item.category[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6 space-y-3 flex flex-col h-full">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors leading-tight">
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-purple-600" />
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock className="text-purple-600" />
                          <span>{estimateReadTime(item.description)}</span>
                        </div>
                      </div>

                      {item.shortDescription && (
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed flex-grow">
                          {item.shortDescription}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-purple-600 text-sm font-semibold pt-2">
                        <span className="group-hover:translate-x-1 transition-transform">
                          Read More
                        </span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <Link
          to="/blogs"
          className="inline-flex items-center gap-3 bg-primary bg-gradent-to-r from-purple-600 to-pink-600 text-white px-10 mb-6 py-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
        >
          <FaArrowLeft className="text-lg" />
          <span>Explore All Blogs</span>
        </Link>
      </motion.div>

      {/* SEO Hidden Content */}
      {blog.metaTitle && blog.metaDescription && (
        <div className="sr-only">
          <h2>{blog.metaTitle}</h2>
          <p>{blog.metaDescription}</p>
        </div>
      )}

      {/* Enhanced Custom Styles */}
      <style>{`
        .blog-content {
          line-height: 1.9;
          color: #374151;
          font-size: 1.0625rem;
        }
        
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          color: #111827;
          line-height: 1.3;
        }
        
        .blog-content h1 {
          font-size: 2.25rem;
          background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .blog-content h2 {
          font-size: 1.875rem;
          padding-left: 1rem;
          border-left: 4px solid #9333ea;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          color: #6b21a8;
        }
        
        .blog-content p {
          margin-bottom: 1.75rem;
        }
        
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.75rem;
          padding-left: 2rem;
        }
        
        .blog-content li {
          margin-bottom: 0.75rem;
          position: relative;
        }
        
        .blog-content ul li::marker {
          color: #9333ea;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2.5rem 0;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        
        .blog-content a {
          color: #9333ea;
          text-decoration: none;
          border-bottom: 2px solid #9333ea40;
          transition: all 0.3s ease;
        }
        
        .blog-content a:hover {
          color: #7e22ce;
          border-bottom-color: #7e22ce;
          background: #9333ea10;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #9333ea;
          background: linear-gradient(to right, #9333ea10, transparent);
          padding: 1.5rem;
          padding-left: 1.5rem;
          margin: 2.5rem 0;
          border-radius: 0 0.75rem 0.75rem 0;
          font-style: italic;
          color: #4b5563;
        }
        
        .blog-content code {
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.9em;
          border: 1px solid #d1d5db;
          font-family: 'Courier New', monospace;
        }
        
        .blog-content pre {
          background: linear-gradient(135deg, #1f2937, #111827);
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 1rem;
          overflow-x: auto;
          margin: 2.5rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .blog-content pre code {
          background: transparent;
          padding: 0;
          color: inherit;
          border: none;
        }
        
        .blog-content strong {
          color: #111827;
          font-weight: 700;
        }
        
        .blog-content table {
          width: 100%;
          margin: 2rem 0;
          border-collapse: collapse;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .blog-content th {
          background: linear-gradient(135deg, #9333ea, #ec4899);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
        }
        
        .blog-content td {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .blog-content tr:hover {
          background: #f9fafb;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        .blog-content::-webkit-scrollbar {
          width: 8px;
        }
        
        .blog-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .blog-content::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #9333ea, #ec4899);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
