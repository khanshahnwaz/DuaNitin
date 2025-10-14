// components/ClientLogos.js

import React from "react";

const clientLogos = [
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
  "/logo4.png",
  "/logo5.png",
  // Add your image paths here (public folder or CDN links)
];

export default function ClientLogos() {
  return (
    <div className="mt-16">
      <p className="text-gray-500 text-sm mb-4 text-center">Trusted By:</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {clientLogos.map((src, index) => (
          <div
            key={index}
            className="w-16 h-16 sm:w-20 sm:h-20 flex justify-center items-center p-2 rounded-lg bg-white shadow-md"
          >
            <img
              src={src}
              alt={`Client Logo ${index + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
