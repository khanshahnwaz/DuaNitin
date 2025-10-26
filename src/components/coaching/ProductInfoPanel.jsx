"use client";
import React from "react";
import { motion } from "framer-motion";
import { Minus, Clock, Gift } from "lucide-react";

const BOOKING_DURATION_MINS = 15;

export default function ProductInfoPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full lg:w-full"
    >
      <div className="flex items-center space-x-2 text-blue-700 mb-6">
        <Minus size={16} className="transform rotate-90" />
        <span className="text-sm font-medium">Nitin Dua</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
        Your First Discovery Call <br /> (Workshop / Coaching)
      </h2>

      <div className="flex items-center space-x-4 mb-6">
        <span className="text-2xl font-bold text-red-600">₹489</span>
        <span className="text-base line-through text-gray-400">₹4,499</span>
        <div className="flex items-center text-gray-500 ml-4">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">{BOOKING_DURATION_MINS} mins meeting</span>
        </div>
      </div>

      <div className="text-gray-700 space-y-4 text-sm">
        <p>
          Thank you for your interest in the workshop and/or coaching for
          yourself. <span className="font-semibold text-blue-700">Take a peek</span> at recent experiential workshops and shared experiences.
        </p>

        <p className="font-semibold">
          Book your first discovery call for the workshop and/or coaching directly.
        </p>

        <p className="font-bold text-gray-800 mt-4">What to expect:</p>
        <ol className="list-decimal list-inside space-y-2 pl-4 text-gray-700">
          <li>We discuss your career, mind, and health goals.</li>
          <li>I share insights about the workshop and coaching alignment.</li>
          <li>We explore whether our program is a mutual fit.</li>
        </ol>

        <p className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          If yes, this charge will be adjusted in the workshop/coaching fee if
          you sign up within 24 hours. Workshop details are{" "}
          <a href="#" className="text-blue-600 underline">
            here
          </a>
          .
        </p>

        <p className="text-red-600 font-medium">
          <Gift size={16} className="inline-block mr-1 align-text-bottom" /> If
          no, 50% money back if you didn’t get any value from our call.
        </p>

        <p className="mt-4">
          With gratitude, <br /> <strong>Nitin Dua</strong>
        </p>
      </div>
    </motion.div>
  );
}
