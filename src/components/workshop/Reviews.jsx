"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import reviews from "@/data/workshopReviews.json"


export default function ProfessionalReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(3);

  // Adjust perSlide dynamically based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setPerSlide(1);
      else if (window.innerWidth < 1024) setPerSlide(2);
      else setPerSlide(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(reviews.length / perSlide);
  const next = () => setIndex((prev) => (prev + 1) % totalSlides);
  const prev = () => setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const start = index * perSlide;
  const currentReviews = reviews.slice(start, start + perSlide);

  // Auto-slide every few seconds
  useEffect(() => {
    // Check if totalSlides > 1 to avoid unnecessary interval
    if (totalSlides > 1) {
        const timer = setInterval(() => {
            next();
        }, 6000); // every 6s
        return () => clearInterval(timer);
    }
    return undefined;
  }, [index, totalSlides, perSlide]);


  return (
    <section 
      id="professional-reviews" 
      className="relative bg-white py-24 px-6 overflow-hidden border-t border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10"
        >
          Hear From a Few More <span className="text-blue-700">Professionals Like You</span>
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center min-h-[400px] my-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 150 * (index > (index - 1) % totalSlides ? 1 : -1) }} // Directional animation
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -150 * (index > (index - 1 + totalSlides) % totalSlides ? 1 : -1) }} // Directional animation
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="grid gap-8 w-full mx-auto"
              style={{
                gridTemplateColumns: `repeat(${perSlide}, minmax(0, 1fr))`,
              }}
            >
              {currentReviews.map((review) => (
                <motion.div
                  key={review.id}
                  whileHover={{
                    scale: 1.03, // More subtle professional lift
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2), 0 5px 10px -5px rgba(0,0,0,0.05)", // Blue tint shadow
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-gray-50 shadow-lg rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between h-full border-t-4 border-blue-500 text-left" // Focus on clean lines and light background
                >
                  <p className="text-gray-700 text-lg italic leading-relaxed mb-6">
                    &ldquo;{review.review}&rdquo;
                  </p>
                  
                  {/* Reviewer Name and Role (Bottom aligned) */}
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{review.role || "Verified Professional"}</p>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-10">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.15, backgroundColor: "#2563EB" }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center disabled:opacity-50"
            disabled={totalSlides <= 1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
          </motion.button>
          
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.15, backgroundColor: "#2563EB" }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg transition-all flex items-center justify-center disabled:opacity-50"
            disabled={totalSlides <= 1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
          </motion.button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalSlides }).map((_, i) => (
                <motion.button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${i === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                />
            ))}
        </div>

      </div>
    </section>
  );
}
