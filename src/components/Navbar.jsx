"use client";
import { useState } from "react";
// Replaced next/link import with a mock or conditional use of <a> to fix compilation issue
// If this component were in a standard Next.js project, 'next/link' would be used.
// For compatibility in this environment, we will use <a> tags, which is safer.
// import Link from "next/link"; 
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// Define a common link component (Link or <a>) to handle internal and external links
const NavLink = ({ href, children, isExternal, onClick, className }) => {
  // Use a standard <a> tag for broader compatibility.
  // In a real Next.js app, we'd use <Link> for internal routes.
  return (
    <a
      href={href}
      onClick={onClick}
      target={isExternal ? "_blank" : "_self"} 
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </a>
  );
};


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Link Definitions: The 'id' field is now used as the universal destination path.
  const navLinks = [
    { name: "Home", id: "/" },                     // Anchor Link
    { name: "Career Accelerator", id: "/career" },    // Internal Next.js Page
    { name: "Subscribe", id: "subscribe" },          // Anchor Link
    { name: "Coaching", id: "https://topmate.io/nitindua" }, // External URL
    {name:"Contact",id:"/contact"},
    { name: "Reviews", id: "reviews" },              // Anchor Link
  ];

  /**
   * Helper to determine the true href and link type for rendering.
   * @param {string} destination - The value from link.id
   * @returns {object} { href: string, isExternal: boolean, isAnchor: boolean }
   */
  const getLinkProps = (destination) => {
    const isExternal = destination.startsWith('http');
    const isAnchor = !isExternal && !destination.startsWith('/');
    
    // For Next.js page paths (like /career), we keep the destination as the href
    // For anchors, we prepend #
    const href = isAnchor ? `#${destination}` : destination;
    
    return {
      href,
      isExternal,
      isAnchor,
    };
  };

  // Function to handle smooth scrolling for anchor links specifically
  const handleAnchorClick = (e, linkId) => {
    const { isAnchor } = getLinkProps(linkId);
    
    if (isAnchor) {
      e.preventDefault(); // Stop default hash navigation for smooth scroll
      const section = document.getElementById(linkId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // Close mobile menu regardless of link type
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
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
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navLinks.map((link, index) => {
            const { href, isExternal } = getLinkProps(link.id);
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <NavLink
                  href={href}
                  isExternal={isExternal}
                  // Handle anchor scrolling via onClick
                  onClick={(e) => handleAnchorClick(e, link.id)}
                  className="hover:text-blue-600 transition-colors py-1 block 
                             after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
                             after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full"
                >
                  {link.name}
                </NavLink>
              </motion.li>
            );
          })}
        </ul>

        {/* Desktop Button - Assuming this is the 'Book a Call' action, linked to #subscribe */}
        <NavLink 
          href="/contact"
          onClick={(e) => handleAnchorClick(e, '/contact')}
          className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block"
          >
            Contact Me
          </motion.span>
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none p-1 rounded-md hover:bg-gray-100 transition-colors"
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-inner overflow-hidden"
          >
            <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-gray-700">
              {navLinks.map((link, index) => {
                const { href, isExternal } = getLinkProps(link.id);
                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      href={href}
                      isExternal={isExternal}
                      // Use the unified click handler for both types of navigation and menu closing
                      onClick={(e) => handleAnchorClick(e, link.id)}
                      className="hover:text-blue-600 transition-colors text-lg block px-4 py-2"
                    >
                      {link.name}
                    </NavLink>
                  </motion.li>
                );
              })}

              <NavLink 
                href="/contact"
                onClick={(e) => handleAnchorClick(e, '/contact')}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                Contact Me
              </NavLink>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
