import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  AlertCircle
} from "lucide-react";
import RevenueSkeleton from "../SkeletonLoading/RevenueSkeleton";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

const DashboardRevenueChart = () => {
  const { data: dailyRevenueData, isLoading, error } = useQuery({
    queryKey: ["order-daily-sales"],
    queryFn: async () => {
      const res = await api.get("/order-daily-sales");
      return res.data;
    },
    staleTime: 60_000,
  });

  if (isLoading) return <RevenueSkeleton />;
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 h-full flex flex-col items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <span className="text-red-700 font-medium">Failed to load revenue data</span>
      </div>
    );
  }
  if (!dailyRevenueData) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Weekly Revenue</h3>
          <p className="text-gray-600 text-sm">7 days performance</p>
        </div>
        <TrendingUp className="h-5 w-5 text-green-500" />
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyRevenueData.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              formatter={(value) => [`₱${value}`, "Revenue"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalAmount"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ stroke: "#3B82F6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name="Revenue (₱)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardRevenueChart;
