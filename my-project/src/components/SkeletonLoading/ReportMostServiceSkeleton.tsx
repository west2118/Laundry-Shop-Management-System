import React from "react";

const ReportMostServiceSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded w-36"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>

      {/* Chart placeholder */}
      <div className="h-80 bg-gray-100 rounded-lg"></div>

      {/* Services list */}
      <div className="mt-6 space-y-3">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="text-right space-y-1">
              <div className="h-4 bg-gray-300 rounded w-20 ml-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-12 ml-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportMostServiceSkeleton;
