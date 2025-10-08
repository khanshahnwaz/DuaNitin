"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {  Bars3Icon,XMarkIcon } from "@heroicons/react/24/outline";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
  { name: "Home", id: "hero" },
  { name: "Compare", id: "comparison" },
  { name: "Subscribe", id: "subscribe" },
  { name: "FAQ", id: "faq" },
  { name: "Reviews", id: "reviews" },
];

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center py-4 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-extrabold text-blue-600 tracking-tight"
        >
          Nitin Dua
        </motion.h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link, index) => (
            <motion.li
            onClick={() => scrollToSection(link.id)}
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
             <button
        onClick={() => scrollToSection(link.id)}
        className="hover:text-blue-600 transition-colors"
      >
        {link.name}
      </button>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow"
        >
          Subscribe
        </motion.button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white shadow-inner overflow-hidden"
          >
            <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-gray-700">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-blue-600 transition-colors text-lg"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow"
              >
                Subscribe
              </motion.button>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
