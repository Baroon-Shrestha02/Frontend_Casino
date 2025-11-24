import React from "react";
import TestHero from "./TestHero";
import Tests from "./Tests";
import TestCTA from "./TestCTA";
import CombineTests from "./CombineTests";
import TestimonialsForm from "../Forms/TestimonialsForm";

export default function TestMain() {
  return (
    <div>
      <TestHero />
      <CombineTests />

      <TestCTA />
    </div>
  );
}
