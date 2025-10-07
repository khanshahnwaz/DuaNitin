// components/BookingModalContent.jsx
"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, CalendarIcon, ClockIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Mock data (keep this separate or import it)
const mockTimezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'Europe/London', label: 'London Time (GMT)' },
    { value: 'Asia/Kolkata', label: 'India Time (IST)' }
];
const mockSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

// Framer Motion variants for smooth slide/fade
const stepVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
};

const BookingModalContent = ({ onClose }) => {
    const [step, setStep] = useState(1);
    const [booking, setBooking] = useState({
        date: '',
        timezone: '',
        slot: ''
    });

    // --- Steps (Keep the step components inside the main component to easily access state) ---
    const DateStep = () => (
        // ... (The content from the previous DateStep component)
        <motion.div
            key="step1"
            variants={stepVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.4 }}
            className="p-8"
        >
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center border-b pb-3">
                <CalendarIcon className="w-7 h-7 mr-3 text-blue-700" />
                1. Select a Date
            </h3>
            
            <input
                type="date"
                value={booking.date}
                onChange={(e) => setBooking({...booking, date: e.target.value})}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-100 transition duration-200 text-lg shadow-inner"
            />

            <button
                onClick={() => setStep(2)}
                disabled={!booking.date}
                className={`mt-10 w-full py-4 px-4 rounded-xl text-white font-bold text-lg transition duration-300 shadow-md ${
                    booking.date ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                Next: Choose Time Zone <ChevronRightIcon className="w-5 h-5 ml-2 inline-block" />
            </button>
        </motion.div>
    );

    const TimeZoneStep = () => (
        // ... (The content from the previous TimeZoneStep component)
        <motion.div
            key="step2"
            variants={stepVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.4 }}
            className="p-8"
        >
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center border-b pb-3">
                <MapPinIcon className="w-7 h-7 mr-3 text-blue-700" />
                2. Select Your Time Zone
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {mockTimezones.map(tz => (
                    <motion.button
                        key={tz.value}
                        onClick={() => setBooking({...booking, timezone: tz.value})}
                        className={`w-full text-left p-4 rounded-lg border-2 transition duration-200 shadow-sm ${
                            booking.timezone === tz.value
                                ? 'bg-blue-50 border-blue-700 text-blue-800 font-bold ring-2 ring-blue-700'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {tz.label}
                    </motion.button>
                ))}
            </div>

            <button
                onClick={() => setStep(3)}
                disabled={!booking.timezone}
                className={`mt-10 w-full py-4 px-4 rounded-xl text-white font-bold text-lg transition duration-300 shadow-md ${
                    booking.timezone ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                Next: Choose Time Slot <ChevronRightIcon className="w-5 h-5 ml-2 inline-block" />
            </button>
        </motion.div>
    );

    const SlotStep = () => (
        // ... (The content from the previous SlotStep component)
        <motion.div
            key="step3"
            variants={stepVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.4 }}
            className="p-8"
        >
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center border-b pb-3">
                <ClockIcon className="w-7 h-7 mr-3 text-blue-700" />
                3. Choose a Time Slot
            </h3>

            <div className="grid grid-cols-3 gap-4 max-h-60 overflow-y-auto pr-2">
                {mockSlots.map(slot => (
                    <motion.button
                        key={slot}
                        onClick={() => setBooking({...booking, slot})}
                        className={`p-3 rounded-lg border-2 transition duration-200 font-semibold ${
                            booking.slot === slot
                                ? 'bg-blue-700 text-white shadow-xl ring-4 ring-blue-300'
                                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-blue-100 hover:border-blue-500'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {slot}
                    </motion.button>
                ))}
            </div>

            <button
                onClick={() => setStep(4)}
                disabled={!booking.slot}
                className={`mt-10 w-full py-4 px-4 rounded-xl text-white font-bold text-lg transition duration-300 shadow-lg ${
                    booking.slot ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
                Confirm Appointment!
            </button>
        </motion.div>
    );
    
    const ConfirmationStep = () => (
        // ... (The content from the previous ConfirmationStep component)
        <motion.div
            key="step4"
            variants={stepVariants}
            initial="initial"
            animate="in"
            transition={{ duration: 0.4 }}
            className="p-8 text-center"
        >
            <motion.svg 
                className="mx-auto h-20 w-20 text-green-500" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </motion.svg>
            <h3 className="mt-4 text-3xl font-extrabold text-gray-900">Booking Confirmed! 🎉</h3>
            <p className="mt-2 text-lg text-gray-600">
                You're all set for your **Growth Consultation**. A calendar invite has been sent.
            </p>
            
            <div className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-700 rounded-lg text-left shadow-inner">
                <p className="text-base text-gray-700 font-medium">**Date:** {booking.date}</p>
                <p className="text-base text-gray-700 font-medium">**Time:** {booking.slot}</p>
                <p className="text-base text-gray-700 font-medium">**Time Zone:** {mockTimezones.find(tz => tz.value === booking.timezone)?.label}</p>
            </div>
            
            <button
                onClick={onClose}
                className="mt-8 w-full py-3 px-4 rounded-xl text-white font-semibold bg-blue-700 hover:bg-blue-800 transition duration-300 shadow-lg"
            >
                Close Window
            </button>
        </motion.div>
    );

    const renderStep = () => {
        switch (step) {
            case 1: return <DateStep />;
            case 2: return <TimeZoneStep />;
            case 3: return <SlotStep />;
            case 4: return <ConfirmationStep />;
            default: return <DateStep />;
        }
    };

    return (
        <div className="relative">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 z-50 transition"
                aria-label="Close modal"
            >
                <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-200">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-blue-700 rounded-r-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(step / 4) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
            
            {/* Step Content Area */}
            <div className="relative min-h-[400px] overflow-hidden">
                <AnimatePresence mode='wait'>
                    {renderStep()}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BookingModalContent;