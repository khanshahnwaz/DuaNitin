import { motion } from 'framer-motion'
import React from 'react'

const IntroVideo = () => {
    const YOUTUBE_EMBED_ID = "nLuu8nxPOy0";

  return (
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
  )
}

export default IntroVideo