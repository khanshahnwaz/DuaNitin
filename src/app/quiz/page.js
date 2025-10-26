// pages/quiz.tsx
import React from "react";
import { QuizProvider } from "@/components/QuizProvider";
import Quiz from "@/components/Quiz";

const QuizPage = () => {
  return (
    <QuizProvider>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <Quiz />
        </div>
      </div>
    </QuizProvider>
  );
};

export default QuizPage;
