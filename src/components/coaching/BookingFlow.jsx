"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment-timezone";

export default function BookingFlow({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [details, setDetails] = useState({ name: "", email: "" });
  const [timezone] = useState(moment.tz.guess());

  const slots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleComplete = () => {
    onComplete({
      time: {
        slot: selectedSlot,
        isoDate: moment(selectedDate).format(),
      },
      name: details.name,
      email: details.email,
      timezone,
    });
  };

  const today = moment();
  const upcomingDates = Array.from({ length: 7 }, (_, i) =>
    today.clone().add(i, "days")
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full lg:w-[90%] bg-white rounded-2xl shadow-lg p-6 md:p-8"
    >
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Calendar size={18} className="mr-2 text-blue-600" /> Select a Date
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
              {upcomingDates.map((date, index) => {
                const isSelected = selectedDate && moment(selectedDate).isSame(date, "day");
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    <div className="text-sm font-medium">{date.format("ddd")}</div>
                    <div className="text-lg font-bold">{date.format("D")}</div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={nextStep}
                disabled={!selectedDate}
                className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                  selectedDate
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Next <ChevronRight size={16} className="inline-block ml-1" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Clock size={18} className="mr-2 text-blue-600" /> Select a Time Slot
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {slots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    selectedSlot === slot
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50"
              >
                <ChevronLeft size={16} className="inline-block mr-1" /> Back
              </button>
              <button
                onClick={nextStep}
                disabled={!selectedSlot}
                className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                  selectedSlot
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Next <ChevronRight size={16} className="inline-block ml-1" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <User size={18} className="mr-2 text-blue-600" /> Enter Your Details
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={details.name}
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  value={details.email}
                  onChange={(e) => setDetails({ ...details, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Timezone: <span className="font-medium text-gray-700">{timezone}</span>
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50"
              >
                <ChevronLeft size={16} className="inline-block mr-1" /> Back
              </button>
              <button
                onClick={handleComplete}
                disabled={!details.name || !details.email}
                className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                  details.name && details.email
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm Booking
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
