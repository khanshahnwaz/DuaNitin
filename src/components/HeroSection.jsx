"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import profileImg from "../../public/profile.jpg"; // replace with your image
import FloatingBookingButton from "./FloatingBookingButton"; // Assuming this is present
import SubscribeInput from "./SubscribeInput"; // Assuming this is present

// --- Animation Variants ---

// Parent container for sequential animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
    },
  },
};

// Animation for the main text elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Animation for the credentials list
const listVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

// --- Custom Components for Enhanced Animation ---

// Component for a clean, sequential typewriter effect
const AnimatedText = ({ text }) => {
  const letters = Array.from(text);

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={itemVariants}>
          {letter === " " ? "\u00A0" : letter} {/* Preserve spaces */}
        </motion.span>
      ))}
    </motion.span>
  );
};


export default function HeroSection() {
  const credentials = [
    "Ex-Stanford Brain & Medical Researcher",
    "Founder, Hilfey Tech",
    "Growth Partner to Founders (PwC US, Innovaccer, Twin)",
  ];

  return (
    <section 
      id="hero" 
      className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 md:py-32 bg-gradient-to-br from-white via-blue-50 to-blue-200 overflow-hidden min-h-[600px]"
    >

      {/* Floating booking button (Optional) */}
      {/* <FloatingBookingButton /> */}

      {/* Left Section (Text Content) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-xl mt-10 md:mt-0 text-center md:text-left"
      >
        <motion.h1 
            variants={itemVariants}
            className="text-7xl lg:text-8xl font-black text-gray-900 leading-none mb-4"
        >
          Nitin Dua
        </motion.h1>
        
        {/* Main Value Proposition */}
        <motion.h2 
            variants={itemVariants} 
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-700 leading-tight mb-2"
        >
          Unlocking <span className="text-gray-900">Clarity & Peak Performance.</span>
        </motion.h2>

        {/* Coach Role Tagline */}
        <motion.h3 
            variants={itemVariants}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-blue-600 font-semibold mb-6 italic"
        >
            <AnimatedText text="Career & Mind Health Coach to Professionals"/>
        </motion.h3>


        {/* Credentials / Proof of Authority */}
        <motion.div 
            variants={itemVariants}
            transition={{ delay: 0.4 }}
            className="my-8 space-y-2 max-w-md mx-auto md:mx-0"
        >
            <p className="text-lg font-bold text-gray-700 mb-3">
                My background is your advantage:
            </p>
            <ul className="list-none space-y-2 pl-0">
                {credentials.map((cred, index) => (
                    <motion.li
                        key={index}
                        initial="hidden"
                        animate="visible"
                        variants={listVariants}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-md text-gray-600 flex items-start"
                    >
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{cred}</span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
        
        {/* Call to Action Section */}
        <motion.div
            variants={itemVariants}
            transition={{ delay: 0.9 }}
            className="mt-10"
        >
             <p className="text-lg text-gray-700 font-medium mb-3">
                Ready to elevate your career and mental bandwidth? Join my private newsletter:
            </p>
            <SubscribeInput/>
        </motion.div>
      </motion.div>

      {/* Right Section (Profile Image) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="flex-shrink-0 mb-10 md:mb-0 relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.03, rotate: 1 }} // More subtle hover effect
          transition={{ type: "spring", stiffness: 100 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform hover:shadow-blue-500/50"
        >
          <Image
            src={profileImg}
            alt="Nitin Dua Profile Image"
            className="rounded-3xl object-cover grayscale hover:grayscale-0 transition-all duration-500" // Add grayscale for a sophisticated look
            width={450} // Slightly larger image
            height={450}
            priority
          />
          {/* Subtle Accent Ring */}
          <div className="absolute inset-0 border-4 border-blue-500/50 rounded-3xl pointer-events-none" />
          {/* Decorative glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/30 to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>
    </section>
  );
}