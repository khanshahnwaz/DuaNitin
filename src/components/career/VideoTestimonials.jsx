import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Sample Testimonial Data (Updated with message) ---
const testimonials = [
  { 
    id: 1, 
    name: "Mohar Mishra", 
    vimeoId: "1005601977", // Placeholder ID - REPLACE WITH ACTUAL VIDEO ID
    message: "If your company is struggling for Revenue Growth, Marketing and needs help,Nitin Dua is your best reliable choice.He is the brightest professional and human I've worked with",
    role: "Cofounder Inovaare Inc. (US Health)"
  }, 
  { 
    id: 2, 
    name: "Sarah K.", 
    vimeoId: "1005601977", // Placeholder ID - REPLACE WITH ACTUAL VIDEO ID
    message: "The blending of mind health and business strategy is what sets this coaching apart. I achieved my quarterly revenue goal two weeks early.",
    role: "Tech Founder"
  },
  { 
    id: 3, 
    name: "Ben L.", 
    vimeoId: "1005601977", // Placeholder ID - REPLACE WITH ACTUAL VIDEO ID
    message: "I felt stuck and confused for months. Nitin provided a clear, actionable roadmap. Highly recommend for any seasoned professional.",
    role: "Senior Consultant, PwC"
  }
];

// --- Animation Variants ---
const carouselVariants = {
  enter: (direction) => ({
    // Items slide in from the side, slightly scaled down
    x: direction > 0 ? 500 : -500,
    opacity: 0,
    scale: 0.98, 
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    // Spring physics for smooth, natural movement
    transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 15 },
  },
  exit: (direction) => ({
    // Items exit to the opposite side they came from
    zIndex: 0,
    x: direction < 0 ? 500 : -500,
    opacity: 0,
    scale: 0.98, 
    transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 15 },
  }),
};

// --- Main Component ---
export default function VideoTestimonialSection() {
  // index tracks the currently visible item, direction tracks the movement (1 for next, -1 for prev)
  const [[index, direction], setIndex] = useState([0, 0]);
  
  const perSlide = 1; // Fixed: Only one video visible at a time
  const totalItems = testimonials.length;

  // --- Carousel Navigation Logic (Single Item Movement) ---
  const nextSlide = () => {
    // Loop back to start (index 0) if at the last item
    if (index === totalItems - 1) {
      setIndex([0, 1]); 
    } else {
      setIndex([index + 1, 1]);
    }
  };

  const prevSlide = () => {
    if (index === 0) {
      // Loop to the end 
      setIndex([totalItems - 1, -1]);
    } else {
      setIndex([index - 1, -1]);
    }
  };
  
  // Calculate the currently visible slice of testimonials (always just 1 item)
  const visibleTestimonials = testimonials.slice(index, index + perSlide);

  return (
    // Section without horizontal padding for edge-to-edge look
    <section id="video-testimonials" className="relative bg-gray-50 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10 px-6">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
        >
          See The Transformation: <span className="text-indigo-600">Video Testimonials</span>
        </motion.h2>
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           viewport={{ once: true }}
           className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
        >
            Hear directly from professionals who have achieved clarity and peak performance through coaching.
        </motion.p>
      </div>

      {/* Carousel Container - Full width track */}
      <div className="relative flex items-center justify-center w-full">
          
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              // Minimum height to prevent container collapse/jumping (FLICKER FIX)
              className="grid gap-8 w-full px-4 sm:px-8 lg:px-12 min-h-[500px]" 
              style={{
                gridTemplateColumns: `repeat(1, minmax(0, 1fr))`,
              }}
            >
              {visibleTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-white rounded-xl shadow-xl border border-gray-200 transition-all duration-300 overflow-hidden text-left mx-auto max-w-6xl"
                >
                  
                  <div className="lg:flex">
                    {/* Video Player Area (60% width on large screens) */}
                    <div className="relative pt-[56.25%] bg-gray-900 lg:w-3/5 lg:pt-0 lg:h-96 flex-shrink-0"> 
                      <iframe
                        src={`https://player.vimeo.com/video/${testimonial.vimeoId}?autoplay=0&loop=0&byline=0&portrait=0&title=0`}
                        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                        title={testimonial.name}
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen
                      ></iframe>
                    </div>
                    
                    {/* Text Message and Name (40% width on large screens) */}
                    <div className="p-6 lg:w-2/5 flex flex-col justify-center">
                      <p className="text-gray-700 italic mb-4 leading-relaxed line-clamp-6">
                          &ldquo;{testimonial.message}&rdquo;
                      </p>
                      <p className="text-lg font-bold text-gray-900 mt-4">
                          {testimonial.name}
                      </p>
                      <p className="text-sm text-indigo-600">
                          {testimonial.role}
                      </p>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center gap-6 mt-12">
          {/* Previous Button */}
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.95 }}
            className={`transition-all duration-300 p-3 rounded-full shadow-lg bg-indigo-600 text-white hover:bg-indigo-700`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          {/* Next Button */}
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.95 }}
            className={`transition-all duration-300 p-3 rounded-full shadow-lg bg-indigo-600 text-white hover:bg-indigo-700`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
