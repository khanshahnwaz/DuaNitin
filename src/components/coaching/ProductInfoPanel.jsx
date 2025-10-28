"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, Gift, DollarSign, Zap } from "lucide-react"; 

const BOOKING_DURATION_MINS = 15;

export default function ProductInfoPanel({amount}) {
  
  return (
    // Updated container styling for a more premium, card-like look
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full p-6 sm:p-8 bg-white rounded-xl shadow-2xl border-t-4 border-blue-600 transform hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Coach/Branding Section */}
      <div className="flex items-center space-x-2 text-blue-700 mb-6 border-b pb-4">
        <Zap size={20} className="text-blue-500" />
        <span className="text-base font-semibold tracking-wider uppercase">
          Coaching with Nitin Dua
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-snug mb-4">
        Your First Discovery Call
      </h2>

      {/* Pricing and Duration Section - Made more impactful */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center space-x-2">
          {/* <DollarSign size={20} className="text-green-600" /> */}
          <span className="text-3xl font-bold text-green-700">₹{amount}</span>
          <span className="text-base line-through text-gray-400">₹4,499</span>
        </div>
        
        <div className="flex items-center text-gray-600 ml-0 sm:ml-auto">
          <Clock size={16} className="mr-2 text-blue-500" />
          <span className="text-sm font-medium">{BOOKING_DURATION_MINS} minute session</span>
        </div>
      </div>

      {/* Description and Expectations */}
      <div className="text-gray-700 space-y-5">
        <p className="leading-relaxed">
          Thank you for your interest in the **Workshop and Coaching**. This is your opportunity to connect directly and see if our partnership is the right fit.
        </p>

        <p className="font-bold text-gray-800 text-lg border-b pb-2">
          What to expect in your call:
        </p>
        <ul className="list-none space-y-3">
          <li className="flex items-start">
            <span className="text-blue-500 mr-3 text-lg font-bold">1.</span>
            <span>We'll discuss your specific **career, mindset, and health goals**.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3 text-lg font-bold">2.</span>
            <span>I'll share detailed insights on how the program **aligns with your needs**.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3 text-lg font-bold">3.</span>
            <span>We'll confirm if this program is a **mutual fit** for long-term success.</span>
          </li>
        </ul>

        {/* Bonus/Incentive Box */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-inner text-blue-800 text-sm font-medium">
          <p className="font-semibold mb-1">Fee Adjustment Guarantee:</p>
          <p>
            The ₹{amount} fee will be **fully adjusted** in your final workshop/coaching payment if you sign up within 24 hours of the discovery call.
            <a href="#" className="text-blue-600 hover:text-blue-700 underline ml-1">
              (View Workshop Details)
            </a>
          </p>
        </div>

        {/* Risk-Reversal/Value Guarantee */}
        <p className="text-red-600 font-medium flex items-center pt-2">
          <Gift size={18} className="inline-block mr-2" /> 
          **50% Money-Back Guarantee** if you feel you didn’t gain any value from our conversation.
        </p>

        <p className="pt-4 text-gray-900 font-semibold">
          With gratitude, <br /> Nitin Dua
        </p>
      </div>
    </motion.div>
  );
}
