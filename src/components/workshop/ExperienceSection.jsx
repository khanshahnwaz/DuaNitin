import { motion } from "framer-motion";
import IntroVideo from "./IntroVideo";

// 3. ExperienceSection Component
const ExperienceSection = ({containerVariants,itemVariants}) => {
  const experiences = [
    { title: "Expert-Led Session", desc: "Dive deep into transformative insights, observations and strategies directly from Nitin Dua.", icon: "🧑‍🏫" },
    { title: "Experiential Activities", desc: "Engage in hands-on activities designed to foster deeper understanding and personal growth.", icon: "🛠️" },
    { title: "Practical Tools & Implementation", desc: "Discover actionable tools you can implement immediately in your career and life.", icon: "💡" },
    { title: "Interactive Sharing Circle", desc: "Connect with peers, share experiences, and learn from a supportive community.", icon: "🤝" },
    { title: "Dedicated Q&A Session", desc: "Get your questions answered directly, ensuring clarity on all aspects of your transformation.", icon: "❓" },
    { title: "Personal 1:1 Coaching Time", desc: "Option for a 15-min personal coaching with Nitin Dua (included with workshop payment).", icon: "✨" },
  ];

  return (
    <section id="experience" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.h2 
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What You Will Experience in this <span className="text-blue-700">Workshop power-packed over 150 mins.</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index} 
              className="p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              variants={itemVariants}
            >
              <div className={`text-4xl mb-3 ${index % 2 === 0 ? 'text-blue-500' : 'text-indigo-500'}`}>
                {exp.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{exp.title}</h3>
              <p className="text-sm text-gray-600">{exp.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Video Embed Section (UPDATED) */}
        <IntroVideo/>

      </div>
    </section>
  );
};
export default ExperienceSection;