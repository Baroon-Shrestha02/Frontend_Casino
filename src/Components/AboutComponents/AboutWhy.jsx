import React from "react";
import AccordionSlider from "../HelperComponents/AccordionSlider";

export default function AboutWhy() {
  return (
    <>
      <section className="container mx-auto py-20 px-4">
        <div className="mb-16">
          <div className="w-24 h-1 bg-primary mb-2"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Makes Our Training Special?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Our training covers real casino tables, cards & chips, speed and
            accuracy drills, professional player etiquette, and cheating
            awareness to ensure you are fully prepared for a career on the
            casino floor.
          </p>
        </div>
        <AccordionSlider />
      </section>
    </>
  );
}
