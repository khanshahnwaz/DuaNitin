"use client";
import { motion } from "framer-motion";

export default function SubscribeSection() {
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
          Subscribe to the <span className="font-semibold">Creator Science</span> newsletter
          for real-life experiments, expert interviews, and
          evidence-backed advice every week.
        </p>

        {/* Input + Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-4 mb-6"
        >
          <input
            type="email"
            placeholder="youremail@website.com"
            className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-sm"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all w-full md:w-auto shadow-md hover:shadow-lg">
            Subscribe
          </button>
        </motion.div>

        {/* Avatars + Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex justify-center items-center gap-3"
        >
          <div className="flex -space-x-2">
            {[
              "men/32",
              "women/44",
              "men/65",
              "men/71",
              "women/68",
            ].map((img, i) => (
              <img
                key={i}
                src={`https://randomuser.me/api/portraits/${img}.jpg`}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            ))}
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
