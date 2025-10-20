"use client";

import ExperienceSection from "@/components/workshop/ExperienceSection";
import FacilitatorSection from "@/components/workshop/FacilitatorSection";
import StickyHeader from "@/components/workshop/Navbar";
import PricingSection from "@/components/workshop/PricingSection";
import ProfessionalReviewsCarousel from "@/components/workshop/Reviews";
import WorkshopHero from "@/components/workshop/WorkshopHero";
// Removed import Image from "next/image";

// NOTE: Using placeholder URLs for images and the video thumbnail

// --- Framer Motion Variants ---

// For staggering children elements
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// For individual item reveal (fade up)
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};


export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
        <StickyHeader/>
      <WorkshopHero containerVariants={containerVariants} itemVariants={itemVariants} />
      <FacilitatorSection containerVariants={containerVariants} itemVariants={itemVariants} />
      <ExperienceSection containerVariants={containerVariants} itemVariants={itemVariants} />
      <ProfessionalReviewsCarousel/>
      <PricingSection containerVariants={containerVariants} itemVariants={itemVariants}/>
      </div>
  );
}
