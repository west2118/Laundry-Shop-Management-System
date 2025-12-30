import { Package, DollarSign, PackageOpen, Users } from "lucide-react";
import CardsSkeleton from "../SkeletonLoading/CardsSkeleton";

type OrderStatsSummaryProps = {
  orderStats: {
    revenueToday: number;
    todayOrders: number;
    totalCustomers: number;
    totalOrders: number;
  };
};

const OrderStatsSummary = ({ orderStats }: OrderStatsSummaryProps) => {
  if (!orderStats)
    return (
      <div className="mt-6">
        <CardsSkeleton />
      </div>
    );

  const summaryData = [
    {
      title: "Total Orders",
      value: orderStats.totalOrders,
      icon: Package,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Today's Orders",
      value: orderStats.todayOrders,
      icon: PackageOpen,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Revenue Today",
      value: `₱${orderStats.revenueToday.toFixed(2)}`,
      icon: DollarSign,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Customers",
      value: orderStats.totalCustomers,
      icon: Users,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {summaryData.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>

              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg}`}>
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatsSummary;
