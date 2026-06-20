import {
  PhilippinePeso,
  ShoppingBag,
  Users,
} from "lucide-react";
import React from "react";
import { pesoFormatter, formatCompactNumber } from "../../lib/utils";
import SummaryStatCard from "../UI/SummaryStatCard";
import ReportStatsSkeleton from "../SkeletonLoading/ReportStatsSkeleton";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import CardsSkeleton from "../SkeletonLoading/CardsSkeleton";

type ReportStatsMetricsProps = {
  startDate: string;
  endDate: string;
};

const ReportStatsMetrics = ({ startDate, endDate }: ReportStatsMetricsProps) => {
  const { data: reportStats, isLoading, error } = useQuery({
    queryKey: ["report-stats", startDate, endDate],
    queryFn: async () => {
      const res = await api.get(`/order-report-sales?startDate=${startDate}&endDate=${endDate}`);
      return res.data;
    },
  });

  if (isLoading) return <CardsSkeleton />;
  if (error) return <div className="text-red-500">Failed to load stats.</div>;

  const reportStatsChart = [
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: formatCompactNumber(reportStats.totalRevenue),
      subtitle: "Selected Range",
      icon: <PhilippinePeso className="h-5 w-5" />,
      color: "bg-purple-500",
    },
    {
      id: "total-orders",
      title: "Total Orders",
      value: reportStats.totalOrders.toLocaleString(),
      subtitle: "Selected Range",
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      id: "aov",
      title: "Avg Order Value",
      value: formatCompactNumber(reportStats.aovData),
      subtitle: "Selected Range",
      icon: <PhilippinePeso className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      id: "total-customers",
      title: "Total Customers",
      value: reportStats.totalCustomers.toLocaleString(),
      subtitle: "Selected Range",
      icon: <Users className="h-5 w-5" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {reportStatsChart.map((stat) => (
        <SummaryStatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default ReportStatsMetrics;
