import React from "react";
import type { OrderColumnType, OrderType } from "../../lib/types";
import OrderBoardStatsSummarySkeleton from "../SkeletonLoading/OrderBoardStatsSummarySkeleton";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { AlertCircle } from "lucide-react";
import SummaryStatCard from "../UI/SummaryStatCard";

const OrderBoardStatsSummary = ({
  columns,
}: {
  columns: OrderColumnType[];
}) => {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["order-today"],
    queryFn: async () => {
      const res = await api.get("/order-today");
      return res.data as OrderType[];
    },
  });

  if (isLoading) return <OrderBoardStatsSummarySkeleton />;
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mt-6 flex items-center justify-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <span className="text-red-700 font-medium">Failed to load board stats summary</span>
      </div>
    );
  }
  if (!orders) return null;

  // Create a local copy of columns with calculated counts
  const columnsWithCounts = columns.map(col => ({
    ...col,
    count: orders.filter((order: OrderType) => order.orderStatus === col.id).length
  }));

  const getColumnColor = (id: string) => {
    switch (id) {
      case "pending":
        return "bg-yellow-500";
      case "in-process":
        return "bg-blue-500";
      case "ready":
        return "bg-green-500";
      case "picked-up":
      default:
        return "bg-purple-500";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {columnsWithCounts.map((column) => {
        const Icon = column.icon;
        return (
          <SummaryStatCard
            key={column.id}
            title={column.title}
            value={column.count}
            icon={<Icon className="h-6 w-6" />}
            color={getColumnColor(column.id)}
          />
        );
      })}
    </div>
  );
};

export default OrderBoardStatsSummary;
