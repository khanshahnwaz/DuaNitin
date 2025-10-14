// components/Stats.js
import { motion } from "framer-motion";

const stats = [
  { value: '25+', label: 'Businesses / Founders Served' },
  { value: '$10M+', label: 'Revenue Generated' },
  { value: '200K+', label: 'Lives Impacted' },
];

export default function Stats() {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-white"
      id="work"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Numbers we're proud of
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Join dozens of business leaders who don’t have to deal with unreliability,
            frequent hiring-firing, and exorbitant costs for revenue growth.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 lg:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-indigo-50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
            >
              <p className="text-5xl font-extrabold text-indigo-600 mb-3">
                {stat.value}
              </p>
              <p className="text-xl font-medium text-gray-700">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
