import React, { useMemo } from "react";
import { TrendingUp, UserCheck, UserPlus, Users, Calendar, ShoppingBag } from "lucide-react";
import SummaryStatCard from "../UI/SummaryStatCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import CardsSkeleton from "../SkeletonLoading/CardsSkeleton";

const StatsSummaryCards = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["customer-stats"],
    queryFn: async () => {
      const res = await api.get("/customer-stats");
      return res.data;
    },
  });

  const statsData = useMemo(() => {
    if (!stats) return [];
    return [
      {
        title: "New Customers Today",
        value: stats.newCustomersToday,
        icon: <UserPlus className="h-6 w-6" />,
        color: "bg-green-500",
      },
      {
        title: "New This Month",
        value: stats.newCustomersThisMonth,
        icon: <Calendar className="h-6 w-6" />,
        color: "bg-purple-500",
      },
      {
        title: "Total Customers",
        value: stats.totalCustomers,
        icon: <Users className="h-6 w-6" />,
        color: "bg-blue-500",
      },
      {
        title: "Total Orders",
        value: stats.totalOrders,
        icon: <ShoppingBag className="h-6 w-6" />,
        color: "bg-orange-500",
      },
    ];
  }, [stats]);

  if (isLoading) return <CardsSkeleton />;
  if (error || !stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {statsData.map((stat) => (
        <SummaryStatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsSummaryCards;
