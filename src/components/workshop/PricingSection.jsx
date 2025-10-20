import { motion } from "framer-motion";

// 4. PricingSection Component
const PricingSection = () => {
    const originalPrice = "₹49999";
    const newPrice = "₹34899";

    const notes = [
        "If another friend or colleague joins us for this workshop with your referral, we will provide both of you an additional 30 mins. personal coaching time.",
        "Travel and accommodation expenses are separate to be borne by you, if any. (Not applicable for online format)",
        "A portion of the service fees paid here will go for paying for videos at www.youtube.com/@healthwithnitindua to continue serving for free and empowering people worldwide in their career and mind health journeys.",
    ];

    return (
        <section id="pricing" className="py-20 md:py-28 bg-gray-50 overflow-hidden">
            <div className="max-w-xl mx-auto text-center px-6">
                <motion.h2 
                    className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Ready to Transform Your <span className="text-blue-700">Career & Mind Health?</span>
                </motion.h2>

                <motion.p 
                    className="text-lg text-gray-600 max-w-lg mx-auto mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Invest in yourself and unlock new possibilities. This experiential workshop is designed to provide you with immediate clarity and actionable insights.
                </motion.p>

                {/* Pricing Block with Animation */}
                <motion.div
                    className="mb-8"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4 }}
                >
                    <div className="text-5xl sm:text-6xl font-extrabold text-gray-900 inline-block mr-4">
                        {newPrice}
                    </div>
                    <div className="text-3xl text-red-500 inline-block line-through opacity-70">
                        {originalPrice}
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.a 
                    href="#" // Add actual link to waitlist signup
                    className="inline-block px-12 py-4 text-xl font-bold rounded-xl bg-blue-600 text-white shadow-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Join Our Waitlist Now &gt;&gt;
                </motion.a>
                <motion.p 
                    className="mt-3 text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    Limited Spots
                </motion.p>


                {/* Notes Section */}
                <motion.div 
                    className="mt-16 text-left p-6 bg-white rounded-lg border border-gray-200 shadow-inner"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <h4 className="font-bold text-gray-800 mb-3">Note:</h4>
                    <ul className="space-y-3 text-sm text-gray-600 list-inside">
                        {notes.map((note, index) => (
                            <li key={index} className="flex items-start">
                                <span className="mr-2 text-blue-500 font-semibold flex-shrink-0">{index + 1}.</span>
                                <span>{note}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;