// ComparisonSlider.jsx
"use client"
import React, { useState, useMemo } from 'react';
// Import the data and helpers from your new file
import { getCheckStatus } from './ComparisonData'; 
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import comparisonData from "@/data/comparision.json"

const ComparisonSlider = () => {
  const { features, comparisons } = comparisonData;
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter and order columns
  const yourService = comparisons.find(c => c.isRecommended);
  const otherComparisons = comparisons.filter(c => !c.isRecommended);
  const displayColumns = [yourService, ...otherComparisons];
  
  const totalSlides = displayColumns.length;

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const slideOffset = useMemo(() => `-${activeIndex * 100}%`, [activeIndex]);

  // Use your primary accent color (blue/Orange from the image)
  const primaryColor = 'bg-blue-700';
  const primaryTextColor = 'text-blue-700';
  const primaryBorderColor = 'border-blue-600';


  // The rest of the component logic remains largely the same, but uses the new data variables:

  const FeatureList = ({ isSticky = false }) => (
    // ... (Styling remains the same, just ensure it uses 'features' data)
    <div className={`
      ${isSticky ? 'sticky left-0 bg-white z-10 border-r border-gray-200 shadow-md md:shadow-none' : ''}
      flex-shrink-0 w-full md:w-auto md:min-w-[15rem]
    `}>
      <h3 className="h-[6rem] p-4 flex items-center font-bold text-lg text-gray-900 border-b border-gray-200">
        Feature
      </h3>
      {features.map((feature, index) => (
        <div 
          key={feature.id} 
          className={`h-24 p-4 flex items-center text-sm font-medium transition-colors duration-300 ease-out 
            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            hover:bg-blue-50 hover:text-blue-800
            border-b border-gray-200
          `}
        >
          {feature.name}
        </div>
      ))}
    </div>
  );

  const ComparisonColumn = ({ comparison, isRecommended, index }) => (
    <div 
      className={`
        flex-shrink-0 w-full 
        md:w-1/4 lg:w-1/4 xl:w-1/5 
        transition-all duration-500 ease-in-out
        ${isRecommended ? comparison.accent : 'bg-gray-100'} 
        ${isRecommended ? 'text-white' : 'text-gray-900'}
        ${isRecommended ? 'shadow-xl scale-[1.02] z-20' : 'shadow-lg'}
        rounded-xl
        h-full
        mx-1
      `}
      style={{
        transform: `translateX(${slideOffset})`,
        transition: 'transform 0.5s ease-in-out'
      }}
    >
      {/* Column Header */}
      <div className={`h-[6rem] p-4 flex flex-col justify-center items-center text-center border-b ${isRecommended ? 'bg-blue-700' : 'border-gray-300'}`}>
        <h3 className="text-xl font-extrabold">
          {comparison.name}
        </h3>
        {isRecommended && (
          <span className="text-sm font-semibold mt-1 px-3 py-1 bg-white text-blue-600 rounded-full animate-pulse">
            Recommended
          </span>
        )}
      </div>

      {/* Column Content */}
      {features.map((feature, idx) => {
        const value = comparison.data[feature.id];
        const isOddRow = idx % 2 === 0;
        
        const renderedValue = getCheckStatus(feature.id, value);

        return (
          <div
            key={`${comparison.id}-${feature.id}`}
            className={`
              h-24 p-4 flex items-center justify-center text-center text-sm font-bold
              ${isRecommended ? (isOddRow ? 'bg-blue-700' : 'bg-blue-500') : (isOddRow ? 'bg-white' : 'bg-gray-50')}
              ${isRecommended ? 'text-white' : 'text-gray-800'}
              border-b ${isRecommended ? 'border-white/30' : 'border-gray-200'}
              transition-all duration-300 ease-out
              hover:shadow-md
            `}
          >
            {/* If the result is a React Element (icon), it was an icon-based comparison */}
            {React.isValidElement(renderedValue) ? (
                <span className={isRecommended ? 'text-white' : primaryTextColor}>
                    {renderedValue}
                </span>
            ) : (
                // Otherwise, display the text value
                renderedValue
            )}
          </div>
        );
      })}
      
      {/* Footer / CTA (optional) */}
      <div className={`p-4 h-16 flex items-center justify-center border-t border-dashed ${isRecommended ? 'border-white/30' : 'border-gray-300'}`}>
        <button 
          className={`
            px-6 py-2 rounded-full font-bold text-sm shadow-lg
            ${isRecommended ? 'bg-white text-blue-600 hover:bg-gray-100' : `${primaryColor} text-white hover:bg-blue-700`}
            transition transform hover:scale-[1.05] duration-200
          `}
        >
          {isRecommended ? 'Start Now' : 'Check Details'}
        </button>
      </div>
    </div>
  );

  // --- Main Component Structure (Mobile/Desktop Toggle) ---

  return (
    <section id="comparison" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        {/* ... (Header and Desktop/Mobile structure as before) ... */}
         <div className="text-center my-12">
        
        {/* Line 1: Main Title */}
        <h2 className="text-4xl font-extrabold text-blue-700 sm:text-5xl">
          Why Go with Us?
        </h2>
        
        {/* Line 2: Subtitle/Context */}
        <p className="mt-4 text-xl text-gray-700">
          Combining our &quot;18+ years of leadership experience&quot; in 1 – $10M – $100M ARR revenue journeys in the US, India, UAE
        </p>
        
        {/* Line 3: Additional Context (as seen in the image) */}
        <p className="text-lg text-gray-500">
          Having lived and breathed the niche of &quot;health, SaaS and AI&quot;
        </p>
        
      </div>
        
        {/* Desktop View (Grid/Table) */}
        <div className="hidden md:flex flex-row overflow-x-auto rounded-xl border border-gray-200 shadow-xl scrollvar-hide">
          <FeatureList isSticky={true} />
          
          {displayColumns.map((comparison, index) => (
            <ComparisonColumn 
              key={comparison.id} 
              comparison={comparison} 
              isRecommended={comparison.isRecommended}
              index={index}
            />
          ))}
        </div>
        
        {/* Mobile View (Slider/Carousel) */}
        <div className="md:hidden ">
          {/* ... (Slider navigation/buttons as before) ... */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <button 
              onClick={prevSlide} 
              className={`p-2 rounded-full border ${primaryBorderColor} ${primaryTextColor} hover:bg-blue-50 transition`}
              aria-label="Previous comparison"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div className="text-lg font-semibold text-gray-800">
              {displayColumns[activeIndex].name}
            </div>
            <button 
              onClick={nextSlide} 
              className={`p-2 rounded-full border ${primaryBorderColor} ${primaryTextColor} hover:bg-blue-50 transition`}
              aria-label="Next comparison"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Slider Content */}
          <div className="overflow-hidden">
            <div 
              className="flex w-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${slideOffset})` }}
            >
              {displayColumns.map((comparison, index) => (
                <div key={comparison.id} className="w-full flex-shrink-0 px-4">
                  <ComparisonColumn 
                    comparison={comparison} 
                    isRecommended={comparison.isRecommended}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Feature details section below the slider card (Mobile) */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Feature Details
            </h3>
            {features.map((feature, index) => {
              const value = displayColumns[activeIndex].data[feature.id];
              const isRecommended = displayColumns[activeIndex].isRecommended;
              
              const renderedValue = getCheckStatus(feature.id, value);

              return (
                <div 
                  key={feature.id} 
                  className={`
                    p-4 rounded-lg mb-2 shadow-sm
                    ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                    border-l-4 ${isRecommended ? primaryBorderColor : 'border-gray-300'}
                  `}
                >
                  <p className="text-sm font-semibold text-gray-600 mb-1">{feature.name}</p>
                  <p className="text-lg font-bold text-gray-900 flex items-center">
                    {React.isValidElement(renderedValue) ? (
                        <span className="mr-2 text-blue-600">
                            {renderedValue}
                        </span>
                    ) : (
                        renderedValue
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        
    </section>
  );
};

export default ComparisonSlider;