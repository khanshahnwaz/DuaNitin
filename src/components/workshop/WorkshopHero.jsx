// 1. WorkshopHero Component
import { motion } from "framer-motion";

const WorkshopHero = ({containerVariants,itemVariants}) => {
  const problemStatements = [
    "You ticked the boxes",
    "Do you feel stuck and confused?",
    "Do you fear judgement of others?",
    "Do you overthink, feel anxious and stressed?",
    "Do you feel being not enough at times?",
  ];

  return (
    <motion.section 
      id="workshop-hero" 
      className="py-24 md:py-36 bg-white overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Problem Statements */}
        <motion.p 
          className="text-lg font-medium text-blue-500 mb-4"
          variants={itemVariants}
        >
          
          <motion.span 
            className="text-gray-600 ml-2 block sm:inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {problemStatements.map((p, i) => (
              <span key={i} className="block sm:inline-block sm:mx-1">{p}</span>
            ))}
          </motion.span>
        </motion.p>

        {/* Main Headline */}
        <motion.h1 
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        >
          Enter Experiential Workshop <br className="hidden sm:inline" />
          <span className="text-blue-700">for Professionals</span>
        </motion.h1>

        {/* Value Proposition */}
        <motion.p 
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          variants={itemVariants}
          transition={{ delay: 0.4 }}
        >
          Do you have high aspirations? Unlock your potential, navigate your career path with clarity. Gain direct access to expert guidance and responses to your pressing questions.
        </motion.p>

        {/* CTA Button */}
        <motion.a 
          target="_blank"
          href="https://topmate.io/nitindua/1598277/pay"
          className="inline-block px-12 py-4 text-lg font-bold rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          variants={itemVariants}
          transition={{ delay: 0.6 }}
        >
          Join Our Waitlist Now →
        </motion.a>
      </div>
    </motion.section>
  );
};

export default WorkshopHero;