// components/FaqSection.jsx
"use client"
import React, { useState } from 'react';
import faqData from '@/data/faqData.json'; // Assuming the JSON file is in a 'data' folder
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'; // Requires @heroicons/react

/**
 * Renders an FAQ section for a Business Growth Consultant.
 * It uses a white background and blue-700 as the primary color.
 */
const FaqSection = () => {
  // State to track which question is currently open. 
  // Stores the 'id' of the currently open question.
  const [openQuestionId, setOpenQuestionId] = useState(null);
  
  // State to track the active category (for filtering/display)
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);

  // Filter questions based on the active category
  const activeCategoryData = faqData.find(cat => cat.category === activeCategory);

  // Function to toggle the open state of a question
  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <div className="bg-white py-16 sm:py-24 my-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:text-center">
          {/* <h2 className="text-lg font-semibold text-blue-700">FAQ</h2> */}
          <p className="mt-2 text-3xl font-bold tracking-tight text-blue-700 sm:text-4xl">
            Your Business Growth Questions, Answered
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Find clarity on our consulting process, strategy, and expected results.
          </p>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 border-r border-gray-200 pr-6 hidden lg:block">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
            <nav className="space-y-2">
              {faqData.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`block w-full text-left py-2 px-3 rounded-lg transition-colors duration-200 ease-in-out ${
                    activeCategory === category.category
                      ? 'bg-blue-100 text-blue-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </nav>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
              {activeCategoryData?.category} Questions
            </h3>
            
            <dl className="space-y-6">
              {activeCategoryData?.questions.map((item) => (
                <div key={item.id} className="pt-6 border-b border-gray-200">
                  <dt>
                    {/* Question Button */}
                    <button
                      className="flex w-full items-start justify-between text-left text-gray-900"
                      onClick={() => toggleQuestion(item.id)}
                      aria-expanded={openQuestionId === item.id}
                    >
                      <span className="text-lg font-medium">{item.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        {openQuestionId === item.id ? (
                          <MinusIcon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {/* Answer Content */}
                  {openQuestionId === item.id && (
                    <dd className="mt-2 pr-12 pb-6">
                      <p className="text-base text-gray-600">{item.answer}</p>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;