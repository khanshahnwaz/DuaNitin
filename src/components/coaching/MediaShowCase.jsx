import { motion } from "framer-motion";

// 4. Media Showcase (Video Links)
const MediaShowcase = ({containerVariants,itemVariants}) => {
    const videos = [
        {
            title: "Introduction to My Personal Transformation",
            source: "YouTube/personal-transformation",
            videoId: "WLoDqio_mNY", // Placeholder ID (REPLACE with actual ID)
            link: "https://www.youtube.com/@healthwithnitindua"
        },
        {
            title: "Experiences of Professionals with Coach Nitin Dua",
            source: "YouTube/client-experiences",
            videoId: "nLuu8nxPOy0", // Placeholder ID (REPLACE with actual ID)
            link: "https://www.youtube.com/@healthwithnitindua"
        },
        {
            title: "What THIS Professional Experienced at Workshop",
            source: "YouTube/workshop-testimonial",
            videoId: "L1kyQlr3ngI", // Placeholder ID (REPLACE with actual ID)
            link: "https://www.youtube.com/@healthwithnitindua"
        },
    ];

    return (
        <section id="media" className="py-20 md:py-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <motion.h2
                    className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Watch My <span className="text-indigo-600">Video Content</span>
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {videos.map((video, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                            className="block bg-gray-50 rounded-xl shadow-md overflow-hidden transition-all duration-300"
                        >
                            {/* Embedded Video Player */}
                            <div className="relative pt-[56.25%] bg-black">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.videoId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={video.title}
                                ></iframe>
                            </div>
                            
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{video.source}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
export default MediaShowcase;
