import React from "react";

const CustomerTableRowSkeleton = () => {
  return (
    <tr className="hover:bg-gray-50">
      {/* Customer Info */}
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 animate-pulse">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-3 bg-gray-100 rounded w-24"></div>
          </div>
        </div>
      </td>

      {/* Contact Info */}
      <td className="py-4 px-6 space-y-2">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-gray-200 rounded mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-gray-200 rounded mr-2"></div>
          <div className="h-3 bg-gray-100 rounded w-36"></div>
        </div>
      </td>

      {/* Total Orders */}
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-8"></div>
        </div>
      </td>

      {/* Total Spent */}
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
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

export default CustomerTableRowSkeleton;
