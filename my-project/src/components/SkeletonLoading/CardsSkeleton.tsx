import React from "react";

const CardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="space-y-3 flex-1">
              {/* Title skeleton */}
              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              {/* Value skeleton */}
              <div className="h-7 bg-gray-300 rounded w-16 animate-pulse"></div>
            </div>
            {/* Icon container skeleton */}
            <div className="ml-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsSkeleton;
