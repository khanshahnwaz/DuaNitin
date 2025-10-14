"use client";
import React from "react";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const credentials = [
  { name: "Stanford University", src: "https://placehold.co/100x40/B31B1B/FFFFFF?text=Stanford", link: "#" },
  { name: "Cardiff University", src: "https://placehold.co/100x40/003366/FFFFFF?text=Cardiff", link: "#" },
  { name: "PwC", src: "https://placehold.co/100x40/FF7800/FFFFFF?text=PwC", link: "#" },
  { name: "Innovaccer", src: "https://placehold.co/100x40/A933A9/FFFFFF?text=Innovaccer", link: "#" },
];

const parentVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const childVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutSection() {
  return (
    <section className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={parentVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:flex lg:gap-16"
        >

          {/* ================= LEFT SIDE ================= */}
          <motion.div className="lg:w-7/12">
            <motion.h2 variants={childVariant} className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
              About Nitin Dua
            </motion.h2>

            <motion.h3 variants={childVariant} className="text-4xl font-extrabold text-gray-900 mb-6">
              18+ Years of Leadership Experience in Global Markets
            </motion.h3>

            <motion.p
              variants={childVariant}
              className="text-lg text-gray-700 mb-6 leading-relaxed border-l-4 border-blue-200 pl-4"
            >
              Nitin Dua is a co-founder of Hilfey Tech. He focuses on the growth of organisations and people.
              He is ex-CMO for SAG in Health, a Product Marketing Leader at Innovaccer,
              and has partnered in $1M to $100M ARR journeys across the US and India.
            </motion.p>

            <motion.p variants={childVariant} className="text-lg text-gray-600 mb-8 leading-relaxed">
              He has consulted Fortune 500 leaders at BlueCross, Kaiser, ABMS, and Anthem through PwC US Health Advisory.
              A <strong>Stanford Electrical Engineering graduate</strong> and cognitive AI researcher, he understands
              professional and cultural nuances across the US, UAE, and India.
            </motion.p>

            {/* LinkedIn CTA */}
            <motion.a
              variants={childVariant}
              href="https://www.linkedin.com/in/nitindua/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
            >
              <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Connect with Nitin Dua on LinkedIn
            </motion.a>
          </motion.div>

          {/* ================= RIGHT SIDE ================= */}
          <motion.div className="lg:w-5/12 mt-12 lg:mt-0">
            <motion.h4 variants={childVariant} className="text-xl font-bold text-gray-800 mb-6">
              Education & Key Roles
            </motion.h4>

            {/* Credentials Logos */}
            <motion.div variants={parentVariant} className="grid grid-cols-2 gap-4 mb-10 p-6 bg-gray-100 rounded-xl shadow-inner">
              {credentials.map((cred) => (
                <motion.div
                  key={cred.name}
                  variants={childVariant}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center h-16 bg-white rounded-lg shadow-md cursor-pointer"
                >
                  <img src={cred.src} alt={cred.name} className="h-8 max-w-full object-contain" />
                </motion.div>
              ))}
            </motion.div>

            {/* Coaching Focus Card */}
            <motion.div variants={childVariant} className="p-6 bg-blue-600 text-white rounded-xl shadow-2xl">
              <h4 className="text-xl font-bold mb-3">Wholistic Integral Preventive (WIP) Approach</h4>
              <p className="text-base font-light mb-4">
                He coaches founders and leaders to transform careers, mental health, and wellbeing using his WIP model.
              </p>
              <a
                href="https://www.youtube.com/@healthwithnitindua"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-white text-blue-600 font-semibold text-sm rounded-full hover:bg-gray-100 transition-colors"
              >
                Explore YouTube Channel
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
