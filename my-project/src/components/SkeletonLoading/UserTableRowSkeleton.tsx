import React from "react";

const UserTableRowSkeleton = () => {
  return (
    <tr className="hover:bg-gray-50">
      {/* User Info */}
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
      </td>

      {/* Role */}
      <td className="py-4 px-6">
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      </td>

      {/* Status */}
      <td className="py-4 px-6">
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      </td>
    </tr>
  );
};

export default UserTableRowSkeleton;
