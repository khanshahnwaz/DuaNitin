import { motion } from "framer-motion";

// --- Case Study Data ---
const caseStudies = [
  {
    id: 1,
    title: "From Burnout to Boardroom: Sarah's Clarity Breakthrough",
    vimeoId: "1012962250", // Placeholder ID - REPLACE WITH ACTUAL VIDEO ID
    summary: "Challenge: Overcoming chronic overwhelm and indecision. Result: Secured a C-level promotion and achieved a 40% time-saving on strategy work.",
  },
  {
    id: 2,
    title: "Scaling Revenue: How Alex Doubled His Founder Bandwidth",
    vimeoId: "1011603353", // Placeholder ID - REPLACE WITH ACTUAL VIDEO ID
    summary: "Challenge: Hitting a revenue plateau due to founder dependence. Result: Implemented systems based on mind health principles, leading to 2X monthly recurring revenue.",
  },
  {
    id: 3,
    title: "The PwC Exit: Finding Purpose-Driven Work after Corporate Life",
    vimeoId: "1011604469", // Placeholder ID - REPLACE WITH ACTUAL VIDEO ID
    summary: "Challenge: Transitioning from a high-paying corporate role to a meaningful venture. Result: Launched a successful non-profit, aligning career with core values.",
  },
  {
    id: 4,
    title: "The Innovaccer Story: Accelerating Growth with Mental Fitness",
    vimeoId: "1011604419", // Placeholder ID - REPLACE WITH ACTUAL VIDEO ID
    summary: "Challenge: Maintaining high-performance team culture during rapid growth. Result: Reduced turnover by 15% and improved team execution velocity by focusing on mental fitness.",
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
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

// --- Main Component ---
export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-20 md:py-32 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Proven Results: <span className="text-indigo-600">Video Case Studies</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Explore in-depth video journeys of professionals who mastered their mind and accelerated their careers.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(79, 70, 229, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
            >
              
              <div className="relative pt-[56.25%] bg-gray-900"> 
                {/* Vimeo Embed */}
                <iframe
                  src={`https://player.vimeo.com/video/${study.vimeoId}?autoplay=0&loop=0&byline=0&portrait=0&title=0`}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  title={study.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Text Summary Area */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                  {study.title}
                </h3>
                <p className="text-gray-600">
                  {study.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
