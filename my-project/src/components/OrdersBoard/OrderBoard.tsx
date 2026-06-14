import React, { useState } from "react";
import {
  Package,
  Clock,
  RefreshCw,
  CheckCircle,
  Truck,
  MoreVertical,
  Zap,
} from "lucide-react";
import OrderItem from "./OrderItem";
import type { OrderColumnType, OrderStatus, OrderType } from "../../lib/types";
import { api } from "../../lib/axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getStatusBadge } from "../../lib/utils";
import OrderBoardSkeleton from "../SkeletonLoading/OrderBoardSkeleton";

type OrderBoardProps = {
  columns: OrderColumnType[];
  handleSelectOrder: (
    order: OrderType,
    action: "edit" | "delete" | "details"
  ) => void;
};

const OrderBoard = ({
  columns,
  handleSelectOrder,
}: OrderBoardProps) => {
  const queryClient = useQueryClient();
  const [draggedOrder, setDraggedOrder] = useState<OrderType | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["order-today"],
    queryFn: async () => {
      const res = await api.get("/order-today");
      return res.data as OrderType[];
    },
  });

  // Drag event handlers
  const handleDragStart = (e: any, order: OrderType) => {
    setDraggedOrder(order);
    e.dataTransfer.setData("text/plain", order._id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: any, columnId: OrderStatus) => {
    e.preventDefault();

    setDragOverColumn(columnId);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const updateOrderStatus = useMutation({
    mutationFn: async ({
      orderId,
      orderStatus,
    }: {
      orderId: string;
      orderStatus: OrderStatus;
    }) => {
      return api.put(`/order-status/${orderId}`, { orderStatus });
    },
    onMutate: async (newOrder) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["order-today"] });

      // Snapshot the previous value
      const previousOrders = queryClient.getQueryData<OrderType[]>(["order-today"]);

      // Optimistically update the cache
      if (previousOrders) {
        queryClient.setQueryData<OrderType[]>(["order-today"], (old) => {
          if (!old) return old;
          return old.map((order) =>
            order._id === newOrder.orderId
              ? { ...order, orderStatus: newOrder.orderStatus }
              : order
          );
        });
      }

      // Return context with previous snapshot
      return { previousOrders };
    },
    onError: (err, newOrder, context) => {
      // Rollback on error
      if (context?.previousOrders) {
        queryClient.setQueryData(["order-today"], context.previousOrders);
      }
      toast.error("Failed to update order status");
    },
    onSettled: () => {
      // Always refetch to sync with server
      queryClient.invalidateQueries({ queryKey: ["order-today"] });
      queryClient.invalidateQueries({ queryKey: ["order-stats-data"] });
      queryClient.invalidateQueries({ queryKey: ["order-board-data"] });
      queryClient.invalidateQueries({ queryKey: ["orders-data"] });
    },
  });

  const handleDrop = async (e: any, columnId: OrderStatus) => {
    e.preventDefault();

    if (!draggedOrder || draggedOrder.orderStatus === columnId) return;

    updateOrderStatus.mutate({
      orderId: draggedOrder._id,
      orderStatus: columnId,
    });

    setDraggedOrder(null);
    setDragOverColumn(null);
  };

  if (isLoading || !orders) return <OrderBoardSkeleton />;

  // Create a local copy of columns with calculated counts
  const columnsWithCounts = columns.map(col => ({
    ...col,
    count: orders.filter((order: OrderType) => order.orderStatus === col.id).length
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columnsWithCounts.map((column) => {
        const Icon = column.icon;

        return (
          <div
            key={column.id}
            className={`${column.color
              } rounded-xl border-2 min-h-600 transition-all duration-200 ${dragOverColumn === column.id
                ? "border-dashed border-blue-400 bg-blue-25"
                : ""
              }`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}>
            {/* Column Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${column.id === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : column.id === "in-process"
                        ? "bg-blue-100 text-blue-600"
                        : column.id === "ready"
                          ? "bg-green-100 text-green-600"
                          : "bg-purple-100 text-purple-600"
                    }`}>
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{column.title}</h3>
                  <p className="text-sm text-gray-500">{column.count} orders</p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            {/* Column Body - Order Cards */}
            <div className="p-3 space-y-3 min-h-500">
              {orders
                ?.filter((order) => order.orderStatus === column.id)
                .map((order) => {
                  return (
                    <OrderItem
                      key={order._id}
                      order={order}
                      handleDragStart={handleDragStart}
                      handleSelectOrder={handleSelectOrder}
                    />
                  );
                })}

              {/* Empty State */}
              {orders?.filter((order) => order.orderStatus === column.id)
                .length === 0 && (
                  <div className="text-center py-8 px-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No orders here</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Drag orders from other columns
                    </p>
                  </div>
                )}

              {/* Drop Zone Highlight */}
              {dragOverColumn === column.id && (
                <div className="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center bg-blue-25 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-blue-600 font-medium">Drop here</p>
                  <p className="text-sm text-blue-500">
                    Move order to {column.title}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderBoard;
