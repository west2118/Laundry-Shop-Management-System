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

type ReportDailySalesChartProps = {
  dailySalesData: {
    chartData: {
      date: string;
      totalAmount: number;
      totalOrders: number;
    }[];
    totalRevenue: number;
    dateRange: string;
  };
};

const ReportDailySalesChart = ({
  dailySalesData,
}: ReportDailySalesChartProps) => {
  if (!dailySalesData) return <ReportChartSkeleton />;

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
          <BarChart data={dailySalesData.chartData}>
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
            <p className="text-sm text-gray-600">{dailySalesData?.dateRange}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900">
              {pesoFormatter.format(dailySalesData?.totalRevenue ?? 0)}
            </p>
            {/* <p className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.5% from last week
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDailySalesChart;
