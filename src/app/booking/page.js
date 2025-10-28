"use client"
import ProductInfoPanel from "@/components/coaching/ProductInfoPanel";
import BookingFlow from "@/components/coaching/BookingFlow";
import PaymentSummary from "@/components/coaching/PaymentSummary";
// import { saveBookingToFirebase } from "@/lib/firebaseBooking"; // Not used in this file
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingPage() {
  const router=useRouter();
  const [bookingDetails, setBookingDetails] = useState(null);
  const[isLoading,setIsLoading]=useState(false);
  const[currency,setCurrency]=useState("INR");
  const[currencySymbol,setCurrencySymbol]=useState("₹")
  
  // NOTE: This state now holds the raw numerical value of the FINAL price (Base + Fee)
  // which will be updated by PaymentSummary based on selected currency.
  const[totalDisplayAmount,setTotalDisplayAmount]=useState(489.10); // Default INR 489 + 0.10 fee

  const[paymentStatus,setPaymentStatus]=useState("idle");
  const BASE_PRICE_INR = 489; // Static base price used for conversion logic

  const handlePayment = async () => {
    if (!bookingDetails?.time || !bookingDetails?.name || !bookingDetails?.email) {
      // Use a custom message box instead of alert in a real app
      console.error("Please complete all booking details before proceeding.");
      return;
    }

    try {
      setIsLoading(true);
      setPaymentStatus("processing");

      // Log the amount and currency being sent to ensure correctness
      console.log(`Sending amount: ${totalDisplayAmount} in currency: ${currency}`);

      // 1️⃣ Create Razorpay order on backend
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // CRITICAL FIX: totalDisplayAmount now holds the correct numeric value (e.g., 5.99 or 489.10).
          // Math.round(x * 100) converts it to the smallest unit (paise/cents).
          amount: Math.round(totalDisplayAmount * 100), 
          currency: currency,
        }),
      });

      const order = await orderRes.json();
      if (!order?.id) throw new Error("Order creation failed.");

      // 2️⃣ Configure Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency, // Use currency from the created order
        name: "Discovery Call Booking",
        description: "15-minute coaching session",
        order_id: order.id,
        prefill: {
          name: bookingDetails.name,
          email: bookingDetails.email,
        },
        theme: { color: "#0EA5E9" },
        handler: async function (response) {
          try {
            // 3️⃣ Save booking + payment info
            const saveData = await fetch("/api/bookings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...bookingDetails,
                amount: totalDisplayAmount, // The final displayed amount
                currency,
                paymentId: response.razorpay_payment_id,
                orderId: order.id,
                status: "success",
              }),
            });
            const saveRes=await saveData.json();

            if (saveRes.success) {
              setPaymentStatus("success");
              // 4️⃣ Redirect to success page with meeting info
              router.push(`/success?name=${bookingDetails.name}&time=${bookingDetails.time.slot}`);
            
            } else {
              throw new Error("Booking save failed.");
            }
          } catch (err) {
            console.error("Error saving booking:", err);
            setPaymentStatus("error");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", () => setPaymentStatus("error"));
    } catch (err) {
      console.error("Payment Error:", err);
      setPaymentStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-6">
      <ProductInfoPanel amount={BASE_PRICE_INR} />
      {!bookingDetails ? (
        <BookingFlow onComplete={setBookingDetails} />
      ) : (
        <PaymentSummary
          bookingDetails={bookingDetails}
          currency={currency}
          currencySymbol={currencySymbol}
          setCurrencySymbol={setCurrencySymbol}
          displayAmount={BASE_PRICE_INR} // Pass the static base price for conversion
          setTotalDisplayAmount={setTotalDisplayAmount} // Pass setter for the final amount
          setCurrency={setCurrency}
          handlePayment={handlePayment}
          isRazorpayLoaded={true}
          isLoading={isLoading} // Pass state variable
          paymentStatus={paymentStatus}
          onBack={() => setBookingDetails(null)}
        />
      )}
    </div>
  );
}
