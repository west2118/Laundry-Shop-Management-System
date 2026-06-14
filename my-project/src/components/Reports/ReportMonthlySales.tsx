import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";
import {
  PhilippinePeso,
  MoreVertical,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ShoppingBag,
} from "lucide-react";
import { pesoFormatter } from "../../lib/utils";
import ReportMonthlySkeleton from "../SkeletonLoading/ReportMonthlySkeleton";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

type MonthlySalesData = {
  chartData: {
    date: string;
    totalAmount: number;
    totalOrders: number;
  }[];
  totalRevenue: number;
  totalOrders: number;
};

const ReportMonthlySales = () => {
  const { data: monthlySalesData, isLoading, error } = useQuery<MonthlySalesData>({
    queryKey: ["report-monthly-sales"],
    queryFn: async () => {
      const res = await api.get("/order-monthly-sales");
      return res.data;
    },
  });

  if (isLoading || !monthlySalesData) return <ReportMonthlySkeleton />;
  if (error) return <div className="text-red-500">Failed to load monthly sales.</div>;

  const { chartData, totalRevenue, totalOrders } = monthlySalesData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Monthly Sales Overview
          </h2>
          <p className="text-gray-600 text-sm">
            Revenue and order trends for the year
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
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
            <Area
              type="monotone"
              dataKey="totalAmount"
              name="Revenue ($)"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="totalOrders"
              name="Orders"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ stroke: "#10B981", strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <PhilippinePeso className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">
                {pesoFormatter.format(totalRevenue ?? 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <ShoppingBag className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">
                {totalOrders}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMonthlySales;
