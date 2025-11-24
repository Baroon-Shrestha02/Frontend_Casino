import React from "react";

export default function BlogCard({ items }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-2xl border-gray-200 p-4">
            {/* Image */}
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover object-center rounded-xl w-full aspect-[16/10]"
              />

              {/* Tags */}
              <div className="absolute bottom-2 left-2 flex gap-2 z-10">
                {item.tags?.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-1 text-sm"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div className="p-3 flex flex-col items-start space-y-2">
              <div className="text-sm text-gray-500">{item.date}</div>

              <div className="line-clamp-2 text-lg font-semibold">
                {item.title}
              </div>

              <div className="line-clamp-3 text-sm text-gray-600 text-justify">
                {item.description}
              </div>

              <button className="text-green-600 text-sm font-medium hover:underline">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
