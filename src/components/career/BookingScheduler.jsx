"use client";
import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const CalendlyEmbed = () => {
  return (
    <iframe
      src="https://calendly.com/shahnwazkhan2007/30min?hide_event_type_details=1&hide_landing_page_details=1"
      width="100%"
      height="700"
      frameBorder="0"
      scrolling="no"
      className="rounded-xl"
    ></iframe>
  );
};

export default function BookingScheduler() {
  return (
    <section className="py-16 bg-gray-50" id="book-call">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between gap-10">

          {/* LEFT PANEL - Heading & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 max-w-lg"
          >
            <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Book Your <br /> Free Audit Call!
            </h2>

            {/* INFO CARD */}
            <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 mt-10 relative">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 rotate-45 bg-blue-700 text-white text-xs font-bold py-1 px-4 rounded-b-lg shadow-md">
                Connect With Nitin
              </div>

              <div className="flex items-start space-x-3 mb-4">
                <img
                  src="https://placehold.co/40x40/1E3A8A/FFFFFF?text=ND"
                  alt="Nitin Dua"
                  className="rounded-full w-10 h-10"
                />
                <div>
                  <p className="font-semibold text-gray-900">Nitin Dua</p>
                  <p className="text-sm text-blue-700">Discovery / Free Consult</p>
                </div>
              </div>

              <p className="text-sm text-gray-500 flex items-center mb-3">
                <ClockIcon className="w-4 h-4 mr-2" /> 25 min
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Web conferencing details provided upon confirmation.
              </p>

              <p className="text-sm text-gray-700">
                Please send us your business goals and challenges. In this 25-min discovery or consulting call, we’ll discuss your goals, current stage, challenges, and how we can help your growth journey.
              </p>
            </div>
          </motion.div>

          {/* RIGHT PANEL - Calendly Embed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-7/12 max-w-lg lg:max-w-none bg-white p-2 rounded-xl shadow-2xl border border-gray-100 min-h-[700px] overflow-hidden"
          >
            <CalendlyEmbed />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
