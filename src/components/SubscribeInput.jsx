"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

export default function SubscribeInput() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        "service_1z2ffbb",
        "template_9weugu8",
        { subscriber_email: email },
        "x64GPk72l9gRWDnoa"
      )
      .then(() => {
        toast.success("🎉 Subscribed Successfully!");
        setEmail("");
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        toast.error("❌ Subscription failed. Check EmailJS template.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <form
      onSubmit={handleSubscribe}
      className="flex flex-col md:flex-row items-center gap-4"
    >
      <input
        type="email"
        placeholder="youremail@website.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black shadow-sm"
      />
      <button
        type="submit"
        disabled={isSending}
        className={`bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-all w-full md:w-auto ${
          isSending && "opacity-50 cursor-not-allowed"
        }`}
      >
        {isSending ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
