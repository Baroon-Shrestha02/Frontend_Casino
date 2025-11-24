import React from "react";
import HeroSection from "../../HelperComponents/HeroSection";
import CoursesSection from "../../HelperComponents/CoursesSection";

export default function BlackJack() {
  return (
    <div>
      <HeroSection
        title="BlackJack"
        subtitle="Become a Blackjack Pro Dealer"
        description="Learn the rules, dealing methods, and professional dealer skills for Blackjack. Gain confidence to handle casino tables efficiently and provide an engaging player experience."
        image="/uploads/home/blackjack.jpg"
      />
      <CoursesSection
        title="🎲 Master the Art of Blackjack"
        para1="Our specialized Blackjack Training Course is designed for beginners and aspiring casino dealers. Gain in-depth knowledge of game rules, strategies, and dealer procedures to confidently operate and manage Blackjack tables in professional casinos."
        para2="The program combines theoretical learning with practical, hands-on sessions, allowing you to refine your skills in card handling, dealing, and game management under the guidance of expert instructors."
        para3="You’ll master Blackjack fundamentals, dealer techniques, chip handling, card counting basics, and industry-standard practices. Our approach prepares you for real-world casino environments, including land-based casinos, cruise ships, and entertainment venues worldwide."
        // timeline
        step1="Introduction to Blackjack"
        desc1="Learn the rules, table layout, card values, and betting options. Understand the objectives of the game, player and dealer roles, and common terminology used in professional casinos."
        step2="Dealer Techniques"
        desc2="Develop essential dealer skills such as card shuffling, dealing, announcing results, managing bets, and handling payouts. Learn dealer etiquette and professional practices followed in top casinos."
        step3="Practical Training"
        desc3="Engage in hands-on sessions using real Blackjack tables and chips. Refine your speed, accuracy, and confidence in dealing, ensuring readiness for live casino operations."
        step4="Career Preparation"
        desc4="Gain guidance on certification, interview preparation, and career readiness. Learn industry expectations to secure positions as professional Blackjack dealers."
        image="/uploads/courses/info/blackjack.png"
        //learning outcomes
        learn1="Blackjack Fundamentals"
        out1="Understanding Blackjack rules and table layout"
        out2="Card values, hand ranking, and betting options"
        out3="Dealer and player roles"
        out4="Game flow and common casino terminology"
        learn2="Dealer Strategies & Techniques"
        out5="Shuffling and dealing techniques"
        out6="Payout management and chip handling"
        out7="Maintaining game fairness and integrity"
        out8="Professional dealer etiquette"
        learn3="Professional Skills"
        out9="Casino etiquette & professionalism"
        out10="Speed and accuracy in dealing"
        out11="Game monitoring & fairness"
        out12="Communication with players"
        learn4="Career Ready"
        out13="Live casino experience"
        out14="Interview & recruitment prep"
        out15="Networking with casino professionals"
        out16="Job placement support"
        // tutor
        name="Michael Thompson"
        role="Professional Blackjack Instructor"
        tutdesc="With over 10 years of experience in world-class casinos, Michael has trained hundreds of dealers. His hands-on teaching with real tables and chips ensures students gain practical, industry-ready Blackjack skills."
        exp1="Blackjack Rules & Strategy Expert"
        exp2="Dealer Techniques Specialist"
        exp3="Casino Game Management Pro"
        profimg="/uploads/about/team/team3.jpg"
        // courses
        level="Beginner"
        duration="2 Months"
        state="Ongoing"
        category="Blackjack"
        price="XXXXX"
      />
    </div>
  );
}
