// components/fields/TextInputField.tsx
import React from "react";



const TextInputField= ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className="w-full min-h-[88px] p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Type your answer..."}
    />
  );
};

export default TextInputField;
