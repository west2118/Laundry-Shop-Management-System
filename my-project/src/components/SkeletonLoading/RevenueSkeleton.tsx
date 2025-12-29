import React from "react";

const RevenueSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded w-36 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
        </div>
        <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Chart skeleton */}
      <div className="h-72">
        <div className="relative h-full w-full border border-gray-100 rounded-lg overflow-hidden">
          {/* Chart grid simulation */}
          <div className="absolute inset-0">
            {/* Horizontal grid lines */}
            <div className="flex flex-col h-full justify-between pt-6 pb-8 px-12">
              {[...Array(6)].map((_, i) => (
                <div key={`h-${i}`} className="h-px bg-gray-100 w-full"></div>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`y-${i}`}
                  className="h-3 bg-gray-200 rounded w-10 ml-2 animate-pulse"></div>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-2 left-12 right-4 flex justify-between">
              {[...Array(7)].map((_, i) => (
                <div
                  key={`x-${i}`}
                  className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueSkeleton;
