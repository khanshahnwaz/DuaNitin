"use client";
import FinalCTA from "@/components/coaching/FinalCTA";
import WIPFrameworkSection from "@/components/coaching/FrameWork";
import MediaShowcase from "@/components/coaching/MediaShowCase";
import ProfileHero from "@/components/coaching/ProfileHero";
import ServicesGrid from "@/components/coaching/ServiceGrid";
import StickyHeader from "@/components/workshop/Navbar";




// --- Framer Motion Variants ---
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <StickyHeader containerVariants={containerVariants} itemVariants={itemVariants} />
      <ProfileHero containerVariants={containerVariants} itemVariants={itemVariants} />
      <ServicesGrid containerVariants={containerVariants} itemVariants={itemVariants} />
      <WIPFrameworkSection containerVariants={containerVariants} itemVariants={itemVariants} />
      <MediaShowcase containerVariants={containerVariants} itemVariants={itemVariants} />
      {/* <FinalCTA containerVariants={containerVariants} itemVariants={itemVariants} /> */}
      {/* You can insert the ProfessionalReviewsCarousel component here if desired */}
    </div>
  );
}