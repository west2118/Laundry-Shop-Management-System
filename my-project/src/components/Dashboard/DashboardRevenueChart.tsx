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
} from "lucide-react";
import RevenueSkeleton from "../SkeletonLoading/RevenueSkeleton";

type DashboardRevenueChartProps = {
  dailyRevenueData: {
    chartData: {
      date: string;
      totalAmount: number;
      totalOrders: number;
    }[];
    totalRevenue: number;
  };
};

const DashboardRevenueChart = ({
  dailyRevenueData,
}: DashboardRevenueChartProps) => {
  if (!dailyRevenueData) return <RevenueSkeleton />;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
              name="Revenue ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardRevenueChart;
