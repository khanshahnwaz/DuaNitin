'use client';
import { useState } from 'react';
import { useRouter } from "next/navigation"; // Added import

// Props now include necessary payment details and handlers
export default function BookingForm({
  onSubmit, // Retained for compatibility, but we'll use handlePayment
  totalDisplayAmount = 19899, // Default value, ideally passed from parent
  currency = "INR", // Default value, ideally passed from parent
  // Note: key, currencySymbol, and other complex state from BookingPage
  // are often better managed in a parent component, but included here for direct
  // integration of the logic.
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    question: '',
    receiveDetails: true
  });

  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [paymentStatus, setPaymentStatus] = useState("idle"); // Added payment status

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // --- Start of integrated handlePayment logic ---
  const handlePayment = async (details) => {
    // Check for required fields before payment
    if (!details.name || !details.email || !details.phone) {
      alert("Please complete your name, email, and phone number before proceeding.");
      return;
    }

    // A mock time object is needed because the original logic expected it from 'bookingDetails'
    // In a real flow, you'd likely select time *before* this form or include it in the form.
    // For now, we'll create a placeholder based on the context of the original code.
    const mockTimeDetails = {
        slot: new Date().toISOString(), // Use current time as a placeholder
        date: new Date().toLocaleDateString(),
        // Add other necessary time properties if your backend requires them
    };
    
    // Combine form data with mock time details to simulate the 'bookingDetails' object
    const bookingDetails = {
        ...details,
        time: mockTimeDetails,
    };


    try {
      setIsLoading(true);
      setPaymentStatus("processing");

      // 1️⃣ Create Razorpay order on backend
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(totalDisplayAmount*100), // amount in paise
          currency: currency,
        }),
      });

      const order = await orderRes.json();
      if (!order?.id) throw new Error("Order creation failed.");

      // 2️⃣ Configure Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
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
                amount: totalDisplayAmount,
                currency,
                paymentId: response.razorpay_payment_id,
                orderId: order.id,
                status: "success",
              }),
            });
            const saveRes = await saveData.json();

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
  // --- End of integrated handlePayment logic ---


  const handleSubmit = e => {
    e.preventDefault();
    // Use the handlePayment function instead of the original onSubmit
    handlePayment(formData);
    // Optionally call the original onSubmit prop if needed for logging/external state
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full border p-2 rounded"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Your Question</label>
        <textarea
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Try asking a detailed question"
          className="w-full border p-2 rounded"
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Phone number</label>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-3 rounded-l border bg-gray-100">+91</span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border p-2 rounded-r"
            required
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="receiveDetails"
          checked={formData.receiveDetails}
          onChange={handleChange}
          className="mr-2"
          disabled={isLoading}
        />
        <label>Receive booking details on phone</label>
      </div>
      <button
        type="submit"
        className={`w-full text-white p-3 rounded font-semibold ${isLoading || paymentStatus === 'processing' ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
        disabled={isLoading || paymentStatus === 'processing'}
      >
        {isLoading
          ? (paymentStatus === 'processing' ? 'Processing Payment...' : 'Loading...')
          : `Pay ${totalDisplayAmount} ${currency} and Book`}
      </button>
      {paymentStatus === 'error' && (
        <p className="text-red-500 text-sm mt-2">Payment failed. Please try again.</p>
      )}
    </form>
  );
}