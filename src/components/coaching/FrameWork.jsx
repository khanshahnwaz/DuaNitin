import { motion } from "framer-motion";

// 3. WIP Framework Section (Turning graphic into content)

const WIPFrameworkSection = ({containerVariants,itemVariants}) => {
    const components = [
        { name: "Physical", icon: "💪" },
        { name: "Mental", icon: "🧠" },
        { name: "Social", icon: "🤝" },
        { name: "Nutrition", icon: "🍎" },
        { name: "Sleep", icon: "😴" },
        { name: "Financial", icon: "💰" },
        { name: "Work", icon: "💼" },
    ];

    return (
        <section id="wip-framework" className="py-20 md:py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <motion.h2
                    className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Wholistic Integral Preventive <span className="text-blue-700">(WIP) Framework</span>
                </motion.h2>
                <motion.p
                    className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    A comprehensive approach to health & wellbeing. This framework is the foundation for lasting success in your career and life.
                </motion.p>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    
                    {/* Left: The Components List */}
                    <motion.div
                        className="md:w-1/2 grid grid-cols-2 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        {components.map((c, index) => (
                            <motion.div 
                                key={index} 
                                variants={itemVariants}
                                transition={{ delay: 0.1 * index }}
                                className="p-4 bg-white rounded-xl shadow-md border border-gray-100 flex items-center space-x-3"
                            >
                                <span className="text-2xl">{c.icon}</span>
                                <span className="text-lg font-semibold text-gray-800">{c.name}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                    
                    {/* Right: Callout */}
                    <motion.div
                        className="md:w-1/2 p-8 bg-blue-100 rounded-xl border-l-4 border-blue-600 shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <p className="text-2xl font-bold text-blue-800 mb-4">
                            Unlock Your Integral Wellbeing
                        </p>
                        <p className="text-blue-700">
                            The WIP Framework recognizes that professional stagnation often stems from imbalance across multiple areas of life. We address all 7 components simultaneously to ensure your transformation is holistic and sustainable.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
export default WIPFrameworkSection;