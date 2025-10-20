import { motion } from "framer-motion";

// 2. ServicesGrid Component (Offerings & Pricing)

const ServicesGrid = ({containerVariants,itemVariants}) => {
    const COACHING_LINK = "#";
    const services = [
        {
            type: "1:1 Call",
            title: "Your First Discovery Call",
            subtitle: "(Workshop / Coaching) | Discounted Price for Limited Time",
            duration: "15 mins",
            price: "₹4,499",
            discountedPrice: "₹489",
            icon: "📞",
            color: "bg-indigo-600",
            link: 'https://topmate.io/nitindua/1598315?utm_source=public_profile&utm_campaign=nitindua'
        },
        {
            type: "Workshop",
            title: "Group Workshop for Professionals",
            subtitle: "Align Your Career, Mind and Health | Waitlist",
            duration: "Waitlist",
            price: "₹34,899",
            discountedPrice: "₹19,899",
            icon: "💡",
            color: "bg-blue-600",
            link: 'https://topmate.io/nitindua/1598277/pay?utm_source=public_profile&utm_campaign=nitindua' // Link to the workshop page
        },
        {
            type: "Digital Product",
            title: "WIP Framework (Self-Guided)",
            subtitle: "Wholistic Integral Preventive Health & Wellbeing",
            duration: "Digital Access",
            price: "FREE",
            discountedPrice: null,
            icon: "📦",
            color: "bg-purple-600",
            link: COACHING_LINK
        },
    ];

    return (
        <section id="services-grid" className="py-20 md:py-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <motion.h2
                    className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Choose Your <span className="text-indigo-600">Path to Transformation</span>
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.05, boxShadow: `0 15px 35px -10px rgba(79, 70, 229, 0.2)` }}
                            className={`p-6 rounded-xl shadow-lg border border-gray-100 ${service.color.replace('600', '50')} transition-all duration-300 flex flex-col`}
                        >
                            <span className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white ${service.color} self-start mb-3`}>
                                Popular
                            </span>

                            <div className="flex items-center space-x-3 mb-4">
                                <span className={`text-3xl ${service.color.replace('bg', 'text')}`}>{service.icon}</span>
                                <h3 className="text-xl font-bold text-gray-900">{service.type}</h3>
                            </div>
                            
                            <h4 className="text-lg font-semibold text-gray-800 mb-1">{service.title}</h4>
                            <p className="text-sm text-gray-500 mb-4">{service.subtitle}</p>

                            <div className="mt-auto pt-4 border-t border-gray-200">
                                <div className="flex items-end justify-between mb-4">
                                    <span className="text-gray-500 text-sm">{service.duration}</span>
                                    
                                    <div className="flex flex-col items-end">
                                        {service.discountedPrice ? (
                                            <>
                                                <span className="text-lg text-gray-500 line-through mr-1">{service.price}</span>
                                                <span className="text-3xl font-extrabold text-red-600">{service.discountedPrice}</span>
                                            </>
                                        ) : (
                                            <span className="text-3xl font-extrabold text-green-600">{service.price}</span>
                                        )}
                                    </div>
                                </div>
                                <a 
                                    href={service.link}
                                    className={`w-full inline-block text-center py-2 font-semibold rounded-lg text-white ${service.color} hover:opacity-90 transition-opacity`}
                                >
                                    {service.type.includes('Waitlist') ? 'Join Waitlist →' : 'Book Now →'}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
export default ServicesGrid;