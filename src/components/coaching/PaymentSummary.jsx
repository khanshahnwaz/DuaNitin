"use client";
import React, { useState, useEffect } from "react";
import { IndianRupee, DollarSign, Loader2, CheckCircle, Calendar, User, Globe, Zap, ChevronLeft } from "lucide-react";
import moment from "moment-timezone";

// Mock exchange rate: 1 INR = 0.012 USD (Approx. 83 INR/USD)
const INR_TO_USD_RATE = 0.012; 

export default function PaymentSummary({
  currency,
  setCurrency,
  displayAmount, // This is the static base INR price (e.g., 489)
  setTotalDisplayAmount, // Function to update the final numeric amount in parent
  currencySymbol,
  setCurrencySymbol,
  handlePayment,
  isRazorpayLoaded,
  isLoading,
  paymentStatus,
  bookingDetails,
  onBack,
}) {
  const BASE_INR_AMOUNT = parseFloat(displayAmount);
  
  // Local state to hold the base price for display purposes (after conversion)
  const [convertedBasePriceDisplay, setConvertedBasePriceDisplay] = useState(BASE_INR_AMOUNT.toFixed(2));
  
  // Local state for the platform fee (for display)
  const [platformFeeDisplay, setPlatformFeeDisplay] = useState(0.10);


  // CRITICAL: Currency Conversion and Final Amount Calculation
  useEffect(() => {
    let basePriceRaw;
    let feeRaw;
    let symbol;

    if (currency === "USD") {
      // 1. Calculate raw USD price
      basePriceRaw = BASE_INR_AMOUNT * INR_TO_USD_RATE;
      feeRaw = 0.12; // USD fee
      symbol = "$";
    } else { // INR
      // 1. Use base INR price
      basePriceRaw = BASE_INR_AMOUNT;
      feeRaw = 0.10; // INR fee
      symbol = "₹";
    }
    
    // 2. Calculate the FINAL NUMERIC AMOUNT
    // This raw amount is what's passed to setTotalDisplayAmount (and then to Razorpay)
    const finalAmountRaw = basePriceRaw + feeRaw;

    // 3. Update Parent State with the FINAL NUMERIC AMOUNT (e.g., 5.99)
    setTotalDisplayAmount(finalAmountRaw);

    // 4. Update local states for DISPLAY (rounded to 2 decimal places)
    setConvertedBasePriceDisplay(basePriceRaw.toFixed(2));
    setPlatformFeeDisplay(feeRaw.toFixed(2));
    setCurrencySymbol(symbol);

  }, [currency, setCurrencySymbol, BASE_INR_AMOUNT, setTotalDisplayAmount]);
  
  // The final total amount for display, calculated from the local display parts
  const totalDisplayAmountFormatted = (parseFloat(convertedBasePriceDisplay) + parseFloat(platformFeeDisplay)).toFixed(2);
  
  const isReadyToPay = bookingDetails.time && bookingDetails.name && bookingDetails.email;

  const buttonText =
    !isReadyToPay
      ? "Complete Booking Details"
      : !isRazorpayLoaded
      ? "Loading Payment Gateway..."
      : isLoading
      ? "Processing..."
      : paymentStatus === "success"
      ? "Payment Successful!"
      : paymentStatus === "error"
      ? "Payment Failed. Retry?"
      : `Confirm and Pay ${currencySymbol}${totalDisplayAmountFormatted}`; // Display formatted total amount in button

  return (
    <div className="p-6 bg-white rounded-xl w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Zap size={20} className="mr-2 text-emerald-500" /> Confirm & Pay
      </h3>

      <div className="mb-6 space-y-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-700">Booking Details:</h4>
        <p className="text-sm text-gray-700 flex items-center">
          <Calendar size={14} className="mr-2 text-blue-500" />
          {bookingDetails.time
            ? moment(bookingDetails.time.isoDate).format("ddd, MMM D") +
              " at " +
              bookingDetails.time.slot
            : "Time not selected"}
        </p>
        <p className="text-sm text-gray-700 flex items-center">
          <Globe size={14} className="mr-2 text-blue-500" />
          {bookingDetails.timezone}
        </p>
        <p className="text-sm text-gray-700 flex items-center">
          <User size={14} className="mr-2 text-blue-500" /> {bookingDetails.name || "Name missing"}
        </p>
      </div>

      {/* Currency Selector */}
      <div className="mb-4 flex justify-between items-center bg-gray-100 p-3 rounded-lg">
        <span className="text-gray-700 font-semibold text-sm">Select Currency (Mock Conversion):</span>
        <div className="flex bg-white rounded-lg p-1 shadow-inner">
          {["INR", "USD"].map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                currency === cur ? "bg-emerald-500 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cur === "INR" ? <IndianRupee size={14} /> : <DollarSign size={14} />}
              <span>{cur}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-200 pb-3 mb-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>1 × Discovery Call</span>
          {/* Use convertedBasePriceDisplay for the item price */}
          <span>{currencySymbol}{convertedBasePriceDisplay}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Platform Fee ({currency})</span>
          {/* Use platformFeeDisplay for the fee display */}
          <span>{currencySymbol}{platformFeeDisplay}</span>
        </div>
      </div>

      <div className="flex justify-between font-bold text-lg text-gray-800 mb-4">
        <span>Total:</span>
        <span className="text-2xl font-extrabold text-emerald-600">
          {/* Use totalDisplayAmountFormatted for the total */}
          {currencySymbol}{totalDisplayAmountFormatted}
        </span>
      </div>

      <button
        onClick={handlePayment}
        disabled={!isReadyToPay || !isRazorpayLoaded || isLoading || paymentStatus === "success"}
        className={`w-full py-3 rounded-xl font-bold text-lg text-white flex items-center justify-center space-x-3 transition-all duration-300
          ${
            paymentStatus === "success"
              ? "bg-emerald-600"
              : paymentStatus === "error"
              ? "bg-red-500 hover:bg-red-600"
              : !isReadyToPay || !isRazorpayLoaded || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600"
          }`}
      >
        {isLoading && <Loader2 size={20} className="animate-spin" />}
        {paymentStatus === "success" && <CheckCircle size={20} />}
        {buttonText}
      </button>

      <div className="flex justify-between items-center mt-4">
        <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ChevronLeft size={16} className="mr-1" /> Back
        </button>
        {paymentStatus === "success" && (
          <span className="text-sm text-emerald-600 font-medium flex items-center">
            <CheckCircle size={16} className="mr-1" /> Paid
          </span>
        )}
      </div>
    </div>
  );
}
