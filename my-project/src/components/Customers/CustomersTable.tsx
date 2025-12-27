import {
  Calendar,
  CheckCircle,
  DollarSign,
  Edit,
  Eye,
  Mail,
  MoreVertical,
  Phone,
  Search,
  ShoppingBag,
  Star,
  Trash,
  User,
  UserPlus,
  X,
} from "lucide-react";
import React from "react";
import type { CustomerType } from "../../lib/types";
import { dateConvert } from "../../lib/contants";

type CustomersTableProps = {
  customers: CustomerType[] | null;
  handleSelectCustomer: (
    selectedCustomer: CustomerType,
    action: "edit" | "details" | "delete"
  ) => void;
};

const CustomersTable = ({
  customers,
  handleSelectCustomer,
}: CustomersTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      Active: "bg-green-100 text-green-800",
      VIP: "bg-purple-100 text-purple-800",
      New: "bg-blue-100 text-blue-800",
      Inactive: "bg-gray-100 text-gray-800",
    };

    const statusIcons = {
      Active: <CheckCircle className="h-3 w-3 mr-1" />,
      VIP: <Star className="h-3 w-3 mr-1" />,
      New: <UserPlus className="h-3 w-3 mr-1" />,
      Inactive: <X className="h-3 w-3 mr-1" />,
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {statusIcons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Customer List</h2>
            <p className="text-gray-600 text-sm">
              All registered customers of your laundry shop
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers?.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {customer.fullName}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Joined {dateConvert(customer.createdAt)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center text-gray-900 mb-1">
                    <Phone className="h-3 w-3 mr-2 text-gray-500" />
                    {customer.contact}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 truncate">
                    <Mail className="h-3 w-3 mr-2" />
                    {customer.email}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      {customer?.orders ?? 0}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      {customer?.totalSpent ?? 0}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSelectCustomer(customer, "details")}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSelectCustomer(customer, "edit")}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSelectCustomer(customer, "delete")}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersTable;
