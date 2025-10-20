import { motion } from "framer-motion";

// 1. ProfileHero Component (Intro & About Me)
const ProfileHero = ({containerVariants,itemVariants}) => {

    

    const socialLinks = [
        { icon: "▶", label: "YouTube" },
        { icon: "🔗", label: "Website" },
        { icon: "💼", label: "LinkedIn" },
        { icon: "📸", label: "Instagram" },
    ];

    const problemStatements = [
        "Do you feel stuck and confused?",
        "Do you fear judgement of others?",
        "Do you feel being not enough at times?",
        "Do you overthink, feel anxious and stressed?",
    ];

    return (
        <section id="profile-hero" className="pt-24 pb-20 bg-gray-50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row gap-12">
                
                {/* Left Column: Image & Quick Stats */}
                <motion.div 
                    className="md:w-1/3 flex flex-col items-center md:items-start"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7 }}
                >
                    <img
                        src='/profile.jpg'
                        alt="Nitin Dua"
                        className="w-48 rounded-full object-cover shadow-xl border-4 border-white mb-6"
                    />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Nitin Dua</h1>
                    <p className="text-lg text-gray-600 font-medium text-center md:text-left mb-6">
                        Career & Mind Health Coach empowering working professionals.
                    </p>
                    
                    {/* Social/Stats Bar */}
                    <div className="flex space-x-4 mb-8">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href="#" 
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-blue-50 transition-colors"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                title={link.label}
                            >
                                <span className="text-xl text-blue-600">{link.icon}</span>
                            </motion.a>
                        ))}
                    </div>
                    
                    {/* Placeholder for Bookings/Ratings Stats */}
                    <div className="grid grid-cols-2 gap-4 text-center w-full max-w-xs">
                        <div className="p-3 bg-blue-100 rounded-lg text-blue-800 font-bold">10+ Bookings</div>
                        <div className="p-3 bg-blue-100 rounded-lg text-blue-800 font-bold">5/5 Ratings</div>
                    </div>
                </motion.div>

                {/* Right Column: Problem Statements & Story */}
                <div className="md:w-2/3">
                    <motion.div
                        className="mb-8"
                        initial="hidden"
                        whileInView="visible"
                        variants={containerVariants}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-4">
                            Hi, thank you for being here! Get unstuck.
                        </motion.h2>

                        {/* Problem Statements */}
                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {problemStatements.map((problem, index) => (
                                <motion.p 
                                    key={index} 
                                    variants={itemVariants}
                                    transition={{ delay: 0.2 + index * 0.05 }}
                                    className="text-lg text-gray-700 flex items-start"
                                >
                                    <span className="text-blue-500 mr-2 flex-shrink-0 mt-1">✓</span> {problem}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Core Story / About Me */}
                    <motion.p 
                        className="text-gray-700 mb-4 leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        Someone wise once said, **“The most important project YOU will ever work on is YOURSELF”**. Think about it — the iconic Taj Mahal, the Statue of Liberty, or the incredible work you may be working on — unconsciously or consciously, is You. **Choose consciously, my dear.**
                    </motion.p>
                    <motion.p 
                        className="text-gray-700 leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        I coach working professionals to realign and excel in careers — through lived experiences, mind health, ancient wisdom, neuroscience, and purposeful action. I've walked that path too — and I'm grateful for the clarity, progress, alignment and transformation it has brought me. Now, I invite you to explore more.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};
export default ProfileHero;