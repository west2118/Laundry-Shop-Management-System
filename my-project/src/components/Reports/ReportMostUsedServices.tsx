import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";
import { pesoFormatter } from "../../lib/utils";
import ReportMostServiceSkeleton from "../SkeletonLoading/ReportMostServiceSkeleton";

type ReportMostUsedServicesProps = {
  serviceUsageData: {
    dataChart: {
      _id: string;
      totalOrders: number;
      totalRevenue: number;
    }[];
    totalOrders: number;
  };
};

const ReportMostUsedServices = ({
  serviceUsageData,
}: ReportMostUsedServicesProps) => {
  if (!serviceUsageData) return <ReportMostServiceSkeleton />;

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  const serviceUsageDataChart = serviceUsageData?.dataChart?.map(
    (item, index) => ({
      name: item._id,
      totalOrders: item.totalOrders,
      totalRevenue: item.totalRevenue,
      color: COLORS[index % COLORS.length],
    })
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Most Used Services
          </h2>
          <p className="text-gray-600 text-sm">
            Service popularity and revenue distribution
          </p>
        </div>
        <PieChartIcon className="h-6 w-6 text-purple-600" />
      </div>

      <div className="h-80">
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
              {serviceUsageDataChart.map((entry, index) => (
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
      </div>

      <div className="mt-6 space-y-3">
        {serviceUsageDataChart?.map((service, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: service.color }}
              />
              <span className="font-medium text-gray-900">{service.name}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-gray-900">
                {pesoFormatter.format(service.totalRevenue ?? 0)}
              </span>
              <span className="text-sm text-gray-500 block">
                {service.totalOrders} orders
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportMostUsedServices;
