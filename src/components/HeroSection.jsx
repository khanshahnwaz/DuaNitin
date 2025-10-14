"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import profileImg from "../../public/profile.jpg"; // replace with your image
import FloatingBookingButton from "./FloatingBookingButton";
import SubscribeInput from "./SubscribeInput";

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">

      {/* Floating booking button */}
      {/* <FloatingBookingButton /> */}

      {/* Left Section (Text Content) */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl mt-10 md:mt-0 text-center md:text-left"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Stop Struggling <br />
          <span className="text-blue-700">Grow Your Revenue Now.</span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-5 text-lg text-gray-600 max-w-md mx-auto md:mx-0"
        >
          

Sales | GotoMarket | Product Marketing | Partnerships

Business Development in the US, India, Middle-East

        </motion.p>

        <SubscribeInput/>
      </motion.div>

      {/* Right Section (Profile Image) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex-shrink-0 mb-10 md:mb-0"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="relative rounded-xl overflow-hidden shadow-2xl"
        >
          <Image
            src={profileImg}
            alt="Profile"
            className="rounded-xl object-cover"
            width={400}
            height={400}
            priority
          />
          {/* Decorative glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/20 to-transparent pointer-events-none" />
        </motion.div>
      </motion.div>
    </section>
  );
}
