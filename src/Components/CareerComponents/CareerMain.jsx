import React from "react";
import CareerHero from "./CareerHero";
import CareerPartners from "./CareerPartners";
import CareerHowWeHelp from "./CareerHowWeHelp";
import CareerPosts from "./CareerPosts";
import CareerCV from "./CareerCV";

export default function CareerMain() {
  return (
    <div>
      <CareerHero />
      <CareerHowWeHelp />
      <CareerPosts />
      <CareerCV />
    </div>
  );
}
