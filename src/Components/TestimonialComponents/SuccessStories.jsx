import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SuccessStories() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [successStories, setSuccessStories] = useState([]);

  // Initial data load
  useEffect(() => {
    loadSuccessStories(6);
  }, []);

  // Simulated API call - Replace with actual backend endpoint
  const loadSuccessStories = async (count) => {
    setIsLoading(true);

    // COMMENTED OUT: Real API call
    // try {
    //   const response = await fetch(`/api/success-stories?limit=${count}`);
    //   const data = await response.json();
    //   setSuccessStories(data);
    // } catch (error) {
    //   console.error('Error fetching success stories:', error);
    // } finally {
    //   setIsLoading(false);
    // }

    // Simulated delay for demo
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: "Priya Sharma",
          company: "Google",
          role: "Software Engineer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
          posterImage:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
        },
        {
          id: 2,
          name: "Rahul Verma",
          company: "Microsoft",
          role: "Product Manager",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
          posterImage:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
        },
        {
          id: 3,
          name: "Anjali Gupta",
          company: "Amazon",
          role: "Data Scientist",
          profileImage:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
          posterImage:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop",
        },
        {
          id: 4,
          name: "Arjun Patel",
          company: "Meta",
          role: "Full Stack Developer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
          posterImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        },
        {
          id: 5,
          name: "Sneha Reddy",
          company: "Apple",
          role: "iOS Developer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
          posterImage:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop",
        },
        {
          id: 6,
          name: "Vikram Singh",
          company: "Tesla",
          role: "Embedded Systems Engineer",
          profileImage:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
          posterImage:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=400&fit=crop",
        },
        {
          id: 7,
          name: "Meera Nair",
          company: "Netflix",
          role: "Backend Engineer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
          posterImage:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
        },
        {
          id: 8,
          name: "Aditya Joshi",
          company: "Spotify",
          role: "Frontend Developer",
          profileImage:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya",
          posterImage:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop",
        },
        {
          id: 9,
          name: "Kavya Iyer",
          company: "Adobe",
          role: "UX Designer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya",
          posterImage:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop",
        },
        {
          id: 10,
          name: "Rohan Desai",
          company: "LinkedIn",
          role: "DevOps Engineer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
          posterImage:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop",
        },
        {
          id: 11,
          name: "Ishita Malhotra",
          company: "Salesforce",
          role: "Cloud Architect",
          profileImage:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita",
          posterImage:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop",
        },
        {
          id: 12,
          name: "Karthik Menon",
          company: "IBM",
          role: "AI Engineer",
          profileImage:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik",
          posterImage:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=400&fit=crop",
        },
        {
          id: 13,
          name: "Divya Kapoor",
          company: "Oracle",
          role: "Database Administrator",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Divya",
          posterImage:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop",
        },
        {
          id: 14,
          name: "Siddharth Rao",
          company: "Uber",
          role: "Mobile Developer",
          profileImage:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth",
          posterImage:
            "https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&h=400&fit=crop",
        },
        {
          id: 15,
          name: "Nisha Agarwal",
          company: "Twitter",
          role: "Security Engineer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nisha",
          posterImage:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=400&fit=crop",
        },
        {
          id: 16,
          name: "Harsh Mehta",
          company: "Airbnb",
          role: "Product Designer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harsh",
          posterImage:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=400&fit=crop",
        },
        {
          id: 17,
          name: "Pooja Pillai",
          company: "PayPal",
          role: "Backend Developer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja",
          posterImage:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=400&fit=crop",
        },
        {
          id: 18,
          name: "Nikhil Bansal",
          company: "Slack",
          role: "Platform Engineer",
          profileImage:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Nikhil",
          posterImage:
            "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=600&h=400&fit=crop",
        },
        {
          id: 19,
          name: "Riya Chatterjee",
          company: "Stripe",
          role: "Financial Engineer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riya",
          posterImage:
            "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=600&h=400&fit=crop",
        },
        {
          id: 20,
          name: "Abhishek Kumar",
          company: "Zoom",
          role: "Video Engineer",
          profileImage:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhishek",
          posterImage:
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=600&h=400&fit=crop",
        },
        {
          id: 21,
          name: "Tanvi Shah",
          company: "Shopify",
          role: "E-commerce Developer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tanvi",
          posterImage:
            "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=600&h=400&fit=crop",
        },
        {
          id: 22,
          name: "Varun Bhatt",
          company: "Dropbox",
          role: "Storage Engineer",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Varun",
          posterImage:
            "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=600&h=400&fit=crop",
        },
        {
          id: 23,
          name: "Simran Kaur",
          company: "GitHub",
          role: "Developer Advocate",
          profileImage:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=Simran",
          posterImage:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop",
        },
        {
          id: 24,
          name: "Akash Trivedi",
          company: "Atlassian",
          role: "Agile Coach",
          profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Akash",
          posterImage:
            "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=600&h=400&fit=crop",
        },
      ];

      setSuccessStories(mockData.slice(0, count));
      setIsLoading(false);
    }, 500);
  };

  const handleLoadMore = () => {
    const newCount = visibleCount + 6;
    setVisibleCount(newCount);
    loadSuccessStories(newCount);

    // COMMENTED OUT: Real API call for load more
    // const loadMore = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch(`/api/success-stories?limit=6&offset=${visibleCount}`);
    //     const data = await response.json();
    //     setSuccessStories(prev => [...prev, ...data]);
    //   } catch (error) {
    //     console.error('Error loading more success stories:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // loadMore();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center mb-2 text-white">
          Success Stories
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Meet the achievers who landed their dream jobs
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {successStories.map((story, index) => (
          <motion.div
            key={`${story.id}-${index}`}
            variants={item}
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative"
          >
            {/* Poster Image with Overlay */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                src={story.posterImage}
                alt={`${story.name} success story`}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Company Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <p className="text-xs font-bold text-gray-800">
                  {story.company}
                </p>
              </motion.div>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1, rotate: 0 }}
                className="absolute top-3 right-3 bg-green-500 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="p-4 flex items-start gap-3 bg-gradient-to-br from-gray-50 to-white">
              <motion.img
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                src={story.profileImage}
                alt={story.name}
                className="w-12 h-12 rounded-full border-3 border-white shadow-md flex-shrink-0 ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors text-base">
                  {story.name}
                </h3>
                <p className="text-sm text-blue-600 font-semibold truncate mt-0.5 flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  {story.company}
                </p>
                <p className="text-sm text-gray-600 truncate mt-0.5">
                  {story.role}
                </p>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-100/50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {successStories.length < 24 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load More Success Stories</span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Showing count indicator */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-gray-500 mt-6 text-sm"
      >
        Showing {successStories.length} of 24 success stories
      </motion.p>
    </div>
  );
}
