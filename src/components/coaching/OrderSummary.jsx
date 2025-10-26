'use client';
export default function OrderSummary() {
  const originalPrice = 34899;
  const discountedPrice = 19899;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-2">
      <h2 className="font-semibold text-lg">Order Summary</h2>
      <div className="flex justify-between">
        <span>1 x Group Workshop for Professionals - Waitlist</span>
        <span>₹{discountedPrice}</span>
      </div>
      <div className="flex justify-between">
        <span>Platform fee</span>
        <span className="line-through">₹10</span> <span className="ml-1 font-semibold">FREE</span>
      </div>
      <hr />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>₹{discountedPrice}</span>
      </div>
      <div className="mt-2 text-sm text-gray-500 line-through">₹{originalPrice}</div>
    </div>
  );
}
