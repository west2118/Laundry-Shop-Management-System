import React from "react";

const ServiceSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
        </div>
        <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Pie chart skeleton */}
      <div className="h-72">
        <div className="relative h-full w-full flex items-center justify-center">
          {/* Outer circle for pie chart */}
          <div className="relative w-64 h-64">
            {/* Pie chart segments simulation */}
            <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>

            {/* Animated pie segments */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* Segment 1 */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)",
                  background:
                    "linear-gradient(45deg, #f3f4f6 30%, #e5e7eb 70%)",
                }}></div>

              {/* Segment 2 */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                  background:
                    "linear-gradient(135deg, #e5e7eb 30%, #d1d5db 70%)",
                }}></div>

              {/* Segment 3 */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)",
                  background:
                    "linear-gradient(225deg, #d1d5db 30%, #9ca3af 70%)",
                }}></div>

              {/* Segment 4 */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: "polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)",
                  background:
                    "linear-gradient(315deg, #9ca3af 30%, #6b7280 70%)",
                }}></div>

              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full"></div>
            </div>

            {/* Spinning animation ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-300 animate-spin"></div>
          </div>

          {/* Legend skeleton on the right */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    index === 0
                      ? "bg-gray-400"
                      : index === 1
                      ? "bg-gray-300"
                      : index === 2
                      ? "bg-gray-200"
                      : "bg-gray-100"
                  } animate-pulse`}></div>
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Tooltip area skeleton */}
          <div className="absolute left-4 top-4 bg-white rounded-lg shadow-sm p-3 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSkeleton;
