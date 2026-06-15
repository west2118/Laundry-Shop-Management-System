import React, { useMemo } from "react";
import {
  CheckCircle,
  PhilippinePeso,
  Layers,
  PackageOpen,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import SummaryStatCard from "../UI/SummaryStatCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import CardsSkeleton from "../SkeletonLoading/CardsSkeleton";

const StatsSummaryServices = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["service-stats"],
    queryFn: async () => {
      const res = await api.get("/service-stats");
      return res.data;
    },
    staleTime: 30 * 60 * 1000,
  });

  const statsData = useMemo(() => {
    if (!stats) return [];
    return [
      {
        title: "Total Services",
        value: stats.totalServices,
        icon: <PackageOpen className="h-6 w-6" />,
        color: "bg-blue-500",
      },
      {
        title: "Active Services",
        value: stats.activeServices,
        icon: <CheckCircle className="h-6 w-6" />,
        color: "bg-purple-500",
      },
      {
        title: "Service Categories",
        value: stats.totalCategories,
        icon: <Layers className="h-6 w-6" />,
        color: "bg-orange-500",
      },
      {
        title: "Total Orders",
        value: stats.totalOrders,
        icon: <ShoppingBag className="h-6 w-6" />,
        color: "bg-green-500",
      },
    ];
  }, [stats]);

  if (isLoading) return <CardsSkeleton />;
  if (error || !stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {statsData.map((stat) => (
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

export default StatsSummaryServices;
