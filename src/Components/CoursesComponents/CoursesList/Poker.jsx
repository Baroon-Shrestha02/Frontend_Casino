import React from "react";
import HeroSection from "../../HelperComponents/HeroSection";
import CoursesSection from "../../HelperComponents/CoursesSection";

export default function Poker() {
  return (
    <div>
      <HeroSection
        title="Poker"
        subtitle="Poker Mastery - All Variants"
        description="Enhance your poker dealing skills across all popular variants. Learn game flow, hand rankings, betting procedures, and professional dealer conduct for poker tables."
        image="/uploads/home/poker.jpg"
      />
      <CoursesSection
        title="🃏 Master the Art of Poker"
        para1="Our Poker Dealer Training Course is designed for beginners and aspiring casino dealers. Gain in-depth knowledge of game rules, betting structures, and dealer procedures to confidently operate and manage Poker tables in professional casino settings."
        para2="The program combines theory with hands-on sessions, allowing you to refine your skills in card handling, dealing, pot management, and player interaction under the guidance of experienced instructors."
        para3="You’ll learn Poker fundamentals, dealer techniques, chip handling, tournament management, and industry-standard practices. Our approach ensures you are prepared for real-world casino floors, poker rooms, and tournament settings worldwide."
        // timeline
        step1="Introduction to Poker"
        desc1="Learn the rules, table layouts, hand rankings, and betting structures for Texas Hold’em, Omaha, and other popular variants. Understand dealer and player roles, game flow, and common terminology used in professional poker rooms."
        step2="Dealer Techniques"
        desc2="Develop essential dealer skills such as shuffling, dealing, managing pots, announcing bets, and handling payouts. Learn professional dealer etiquette and practices followed in top casinos and tournaments."
        step3="Practical Training"
        desc3="Engage in hands-on training using real Poker tables and chips. Refine your speed, accuracy, and confidence in dealing, ensuring readiness for live casino and tournament environments."
        step4="Career Preparation"
        desc4="Receive guidance on certification, interview preparation, and career readiness. Learn industry expectations to secure positions as professional Poker dealers."
        image="/uploads/courses/info/poker.jpg"
        // learning outcomes
        learn1="Poker Fundamentals"
        out1="Understanding Poker rules and table layout"
        out2="Hand rankings and betting structures"
        out3="Dealer and player roles"
        out4="Game flow and tournament procedures"
        learn2="Dealer Strategies & Techniques"
        out5="Shuffling, dealing, and chip management"
        out6="Managing pots and bets accurately"
        out7="Maintaining game fairness and integrity"
        out8="Professional dealer etiquette"
        learn3="Professional Skills"
        out9="Casino etiquette & professionalism"
        out10="Speed and accuracy in dealing"
        out11="Tournament monitoring & fairness"
        out12="Communication with players"
        learn4="Career Ready"
        out13="Live casino and tournament experience"
        out14="Interview & recruitment prep"
        out15="Networking with casino professionals"
        out16="Job placement support"
        // tutor
        name="Sarah Collins"
        role="Professional Poker Instructor"
        tutdesc="With over 10 years of experience in major casinos and poker tournaments worldwide, Sarah has trained hundreds of aspiring Poker dealers. Her hands-on teaching with real tables and chips ensures students gain practical, industry-ready skills."
        exp1="Poker Rules & Variants Expert"
        exp2="Dealer Techniques Specialist"
        exp3="Tournament Management Pro"
        profimg="/uploads/about/team/team5.jpg"
        // courses
        level="Beginner"
        duration="2 Months"
        state="Ongoing"
        category="Poker"
        price="XXXXX"
      />
    </div>
  );
}
