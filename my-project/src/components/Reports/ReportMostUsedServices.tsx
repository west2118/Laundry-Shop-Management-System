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

type ReportMostUsedServicesProps = {
  serviceUsageData: any;
};

const ReportMostUsedServices = ({
  serviceUsageData,
}: ReportMostUsedServicesProps) => {
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
              data={serviceUsageData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value">
              {serviceUsageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} orders`, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* <div className="mt-6 space-y-3">
        {serviceUsageData.map((service, index) => (
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
                {service.value} orders
              </span>
              <span className="text-sm text-gray-500 block">
                {service.revenue}
              </span>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ReportMostUsedServices;
