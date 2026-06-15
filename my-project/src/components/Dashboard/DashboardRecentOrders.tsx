import { BarChartIcon, TrendingUp, AlertCircle } from "lucide-react";
import React from "react";
import type { OrderType } from "../../lib/types";
import {
  getPaymentStatusBadge,
  getServiceBadge,
  getStatusBadge,
} from "../../lib/utils";
import RecentOrdersSkeleton from "../SkeletonLoading/RecentOrdersSkeleton";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

const DashboardRecentOrders = () => {
  const { data: ordersRecent, isLoading, error } = useQuery({
    queryKey: ["order-recent"],
    queryFn: async () => {
      const res = await api.get("/order-recent");
      return res.data as OrderType[];
    },
    staleTime: 60_000,
  });

  if (isLoading) return <RecentOrdersSkeleton />;
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 h-full flex flex-col items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <span className="text-red-700 font-medium">Failed to load recent orders</span>
      </div>
    );
  }
  if (!ordersRecent) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <p className="text-gray-600 text-sm">
              Latest laundry orders and their status
            </p>
          </div>
          <BarChartIcon className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      {/* Responsive table container */}
      <div className="overflow-x-auto flex-1">
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
                Service
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ordersRecent?.map((order) => {
              const {
                color,
                icon: StatusIcon,
                label,
              } = getStatusBadge(order.orderStatus);

              return (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <span className="font-medium text-blue-600">
                      {order._id.slice(0, 8)}...
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">
                      {order.customer.fullName}
                    </div>
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
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {label}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    ₱{order.totalAmount.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <Link
          to="orders"
          className="text-blue-600 font-medium text-sm hover:text-blue-800 flex items-center">
          View all orders
          <TrendingUp className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardRecentOrders;
