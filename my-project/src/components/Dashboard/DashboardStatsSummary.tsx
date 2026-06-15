import { CheckCircle, Clock, ShoppingBag, Truck, AlertCircle } from "lucide-react";
import React, { useMemo } from "react";
import CardsSkeleton from "../SkeletonLoading/CardsSkeleton";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import SummaryStatCard from "../UI/SummaryStatCard";

const DashboardStatsSummary = () => {
  const { data: ordersStats, isLoading, error } = useQuery({
    queryKey: ["order-stats-weekly"],
    queryFn: async () => {
      const res = await api.get("/order-stats-weekly");
      return res.data;
    },
    staleTime: 60_000,
  });

  const summaryData = useMemo(() => {
    if (!ordersStats) return [];
    return [
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
  }, [ordersStats]);

  if (isLoading) return <CardsSkeleton />;
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8 flex items-center justify-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <span className="text-red-700 font-medium">Failed to load stats summary</span>
      </div>
    );
  }
  if (!ordersStats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {summaryData?.map((stat) => (
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

export default DashboardStatsSummary;
