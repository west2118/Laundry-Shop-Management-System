import React from "react";

const RecentOrdersSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header skeleton */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-40 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Order ID", "Customer", "Service", "Status", "Amount"].map(
                (header, index) => (
                  <th key={index} className="py-3 px-6 text-left">
                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {/* Order ID */}
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </td>

                {/* Customer */}
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </td>

                {/* Service */}
                <td className="py-4 px-6 space-y-2">
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-100 rounded w-20 animate-pulse"></div>
                    <div className="h-6 bg-gray-100 rounded w-16 animate-pulse"></div>
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-6 bg-gray-100 rounded w-20 animate-pulse"></div>
                  </div>
                </td>

                {/* Amount */}
                <td className="py-4 px-6">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer skeleton */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
          <div className="ml-1 h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrdersSkeleton;
