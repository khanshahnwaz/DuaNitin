"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizProvider } from "@/components/QuizProvider";
import Quiz from "@/components/Quiz";

const FloatingQuizWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenQuiz, setHasSeenQuiz] = useState(false);

  // ✅ Check localStorage so quiz auto-opens only on first visit
  useEffect(() => {
    const seen = localStorage.getItem("seen_quiz_widget");
    if (!seen) {
      setIsOpen(true);
      setHasSeenQuiz(false);
      localStorage.setItem("seen_quiz_widget", "true");
    } else {
      setHasSeenQuiz(true);
    }
  }, []);

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 flex items-center gap-2"
        >
          <span>💬 Growth Quiz</span>
        </motion.button>
      )}

      {/* Modal overlay + Quiz */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Quiz modal */}
            <motion.div
              key="quiz-modal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 right-0 z-50 w-full sm:w-[480px] h-[90vh] sm:h-[80vh] bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between bg-indigo-600 text-white px-4 py-3">
                <h3 className="font-medium text-sm sm:text-base">Growth Finder Quiz</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-lg leading-none hover:opacity-80"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <QuizProvider>
                  <div className="p-4 sm:p-6">
                    <Quiz />
                  </div>
                </QuizProvider>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingQuizWidget;
