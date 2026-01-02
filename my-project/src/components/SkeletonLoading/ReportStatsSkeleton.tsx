import React from "react";

const ReportSkeletonItem = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-3 flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg">
            <div className="h-full flex items-center justify-center">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportStatsSkeleton = () => {
  return (
    <>
      {/* First row - 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {[...Array(3)].map((_, index) => (
          <ReportSkeletonItem key={index} />
        ))}
      </div>

      {/* Second row - 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[...Array(4)].map((_, index) => (
          <ReportSkeletonItem key={index} />
        ))}
      </div>
    </>
  );
};

export default ReportStatsSkeleton;
