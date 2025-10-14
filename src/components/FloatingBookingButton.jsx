"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import BookingModalContent from "./BookingModalContent";

const FloatingBookingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [autoOpened, setAutoOpened] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  // Auto-open modal after 10 seconds (only once)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsOpen(true);
  //     setAutoOpened(true);
  //   }, 10000); // open after 10 seconds
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      {/* Floating Button (with bounce animation) */}
      <motion.button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-700 text-white shadow-xl z-[1000] transition-transform duration-300 hover:scale-110 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        animate={{
          y: [0, -100, 0, 0, 0], // noticeable bounce
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 3,
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Book a Consultation"
      >
        <CalendarDaysIcon className="w-8 h-8" />
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleModal}
          >
            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg lg:max-w-3xl mx-4 z-[10000] overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Optional Message on top */}
              {autoOpened && (
                <div className="bg-blue-100 text-blue-800 text-center py-3 font-medium text-lg border-b border-blue-300">
                  Book a slot with us
                </div>
              )}

              {/* Your Booking Form */}
              <BookingModalContent onClose={toggleModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingBookingButton;
