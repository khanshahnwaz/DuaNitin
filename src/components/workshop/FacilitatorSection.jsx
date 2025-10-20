// 2. FacilitatorSection Component
import { motion } from "framer-motion";

const FacilitatorSection = ({containerVariants,itemVariants}) => {
    const FACILITATOR_IMAGE_URL = "/profile.jpg";

  const expertise = [
    { title: "Personal Transformation with Professional Expertise", desc: "Drawing from lived personal transformation in career, mind and holistic health with two enriching decades professionally across geographies - the US, India, UAE and UK.", icon: "🧑‍💻" },
    { title: "Stanford Brain & Medical Researcher", desc: "Researched human brain and applied psychology and neuroscience at Stanford Medicine and Engineering with AI, bringing a scientific approach to personal growth.", icon: "🔬" },
    { title: "Proven Business & Startup Scaler", desc: "Scaled global health businesses at Fortune 500s (PwC, IQVIA), and partnered with founders in 0 to 1 and growth journeys to $100M+ revenue (Innovaccer, Twin Health and SAG).", icon: "🚀" },
    { title: "Mentored by Global Masters", desc: "Grateful to be coached and mentored by terrific beings such as Tony Robbins, Bernard Widrow, Ankur Warikoo, Manoj Da, and Sadhguru, enriching his life and approach.", icon: "💡" },
  ];

  return (
    <section id="facilitator" className="py-20 md:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.h2 
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About The Facilitator and Coach - <span className="text-blue-700">Nitin Dua</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Image and Bio Column */}
          <motion.div 
            className="md:w-1/3 text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="relative inline-block rounded-full overflow-hidden shadow-2xl mb-6">
              {/* Using standard img tag with placeholder URL */}
              <img 
                src={FACILITATOR_IMAGE_URL} 
                alt="Nitin Dua" 
                width={280} 
                height={280} 
                className="object-cover rounded-full"
              />
              <div className="absolute inset-0 border-4 border-blue-500/50 rounded-full pointer-events-none" />
            </div>
            
            <p className="text-lg text-gray-700 italic max-w-sm mx-auto">
              I coach working professionals to realign and progress in careers having transformed on that path - through lived experiences, mind health, ancient wisdom, neuroscience, and purposeful action.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              I am Cofounder and Managing Director of Hilfey Tech, a partner of Scopic AI USA, an Advisor with Mental Health Education Inc. USA and Global Presence Ambassador to Parenting 2.0.
            </p>
          </motion.div>

          {/* Key Achievements Grid */}
          <motion.div 
            className="md:w-2/3"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Achievements & Expertise:</h3>
            <div className="grid grid-cols-1 gap-6">
              {expertise.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 flex"
                  variants={itemVariants}
                >
                  <span className={`text-3xl ${item.icon === '💡' ? 'text-yellow-600' : 'text-blue-500'} mr-4 flex-shrink-0`}>
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FacilitatorSection;