// ComparisonData.js (Full Content)

import { CheckIcon, XMarkIcon, MinusIcon } from '@heroicons/react/24/solid';

import comparisonData from "@/data/comparision.json"


// Helper to render the checkmarks/X's based on the data value
export const getCheckStatus = (featureId, value) => {
  const iconClasses = 'w-6 h-6';
  
  // If the feature is NOT a check type, return the text directly
  if (comparisonData.features.find(f => f.id === featureId)?.type === 'text') {
    return value;
  }

  // Handle icon-based features
  const lowerValue = String(value).toLowerCase();

  if (
    lowerValue.includes('absolutely') || 
    lowerValue === 'yes' || 
    lowerValue.includes('within') // Special case for "Within 7 days/1 week"
  ) {
    return <CheckIcon className={`text-green-500 ${iconClasses}`} />;
  } 
  
  if (lowerValue.includes('no')) {
    return <XMarkIcon className={`text-red-600 ${iconClasses}`} />;
  } 
  
  if (lowerValue.includes('maybe')) {
    return <MinusIcon className={`text-yellow-500 ${iconClasses}`} />;
  }
  
  // For any other check/icon value that needs to be displayed as text (like time)
  return value; 
};