import React from "react";
import WorkforceHero from "./WorkforceHero";
import WorkforceIntro from "./WorkforceIntro";
import WorkforceSystem from "./WorkforceSystem";
import WorkforceWhyUs from "./WorkforceWhyUs";

export default function WorkforceMain() {
  return (
    <div>
      <WorkforceHero />
      <WorkforceIntro />
      <WorkforceSystem />
      <WorkforceWhyUs />
    </div>
  );
}
