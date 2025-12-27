import { CheckCircle, Clock, ShoppingBag, Truck } from "lucide-react";
import React from "react";
import CardsSkeleton from "../SkeletonLoading/CardsSkeleton";

type DashboardStatsSummaryProps = {
  ordersStats: {
    pending: number;
    pickedUp: number;
    ready: number;
    totalOrders: number;
  };
};

const DashboardStatsSummary = ({ ordersStats }: DashboardStatsSummaryProps) => {
  if (!ordersStats) return <CardsSkeleton />;

  const summaryData = [
    {
      title: "Total Orders",
      value: ordersStats.totalOrders,
      color: "bg-blue-500",
      icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
      title: "Pending",
      value: ordersStats.pending,
      color: "bg-yellow-500",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Ready",
      value: ordersStats.ready,
      color: "bg-green-500",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Picked Up",
      value: ordersStats.pickedUp,
      color: "bg-purple-500",
      icon: <Truck className="h-6 w-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {summaryData?.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div
              className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
              <div className="text-white">{stat.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatsSummary;
