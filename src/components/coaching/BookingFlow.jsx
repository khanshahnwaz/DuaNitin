"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, ChevronLeft, ChevronRight, CornerDownRight } from "lucide-react";
import moment from "moment-timezone";

// Helper function to get the days of the month starting from the first day
const getDaysInMonth = (viewDate) => {
  const startOfMonth = moment(viewDate).startOf('month');
  const endOfMonth = moment(viewDate).endOf('month');
  // Calculate start day of the calendar grid (Sunday of the first week displayed)
  const startDay = moment(startOfMonth).startOf('week');
  // Calculate end day of the calendar grid (Saturday of the last week displayed)
  const endDay = moment(endOfMonth).endOf('week');
  
  const days = [];
  let currentDay = startDay.clone();
  
  while (currentDay.isBefore(endDay) || currentDay.isSame(endDay, 'day')) {
    days.push(currentDay.clone());
    currentDay.add(1, 'day');
  }
  return days;
};

// Animation variants for step transitions
const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function BookingFlow({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [details, setDetails] = useState({ name: "", email: "" });
  const [timezone] = useState(moment.tz.guess());

  // State for calendar view: initialized to today
  const [viewDate, setViewDate] = useState(moment().startOf('month')); 
  
  const slots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  const today = moment().startOf('day');

  // Computed days for the current calendar view
  const calendarDays = useMemo(() => getDaysInMonth(viewDate), [viewDate]);
  
  const nextMonth = () => setViewDate(viewDate.clone().add(1, 'month'));
  const prevMonth = () => setViewDate(viewDate.clone().subtract(1, 'month'));

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleDateSelection = (date) => {
    if (date.isBefore(today, 'day')) return; // Cannot select past dates
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot when date changes
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {/* STEP 1: DATE SELECTION (Calendar) */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Calendar size={20} className="mr-3 text-blue-600" /> Choose Your Date
            </h3>

            {/* Calendar Navigation Header */}
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevMonth}
                disabled={viewDate.isSameOrBefore(today, 'month')}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </motion.button>
              
              <h4 className="text-lg font-semibold text-gray-900">
                {viewDate.format("MMMM YYYY")}
              </h4>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextMonth}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>

            {/* Calendar Grid Day Names */}
            <div className="grid grid-cols-7 gap-1 text-center font-medium text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-gray-500 py-2">{day}</div>
                ))}
            </div>

            {/* Calendar Grid Dates */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => {
                const isInMonth = date.isSame(viewDate, 'month');
                const isPast = date.isBefore(today, 'day');
                const isSelected = selectedDate && date.isSame(selectedDate, "day");
                const isToday = date.isSame(today, 'day');
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleDateSelection(date)}
                    disabled={isPast || !isInMonth}
                    // Adding aesthetic motion and shadow effects
                    whileHover={{ scale: 1.05, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`h-10 flex items-center justify-center p-2 rounded-lg text-center transition-all duration-150 transform
                      ${!isInMonth ? 'text-gray-300 pointer-events-none' : ''}
                      ${isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                      ${isInMonth && !isPast && !isSelected ? 'bg-white text-gray-800 hover:bg-blue-50 hover:text-blue-700 border border-gray-200' : ''}
                      ${isSelected ? 'bg-blue-600 text-white shadow-md' : ''}
                      ${isToday && !isSelected ? 'border-2 border-blue-400 font-bold' : ''}
                    `}
                  >
                    {date.format("D")}
                  </motion.button>
                );
              })}
            </div>

            <div className="flex justify-end pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                disabled={!selectedDate}
                className={`px-6 py-3 rounded-xl font-semibold transition shadow-md flex items-center
                  ${selectedDate
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
              >
                Next (Select Time) <ChevronRight size={18} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: TIME SLOT SELECTION */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <Clock size={20} className="mr-3 text-blue-600" /> Select a Time Slot
            </h3>
            
            <p className="text-sm text-gray-600 flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <CornerDownRight size={16} className="text-blue-500 mr-2" />
                Selected Date: <span className="font-semibold text-blue-700 ml-1">{selectedDate.format("dddd, MMM D, YYYY")}</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {slots.map((slot, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 8px -2px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl border font-medium transition-all duration-200 shadow-sm
                    ${selectedSlot === slot
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                >
                  {slot}
                </motion.button>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                className="px-4 py-2 rounded-xl text-gray-600 border border-gray-300 hover:bg-gray-50 flex items-center"
              >
                <ChevronLeft size={18} className="mr-2" /> Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                disabled={!selectedSlot}
                className={`px-6 py-3 rounded-xl text-white font-semibold transition shadow-md flex items-center
                  ${selectedSlot
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
              >
                Next (Enter Details) <ChevronRight size={18} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: CONTACT DETAILS */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <User size={20} className="mr-3 text-blue-600" /> Enter Your Details
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={details.name}
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={details.email}
                  onChange={(e) => setDetails({ ...details, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                  placeholder="john@example.com"
                />
              </div>
              <p className="text-sm text-gray-500 pt-2">
                Your session time will be automatically adjusted for your timezone: <span className="font-semibold text-gray-700">{timezone}</span>
              </p>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                className="px-4 py-2 rounded-xl text-gray-600 border border-gray-300 hover:bg-gray-50 flex items-center"
              >
                <ChevronLeft size={18} className="mr-2" /> Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleComplete}
                disabled={!details.name || !details.email}
                className={`px-6 py-3 rounded-xl text-white font-semibold transition shadow-md
                  ${details.name && details.email
                    ? "bg-green-600 hover:bg-green-700" // Use a confirming color for final step
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
              >
                Go to Payment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
