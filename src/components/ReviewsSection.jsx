"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import reviews from "@/data/reviews.json";

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [perSlide, setPerSlide] = useState(3);

  // Adjust reviews per slide based on screen size
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

  return (
    <section className="bg-white py-20 px-6">
      <div
        className="max-w-7xl mx-auto rounded-2xl p-12 text-center relative overflow-hidden"
        
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          WHAT SUBSCRIBERS <span className="text-blue-700">ARE SAYING</span>
        </h2>

        {/* Carousel Container */}
        <div className="relative min-h-[450px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -150 }}
              transition={{ duration: 0.6 }}
              className="grid gap-8 w-[80%] mx-auto"
              style={{
                gridTemplateColumns: `repeat(${perSlide}, minmax(0, 1fr))`
              }}
            >
              {currentReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white shadow-xl rounded-xl p-8 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-blue-500"
                    />
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-500">{review.role}</p>
                    <div className="flex justify-center my-2 text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                    <p className="text-gray-700 mt-4 italic">"{review.review}"</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={prev}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
