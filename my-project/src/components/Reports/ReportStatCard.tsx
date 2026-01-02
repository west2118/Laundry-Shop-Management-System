import React, { type JSX } from "react";

type StatCard = {
  id: string;
  title: string;
  value: string;
  subtitle?: string;
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
};

const ReportStatCard = ({ stat }: { stat: StatCard }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{stat.title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
        </div>

        <div
          className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
          <div className={stat.textColor}>{stat.icon}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportStatCard;
