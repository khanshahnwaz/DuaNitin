'use client';
import WorkshopDetails from '@/components/coaching/WorkshopDetails';
import BookingForm from '@/components/coaching/BookingForm';
import OrderSummary from '@/components/coaching/OrderSummary';

export default function BookingPage() {
  const handleFormSubmit = (data) => {
    console.log('Booking data submitted:', data);
    // Integrate with backend or Firebase here
  };

  return (
    <div className="max-w-4xl mx-auto my-10 space-y-6">
      <WorkshopDetails />
      <div className="grid md:grid-cols-2 gap-6">
        <BookingForm onSubmit={handleFormSubmit} />
        <OrderSummary />
      </div>
    </div>
  );
}
