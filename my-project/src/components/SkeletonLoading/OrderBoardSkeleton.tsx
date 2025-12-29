import React from "react";

const OrderBoardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-100 animate-pulse shadow-sm">
          {/* Column Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              {/* Icon container */}
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-2">
                <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
              </div>

              {/* Title and count */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-100 rounded w-16"></div>
              </div>
            </div>

            {/* Menu button */}
            <div className="p-1">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Column Body - Order Cards */}
          <div className="p-3 space-y-3 min-h-500">
            {/* Order card skeletons */}
            {[...Array(1)].map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="bg-white shadow-sm rounded-lg border border-gray-100 p-4 space-y-3">
                {/* Order header */}
                <div className="flex justify-between items-start">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-100 rounded w-12"></div>
                </div>

                {/* Customer info */}
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-28"></div>
                </div>

                {/* Service badges */}
                <div className="flex flex-wrap gap-1">
                  <div className="h-5 bg-gray-100 rounded w-16"></div>
                  <div className="h-5 bg-gray-100 rounded w-12"></div>
                </div>

                {/* Price and button */}
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderBoardSkeleton;
