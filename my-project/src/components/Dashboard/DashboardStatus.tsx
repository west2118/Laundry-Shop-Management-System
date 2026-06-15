import React, { useMemo } from "react";
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
  AlertCircle,
} from "lucide-react";
import { statusColor } from "../../lib/contants";
import OrderStatusSkeleton from "../SkeletonLoading/OrderStatusSkeleton";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

const DashboardStatus = () => {
  const { data: statusDistributionData, isLoading, error } = useQuery({
    queryKey: ["order-stats-weekly"],
    queryFn: async () => {
      const res = await api.get("/order-stats-weekly");
      return res.data;
    },
    staleTime: 60_000,
  });

  const statsArray = useMemo(() => {
    if (!statusDistributionData) return [];
    return Object.entries(statusDistributionData).map(
      ([key, value]) => ({
        label: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (c) => c.toUpperCase()),
        value,
      })
    );
  }, [statusDistributionData]);

  if (isLoading) return <OrderStatusSkeleton />;
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 h-full flex flex-col items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <span className="text-red-700 font-medium">Failed to load order status</span>
      </div>
    );
  }
  if (!statusDistributionData) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
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
            <span className="font-bold text-gray-800">{item.value as React.ReactNode}</span>
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
