// components/ProgressBar.tsx
"use client"
import React from "react";
import { motion } from "framer-motion";

const ProgressBar= ({ value }) => {
  const percent = Math.round(Math.min(100, Math.max(0, value * 100)));
  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120 }}
          className="h-2 bg-gradient-to-r from-indigo-500 to-indigo-400"
        />
      </div>
      <div className="text-xs text-gray-500 text-right mt-1">{percent}%</div>
    </div>
  );
};

export default ProgressBar;
