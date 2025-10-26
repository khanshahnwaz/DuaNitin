"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const params = useSearchParams();
  const name = params.get("name");
  const time = params.get("time");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-6">
      <h1 className="text-3xl font-bold text-emerald-700 mb-3">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-700 text-lg">
        Thank you, <span className="font-semibold">{name}</span>!
      </p>
      <p className="text-gray-600 mt-2">
        Your meeting is booked for <span className="font-semibold">{time}</span>.
      </p>
      <a
        href="/coaching"
        className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-green-50 text-emerald-600">
          <p className="text-lg font-medium animate-pulse">Loading your booking...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
