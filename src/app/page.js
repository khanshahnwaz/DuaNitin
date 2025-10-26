import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SubscribeSection from "@/components/SubscribeSection";
import ReviewsSection from "@/components/ReviewsSection";
import BookingModal from "@/components/BookingModalContent";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import ServicesSection from "@/components/ServiceSection";
import FloatingQuizWidget from "@/components/FloatingQuizWidget";

export default function Home() {
  return (
    <div className="font-sans bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection/>
      <SubscribeSection/>
      <ReviewsSection/>
      <FloatingQuizWidget/>
    </div>
  );
}
