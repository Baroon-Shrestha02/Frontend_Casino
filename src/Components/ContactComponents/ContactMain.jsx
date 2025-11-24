import React from "react";
import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import ContactVisit from "./ContactVisit";

export default function ContactMain() {
  return (
    <div>
      <ContactHero />
      <ContactForm />
      <ContactVisit />
    </div>
  );
}
