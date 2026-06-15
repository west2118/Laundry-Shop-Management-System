import React from "react";

type SummaryStatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
};

const SummaryStatCard = ({ title, value, icon, color }: SummaryStatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStatCard;
