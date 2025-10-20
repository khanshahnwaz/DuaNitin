"use client";
import { motion } from "framer-motion";

// --- Service Data ---
const services = [
  {
    title: "Join Our Workshop Waitlist Now",
    subtitle: "(Limited Spots)",
    icon: "🚀",
    link: "/workshop", 
    description: "Get exclusive access to high-impact career and mind health workshops designed for peak professional performance.",
    colorClass: "text-blue-600",
    shadowColor: "shadow-blue-200",
  },
  {
    title: "Career & Mind Health Coaching",
    subtitle: "For Professionals",
    icon: "🧠",
    link: "/coaching", 
    description: "Personalized 1:1 sessions to unlock clarity, manage burnout, and strategize your next career move.",
    colorClass: "text-indigo-600",
    shadowColor: "shadow-indigo-200",
  },
  {
    title: "Revenue Growth Partner",
    subtitle: "To CEOs, Founders",
    icon: "📈",
    link: "/career", 
    description: "Consulting services to scale operations, optimize growth funnels, and achieve ambitious revenue targets.",
    colorClass: "text-purple-600",
    shadowColor: "shadow-purple-200",
  },
];

// --- Framer Motion Variants ---

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger delay for cards
    },
  },
};

const item = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

// --- Service Card Component ---

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      variants={item}
      whileHover={{ 
        scale: 1.05, 
        y: -10, // Subtle lift
        boxShadow: `0 15px 30px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -5px ${service.shadowColor.replace('shadow-', '').replace('-200', '/60')}` // Custom shadow for colored glow
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      // Light background, subtle border, rounded corners
      className={`relative p-8 rounded-xl bg-white border border-gray-100 shadow-md transition-shadow duration-300 cursor-pointer`}
    >
      <div className="relative z-10">
        
        {/* Icon with colored text */}
        <div className={`text-4xl mb-4 ${service.colorClass} transition-transform duration-300`}>
          {service.icon}
        </div>
        
        {/* Title and Subtitle */}
        <h3 className={`text-2xl font-bold mb-1 leading-snug text-gray-800`}>
          {service.title}
        </h3>
        <p className="text-lg font-semibold mb-4 text-gray-500">
          {service.subtitle}
        </p>
        
        {/* Description */}
        <p className="text-base text-gray-600 mb-6">
          {service.description}
        </p>
        
        {/* Call to Action Button */}
        <a 
          href={service.link}
          className={`inline-block px-5 py-2 text-sm font-bold rounded-full ${service.colorClass.replace('text', 'bg')} text-white hover:opacity-90 transition-opacity`}
        >
          Learn More →
        </a>
      </div>
    </motion.div>
  );
};

// --- Main Section Component ---

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-36 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Section Heading with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            My Services: <span className="text-blue-700">Find Your Path to Growth</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            I offer focused pathways to help you achieve **mental clarity, career elevation, and business scale**.
          </p>
        </motion.div>

        {/* Services Grid with Staggered Entrance */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}