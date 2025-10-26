// components/ResultCard.tsx
"use client"

import React, { useMemo, useState } from "react";
import { Answers, useQuiz } from "./QuizProvider";
import { motion } from "framer-motion";



const ResultCard= ({ answers, onRestart, onBook }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const rec = useMemo(() => {
    // simple rules to pick recommendation
    const ut = answers["user_type"];
    const commit = answers["commitment"];
    if (ut === "business_owner") return { title: "Business Growth Consultancy", cta: "Book a Free Call" };
    if (ut === "individual") return { title: "1-on-1 Coaching", cta: "Apply for Coaching" };
    if (commit === "workshop") return { title: "Growth Workshop", cta: "Register for Workshop" };
    return { title: "Strategy Session", cta: "Book a Call" };
  }, [answers]);

  const submitLead = async (e) => {
    e?.preventDefault();
    setError(null);
    if (!email || !name) {
      setError("Please enter your name and email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, answers }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed");
      setSent(true);
    } catch (err) {
      setError(err?.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div layout className="space-y-4">
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
        <h3 className="text-lg font-semibold text-indigo-700">{rec.title}</h3>
        <p className="text-sm text-indigo-700/80">
          Based on your answers, we recommend this path. Get a short personalized roadmap and an invite to a relevant workshop or 1-on-1.
        </p>
      </div>

      {!sent ? (
        <form onSubmit={submitLead} className="grid gap-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              className="p-3 border border-gray-200 rounded-md"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="p-3 border border-gray-200 rounded-md"
              placeholder="Email address"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            className="p-3 border border-gray-200 rounded-md"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {loading ? "Sending..." : "Get My Roadmap"}
            </button>
            <button
              type="button"
              onClick={onBook}
              className="px-4 py-2 border rounded-md text-gray-700"
            >
              {rec.cta}
            </button>
            <button type="button" onClick={onRestart} className="px-3 py-2 text-sm text-gray-500">
              Restart
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 rounded-md bg-green-50 border border-green-100">
          <h4 className="font-semibold text-green-700">You're on the list ✅</h4>
          <p className="text-sm text-green-700/80">We've emailed your roadmap and next steps.</p>
          <div className="pt-3">
            <button onClick={onBook} className="px-4 py-2 bg-indigo-600 text-white rounded-md">
              Book a Call
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResultCard;
