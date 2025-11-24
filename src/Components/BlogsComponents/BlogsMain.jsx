import React from "react";
import BlogsFeatured from "./BlogsFeatured";
import BlogsHero from "./BlogsHero";
import AllBlogs from "./AllBlogs";

export default function BlogsMain() {
  return (
    <div>
      <BlogsHero />
      <BlogsFeatured />
      <AllBlogs />
    </div>
  );
}
