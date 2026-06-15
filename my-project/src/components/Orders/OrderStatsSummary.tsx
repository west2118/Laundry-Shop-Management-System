import React, { useMemo } from "react";
import { Package, PhilippinePeso, PackageOpen, Users, AlertCircle } from "lucide-react";
import CardsSkeleton from "../SkeletonLoading/CardsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import SummaryStatCard from "../UI/SummaryStatCard";

const OrderStatsSummary = () => {
  const { data: orderStats, isLoading, error } = useQuery({
    queryKey: ["order-stats-data"],
    queryFn: async () => {
      const res = await api.get("/order-stats");
      return res.data;
    },
  });

  const summaryData = useMemo(() => {
    if (!orderStats) return [];
    return [
      {
        title: "Total Orders",
        value: orderStats.totalOrders,
        icon: <Package className="h-6 w-6" />,
        color: "bg-blue-500",
      },
      {
        title: "Today's Orders",
        value: orderStats.todayOrders,
        icon: <PackageOpen className="h-6 w-6" />,
        color: "bg-green-500",
      },
      {
        title: "Revenue Today",
        value: `₱${orderStats.revenueToday.toFixed(2)}`,
        icon: <PhilippinePeso className="h-6 w-6" />,
        color: "bg-purple-500",
      },
      {
        title: "Total Customers",
        value: orderStats.totalCustomers,
        icon: <Users className="h-6 w-6" />,
        color: "bg-blue-500",
      },
    ];
  }, [orderStats]);

  if (isLoading)
    return (
      <div className="mt-6">
        <CardsSkeleton />
      </div>
    );

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mt-6 flex items-center justify-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <span className="text-red-700 font-medium">Failed to load order stats</span>
      </div>
    );
  }

  if (!orderStats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {summaryData.map((stat) => (
        <SummaryStatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default OrderStatsSummary;
