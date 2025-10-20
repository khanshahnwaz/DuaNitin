"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubscribeInput from "./SubscribeInput";

export default function SubscribeSection() {
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
      .catch(() => {
        toast.error("❌ Subscription failed. Try again.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section
      id="subscribe"
      style={{
        backgroundImage:
          "radial-gradient(circle, #dbeafe 2px, transparent 2px)",
        backgroundSize: "10px 10px",
      }}
      className="relative bg-white py-20 px-6 rounded-3xl my-16 overflow-hidden"
    >
      <ToastContainer position="bottom-right" autoClose={3000} />

      {/* Background Glow Effects */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-blue-300 rounded-full blur-3xl opacity-40 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Join <span className="text-blue-700">65,000+</span> Creators
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
          We Empower You Skills to Transform
Your Career, Mind Health Confusion.
Train Mind for Clarity & Progress ❤
        </p>

        <SubscribeInput/>

        {/* Avatars + Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex justify-center items-center gap-3"
        >
          <div className="flex -space-x-2">
            {["men/32", "women/44", "men/65", "men/71", "women/68"].map(
              (img, i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${img}.jpg`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
              )
            )}
          </div>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            ★★★★★
            <span className="text-gray-600 ml-2">from 466 reviews</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
