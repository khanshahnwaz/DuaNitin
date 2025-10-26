// components/fields/MCQ.tsx
import React from "react";
import { Option } from "../QuizProvider";
import { motion } from "framer-motion";



const MCQ= ({ options, value, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const isActive = value === opt.id;
        return (
          <motion.button
            key={opt.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(opt.id)}
            className={`text-left p-3 rounded-lg border transition-shadow focus:outline-none ${
              isActive
                ? "bg-indigo-50 border-indigo-300 shadow-sm"
                : "bg-white border-gray-200 hover:shadow-sm"
            }`}
            aria-pressed={isActive}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`font-medium ${isActive ? "text-indigo-700" : "text-gray-800"}`}>
                  {opt.label}
                </div>
              </div>
              <div className="ml-3 text-sm text-gray-400">{/* reserved for icons */}</div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default MCQ;
