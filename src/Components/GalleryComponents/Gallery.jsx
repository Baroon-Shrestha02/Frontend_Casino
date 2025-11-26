import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import GalleryHero from "./GalleryHero";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Slices/UserSlice";
import api from "../../Utils/api"; // axios instance

// Lazy loader
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
  const [mediaFiles, setMediaFiles] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const user = useSelector(selectUser);
  const isAdmin = user?.role === "admin";

  console.log(user.role);

  // Fetch images from backend
  const getImages = async () => {
    try {
      const res = await api.get("/get-images");
      setMediaFiles(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  // Upload image
  const uploadImage = async () => {
    if (!imageFile) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await api.post("/add-images", formData);
      setIsAddModalOpen(false);
      setImageFile(null);
      getImages(); // refresh
    } catch (error) {
      console.log(error);
    }
  };

  // Delete image
  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await api.delete(`/delete-images/${id}`);
      getImages();
    } catch (error) {
      console.log(error);
    }
  };

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

  // GRID VIEW
  const renderGrid = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      {isAdmin && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-md"
          >
            <Plus size={20} />
            Add New Image
          </button>
        </div>
      )}
      {mediaFiles.map((file, index) => (
        <div
          key={file._id}
          className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer"
        >
          {/* Admin Delete Button */}
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteImage(file._id);
              }}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black p-1 rounded-full text-white"
            >
              <X size={16} />
            </button>
          )}

          {/* Image */}
          <div onClick={() => openModal(index)}>
            <LazyMotionItem type={file.type} src={file.image?.[0]?.url} />
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

      {/* FULLSCREEN MODAL */}
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
                src={mediaFiles[selectedIndex].image?.[0]?.url}
                className="max-w-full max-h-[85vh] object-contain rounded"
              />
            ) : (
              <video
                src={mediaFiles[selectedIndex].image?.[0]?.url}
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

      {/* ADD IMAGE MODAL */}
      {isAddModalOpen && isAdmin && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add New Image</h2>

            <input
              type="file"
              className="w-full border p-2 rounded"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="py-2 px-4 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={uploadImage}
                className="py-2 px-4 bg-blue-600 text-white rounded"
              >
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
