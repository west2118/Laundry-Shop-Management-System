import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Activity,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
} from "lucide-react";
import { statusColor } from "../../lib/contants";
import OrderStatusSkeleton from "../SkeletonLoading/OrderStatusSkeleton";

type DashboardStatusProps = {
  statusDistributionData: {
    totalOrders: number;
    pending: number;
    ready: number;
    pickedUp: number;
  };
};

const DashboardStatus = ({ statusDistributionData }: DashboardStatusProps) => {
  if (!statusDistributionData) return <OrderStatusSkeleton />;

  const statsArray = Object.entries(statusDistributionData).map(
    ([key, value]) => ({
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase()),
      value,
    })
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Order Status</h3>
        <Activity className="h-5 w-5 text-green-500" />
      </div>

      {/* List */}
      <div className="space-y-4">
        {statsArray.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{
                  backgroundColor: `${
                    statusColor.find((s) => s.label === item.label)?.color
                  }`,
                }}
              />
              <span className="text-gray-700">{item.label}</span>
            </div>
            <span className="font-bold text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-8 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statsArray}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {statsArray.map((entry, index) => (
                <Cell
                  key={index}
                  fill={statusColor.find((s) => s.label === entry.label)?.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardStatus;
