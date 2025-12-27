import React, { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Eye,
  Edit,
  MoreVertical,
  Calendar,
  Clock,
  User,
  DollarSign,
  Truck,
  CheckCircle,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Download,
  Printer,
  Trash,
} from "lucide-react";
import type { OrderType } from "../../lib/types";
import { dateConvert } from "../../lib/contants";
import {
  getPaymentStatusBadge,
  getServiceBadge,
  getStatusBadge,
} from "../../lib/utils";

type OrderTableProps = {
  orders: OrderType[] | null;
  handleSelectOrder: (
    order: OrderType,
    action: "edit" | "delete" | "details"
  ) => void;
};

const OrderTable = ({ orders, handleSelectOrder }: OrderTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">All Orders</h2>
            <p className="text-gray-600 text-sm">
              Recent laundry orders and their current status
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="h-4 w-4 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Printer className="h-4 w-4 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <MoreVertical className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders?.map((order) => {
              const {
                color,
                icon: StatusIcon,
                label,
              } = getStatusBadge(order.orderStatus);

              const {
                color: paymentColor,
                icon: PaymentStatusIcon,
                label: paymentLabel,
              } = getPaymentStatusBadge(order.paymentStatus);

              return (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Package className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium text-blue-600">
                          {order._id}
                        </span>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {dateConvert(order.createdAt)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">
                        {order.customer.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {label}
                    </span>
                  </td>
                  <td className="py-4 px-6 space-y-2">
                    {order.items.map((item) => {
                      const { color, label } = getServiceBadge(
                        item.serviceName
                      );

                      return (
                        <div key={item._id} className="flex flex-col space-y-1">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium border ${color}`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="font-bold text-gray-900">
                        ₱{order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 capitalize">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${paymentColor}`}>
                      <PaymentStatusIcon className="h-3 w-3" />
                      {paymentLabel}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSelectOrder(order, "details")}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSelectOrder(order, "edit")}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Update Status">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSelectOrder(order, "delete")}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition">
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">Showing 10 of 342 orders</p>
          <div className="flex items-center space-x-2 mt-3 md:mt-0">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
