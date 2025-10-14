"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import comparisonData from "@/data/comparision.json";
import { getCheckStatus } from "./ComparisonData";

const ComparisonSlider = () => {
  const { features, comparisons } = comparisonData;
  const [activeIndex, setActiveIndex] = useState(0);

  const yourService = comparisons.find((c) => c.isRecommended);
  const otherComparisons = comparisons.filter((c) => !c.isRecommended);
  const displayColumns = [yourService, ...otherComparisons];
  const totalSlides = displayColumns.length;

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const slideOffset = useMemo(() => `-${activeIndex * 100}%`, [activeIndex]);

  const parentVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const FeatureList = ({ isSticky = false }) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={childVariant}
      className={`${
        isSticky
          ? "sticky left-0 bg-white z-10 border-r border-gray-200 shadow-md md:shadow-none"
          : ""
      } flex-shrink-0 w-full md:w-auto md:min-w-[15rem]`}
    >
      <h3 className="h-[6rem] p-4 flex items-center font-bold text-lg text-gray-900 border-b border-gray-200">
        Feature
      </h3>
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`h-24 p-4 flex items-center text-sm font-medium transition-colors duration-300 ease-out ${
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          } hover:bg-blue-50 hover:text-blue-800 border-b border-gray-200`}
        >
          {feature.name}
        </div>
      ))}
    </motion.div>
  );

  const ComparisonColumn = ({ comparison, isRecommended, index }) => (
    <motion.div
      variants={childVariant}
      whileHover={{ scale: 1.03 }}
      className={`
        flex-shrink-0 w-full 
        md:w-1/4 lg:w-1/4 xl:w-1/5 
        transition-all 
        ${isRecommended ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-900"}
        ${isRecommended ? "shadow-xl scale-[1.02] z-20" : "shadow-lg"}
        rounded-xl
        h-full
        mx-1
      `}
      style={{
        transform: `translateX(${slideOffset})`,
        transition: "transform 0.5s ease-in-out",
      }}
    >
      <div
        className={`h-[6rem] p-4 flex flex-col justify-center items-center text-center border-b ${
          isRecommended ? "bg-blue-800" : "border-gray-300"
        }`}
      >
        <h3 className="text-xl font-extrabold">{comparison.name}</h3>
        {isRecommended && (
          <span className="text-sm font-semibold mt-1 px-3 py-1 bg-white text-blue-600 rounded-full animate-pulse">
            Recommended
          </span>
        )}
      </div>

      {features.map((feature, idx) => {
        const value = comparison.data[feature.id];
        const isOddRow = idx % 2 === 0;
        const renderedValue = getCheckStatus(feature.id, value);

        return (
          <div
            key={`${comparison.id}-${feature.id}`}
            className={`
              h-24 p-4 flex items-center justify-center text-center text-sm font-bold
              ${isRecommended ? (isOddRow ? "bg-blue-700" : "bg-blue-600") : isOddRow ? "bg-white" : "bg-gray-50"}
              ${isRecommended ? "text-white" : "text-gray-800"}
              border-b ${isRecommended ? "border-white/30" : "border-gray-200"}
              transition-all duration-300 ease-out
              hover:shadow-md
            `}
          >
            {React.isValidElement(renderedValue) ? (
              <span className={isRecommended ? "text-white" : "text-blue-700"}>
                {renderedValue}
              </span>
            ) : (
              renderedValue
            )}
          </div>
        );
      })}

      <div
        className={`p-4 h-16 flex items-center justify-center border-t border-dashed ${
          isRecommended ? "border-white/30" : "border-gray-300"
        }`}
      >
        <button
          className={`
            px-6 py-2 rounded-full font-bold text-sm shadow-lg
            ${isRecommended ? "bg-white text-blue-700 hover:bg-gray-100" : "bg-blue-700 text-white hover:bg-blue-800"}
            transition transform hover:scale-[1.05] duration-200
          `}
        >
          {isRecommended ? "Start Now" : "Check Details"}
        </button>
      </div>
    </motion.div>
  );

  return (
    <section id="comparison" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={parentVariant}
        className="text-center my-12"
      >
        <motion.h2 variants={childVariant} className="text-4xl font-extrabold text-blue-700 sm:text-5xl">
          Why Go with Us?
        </motion.h2>

        <motion.p variants={childVariant} className="mt-4 text-xl text-gray-700">
          Combining our 18+ years of leadership experience in $1M – $10M – $100M ARR journeys
        </motion.p>

        <motion.p variants={childVariant} className="text-lg text-gray-500">
          Having lived and breathed the niche of Health, SaaS & AI
        </motion.p>
      </motion.div>

      <div className="hidden md:flex flex-row overflow-x-auto rounded-xl border border-gray-200 shadow-xl">
        <FeatureList isSticky={true} />
        {displayColumns.map((comparison, index) => (
          <ComparisonColumn key={comparison.id} comparison={comparison} isRecommended={comparison.isRecommended} index={index} />
        ))}
      </div>

      <div className="md:hidden">
        <div className="flex justify-center items-center space-x-4 mb-8">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-50 transition"
            aria-label="Previous comparison"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div className="text-lg font-semibold text-gray-800">
            {displayColumns[activeIndex].name}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-50 transition"
            aria-label="Next comparison"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${slideOffset})` }}
          >
            {displayColumns.map((comparison, index) => (
              <div key={comparison.id} className="w-full flex-shrink-0 px-4">
                <ComparisonColumn comparison={comparison} isRecommended={comparison.isRecommended} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSlider;
