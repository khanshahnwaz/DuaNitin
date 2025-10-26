"use client"

import React, { useCallback, useState } from "react";
import { useQuiz } from "./QuizProvider";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import ResultCard from "./ResultCard";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
const Quiz = () => {
    const router=useRouter();
  const {
    questions,
    currentQuestionId,
    setCurrentQuestionId,
    answers,
    setAnswer,
    next,
    back,
    restart,
    progress,
  } = useQuiz();

  const currentQuestion = questions.find((q) => q.id === currentQuestionId) || null;

  const [showLeadForm, setShowLeadForm] = useState(false);

  const onStart = useCallback(() => {
    setCurrentQuestionId("user_type");
  }, [setCurrentQuestionId]);

  const isResults = currentQuestionId === "results";

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Growth Finder</h2>
            <p className="text-sm text-gray-500">
              Quick quiz to find the best growth path: Consulting, Coaching, Workshops or a 1-on-1.
            </p>
          </div>
          <div className="w-40">
            <ProgressBar value={progress} />
          </div>
        </div>

        {/* Wrapper to keep layout stable */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {!currentQuestion && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: "absolute", width: "100%" }}
              >
                <p className="text-sm text-gray-500">No question selected.</p>
              </motion.div>
            )}

            {currentQuestion && currentQuestion.id === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{ position: "absolute", width: "100%" }}
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">{currentQuestion.title}</h3>
                  <p className="text-gray-600">{currentQuestion.subtitle}</p>
                  <div className="pt-4">
                    <button
                      onClick={onStart}
                      className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      Start Quiz
                    </button>
                    <button
                      onClick={() => setCurrentQuestionId("user_type")}
                      className="ml-3 text-sm text-gray-500 underline"
                    >
                      Skip intro
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentQuestion && currentQuestion.id !== "intro" && !isResults && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{ position: "absolute", width: "100%" }}
              >
                <QuestionCard
                  question={currentQuestion}
                  value={answers[currentQuestion.id] ?? null}
                  onChange={(val) => setAnswer(currentQuestion.id, val)}
                  onNext={() => {
                    if (currentQuestion.id === "open_text") {
                      setCurrentQuestionId("lead_capture");
                    } else {
                      next();
                    }
                  }}
                  onBack={back}
                />
              </motion.div>
            )}

            {isResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ position: "absolute", width: "100%" }}
              >
                <ResultCard
                  answers={answers}
                  onRestart={restart}
                  onBook={() =>
                    router.push('/coaching')
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
