"use client"
import Navbar from '@/components/career/Navbar';
import Hero from '@/components/career/Hero';
import Stats from '@/components/career/Stats';
import BookingScheduler from '@/components/career/BookingScheduler'
import ComparisonSlider from '@/components/career/ComparisonSlider';
import FaqSection from '@/components/career/FaqSection';
import AboutSection from '@/components/career/About';
// Import other components (Testimonials, PricingTable, About) when created

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main id="content">
        <Hero />
        <Stats />
        <BookingScheduler/>
        <AboutSection/>
        <ComparisonSlider/>
        <FaqSection/>
        
        {/* Placeholder for the rest of the sections: */}
        {/* <Testimonials /> */}
        {/* <PricingTable /> */}
        {/* <About /> */}
        {/* <FAQ /> */}
        
      </main>
      
      {/* <Footer /> */}
    </div>
  );
}