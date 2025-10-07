import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SubscribeSection from "@/components/SubscribeSection";
import ReviewsSection from "@/components/ReviewsSection";
import ComparisonSlider from "@/components/ComparisonSlider";
import FaqSection from "@/components/FaqSection";
import BookingModal from "@/components/BookingModalContent";
import FloatingBookingButton from "@/components/FloatingBookingButton";

export default function Home() {
  return (
    <div className="font-sans bg-white">
      <Navbar />
      <HeroSection />
      <SubscribeSection/>
      <ReviewsSection/>
      <ComparisonSlider/>
      <FaqSection/>
      <FloatingBookingButton/>
    </div>
  );
}
