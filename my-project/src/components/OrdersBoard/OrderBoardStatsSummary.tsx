import React from "react";
import type { OrderColumnType, OrderType } from "../../lib/types";
import OrderBoardStatsSummarySkeleton from "../SkeletonLoading/OrderBoardStatsSummarySkeleton";

const OrderBoardStatsSummary = ({
  columns,
  orders,
}: {
  columns: OrderColumnType[];
  orders: OrderType[];
}) => {
  if (!orders) return <OrderBoardStatsSummarySkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {columns.map((column) => {
        const Icon = column.icon;

        return (
          <div
            key={column.id}
            className={`${
              column.color.split(" ")[0]
            } rounded-xl shadow-sm p-5 border ${column.color.split(" ")[1]}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 ${
                    column.id === "pending"
                      ? "bg-yellow-100"
                      : column.id === "in-process"
                      ? "bg-blue-100"
                      : column.id === "ready"
                      ? "bg-green-100"
                      : "bg-purple-100"
                  } rounded-lg flex items-center justify-center mr-3`}>
                  <div
                    className={
                      column.id === "pending"
                        ? "text-yellow-600"
                        : column.id === "in-process"
                        ? "text-blue-600"
                        : column.id === "ready"
                        ? "text-green-600"
                        : "text-purple-600"
                    }>
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{column.title}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {column.count}
                  </p>
                </div>
              </div>
              <div className="text-xs text-gray-500">orders</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderBoardStatsSummary;
