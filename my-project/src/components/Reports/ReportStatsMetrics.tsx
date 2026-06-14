import {
  PhilippinePeso,
  ShoppingBag,
  Users,
} from "lucide-react";
import React from "react";
import { pesoFormatter } from "../../lib/utils";
import ReportStatCard from "./ReportStatCard";
import ReportStatsSkeleton from "../SkeletonLoading/ReportStatsSkeleton";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

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

  if (isLoading || !reportStats) return <ReportStatsSkeleton />;
  if (error) return <div className="text-red-500">Failed to load stats.</div>;

  const reportStatsChart = [
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: pesoFormatter.format(reportStats.totalRevenue),
      subtitle: "Selected Range",
      icon: <PhilippinePeso className="h-5 w-5" />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      id: "total-orders",
      title: "Total Orders",
      value: reportStats.totalOrders.toLocaleString(),
      subtitle: "Selected Range",
      icon: <ShoppingBag className="h-5 w-5" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: "aov",
      title: "Avg Order Value",
      value: pesoFormatter.format(reportStats.aovData),
      subtitle: "Selected Range",
      icon: <PhilippinePeso className="h-5 w-5" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      id: "total-customers",
      title: "Total Customers",
      value: reportStats.totalCustomers.toLocaleString(),
      subtitle: "Selected Range",
      icon: <Users className="h-5 w-5" />,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {reportStatsChart.map((stat) => (
        <ReportStatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default ReportStatsMetrics;
