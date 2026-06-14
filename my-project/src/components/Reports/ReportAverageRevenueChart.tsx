import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { pesoFormatter } from "../../lib/utils";
import ReportChartSkeleton from "../SkeletonLoading/ReportChartSkeleton";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

type AverageRevenueData = {
  averageToday: number;
  averageMonthly: number;
  averageWeekly: number;
};

const ReportAverageRevenueChart = () => {
  const { data: averageRevenueData, isLoading, error } = useQuery<AverageRevenueData>({
    queryKey: ["report-average-revenue"],
    queryFn: async () => {
      const res = await api.get("/order-average-revenue");
      return res.data;
    },
  });

  if (isLoading || !averageRevenueData) return <ReportChartSkeleton />;
  if (error) return <div className="text-red-500">Failed to load average revenue.</div>;

  const aovChartData = [
    { period: "Today", value: averageRevenueData.averageToday },
    { period: "Weekly", value: averageRevenueData.averageWeekly },
    { period: "Monthly", value: averageRevenueData.averageMonthly },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Average Order Value
          </h2>
          <p className="text-gray-600 text-sm">Average revenue per order</p>
        </div>
        <TrendingUp className="h-6 w-6 text-green-600" />
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={aovChartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="period" width={80} />
            <Tooltip formatter={(value) => `₱${value}`} />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-gray-200 mt-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Current AOV</p>
            <p className="text-sm text-gray-600">This month</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 text-lg">
              {pesoFormatter.format(averageRevenueData.averageMonthly)}
            </p>
            {/* <p className="text-sm text-green-600 flex items-center justify-end">
              <TrendingUp className="h-3 w-3 mr-1" />
              +6.2% from last month
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAverageRevenueChart;
