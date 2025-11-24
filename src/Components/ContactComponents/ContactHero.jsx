import React from "react";
import HeroSection from "../HelperComponents/HeroSection";

export default function ContactHero() {
  return (
    <div>
      <HeroSection
        title="Contact Us"
        subtitle="Become a part of Us."
        description="Reach out to us with your queries, feedback, or project details, and our team will get back to you promptly."
        image="/uploads/contact/hero.jpg"
      />
    </div>
  );
}
