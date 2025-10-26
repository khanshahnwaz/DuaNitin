"use client"
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MCQ from "./fields/MCQ";
import TextInputField from "./fields/TextInputField";

const QuestionCard = ({ question, value, onChange, onNext, onBack }) => {
  const [error, setError] = useState(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) setError(null);
    firstRender.current = false;
  }, [question.id, value]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter") {
        if (question.required && !value) {
          setError("Please choose an option or enter a response.");
          return;
        }
        onNext();
      }
      if (e.key === "Backspace" && (e.metaKey || e.ctrlKey)) {
        onBack();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, question.required, value, onBack]);

  const submit = () => {
    if (question.required && !value) {
      setError("Please choose an option or enter a response.");
      return;
    }
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <div>
        <h3 className="text-lg font-medium text-gray-800">{question.title}</h3>
        {question.subtitle && (
          <p className="text-sm text-gray-500">{question.subtitle}</p>
        )}
      </div>

      <div>
        {question.type === "mcq" && question.options && (
          <MCQ
            name={question.id}
            options={question.options}
            value={value ?? undefined}
            onChange={(v) => onChange(v)}
          />
        )}
        {question.type === "text" && (
          <TextInputField
            value={value ?? ""}
            onChange={(v) => onChange(v || null)}
          />
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100"
        >
          Back
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={submit}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
