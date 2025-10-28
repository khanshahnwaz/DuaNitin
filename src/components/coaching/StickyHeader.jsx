import { motion } from "framer-motion";
import Link from "next/link";
// 0. StickyHeader Component (Reused for Consistency)
const StickyHeader = () => {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white shadow-lg backdrop-blur-sm bg-opacity-95 border-b border-gray-100"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-700 transition-colors">
            Nitin Dua
          </Link>
          <nav className="hidden sm:block">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
              Home
            </Link>
          </nav>
        </div>
        <Link 
          href='/booking'
          className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
        >
          Schedule a 15 mins. Call →
        </Link>
      </div>
    </motion.header>
  );
};

export default StickyHeader;