"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { IndianRupee, DollarSign, Loader2, CheckCircle } from 'lucide-react';

// --- CONSTANTS ---
// NOTE: Replace with your actual Test or Live Razorpay Key ID.
// In a real application, the KEY_ID and Order Creation should be handled on a secure backend server.
const RAZORPAY_KEY_ID = "rzp_test_XXXXXXXXXXXXXXXXXX"; 

// Static amounts for demonstration (in base currency unit, e.g., Rupees or Dollars)
const AMOUNTS = {
    INR: 499, // ₹499
    USD: 6,   // $6
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
            alert("Payment gateway failed to load. Please refresh the page.");
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return loaded;
};

// --- MAIN APPLICATION COMPONENT ---
const App = () => {
    const isRazorpayLoaded = useRazorpayScript();
    
    // State for the payment
    const [currency, setCurrency] = useState('INR');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // null, 'success', 'error'

    // Static order info for display
    const currentAmount = AMOUNTS[currency];
    const displayAmount = (currentAmount / 100).toFixed(2);
    const currencySymbol = currency === 'INR' ? '₹' : '$';

    // Simulated Server-Side Order Creation (Must be a POST call in a real app)
    // Razorpay requires the amount in the smallest unit (Paisa/Cents)
    const simulateOrderCreation = useCallback(() => {
        // In a real-world scenario, you would make a POST request to your backend:
        // const response = await fetch('/api/create-razorpay-order', {
        //     method: 'POST',
        //     body: JSON.stringify({ amount: currentAmount, currency: currency })
        // });
        // const data = await response.json();
        // return data.orderId;

        // For this client-only demo, we return a simulated order ID.
        // The amount is multiplied by 100 as Razorpay expects the smallest currency unit.
        return {
            amount: currentAmount * 100, // e.g., 49900 (paisa) or 600 (cents)
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
        const options = {
            key: RAZORPAY_KEY_ID, 
            amount: order.amount,
            currency: order.currency,
            name: "Multi-Currency Demo Shop",
            description: "Product Purchase",
            order_id: order.order_id, 
            handler: function (response) {
                // This is executed on successful payment
                console.log("Payment Success:", response);
                // In a real app, send response data to backend for verification
                setPaymentStatus('success');
                setIsLoading(false);
            },
            prefill: {
                // Pre-fill user data if available (optional)
                name: "John Doe",
                email: "john.doe@example.com",
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
                // Display error message to user
                alert(`Payment Failed: ${response.error.description}`); 
            });
            rzp1.open();

        } catch (error) {
            console.error("Error opening Razorpay:", error);
            setPaymentStatus('error');
            alert("Could not start payment. Check console for details.");
            setIsLoading(false);
        }

    }, [isRazorpayLoaded, isLoading, simulateOrderCreation]);

    const handleCurrencyChange = (newCurrency) => {
        if (isLoading) return;
        setCurrency(newCurrency);
    };


    // --- RENDERING ---
    
    // Determine button state and text
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
                
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                    Purchase Product X
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                    A multi-currency payment demo using Razorpay.
                </p>

                {/* Currency Selector */}
                <div className="mb-6 flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                    <span className="text-gray-700 font-semibold">Select Currency:</span>
                    <div className="flex bg-white rounded-lg p-1 shadow-inner">
                        <button
                            onClick={() => handleCurrencyChange('INR')}
                            disabled={isLoading}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                currency === 'INR' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                            } disabled:opacity-50`}
                        >
                            <IndianRupee size={16} />
                            <span>INR</span>
                        </button>
                        <button
                            onClick={() => handleCurrencyChange('USD')}
                            disabled={isLoading}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                currency === 'USD' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
                            } disabled:opacity-50`}
                        >
                            <DollarSign size={16} />
                            <span>USD</span>
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="mb-8 border-t border-b border-gray-200 py-4 space-y-3">
                    <div className="flex justify-between font-semibold text-lg text-gray-800">
                        <span>Total:</span>
                        <span className="text-2xl font-extrabold text-emerald-600">
                            {currencySymbol}{displayAmount}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                        The Razorpay checkout modal will automatically launch the payment form for the selected currency.
                    </p>
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

                {/* Status Message */}
                {paymentStatus === 'success' && (
                    <p className="mt-4 text-center text-sm text-emerald-600 font-medium">
                        Order successful! (No real transaction occurred as this is a test environment).
                    </p>
                )}
                {paymentStatus === 'error' && (
                    <p className="mt-4 text-center text-sm text-red-500 font-medium">
                        An error occurred during payment. Please try again.
                    </p>
                )}
                
                {/* Disclaimer */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center">
                        Disclaimer: This uses a placeholder Razorpay Test Key. No actual payment will be processed.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default App;
