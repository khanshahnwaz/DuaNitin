import React, { useState, useEffect, useCallback } from 'react';
import { IndianRupee, DollarSign, Loader2, CheckCircle, Clock, Gift, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

// NOTE: Replace with your actual Test or Live Razorpay Key ID.
const RAZORPAY_KEY_ID = "rzp_test_XXXXXXXXXXXXXXXXXX"; 

// Static amounts for demonstration (in base currency unit, e.g., Rupees or Dollars)
// Based on image: ₹489 actual price. Using 489 for INR. Using an estimated equivalent for USD.
const AMOUNTS = {
    INR: 489, // ₹489
    USD: 6,   // $6 (Estimated conversion)
};

// --- UTILITY: Dynamic Script Loader Hook ---
const useRazorpayScript = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => setLoaded(true);
        script.onerror = () => {
            console.error("Razorpay SDK failed to load.");
            // Replace alert with a better UI notification/message box
            // alert("Payment gateway failed to load. Please refresh the page.");
            console.log("Payment gateway failed to load. Please refresh the page.");
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return loaded;
};

// --- PAYMENT BUTTON / SUMMARY (Reusable Component Logic) ---

const PaymentSummary = ({ 
    currency, 
    setCurrency, 
    currentAmount, 
    displayAmount, 
    currencySymbol,
    handlePayment,
    isRazorpayLoaded,
    isLoading,
    paymentStatus
}) => {
    const handleCurrencyChange = (newCurrency) => {
        if (isLoading) return;
        setCurrency(newCurrency);
    };

    let buttonText = 'Confirm and Pay';
    if (!isRazorpayLoaded) {
        buttonText = 'Loading Payment Gateway...';
    } else if (isLoading) {
        buttonText = 'Processing...';
    } else if (paymentStatus === 'success') {
        buttonText = 'Payment Successful!';
    } else if (paymentStatus === 'error') {
        buttonText = 'Payment Failed. Retry?';
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-100 mt-6 mx-auto lg:mx-0">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

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
                    <span>{currencySymbol}{currency === 'INR' ? (10/100).toFixed(2) : (0.12).toFixed(2)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold text-lg text-gray-800 mb-4">
                <span>Total:</span>
                <span className="text-2xl font-extrabold text-emerald-600">
                    {currencySymbol}{(parseFloat(displayAmount) + (currency === 'INR' ? 0.10 : 0.12)).toFixed(2)}
                </span>
            </div>
            
            {/* Payment Button */}
            <button
                onClick={handlePayment}
                disabled={!isRazorpayLoaded || isLoading || paymentStatus === 'success'}
                className={`w-full py-3 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 
                    ${!isRazorpayLoaded || isLoading ? 'bg-gray-400 cursor-not-allowed' : ''}
                    ${paymentStatus === 'success' ? 'bg-emerald-600 hover:bg-emerald-700 cursor-default' : ''}
                    ${paymentStatus === 'error' ? 'bg-red-500 hover:bg-red-600' : ''}
                    ${paymentStatus === null ? 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700' : ''}
                `}
            >
                {isLoading && <Loader2 size={20} className="animate-spin" />}
                {paymentStatus === 'success' && <CheckCircle size={20} />}
                {buttonText}
            </button>

            {paymentStatus === 'success' && (
                <p className="mt-4 text-center text-sm text-emerald-600 font-medium">
                    Order successful! (No real transaction occurred).
                </p>
            )}
            {paymentStatus === 'error' && (
                <p className="mt-4 text-center text-sm text-red-500 font-medium">
                    Payment failed. Try again.
                </p>
            )}
        </div>
    );
};

// --- PRODUCT DESCRIPTION PANEL ---
const ProductInfoPanel = () => {
    return (
        <div className="w-full lg:w-5/12 max-w-lg">
            {/* Back Link and Profile */}
            <div className="flex items-center space-x-2 text-blue-700 mb-6">
                <Minus size={16} className="transform rotate-90" /> {/* Simulating a left arrow */}
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
                    <span className="text-sm">15 mins meeting</span>
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
        </div>
    );
};


// --- SCHEDULER WIDGET (Placeholder for Calendly or similar) ---
// This is the right-side panel for scheduling
const SchedulerWidget = ({ children }) => {
    return (
        <div 
            className="w-full lg:w-7/12 max-w-lg lg:max-w-none bg-white p-6 rounded-xl shadow-2xl border border-gray-100 min-h-[700px] overflow-hidden"
        >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">When should we meet?</h3>
            {/* Placeholder for actual scheduling interface (e.g., Calendly embed) */}
            <div className="text-gray-500 h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                {children ? children : <p>Scheduling Interface Placeholder (e.g., Calendly iframe or custom date/time picker)</p>}
            </div>
        </div>
    );
}

// --- MAIN APPLICATION COMPONENT (BookingScheduler) ---
export default function App() {
    const isRazorpayLoaded = useRazorpayScript();
    
    // State for the payment
    const [currency, setCurrency] = useState('INR');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'error'

    // Static order info for display
    const currentAmount = AMOUNTS[currency];
    // Razorpay price is typically 2 decimal places for display, but whole number for base currency unit.
    const displayAmount = (currentAmount / (currency === 'INR' ? 100 : 1)).toFixed(2); 
    const currencySymbol = currency === 'INR' ? '₹' : '$';

    // Simulated Server-Side Order Creation (Must be a POST call in a real app)
    const simulateOrderCreation = useCallback(() => {
        // Amount must be in the smallest unit (Paisa for INR, Cents for USD)
        const smallestUnitMultiplier = currency === 'INR' ? 100 : 100;
        
        // Include platform fee in the total amount sent to Razorpay
        const fee = currency === 'INR' ? 10 : 12; // 10 paisa / 12 cents (simulated)
        const totalAmountInSmallestUnit = (currentAmount * smallestUnitMultiplier) + fee;

        return {
            amount: totalAmountInSmallestUnit, 
            currency: currency,
            order_id: `order_simulated_${Date.now()}` // Simulated order ID
        };
    }, [currency, currentAmount]);


    const handlePayment = useCallback(async () => {
        if (!isRazorpayLoaded || isLoading) return;

        setIsLoading(true);
        setPaymentStatus(null);
        
        // 1. Simulate Order Creation (Backend process)
        const order = simulateOrderCreation();
        
        // 2. Setup Razorpay Options
        // IMPORTANT: In a real app, always use the order.amount returned from the backend, 
        // which includes taxes/fees and is verified server-side.
        const options = {
            key: RAZORPAY_KEY_ID, 
            amount: order.amount, // Amount in smallest unit
            currency: order.currency,
            name: "Discovery Call (Workshop / Coaching)",
            description: "First Discovery Call Payment",
            order_id: order.order_id, 
            handler: function (response) {
                console.log("Payment Success:", response);
                setPaymentStatus('success');
                setIsLoading(false);
            },
            prefill: {
                name: "User Name",
                email: "user@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#16A34A" // Emerald Green
            }
        };

        // 3. Open Razorpay Checkout Modal
        try {
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response){
                console.error("Payment Failed:", response);
                setPaymentStatus('error');
                setIsLoading(false);
                // Use console.log instead of alert
                console.log(`Payment Failed: ${response.error.description}`); 
            });
            rzp1.open();

        } catch (error) {
            console.error("Error opening Razorpay:", error);
            setPaymentStatus('error');
            // Use console.log instead of alert
            console.log("Could not start payment. Check console for details.");
            setIsLoading(false);
        }

    }, [isRazorpayLoaded, isLoading, simulateOrderCreation]);


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
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <ProductInfoPanel />
                    </motion.div>
    
                    {/* RIGHT PANEL - Scheduler and Payment */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 flex flex-col space-y-6"
                    >
                        <SchedulerWidget>
                            {/* This is where a real Calendly/scheduling iframe would go */}
                        </SchedulerWidget>

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
                        />

                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
