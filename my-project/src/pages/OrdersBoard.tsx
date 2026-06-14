import React, { useState } from "react";
import {
  Package,
  Clock,
  RefreshCw,
  CheckCircle,
  Truck,
  Plus,
} from "lucide-react";
import OrderBoard from "../components/OrdersBoard/OrderBoard";
import OrderBoardStatsSummary from "../components/OrdersBoard/OrderBoardStatsSummary";
import type { OrderColumnType, OrderType } from "../lib/types";
import OrderModalDetails from "../components/Orders/OrderModalDetails";
import OrderModalForm from "../components/Orders/OrderModalForm";

const OrdersBoardPage = () => {
  const [isOrderFormModalOpen, setIsOrderFormModalOpen] = useState(false);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const handleSelectOrder = (
    order: OrderType,
    action: "edit" | "delete" | "details"
  ) => {
    setSelectedOrder(order);

    if (action === "edit") {
      setIsEdit(true);
      setIsOrderFormModalOpen(true);
    } else if (action === "details") {
      setIsOrderDetailsModalOpen(true);
    }
  };

  const closeOrderFormModal = () => {
    setIsOrderFormModalOpen(false);
    setIsEdit(false);
    setSelectedOrder(null);
  };

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(false);
    setSelectedOrder(null);
  };

  const columns: OrderColumnType[] = [
    {
      id: "pending",
      title: "Pending",
      icon: Clock,
      color: "bg-yellow-50 border-yellow-200",
      count: 0,
    },
    {
      id: "in-process",
      title: "In Process",
      icon: RefreshCw,
      color: "bg-blue-50 border-blue-200",
      count: 0,
    },
    {
      id: "ready",
      title: "Ready",
      icon: CheckCircle,
      color: "bg-green-50 border-green-200",
      count: 0,
    },
    {
      id: "picked-up",
      title: "Picked Up",
      icon: Truck,
      color: "bg-purple-50 border-purple-200",
      count: 0,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <Package className="mr-2 h-7 w-7 text-blue-600" />
              Orders Board
            </h1>
            <p className="text-gray-600 mt-1">
              Drag and drop orders to update their status
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => setIsOrderFormModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <OrderBoardStatsSummary columns={columns} />
      </div>

      {/* Drag and Drop Board */}
      <OrderBoard
        columns={columns}
        handleSelectOrder={handleSelectOrder}
      />

      {isOrderDetailsModalOpen && (
        <OrderModalDetails
          isModalOpen={isOrderDetailsModalOpen}
          isCloseModal={closeOrderDetailsModal}
          selectedOrder={selectedOrder ?? null}
        />
      )}

      {isOrderFormModalOpen && (
        <OrderModalForm
          isModalOpen={isOrderFormModalOpen}
          isCloseModal={closeOrderFormModal}
          isEdit={isEdit}
          selectedOrder={selectedOrder ?? null}
        />
      )}
    </div>
  );
};

export default OrdersBoardPage;
