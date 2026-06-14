import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  TrendingUp,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";
import { pesoFormatter } from "../../lib/utils";
import ReportChartSkeleton from "../SkeletonLoading/ReportChartSkeleton";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

type DailySalesData = {
  chartData: {
    date: string;
    totalAmount: number;
    totalOrders: number;
  }[];
  totalRevenue: number;
  dateRange: string;
};

const ReportDailySalesChart = () => {
  const { data: dailySalesData, isLoading, error } = useQuery<DailySalesData>({
    queryKey: ["report-daily-sales"],
    queryFn: async () => {
      const res = await api.get("/order-daily-sales");
      return res.data;
    },
  });

  if (isLoading || !dailySalesData) return <ReportChartSkeleton />;
  if (error) return <div className="text-red-500">Failed to load daily sales.</div>;

  const { chartData, totalRevenue, dateRange } = dailySalesData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Daily Sales Performance
          </h2>
          <p className="text-gray-600 text-sm">
            Last 7 days revenue and order trends
          </p>
        </div>
        <LineChartIcon className="h-6 w-6 text-green-600" />
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              formatter={(value, name) =>
                name === "Revenue ($)"
                  ? [`$${value?.toLocaleString()}`, name]
                  : [value, name]
              }
            />
            <Legend />
            <Bar
              dataKey="totalAmount"
              name="Revenue ($)"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="totalOrders"
              name="Orders"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Weekly Summary</p>
            <p className="text-sm text-gray-600">{dateRange}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900">
              {pesoFormatter.format(totalRevenue ?? 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDailySalesChart;
