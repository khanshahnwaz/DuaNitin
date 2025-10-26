"use client"
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { IndianRupee, DollarSign, Loader2, CheckCircle, Clock, Gift, Minus, Calendar, User, Mail, Zap, ChevronRight, ChevronLeft, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, where, getDocs, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import moment from 'moment-timezone';


// CzfmdvB6E9PGTdh6F34wCBgS test key secret (Moved to server.js)
// --- CONFIGURATION ---
const RAZORPAY_KEY_ID = "rzp_test_RXf2GhDbpubKA8"; // Your public key ID
const BACKEND_API_URL = "http://localhost:3000/api/create-order"; // <<< Change this to your actual server endpoint
const AMOUNTS = {
    INR: 489,
    USD: 6,
};
const BOOKING_DURATION_MINS = 15;
const FIREBASE_COLLECTION = "scheduled_calls";
const TIMEZONES = [
    { value: 'Asia/Kolkata', label: 'IST (Asia/Kolkata)' },
    { value: 'America/New_York', label: 'EST (America/New York)' },
    { value: 'Europe/London', label: 'GMT (Europe/London)' },
];

// --- FIREBASE SETUP ---
let db = null;
let auth = null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

if (Object.keys(firebaseConfig).length > 0) {
    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        // Ensure authentication state is handled for Firestore security rules
        const setupAuth = async () => {
            if (typeof __initial_auth_token !== 'undefined') {
                await signInWithCustomToken(auth, __initial_auth_token);
            } else {
                await signInAnonymously(auth);
            }
        };
        setupAuth();
    } catch (error) {
        console.error("Firebase initialization failed:", error);
    }
} else {
    console.warn("Firebase config not available. Scheduled meetings will not be saved.");
}

// --- UTILITY: Dynamic Script Loader Hook ---
const useRazorpayScript = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => setLoaded(true);
        script.onerror = () => {
            console.error("Razorpay SDK failed to load.");
            console.log("Payment gateway failed to load. Please refresh the page.");
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return loaded;
};

// --- COMPONENT: PRODUCT DESCRIPTION PANEL (Left Side) ---
const ProductInfoPanel = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-full"
        >
            {/* Back Link and Profile */}
            <div className="flex items-center space-x-2 text-blue-700 mb-6">
                <Minus size={16} className="transform rotate-90" />
                <span className="text-sm font-medium">Nitin Dua</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                Your First Discovery Call <br /> (Workshop / Coaching)
            </h2>
            
            {/* Pricing and Time */}
            <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-bold text-red-600">₹489</span>
                <span className="text-base line-through text-gray-400">₹4,499</span>
                <div className="flex items-center text-gray-500 ml-4">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{BOOKING_DURATION_MINS} mins meeting</span>
                </div>
            </div>

            {/* Description Text */}
            <div className="text-gray-700 space-y-4 text-sm">
                <p>
                    Thank you for your interest in the workshop and/or coaching for yourself. 
                    <span className="font-semibold text-blue-700"> Take a peek</span> of a recent experiential workshop with professionals and watch 
                    experiences shared by some of them. I empower transformation in skills 
                    and growth in **Career, Mind and Holistic Health**.
                </p>

                <p className="font-semibold">
                    Book your first discovery call for the workshop and/or coaching directly
                </p>
                
                <p className="font-bold text-gray-800 mt-4">What to expect in this call:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4 text-gray-700">
                    <li>We connect discuss your career (and / or mind, health) goals, current challenges and requirements. You share and I listen to You.</li>
                    <li>I share 1 insights and a bit about the why/what of this workshop and coaching to align your career, mind and health.</li>
                    <li>We explore whether our workshop and/or coaching is a mutual fit? .</li>
                </ol>

                <p className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    If yes, this charge will be **adjusted in the workshop or coaching fee** if you sign up for within 24 hours of our call. Workshop details are <a href="#" className="text-blue-600 underline">here</a>, join the <a href="#" className="text-blue-600 underline">waitlist</a>.
                </p>

                <p className="text-red-600 font-medium">
                    <Gift size={16} className="inline-block mr-1 align-text-bottom" /> If no, I will give **50% money back** if you didn't get any value from our call.
                </p>

                <p className="mt-4">
                    With gratitude your co-believer and coach,<br />
                    **Nitin Dua**
                </p>
                
                <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                    <p className="font-bold">PS:</p>
                    <p>1. Portion of my service fees paid here will go for paying for videos at <a href="https://www.youtube.com/@healthwithnitindua" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.youtube.com/@healthwithnitindua</a> to continue serving for free and empowering people worldwide in their career and mind health journeys.</p>
                    <p>2. Another portion will go to Topmate.</p>
                </div>

            </div>
        </motion.div>
    );
};


// --- PAYMENT SUMMARY / BUTTONS (Step 3) ---

const PaymentSummary = ({ 
    currency, setCurrency, displayAmount, currencySymbol,
    handlePayment, isRazorpayLoaded, isLoading, paymentStatus, bookingDetails, onBack
}) => {
    const handleCurrencyChange = (newCurrency) => {
        if (isLoading) return;
        setCurrency(newCurrency);
    };

    const isReadyToPay = bookingDetails.time && bookingDetails.name && bookingDetails.email;

    let buttonText = 'Confirm and Pay';
    if (!isReadyToPay) {
        buttonText = 'Complete Booking Details';
    } else if (!isRazorpayLoaded) {
        buttonText = 'Loading Payment Gateway...';
    } else if (isLoading) {
        buttonText = 'Processing...';
    } else if (paymentStatus === 'success') {
        buttonText = 'Payment Successful!';
    } else if (paymentStatus === 'error') {
        buttonText = 'Payment Failed. Retry?';
    }

    // Platform fee logic
    const platformFee = currency === 'INR' ? 0.10 : 0.12;
    const totalDisplayAmount = (parseFloat(displayAmount) + platformFee).toFixed(2);
    
    return (
        <div className="p-6 bg-white rounded-xl w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Zap size={20} className="mr-2 text-emerald-500" /> Confirm & Pay
            </h3>

            {/* Selected Booking Info */}
            <div className="mb-6 space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-700">Booking Details:</h4>
                <p className="text-sm text-gray-700 flex items-center">
                    <Calendar size={14} className="mr-2 text-blue-500" /> 
                    {bookingDetails.time ? moment(bookingDetails.time.isoDate).format('ddd, MMM D') + ' at ' + bookingDetails.time.slot : 'Time not selected'}
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                    <Globe size={14} className="mr-2 text-blue-500" /> 
                    {bookingDetails.timezone}
                </p>
                <p className="text-sm text-gray-700 flex items-center">
                    <User size={14} className="mr-2 text-blue-500" /> 
                    {bookingDetails.name || 'Name missing'}
                </p>
            </div>


            {/* Currency Selector */}
            <div className="mb-4 flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span className="text-gray-700 font-semibold text-sm">Select Currency:</span>
                <div className="flex bg-white rounded-lg p-1 shadow-inner">
                    <button
                        onClick={() => handleCurrencyChange('INR')}
                        disabled={isLoading}
                        className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                            currency === 'INR' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                        } disabled:opacity-50`}
                    >
                        <IndianRupee size={14} />
                        <span>INR</span>
                    </button>
                    <button
                        onClick={() => handleCurrencyChange('USD')}
                        disabled={isLoading}
                        className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                            currency === 'USD' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                        } disabled:opacity-50`}
                    >
                        <DollarSign size={14} />
                        <span>USD</span>
                    </button>
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-b border-gray-200 pb-3 mb-3">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>1 x Discovery Call (Workshop / Coaching)</span>
                    <span>{currencySymbol}{displayAmount}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Platform Fee</span>
                    <span>{currencySymbol}{platformFee.toFixed(2)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold text-lg text-gray-800 mb-4">
                <span>Total:</span>
                <span className="text-2xl font-extrabold text-emerald-600">
                    {currencySymbol}{totalDisplayAmount}
                </span>
            </div>
            
            {/* Payment Button */}
            <button
                onClick={handlePayment}
                disabled={!isReadyToPay || !isRazorpayLoaded || isLoading || paymentStatus === 'success'}
                className={`w-full py-3 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 
                    ${!isReadyToPay || !isRazorpayLoaded || isLoading ? 'bg-gray-400 cursor-not-allowed' : ''}
                    ${paymentStatus === 'success' ? 'bg-emerald-600 hover:bg-emerald-700 cursor-default' : ''}
                    ${paymentStatus === 'error' ? 'bg-red-500 hover:bg-red-600' : ''}
                    ${paymentStatus === null && isReadyToPay ? 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700' : ''}
                `}
            >
                {isLoading && <Loader2 size={20} className="animate-spin" />}
                {paymentStatus === 'success' && <CheckCircle size={20} />}
                {buttonText}
            </button>
            
            {/* Back button and status */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={onBack}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled={isLoading || paymentStatus === 'success'}
                >
                    <ChevronLeft size={16} className="mr-1" /> Back to details
                </button>

                {paymentStatus === 'success' && (
                    <span className="text-sm text-emerald-600 font-medium flex items-center">
                         <CheckCircle size={16} className="mr-1" /> Paid
                    </span>
                )}
            </div>
        </div>
    );
};


// --- CUSTOM SCHEDULING FLOW (Right Side, Multi-Step) ---

const BookingFlow = ({
    currency, setCurrency, handlePayment, isRazorpayLoaded, isLoading, paymentStatus,
    bookingDetails, setBookingDetails, isScheduled, setIsScheduled, scheduledMeetings
}) => {
    const [step, setStep] = useState(1); // 1: Select Time, 2: Contact Info, 3: Payment
    const [currentMonth, setCurrentMonth] = useState(moment());
    
    // Derived values for PaymentSummary
    const currentAmount = AMOUNTS[currency];
    const displayAmount = (currentAmount / (currency === 'INR' ? 1 : 1)).toFixed(2);
    const currencySymbol = currency === 'INR' ? '₹' : '$';

    const getAvailableDates = () => {
        const startOfMonth = currentMonth.clone().startOf('month');
        const endOfMonth = currentMonth.clone().endOf('month');
        const today = moment();
        const dates = [];

        for (let day = startOfMonth; day.isSameOrBefore(endOfMonth); day.add(1, 'day')) {
            if (day.isSameOrAfter(today.startOf('day'))) { // Only show today and future dates
                dates.push(day.clone());
            }
        }
        return dates;
    };

    const getAvailableSlots = (date) => {
        // Mocking business hours (9 AM to 5 PM IST)
        const businessStartHour = 9; // 9:00 AM IST
        const businessEndHour = 17;  // 5:00 PM IST
        const slots = [];
        const istTimezone = 'Asia/Kolkata';

        // Base date/time for iteration (in IST)
        let slotTimeIST = date.clone().tz(istTimezone).hour(businessStartHour).minute(0).second(0);
        const businessEnd = date.clone().tz(istTimezone).hour(businessEndHour).minute(0).second(0);
        const now = moment().tz(istTimezone);

        while (slotTimeIST.isSameOrBefore(businessEnd.clone().subtract(BOOKING_DURATION_MINS, 'minutes'))) {
            if (slotTimeIST.isAfter(now)) {
                // Check if this slot is already booked
                const isBooked = scheduledMeetings.some(meeting => 
                    moment(meeting.isoDate).isSame(slotTimeIST)
                );
                
                if (!isBooked) {
                    // Convert IST slot time to the user's selected timezone
                    const userTime = slotTimeIST.clone().tz(bookingDetails.timezone || istTimezone);
                    slots.push({
                        isoDate: slotTimeIST.toISOString(), // Always store base time in ISO
                        displaySlot: userTime.format('hh:mm A'),
                    });
                }
            }
            slotTimeIST.add(BOOKING_DURATION_MINS, 'minutes');
        }
        return slots;
    };

    const handleTimezoneChange = (e) => {
        const newTimezone = e.target.value;
        setBookingDetails(prev => ({ ...prev, timezone: newTimezone, time: null })); // Reset time selection on TZ change
    };

    const handleDateSelect = (date) => {
        setBookingDetails(prev => ({ ...prev, selectedDate: date.format('YYYY-MM-DD'), time: null })); // Reset slot on date change
    };

    const handleSlotSelect = (isoDate, displaySlot) => {
        setBookingDetails(prev => ({ ...prev, time: { isoDate, slot: displaySlot }, step: 2 }));
        setStep(2);
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setStep(3);
    };

    const renderCalendar = () => {
        const dates = getAvailableDates();
        const today = moment().format('YYYY-MM-DD');
        const selectedDate = bookingDetails.selectedDate || today;
        const selectedMoment = moment(selectedDate);
        const slots = selectedDate ? getAvailableSlots(selectedMoment) : [];
        
        const firstDayOfMonth = currentMonth.clone().startOf('month').day();
        const emptyCells = Array(firstDayOfMonth).fill(null);
        const daysInMonth = currentMonth.daysInMonth();
        const monthDays = Array.from({ length: daysInMonth }, (_, i) => currentMonth.clone().date(i + 1));
        
        const daysToShow = [...emptyCells, ...monthDays].filter(day => day === null || day.isSameOrAfter(moment().startOf('day'), 'day'));

        const handlePrevMonth = () => {
            if (currentMonth.isAfter(moment().startOf('month'), 'month')) {
                setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
            }
        };

        const handleNextMonth = () => {
            setCurrentMonth(currentMonth.clone().add(1, 'month'));
        };

        return (
            <div className="space-y-6">
                {/* Timezone Selector */}
                <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <Globe size={16} className="mr-1 text-gray-500" /> Select Your Timezone
                    </label>
                    <select
                        id="timezone"
                        value={bookingDetails.timezone}
                        onChange={handleTimezoneChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                        <option value="">Select Timezone</option>
                        {TIMEZONES.map(tz => (
                            <option key={tz.value} value={tz.value}>
                                {tz.label} ({moment().tz(tz.value).format('Z')})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Calendar Grid */}
                {bookingDetails.timezone && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50" 
                                disabled={currentMonth.isSameOrBefore(moment(), 'month')}>
                                <ChevronLeft size={20} />
                            </button>
                            <h4 className="font-semibold text-gray-800 text-lg">
                                {currentMonth.format('MMMM YYYY')}
                            </h4>
                            <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <span key={day}>{day}</span>)}
                        </div>

                        <div className="grid grid-cols-7 gap-2">
                            {monthDays.map(day => {
                                const dayKey = day.format('YYYY-MM-DD');
                                const isPast = day.isBefore(moment(), 'day');
                                const isSelected = selectedDate === dayKey;
                                const isAvailable = day.isSameOrAfter(moment(), 'day');

                                return (
                                    <button
                                        key={dayKey}
                                        onClick={() => isAvailable && handleDateSelect(day)}
                                        disabled={isPast || !isAvailable}
                                        className={`p-2 rounded-full text-sm font-medium transition-all duration-150
                                            ${isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                                            ${isAvailable && !isSelected ? 'text-gray-700 hover:bg-blue-100' : ''}
                                            ${isSelected ? 'bg-blue-600 text-white shadow-md' : ''}
                                        `}
                                        style={{ gridColumnStart: day.date() === 1 ? firstDayOfMonth + 1 : 'auto' }}
                                    >
                                        {day.date()}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
                
                {/* Time Slot Selector */}
                {bookingDetails.selectedDate && bookingDetails.timezone && (
                    <div className="space-y-3 mt-6 p-4 border border-gray-200 rounded-xl">
                        <p className="font-semibold text-gray-700">
                            Available Time Slots for {moment(bookingDetails.selectedDate).format('dddd, MMM D')}:
                            <span className="text-xs text-gray-500 block">All times shown in your local timezone ({bookingDetails.timezone})</span>
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {slots.length > 0 ? (
                                slots.map(slot => (
                                    <button
                                        key={slot.isoDate}
                                        onClick={() => handleSlotSelect(slot.isoDate, slot.displaySlot)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm
                                            ${bookingDetails.time?.isoDate === slot.isoDate ? 'bg-emerald-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'}
                                        `}
                                    >
                                        {slot.displaySlot}
                                    </button>
                                ))
                            ) : (
                                <p className="col-span-3 text-center text-gray-500">No slots available for this date.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Render Step 2: Enter Contact Info
    const renderStep2 = () => (
        <>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <User size={20} className="mr-2 text-blue-500" /> 2. Enter Contact Details
            </h3>
            <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            id="name"
                            type="text"
                            value={bookingDetails.name}
                            onChange={(e) => setBookingDetails(prev => ({ ...prev, name: e.target.value }))}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your Name"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            id="email"
                            type="email"
                            value={bookingDetails.email}
                            onChange={(e) => setBookingDetails(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>
                
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center text-sm text-gray-500 hover:text-gray-700 font-medium"
                    >
                        <ChevronLeft size={16} className="mr-1" /> Change Time
                    </button>
                    <button
                        type="submit"
                        disabled={!bookingDetails.name || !bookingDetails.email}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
                    >
                        Proceed to Payment <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>
            </form>
        </>
    );

    // Render Step 3: Payment Summary
    const renderStep3 = () => (
        <PaymentSummary 
            currency={currency}
            setCurrency={setCurrency}
            currentAmount={currentAmount}
            displayAmount={displayAmount}
            currencySymbol={currencySymbol}
            handlePayment={handlePayment}
            isRazorpayLoaded={isRazorpayLoaded}
            isLoading={isLoading}
            paymentStatus={paymentStatus}
            bookingDetails={bookingDetails}
            onBack={() => setStep(2)}
        />
    );
    
    // Render Confirmation Screen
    const renderConfirmation = () => (
        <div className="text-center p-8">
            <CheckCircle size={64} className="mx-auto text-emerald-500 mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-lg text-gray-600 mb-6">
                Your payment was successful and your call has been scheduled.
            </p>
            <div className="bg-emerald-50 p-4 rounded-lg inline-block text-left text-sm font-medium text-emerald-800">
                <p>Date: {moment(bookingDetails.time.isoDate).format('ddd, MMM D')}</p>
                <p>Time (Local): {bookingDetails.time.slot}</p>
                <p>Timezone: {bookingDetails.timezone}</p>
                <p>We've sent a confirmation email to: **{bookingDetails.email}**</p>
            </div>
        </div>
    );

    return (
        <div 
            className="w-full bg-white p-6 rounded-xl shadow-2xl border border-gray-100 min-h-[700px] overflow-hidden"
        >
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold text-gray-700">Booking Steps</h2>
                <div className="flex space-x-1 text-sm font-medium">
                    <span className={`px-2 py-1 rounded-full ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</span>
                    <span className={`px-2 py-1 rounded-full ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
                    <span className={`px-2 py-1 rounded-full ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</span>
                </div>
            </div>

            {isScheduled ? renderConfirmation() : (
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 1 && renderCalendar()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </motion.div>
            )}
        </div>
    );
}

// --- MAIN APPLICATION COMPONENT (App) ---
export default function App() {
    const isRazorpayLoaded = useRazorpayScript();
    
    // Firebase Data State
    const [scheduledMeetings, setScheduledMeetings] = useState([]);
    
    // Payment State
    const [currency, setCurrency] = useState('INR');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'error'
    const [isScheduled, setIsScheduled] = useState(false); // Final state of the booking

    // Booking Details State
    const [bookingDetails, setBookingDetails] = useState({
        timezone: moment.tz.guess(), // Auto-guess user's local timezone
        selectedDate: moment().format('YYYY-MM-DD'),
        time: null,
        name: '',
        email: '',
    });

    // --- FIRESTORE DATA HOOK ---
    useEffect(() => {
        if (!db) return;

        // Fetch scheduled calls from public collection
        const callsRef = collection(db, `/artifacts/${appId}/public/data/${FIREBASE_COLLECTION}`);
        const q = query(callsRef, orderBy('isoDate', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const meetings = [];
            snapshot.forEach(doc => {
                meetings.push(doc.data());
            });
            setScheduledMeetings(meetings);
        }, (error) => {
            console.error("Error fetching scheduled meetings:", error);
        });

        return () => unsubscribe();
    }, []);

    // Derived current amount
    const currentAmount = AMOUNTS[currency];

    // --- FIRESTORE SAVE LOGIC ---
    const saveBookingToFirestore = useCallback(async (paymentId, orderId) => {
        if (!db || !auth.currentUser) {
            console.error("Firestore not initialized or user not authenticated.");
            return;
        }

        const callId = `call_${Date.now()}`;
        const callsRef = doc(db, `/artifacts/${appId}/public/data/${FIREBASE_COLLECTION}`, callId);

        const bookingData = {
            id: callId,
            name: bookingDetails.name,
            email: bookingDetails.email,
            timezone: bookingDetails.timezone,
            isoDate: bookingDetails.time.isoDate, // IST time for database consistency
            displayTime: bookingDetails.time.slot, // Time in user's timezone for display
            currency: currency,
            amount: currentAmount,
            paymentId: paymentId,
            orderId: orderId, // Store the official Razorpay Order ID
            scheduledAt: serverTimestamp(),
            userId: auth.currentUser.uid,
        };

        try {
            await setDoc(callsRef, bookingData);
            console.log("Booking successfully saved to Firestore with ID:", callId);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }, [bookingDetails, currency, currentAmount]);


    const handlePayment = useCallback(async () => {
        if (!isRazorpayLoaded || isLoading || !bookingDetails.time || !bookingDetails.name) return;

        setIsLoading(true);
        setPaymentStatus(null);
        
        // 1. CALCULATE TOTAL AMOUNT (in smallest unit)
        const smallestUnitMultiplier = currency === 'INR' ? 100 : 100;
        const fee = currency === 'INR' ? 10 : 12;
        const totalAmountInSmallestUnit = (currentAmount * smallestUnitMultiplier) + fee;

        const serverPayload = {
            amount: totalAmountInSmallestUnit, 
            currency: currency,
        };

        let orderData;
        try {
            // 2. CALL BACKEND TO CREATE OFFICIAL ORDER ID
            const response = await fetch(BACKEND_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serverPayload)
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(errorBody.error || `Failed to create order. Status: ${response.status}`);
            }
            orderData = await response.json(); // Contains order_id, amount, currency, key_id

        } catch (error) {
            console.error("Backend Order Creation Failed:", error.message);
            setPaymentStatus('error');
            setIsLoading(false);
            return;
        }

        // 3. SETUP RAZORPAY OPTIONS using the official Order ID
        const options = {
            key: orderData.key_id, // Use the Key ID returned from the server (Public Key)
            amount: orderData.amount, // Amount in smallest unit from server
            currency: orderData.currency,
            name: "Discovery Call (Workshop / Coaching)",
            description: `Booking for ${bookingDetails.name} at ${bookingDetails.time.slot}`,
            order_id: orderData.order_id, 
            handler: function (response) {
                console.log("Payment Success. Response:", response);
                // CRITICAL: Save to database after payment success (In production, you'd verify this server-side first!)
                saveBookingToFirestore(response.razorpay_payment_id, orderData.order_id); 
                
                setPaymentStatus('success');
                setIsLoading(false);
                setIsScheduled(true); 
            },
            prefill: {
                name: bookingDetails.name,
                email: bookingDetails.email,
                contact: "9999999999" // Mock contact number
            },
            theme: {
                color: "#16A34A" // Emerald Green
            }
        };

        // 4. OPEN RAZORPAY CHECKOUT MODAL
        try {
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response){
                console.error("Payment Failed:", response);
                setPaymentStatus('error');
                setIsLoading(false);
                console.log(`Payment Failed: ${response.error.description}`); 
            });
            rzp1.open();

        } catch (error) {
            console.error("Error opening Razorpay:", error);
            setPaymentStatus('error');
            console.log("Could not start payment. Check console for details.");
            setIsLoading(false);
        }

    }, [isRazorpayLoaded, isLoading, bookingDetails, saveBookingToFirestore, currency, currentAmount]);


    return (
        <div className="min-h-screen bg-violet-50 flex items-center justify-center p-4 sm:p-8 font-sans">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl mx-auto"
            >
                <div className="flex flex-col lg:flex-row justify-center lg:justify-between gap-8">
                    
                    {/* LEFT PANEL - Product Info */}
                    <div className="w-full lg:w-1/2">
                        <ProductInfoPanel />
                    </div>
    
                    {/* RIGHT PANEL - Booking Flow (Scheduling + Payment) */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <BookingFlow 
                            currency={currency}
                            setCurrency={setCurrency}
                            handlePayment={handlePayment}
                            isRazorpayLoaded={isRazorpayLoaded}
                            isLoading={isLoading}
                            paymentStatus={paymentStatus}
                            bookingDetails={bookingDetails}
                            setBookingDetails={setBookingDetails}
                            isScheduled={isScheduled}
                            setIsScheduled={setIsScheduled}
                            scheduledMeetings={scheduledMeetings}
                        />

                    </motion.div>
                </div>

                {/* Scheduled Meetings List */}
                <div className="mt-12 p-6 bg-white rounded-xl shadow-2xl border border-gray-100 w-full">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <Calendar size={20} className="mr-2 text-blue-500" /> All Scheduled Meetings
                    </h3>
                    {scheduledMeetings.length > 0 ? (
                        <ul className="space-y-3">
                            {scheduledMeetings.map(meeting => (
                                <li key={meeting.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center text-sm border-l-4 border-emerald-500">
                                    <div>
                                        <p className="font-semibold text-gray-800">{meeting.name} ({meeting.email})</p>
                                        <p className="text-gray-600">
                                            {moment(meeting.isoDate).tz(meeting.timezone).format('ddd, MMM D, YYYY [at] h:mm A z')}
                                        </p>
                                    </div>
                                    <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">PAID</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">No meetings scheduled yet.</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
