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

const aovChartData = [
  { period: "Today", value: 320 },
  { period: "This Week", value: 295 },
  { period: "This Month", value: 310 },
];

const ReportRevenueChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Current AOV</p>
            <p className="text-sm text-gray-600">This month</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900 text-lg">₱310.00</p>
            <p className="text-sm text-green-600 flex items-center justify-end">
              <TrendingUp className="h-3 w-3 mr-1" />
              +6.2% from last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportRevenueChart;
