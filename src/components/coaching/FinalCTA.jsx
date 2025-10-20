import { motion } from "framer-motion";

// 5. Final CTA

const FinalCTA = () => {
    const COACHING_LINK = "#"; // Link for Discovery Call/Booking
    return (
        <section className="py-20 md:py-28 bg-blue-700 overflow-hidden">
            <div className="max-w-3xl mx-auto text-center px-6">
                <motion.h2
                    className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Take the Next Step.
                </motion.h2>

                <motion.p
                    className="text-xl text-blue-200 max-w-lg mx-auto mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Begin your journey to strategic career alignment and peak mental performance with a complimentary call.
                </motion.p>

                <motion.a
                    href={COACHING_LINK}
                    className="inline-block px-12 py-4 text-xl font-bold rounded-full bg-white text-blue-700 shadow-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4 }}
                >
                    Book Your Discovery Call Now →
                </motion.a>
            </div>
        </section>
    );
};
export default FinalCTA;