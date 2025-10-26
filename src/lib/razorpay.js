export default function Razorpay(details) {
  return new Promise((resolve, reject) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: details.amount * 100,
      currency: "INR",
      name: "Car Rental",
      description: "Vehicle Booking Payment",
      handler: (response) => resolve(true),
      prefill: { name: details.name, email: details.email },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  });
}
