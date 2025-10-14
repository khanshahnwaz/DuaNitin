// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';
// Assuming 'logo.png' is in your public folder

const navItems = [
    {name:'Home',href:'/'},
  { name: 'Work', href: '#work' },
  { name: 'Compare', href: '#comparison' },
  { name: 'About', href: '#about' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center text-2xl font-bold text-gray-900">
              {/* Replace with your logo image */}
              <img src="/nitindualogo.png" alt="Nitin Dua Logo" className="h-10 w-auto mr-3" />
              Nitin Dua
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                // When navigating to an anchor link (#id) on the same page,
                // the browser default scroll behavior is used.
                className="text-gray-600 hover:text-indigo-600 transition duration-150 ease-in-out font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#book-call"
              className="px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out shadow-lg ml-4"
              onClick={() => setIsOpen(false)} // Close mobile menu if open
            >
              BOOK A CALL NOW
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon (when closed) */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                // Close Icon (when open)
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#book-call"
              className="block w-full text-center px-3 py-2 mt-4 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              BOOK A CALL NOW
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
