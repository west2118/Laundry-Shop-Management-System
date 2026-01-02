import React from "react";

const ServiceTableRowSkeleton = () => {
  return (
    <tr className="hover:bg-gray-50">
      {/* Service Info */}
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 animate-pulse">
            <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-3 bg-gray-100 rounded w-36"></div>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 bg-gray-100 rounded w-16 animate-pulse"></div>
        </div>
      </td>

      {/* Pricing */}
      <td className="py-4 px-6 space-y-2">
        <div className="flex items-center">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-3 bg-gray-100 rounded w-8 ml-1"></div>
        </div>
        <div className="flex items-center">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-3 bg-gray-100 rounded w-10 ml-1"></div>
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 bg-gray-100 rounded w-20 animate-pulse"></div>
        </div>
      </td>

      {/* Total Orders */}
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-8"></div>
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 px-6">
        <div className="flex space-x-1">
          {[...Array(2)].map((_, index) => (
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

export default ServiceTableRowSkeleton;
