"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import reviews from "@/data/reviews.json";

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(3);

  // Adjust perSlide dynamically
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
    const timer = setInterval(() => {
      next();
    }, 6000); // every 6s
    return () => clearInterval(timer);
  }, [index, totalSlides]);

  return (
    <section id="reviews" className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10"
        >
          WHAT SUBSCRIBERS{" "}
          <span className="text-blue-700">ARE SAYING</span>
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -150 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid gap-8 w-[90%] md:w-[80%] mx-auto"
              style={{
                gridTemplateColumns: `repeat(${perSlide}, minmax(0, 1fr))`,
              }}
            >
              {currentReviews.map((review) => (
                <motion.div
                  key={review.id}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { type: "spring", stiffness: 200 },
                  }}
                  className="bg-white shadow-lg hover:shadow-2xl rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between border border-gray-100"
                >
                  <div className="flex flex-col items-center">
                    <motion.img
                      src={review.image}
                      alt={review.name}
                      className="w-20 h-20 rounded-full mb-4 border-4 border-blue-500 shadow-md"
                      whileHover={{ rotate: 5 }}
                    />
                    <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.role}</p>
                    <div className="flex justify-center my-3 text-yellow-500 text-lg">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                    <p className="text-gray-700 mt-2 italic leading-relaxed">
                      "{review.review}"
                    </p>
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
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
          >
            ◀
          </motion.button>
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all"
          >
            ▶
          </motion.button>
        </div>
      </div>

      {/* Soft gradient glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-40 animate-pulse" />
    </section>
  );
}
