import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  AlertCircle
} from "lucide-react";
import { serviceColor } from "../../lib/utils";
import ServiceSkeleton from "../SkeletonLoading/ServiceSkeleton";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";

const DashboardServiceTypesChart = () => {
  const { data: serviceTypeData, isLoading, error } = useQuery({
    queryKey: ["order-service-weekly"],
    queryFn: async () => {
      const res = await api.get("/order-service-weekly");
      return res.data;
    },
  });

  if (isLoading) return <ServiceSkeleton />;
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 h-full flex flex-col items-center justify-center">
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <span className="text-red-700 font-medium">Failed to load service types</span>
      </div>
    );
  }
  if (!serviceTypeData) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Service Types</h3>
          <p className="text-gray-600 text-sm">Distribution by service</p>
        </div>
        <PieChartIcon className="h-5 w-5 text-purple-500" />
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={serviceTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent! * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="total">
              {serviceTypeData?.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    serviceColor.find((s) => s.name === entry.name)?.color ??
                    "#CBD5E1"
                  }
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} orders`, "Count"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardServiceTypesChart;
