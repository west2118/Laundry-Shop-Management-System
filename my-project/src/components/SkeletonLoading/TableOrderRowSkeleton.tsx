import React from "react";

const TableOrderRowSkeleton = () => {
  return (
    <tr className="hover:bg-gray-50">
      {/* Order ID & Date */}
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 animate-pulse">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-100 rounded w-20"></div>
          </div>
        </div>
      </td>

      {/* Customer */}
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 animate-pulse">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-28"></div>
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 bg-gray-100 rounded w-16 animate-pulse"></div>
        </div>
      </td>

      {/* Services */}
      <td className="py-4 px-6 space-y-2">
        <div className="flex flex-col space-y-2">
          <div className="h-5 bg-gray-100 rounded w-20 animate-pulse"></div>
        </div>
      </td>

      {/* Amount */}
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
      </td>

      {/* Payment Status */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 bg-gray-100 rounded w-20 animate-pulse"></div>
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 px-6">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="p-2 bg-gray-100 rounded-lg animate-pulse">
              <div className="h-4 w-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </td>
    </tr>
  );
};

export default TableOrderRowSkeleton;
