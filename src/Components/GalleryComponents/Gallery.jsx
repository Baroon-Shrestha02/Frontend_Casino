import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import GalleryHero from "./GalleryHero";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slices/UserSlice";

// LazyMotionItem simplified (no loading animation)
const LazyMotionItem = ({ type, src }) => {
  return type === "video" ? (
    <video
      src={src}
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    />
  ) : (
    <img src={src} alt="" className="w-full h-full object-cover" />
  );
};

export default function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const user = useSelector(selectUser);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Your current static media list (will be replaced with API)
  const mediaFiles = [
    {
      src: "/uploads/gallery/img1.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img2.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img3.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img4.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img5.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img6.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img7.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img10.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img12.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img13.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img14.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img15.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img16.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img17.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img18.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img19.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img20.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img21.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img22.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img23.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img24.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
    {
      src: "/uploads/gallery/img25.jpg",
      type: "image",
      alt: "Gallery",
      title: "Sample",
    },
  ];

  const openModal = (i) => {
    setSelectedIndex(i);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedIndex(null);
    setIsModalOpen(false);
  };

  const nextMedia = () =>
    setSelectedIndex((prev) => (prev + 1) % mediaFiles.length);
  const prevMedia = () =>
    setSelectedIndex((prev) => (prev === 0 ? mediaFiles.length - 1 : prev - 1));

  const deleteImage = (id) => {
    alert("Delete logic here: " + id);
  };

  const renderGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      {mediaFiles.map((file, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
        >
          {/* Admin Delete Button */}
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteImage(file._id || index);
              }}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black p-1 rounded-full text-white"
            >
              <X size={16} />
            </button>
          )}

          {/* Image */}
          <div onClick={() => openModal(index)}>
            <LazyMotionItem type={file.type} src={file.src} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <GalleryHero />

      <div className="container mx-auto px-4 md:px-8 my-12">
        {mediaFiles.length > 0 ? (
          renderGrid()
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            No images found.
          </div>
        )}
      </div>

      {/* Floating Add Image Button (ADMIN ONLY) */}
      {isAdmin && (
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Fullscreen Image Modal */}
      {isModalOpen && selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white p-2"
          >
            <X size={26} />
          </button>

          <button
            onClick={prevMedia}
            className="absolute left-6 text-white p-3"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="max-w-5xl max-h-[85vh]">
            {mediaFiles[selectedIndex].type === "image" ? (
              <img
                src={mediaFiles[selectedIndex].src}
                className="max-w-full max-h-[85vh] object-contain rounded"
              />
            ) : (
              <video
                src={mediaFiles[selectedIndex].src}
                autoPlay
                loop
                muted
                className="max-w-full max-h-[85vh] rounded"
              />
            )}
          </div>

          <button
            onClick={nextMedia}
            className="absolute right-6 text-white p-3"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}

      {/* ADD IMAGE MODAL (ADMIN) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add New Image</h2>

            <input type="file" className="w-full border p-2 rounded" />

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="py-2 px-4 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button className="py-2 px-4 bg-blue-600 text-white rounded">
                Upload
              </button>
            </div>

            <button
              className="absolute right-4 top-4 text-gray-500"
              onClick={() => setIsAddModalOpen(false)}
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
