import {
  DollarSign,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";
import { pesoFormatter } from "../../lib/utils";
import ReportStatCard from "./ReportStatCard";
import ReportStatsSkeleton from "../SkeletonLoading/ReportStatsSkeleton";

type ReportStatsMetricsProps = {
  reportStats: {
    aovData: number;
    monthlyGrowth: number;
    repeatRate: number;
    totalCustomers: number;
    revenueToday: number;
    totalOrders: number;
    totalRevenue: number;
  };
};

const ReportStatsMetrics = ({ reportStats }: ReportStatsMetricsProps) => {
  if (!reportStats) return <ReportStatsSkeleton />;

  const reportStatsChart = [
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: pesoFormatter.format(reportStats.totalRevenue),
      subtitle: "All time",
      icon: <DollarSign className="h-5 w-5" />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      id: "total-orders",
      title: "Total Orders",
      value: reportStats.totalOrders.toLocaleString(),
      subtitle: "All time",
      icon: <ShoppingBag className="h-5 w-5" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: "revenue-today",
      title: "Revenue Today",
      value: pesoFormatter.format(reportStats.revenueToday),
      subtitle: "Today",
      icon: <TrendingUp className="h-5 w-5" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      id: "total-customers",
      title: "Total Customers",
      value: reportStats.totalCustomers.toLocaleString(),
      icon: <Users className="h-5 w-5" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: "repeat-rate",
      title: "Repeat Rate",
      value: `${reportStats.repeatRate.toFixed(1)}%`,
      icon: <RefreshCw className="h-5 w-5" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      id: "aov",
      title: "Avg Order Value",
      value: pesoFormatter.format(reportStats.aovData),
      icon: <DollarSign className="h-5 w-5" />,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      id: "monthly-growth",
      title: "Monthly Growth",
      value: `${reportStats.monthlyGrowth.toFixed(1)}%`,
      icon: <TrendingUp className="h-5 w-5" />,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {reportStatsChart.slice(0, 3).map((stat) => (
          <ReportStatCard key={stat.title} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {reportStatsChart.slice(3).map((stat) => (
          <ReportStatCard key={stat.title} stat={stat} />
        ))}
      </div>
    </>
  );
};

export default ReportStatsMetrics;
