import React from "react";

const OrderStatusSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* List skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="h-5 bg-gray-300 rounded w-12 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="mt-8 h-48">
        <div className="relative h-full w-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-gray-100 rounded w-8 ml-2 animate-pulse"></div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-8 right-0 flex justify-between">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-gray-100 rounded w-10 animate-pulse"></div>
            ))}
          </div>

          {/* Chart grid */}
          <div className="absolute inset-0 flex flex-col justify-between pt-4 pb-8 px-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-px bg-gray-100 w-full"></div>
            ))}
          </div>

          {/* Bars skeleton */}
          <div className="absolute bottom-8 left-10 right-4 h-36 flex items-end justify-between space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gray-300 rounded-t animate-pulse"
                style={{
                  height: `${Math.random() * 60 + 20}%`,
                }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusSkeleton;
