import React from "react";

const ReportMonthlySkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </div>
        <div className="p-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="h-80 bg-gray-100 rounded-lg"></div>

      {/* Stats at bottom */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* Revenue stat */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>

        {/* Orders stat */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMonthlySkeleton;
