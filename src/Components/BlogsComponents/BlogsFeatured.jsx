import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Utils/api";

export default function BlogsFeatured() {
  const navigate = useNavigate();
  const [latestBlog, setLatestBlog] = useState(null);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest blog (most recent) and featured blogs from backend
  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        // Latest blog (most recent created)
        const latestRes = await api.get("/blogs", {
          params: { page: 1, limit: 1 },
        });
        const latest = latestRes.data?.blogs?.[0] || null;
        setLatestBlog(latest);

        // Featured blogs (latest 3 featured)
        const featuredRes = await api.get("/featured");
        setFeaturedBlogs((featuredRes.data?.blogs || []).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch blogs data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsData();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-500">Loading featured blogs...</p>
      </section>
    );
  }

  if (featuredBlogs.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-500">No blogs found.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Latest Blog */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Latest</h2>
          {latestBlog && (
            <div
              className="rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => navigate(`/blogs/${latestBlog.slug}`)}
            >
              <div className="h-[250px] overflow-hidden">
                <img
                  src={latestBlog.image?.[0]?.url}
                  alt={latestBlog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-white p-6 space-y-3">
                <h3 className="text-2xl font-bold text-gray-800 leading-tight hover:text-teal-600 transition-colors">
                  {latestBlog.title}
                </h3>
                <div className="text-sm text-gray-500">
                  <span>
                    {new Date(latestBlog.createdAt).toLocaleDateString()}
                  </span>
                  <span className="mx-2">|</span>
                  <span className="text-teal-600 font-medium">Author</span>
                </div>
                <p
                  className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: latestBlog.shortDescription,
                  }}
                />
                <button className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors">
                  Read more
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Top Reads */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Featured Reads
          </h2>
          <div className="space-y-6">
            {featuredBlogs.map((post) => (
              <div
                key={post._id}
                className="flex gap-4 group cursor-pointer"
                onClick={() => navigate(`/blogs/${post.slug}`)}
              >
                <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={post.image?.[0]?.url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-base font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="text-xs text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2">|</span>
                    <span className="text-teal-600">Author</span>
                  </div>
                  <div className="text-xs text-gray-600 line-clamp-2">
                    {post.metaDescription}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
