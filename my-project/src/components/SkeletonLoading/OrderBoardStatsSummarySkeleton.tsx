import React from "react";

const OrderBoardStatsSummarySkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="rounded-xl shadow-sm p-5 border border-gray-100 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Icon container skeleton */}
              <div className="w-10 h-10 rounded-lg mr-3 bg-gray-100">
                <div className="h-full flex items-center justify-center">
                  <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Text content skeleton */}
              <div className="space-y-2">
                {/* Title skeleton */}
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                {/* Count skeleton */}
                <div className="h-7 bg-gray-300 rounded w-12"></div>
              </div>
            </div>

            {/* "orders" label skeleton */}
            <div className="h-3 bg-gray-200 rounded w-10"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderBoardStatsSummarySkeleton;
