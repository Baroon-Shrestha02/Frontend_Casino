import React from "react";

export default function BlogsFeatured() {
  const topReads = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=250&fit=crop",
      title:
        "Ensure Data Privacy and Compliance with Bulk Audio Redaction Software",
      date: "Febraury 21, 2022",
      author: "Haseeb Abbas",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1495461199391-8c39ab674295?w=400&h=250&fit=crop",
      title:
        "Ensure Data Privacy and Compliance with Bulk Audio Redaction Software",
      date: "Febraury 21, 2022",
      author: "Haseeb Abbas",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      title:
        "Ensure Data Privacy and Compliance with Bulk Audio Redaction Software",
      date: "Febraury 21, 2022",
      author: "Haseeb Abbas",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      title:
        "Ensure Data Privacy and Compliance with Bulk Audio Redaction Software",
      date: "Febraury 21, 2022",
      author: "Haseeb Abbas",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Latest Post */}
        <div className="space-y-4 bg-red-">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Latest</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div className="h-[250px] overflow-hidden">
              <img
                src="uploads/gallery/img1.jpg"
                alt="Business professional working"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white p-6 space-y-3">
              <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                Ensure Data Privacy and Compliance with Bulk Audio Redaction
                Software
              </h3>
              <div className="text-sm text-gray-500">
                <span>Febraury 21, 2022</span>
                <span className="mx-2">|</span>
                <span className="text-teal-600 font-medium">Author</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                It is a long established fact that a reader will be distracted
                by the readable content of a page from when looking at it
                layout. The point of using Lorem
              </p>
              <button className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors">
                Read more
              </button>
            </div>
          </div>
        </div>

        {/* Top Reads */}
        <div className="space-y-4 ">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Featured Reads
          </h2>
          <div className="space-y-6">
            {topReads.map((post) => (
              <div key={post.id} className="flex gap-4 group cursor-pointer">
                <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="text-base font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span className="mx-2">|</span>
                    <span className="text-teal-600">{post.author}</span>
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
