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
} from "lucide-react";
import { serviceColor } from "../../lib/utils";
import ServiceSkeleton from "../SkeletonLoading/ServiceSkeleton";

type DashboardServiceTypesChartProps = {
  serviceTypeData: {
    name: string;
    total: number;
  }[];
};

const DashboardServiceTypesChart = ({
  serviceTypeData,
}: DashboardServiceTypesChartProps) => {
  if (!serviceTypeData) return <ServiceSkeleton />;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
              {serviceTypeData?.map((entry, index) => (
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
