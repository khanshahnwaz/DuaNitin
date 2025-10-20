import { motion } from "framer-motion";

// 3. ExperienceSection Component
const ExperienceSection = ({containerVariants,itemVariants}) => {
    const VIDEO_THUMBNAIL_URL = "https://placehold.co/1280x720/F0F4FF/1E40AF?text=TRANSFORM+YOURSELF";
const YOUTUBE_EMBED_ID = "nLuu8nxPOy0";
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
        <motion.div
            className="mt-20 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-blue-500/50">
                {/* Responsive iframe wrapper (56.25% padding bottom for 16:9 aspect ratio) */}
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${YOUTUBE_EMBED_ID}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            {/* Custom title below the video, aligned with the old image text */}
            <div className="mt-4 text-center text-lg font-bold text-gray-800">
                Transform Your Skills and Growth in Career & Mind Health With Nitin Dua | Workshop for Professionals
            </div>
        </motion.div>

      </div>
    </section>
  );
};
export default ExperienceSection;