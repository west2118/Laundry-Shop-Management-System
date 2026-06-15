import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import { pesoFormatter } from "../../lib/utils";
import ReportMostServiceSkeleton from "../SkeletonLoading/ReportMostServiceSkeleton";

import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

type ServiceUsageData = {
  dataChart: {
    _id: string;
    totalOrders: number;
    totalRevenue: number;
  }[];
  totalOrders: number;
};

type ReportMostUsedServicesProps = {
  startDate: string;
  endDate: string;
};

const ReportMostUsedServices = ({ startDate, endDate }: ReportMostUsedServicesProps) => {
  const { data: serviceUsageData, isLoading, error } = useQuery<ServiceUsageData>({
    queryKey: ["report-most-services", startDate, endDate],
    queryFn: async () => {
      const res = await api.get(`/order-most-services?startDate=${startDate}&endDate=${endDate}`);
      return res.data;
    },
  });

  if (isLoading || !serviceUsageData) return <ReportMostServiceSkeleton />;
  if (error) return <div className="text-red-500">Failed to load most used services.</div>;

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"];

  const serviceUsageDataChart = serviceUsageData?.dataChart?.map(
    (item, index) => ({
      name: item._id,
      totalOrders: item.totalOrders,
      totalRevenue: item.totalRevenue,
      color: COLORS[index % COLORS.length],
    })
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Most Used Services
          </h2>
          <p className="text-gray-600 text-sm">
            Service popularity over selected date range
          </p>
        </div>
        <PieChartIcon className="h-6 w-6 text-purple-600" />
      </div>

      <div className="h-80">
        {serviceUsageDataChart && serviceUsageDataChart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <PieChartIcon className="h-12 w-12 text-gray-300 mb-2" />
            <p>No service data available for this period.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceUsageDataChart}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent! * 100).toFixed(1)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="totalOrders">
                {serviceUsageDataChart?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${value} orders (₱${props.payload.totalRevenue.toLocaleString(
                    "en-PH"
                  )})`,
                  name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ReportMostUsedServices;
