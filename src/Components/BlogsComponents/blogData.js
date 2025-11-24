const blogData = [
  {
    id: 1,
    title: "Understanding Law Enforcement Technology in 2024",
    description:
      "An overview of how modern policing is evolving with digital tools, AI, and advanced analytics.",
    date: "January 10, 2024",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600",
    tags: ["AI", "Law"],
    category: "Law enforcement",
  },
  {
    id: 2,
    title: "Why Protecting PII Matters More Today",
    description:
      "PII breaches are rising every year. Here’s how systems can safeguard personal information.",
    date: "February 5, 2024",
    image: "https://images.unsplash.com/photo-1526378722445-4aa1b0a83ff5?w=600",
    tags: ["Privacy", "Data Security"],
    category: "PII",
  },
  {
    id: 3,
    title: "Modern OCR: Extracting Data With Accuracy",
    description:
      "OCR technology has improved drastically. Explore how new models read documents flawlessly.",
    date: "March 2, 2024",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600",
    tags: ["OCR", "AI"],
    category: "OCR",
  },

  // -------------------------------------------------------
  // 18 NEW BLOGS ADDED BELOW
  // -------------------------------------------------------

  {
    id: 4,
    title: "How Artificial Intelligence Is Redefining Compliance",
    description:
      "AI-powered monitoring helps organizations stay compliant with evolving regulations.",
    date: "March 20, 2024",
    image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=600",
    tags: ["AI", "Compliance"],
    category: "Compliance",
  },
  {
    id: 5,
    title: "Threat Detection Systems: What’s New in 2024?",
    description:
      "A deep dive into new algorithms and real-time systems designed to detect digital threats.",
    date: "April 12, 2024",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?w=600",
    tags: ["Cybersecurity", "AI"],
    category: "Cybersecurity",
  },
  {
    id: 6,
    title: "Top 5 Ways to Reduce False Positives in AI Models",
    description:
      "False positives are costly. Here’s how better training data and model tuning help.",
    date: "April 25, 2024",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600",
    tags: ["AI", "Machine Learning"],
    category: "AI",
  },
  {
    id: 7,
    title: "The Future of Case Management Systems",
    description:
      "Automation and cloud technology are transforming how cases are tracked and processed.",
    date: "May 2, 2024",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600",
    tags: ["Case Management", "Software"],
    category: "Software",
  },
  {
    id: 8,
    title: "Data Encryption Standards Every Agency Should Know",
    description:
      "An easy guide to understanding encryption methods used in modern security systems.",
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=600",
    tags: ["Encryption", "Security"],
    category: "Cybersecurity",
  },
  {
    id: 9,
    title: "Why Document Validation Matters More Than Ever",
    description:
      "Fraud attempts are rising. Automated validation is now essential for secure workflows.",
    date: "June 1, 2024",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600",
    tags: ["Document Security", "AI"],
    category: "Document Security",
  },
  {
    id: 10,
    title: "The Rise of Multi-Modal AI in Government Systems",
    description:
      "Combining vision, text, and audio models to improve recognition and decision-making.",
    date: "June 18, 2024",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600",
    tags: ["AI", "Machine Learning"],
    category: "AI",
  },
  {
    id: 11,
    title: "How Agencies Can Build Secure Digital Identities",
    description:
      "Digital identity management is becoming a global priority for security-focused organizations.",
    date: "July 5, 2024",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=600",
    tags: ["Identity", "PII"],
    category: "PII",
  },
  {
    id: 12,
    title: "Automated Background Checks: Benefits and Limits",
    description:
      "Automation speeds up verification, but accuracy and bias must be monitored carefully.",
    date: "July 20, 2024",
    image: "https://images.unsplash.com/photo-1560269507-68f61f5045a9?w=600",
    tags: ["Verification", "AI"],
    category: "Verification",
  },
  {
    id: 13,
    title: "Using AI to Improve Public Safety Response Times",
    description:
      "Predictive analytics is helping agencies respond faster and smarter during emergencies.",
    date: "August 3, 2024",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
    tags: ["Public Safety", "AI"],
    category: "Law enforcement",
  },
  {
    id: 14,
    title: "Cloud Migration Tips for Security-Focused Organizations",
    description:
      "A simple guide to transitioning legacy systems to secure cloud infrastructure.",
    date: "August 25, 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
    tags: ["Cloud", "Security"],
    category: "Cloud",
  },
  {
    id: 15,
    title: "How NLP Is Transforming Digital Investigations",
    description:
      "Natural language processing can analyze reports, extract intent, and detect patterns.",
    date: "September 10, 2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    tags: ["NLP", "AI"],
    category: "AI",
  },
  {
    id: 16,
    title: "The Importance of Secure API Integrations",
    description:
      "Modern systems rely on APIs more than ever—here’s why securing them is essential.",
    date: "September 28, 2024",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600",
    tags: ["APIs", "Cybersecurity"],
    category: "Cybersecurity",
  },
  {
    id: 17,
    title: "Real-Time Monitoring for Fraud Prevention",
    description:
      "Learn how AI-driven monitoring can detect anomalies and prevent fraud effectively.",
    date: "October 8, 2024",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600",
    tags: ["Fraud", "Security"],
    category: "Fraud",
  },
  {
    id: 18,
    title: "How Deep Learning Improves Pattern Recognition",
    description:
      "Deep learning models continue to outperform traditional methods in visual recognition tasks.",
    date: "October 20, 2024",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600",
    tags: ["Deep Learning", "AI"],
    category: "AI",
  },
  {
    id: 19,
    title: "Risk Assessment Tools Every Agency Should Adopt",
    description:
      "AI-enhanced risk assessment tools are becoming essential in high-security operations.",
    date: "November 1, 2024",
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381?w=600",
    tags: ["Risk", "Security"],
    category: "Security",
  },
  {
    id: 20,
    title: "Enhancing Evidence Management With Automation",
    description:
      "Digital evidence is growing rapidly—automation helps categorize and secure files efficiently.",
    date: "November 18, 2024",
    image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=600",
    tags: ["Automation", "Law Enforcement"],
    category: "Law enforcement",
  },
  {
    id: 21,
    title: "The Role of Blockchain in Securing Sensitive Data",
    description:
      "Blockchain provides transparency and immutable logging—ideal for sensitive data handling.",
    date: "December 3, 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
    tags: ["Blockchain", "Security"],
    category: "Data Security",
  },
];

export default blogData;
