// components/Hero.js
import Link from 'next/link';
import ClientLogos from './ClientLogos';

export default function Hero() {
  const tags = ['Sales', 'GotoMarket', 'Product Marketing', 'Partnerships'];
  
  // Placeholder array for client logos
  const clientLogos = Array(5).fill('/placeholder-logo.png'); 

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          We solve your Revenue Growth, GTM & Product Marketing Headaches!
        </h1>
        
        {/* Sub-Tags */}
        <p className="text-lg sm:text-xl text-indigo-600 font-semibold mb-4">
          {tags.join(' | ')}
        </p>
        
        {/* Location Text */}
        <p className="text-base sm:text-lg text-gray-500 mb-8">
          Business Development in the US, India, Middle-East
        </p>
        
        {/* CTA Button */}
        <div className="mb-12">
          <Link
            href="#book-call"
            className="inline-flex items-center px-10 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out shadow-xl transform hover:scale-105"
          >
            Partner With Us
          </Link>
        </div>
        
        {/* Client Logos Row (Responsive) */}
        <ClientLogos/>
        
      </div>
    </section>
  );
}