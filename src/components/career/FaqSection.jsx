"use client";
import React, { useState } from "react";
import faqData from "@/data/faqData.json";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const FaqSection = () => {
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);

  const activeCategoryData = faqData.find(
    (cat) => cat.category === activeCategory
  );

  const toggleQuestion = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  return (
    <section id="faq" className="relative  py-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Decorative Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        // style={{
        //   backgroundImage:
        //     "radial-gradient(circle at 20% 30%, rgba(191, 219, 254, 0.3), transparent 40%), radial-gradient(circle at 80% 70%, rgba(191, 219, 254, 0.2), transparent 40%)",
        // }}
      ></div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700">
            Your Business Growth Questions, Answered
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 mx-auto">
            Clear insights about our consulting process, strategy, and outcomes
            — everything you need to make the right decision.
          </p>
        </div>

        {/* Category Navigation (Mobile) */}
        <div className="flex gap-3 overflow-x-auto pb-6 lg:hidden scrollbar-hide">
          {faqData.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`flex-shrink-0 px-4 py-2 rounded-full border font-semibold transition-all duration-200 ${
                activeCategory === category.category
                  ? "bg-blue-600 text-white border-blue-700 shadow-md"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Sidebar Navigation (Desktop) */}
          <div className="hidden lg:block border-r border-gray-200 pr-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Categories
            </h3>
            <nav className="space-y-2">
              {faqData.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`block w-full text-left py-2 px-3 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === category.category
                      ? "bg-blue-100 text-blue-700 font-bold shadow-sm"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </nav>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3 mt-10 lg:mt-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-2 flex items-center gap-2">
              <span className="text-blue-700">#</span> {activeCategoryData?.category} Questions
            </h3>

            <dl className="space-y-6">
              {activeCategoryData?.questions.map((item) => (
                <div
                  key={item.id}
                  className="group border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                >
                  <dt>
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      aria-expanded={openQuestionId === item.id}
                      className="flex w-full items-center justify-between px-5 py-4 text-left text-gray-900"
                    >
                      <span className="text-lg font-semibold">
                        {item.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {openQuestionId === item.id ? (
                          <MinusIcon
                            className="h-6 w-6 text-blue-700 transition-transform duration-300 rotate-180"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlusIcon
                            className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-transform duration-300"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </button>
                  </dt>

                  {/* Animated Answer */}
                  <dd
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openQuestionId === item.id
                        ? "max-h-96 opacity-100 px-5 pb-5"
                        : "max-h-0 opacity-0 px-5"
                    }`}
                  >
                    <p className="text-gray-600 text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
