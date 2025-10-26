// components/QuizProvider.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from "react";




const QuizContext = createContext(undefined);

// Sample question set with branching
const QUESTIONS = [
  {
    id: "intro",
    type: "text",
    title: "Welcome to Nitin Dua's Growth Finder",
    subtitle:
      "A 2-minute quiz to discover whether Consulting, Coaching, Workshops, or 1-on-1 sessions suit you best. Click start when ready.",
    required: false,
  },
  {
    id: "user_type",
    type: "mcq",
    title: "What best describes you right now?",
    options: [
      { id: "business_owner", label: "I run a business or startup" },
      { id: "individual", label: "I’m a professional/entrepreneur (coaching)" },
      { id: "exploring", label: "Exploring opportunities" },
    ],
    required: true,
    branching: {
      business_owner: "biz_challenge",
      individual: "personal_goal",
      exploring: "commitment",
    },
  },
  {
    id: "biz_challenge",
    type: "mcq",
    title: "What’s your biggest business challenge?",
    options: [
      { id: "leads", label: "Generating consistent leads" },
      { id: "scaling", label: "Scaling operations" },
      { id: "team", label: "Team performance / hiring" },
      { id: "systems", label: "Systems & processes" },
    ],
    required: true,
    branching: {
      leads: "experience",
      scaling: "experience",
      team: "experience",
      systems: "experience",
    },
  },
  {
    id: "personal_goal",
    type: "mcq",
    title: "What do you most want to improve?",
    options: [
      { id: "mindset", label: "Mindset & motivation" },
      { id: "leadership", label: "Leadership skills" },
      { id: "balance", label: "Work-life balance" },
      { id: "income", label: "Income growth" },
    ],
    required: true,
    branching: {
      mindset: "experience",
      leadership: "experience",
      balance: "experience",
      income: "experience",
    },
  },
  {
    id: "experience",
    type: "mcq",
    title: "How long have you been in this role / business?",
    options: [
      { id: "lt1", label: "Less than 1 year" },
      { id: "1to3", label: "1–3 years" },
      { id: "3to7", label: "3–7 years" },
      { id: "7plus", label: "7+ years" },
    ],
    required: true,
    branching: {
      lt1: "commitment",
      "1to3": "commitment",
      "3to7": "commitment",
      "7plus": "commitment",
    },
  },
  {
    id: "commitment",
    type: "mcq",
    title: "What kind of support do you prefer?",
    options: [
      { id: "one_on_one", label: "1-on-1 deep coaching/consulting" },
      { id: "workshop", label: "Small group workshop" },
      { id: "self", label: "Online/self-paced" },
      { id: "not_sure", label: "Not sure — want to explore" },
    ],
    required: true,
    branching: {
      one_on_one: "open_text",
      workshop: "open_text",
      self: "open_text",
      not_sure: "open_text",
    },
  },
  {
    id: "open_text",
    type: "text",
    title: "In one sentence, describe what ‘growth’ means to you right now.",
    required: false,
  },
  {
    id: "lead_capture",
    type: "text",
    title: "Almost done — enter your contact details to see your personalized plan",
    required: true,
  },
  {
    id: "results",
    type: "text",
    title: "Results",
    required: false,
  },
];

const QUESTION_MAP= QUESTIONS.reduce((acc, q) => {
  acc[q.id] = q;
  return acc;
}, {} );

const VISIT_ORDER = ["intro", "user_type"]; // start path; actual navigation dynamic

export const QuizProvider= ({
  children,
}) => {
  const [answers, setAnswers] = useState(() => {
    try {
      const raw = typeof window !== "undefined" && localStorage.getItem("nda_quiz");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [currentQuestionId, setCurrentQuestionId] = useState("intro");
  const [totalVisited, setTotalVisited] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem("nda_quiz", JSON.stringify(answers));
    } catch {}
  }, [answers]);

  useEffect(() => {
    if (currentQuestionId && !totalVisited.includes(currentQuestionId)) {
      setTotalVisited((t) => [...t, currentQuestionId]);
    }
  }, [currentQuestionId]);

  const setAnswer = (qid, value) =>
    setAnswers((prev) => ({ ...prev, [qid]: value }));

  const restart = () => {
    setAnswers({});
    setCurrentQuestionId("intro");
    setTotalVisited([]);
    try {
      localStorage.removeItem("nda_quiz");
    } catch {}
  };

  // Determine progress as visited/ total steps (approx)
  const progress =
    totalVisited.length / Math.max(QUESTIONS.length - 2, 1); // normalize

  const getNextByBranching = (qid, chosenOptionId) => {
    const q = QUESTION_MAP[qid];
    if (!q) return null;
    if (q.branching && chosenOptionId) {
      const next = q.branching[chosenOptionId];
      if (next === null) return null;
      return next;
    }
    // default linear fallthrough: next question in QUESTIONS array
    const idx = QUESTIONS.findIndex((x) => x.id === qid);
    if (idx >= 0 && idx < QUESTIONS.length - 1) {
      return QUESTIONS[idx + 1].id;
    }
    return null;
  };

  const next = () => {
    if (!currentQuestionId) return;
    const currentQ = QUESTION_MAP[currentQuestionId];
    if (!currentQ) return;

    // if MCQ - use branching based on stored answer
    let chosen = answers[currentQuestionId] ?? undefined;
    const nextId = getNextByBranching(currentQuestionId, chosen) || "results";
    setCurrentQuestionId(nextId);
  };

  const back = () => {
    if (!currentQuestionId) return;
    // go to last visited that is not current
    const idx = totalVisited.lastIndexOf(currentQuestionId);
    if (idx > 0) {
      setCurrentQuestionId(totalVisited[idx - 1]);
      // trim visited
      setTotalVisited((t) => t.slice(0, idx));
    } else {
      setCurrentQuestionId("intro");
    }
  };

  return (
    <QuizContext.Provider
      value={{
        questions: QUESTIONS,
        currentQuestionId,
        setCurrentQuestionId,
        answers,
        setAnswer,
        next,
        back,
        restart,
        progress,
        totalVisited,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const c = useContext(QuizContext);
  if (!c) throw new Error("useQuiz must be used inside QuizProvider");
  return c;
};
