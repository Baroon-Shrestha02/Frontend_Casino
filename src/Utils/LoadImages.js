// utils/loadImages.js
export const importAllImages = (modules) =>
  Object.keys(modules).map((key, index) => ({
    id: index + 1,
    url: modules[key].default ?? modules[key],
    title: key
      .split("/")
      .pop()
      .replace(/\.(png|jpe?g|webp|gif)$/, ""),
    likes: Math.floor(Math.random() * 500) + 100,
  }));

const modules = import.meta.glob(
  "../assets/gallery/*.{png,jpg,jpeg,webp,gif}",
  {
    eager: true,
  }
);

export const galleryImages = importAllImages(modules);
