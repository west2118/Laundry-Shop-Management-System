import React, { useState } from "react";
import {
  Package,
  Plus,
  Filter,
  Calendar,
  Clock,
  DollarSign,
  Truck,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  PackageOpen,
  Loader,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import OrderModalForm from "../components/Orders/OrderModalForm";
import OrderModalDetails from "../components/Orders/OrderModalDetails";
import OrderTable from "../components/Orders/OrderTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import OrderStatsSummary from "../components/Orders/OrderStatsSummary";
import type { OrderType } from "../lib/types";
import ModalDelete from "../components/Services/ServiceModalDelete";

const OrdersPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [isOrderFormModalOpen, setIsOrderFormModalOpen] = useState(false);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["order-data"],
    queryFn: async () => {
      if (!token) return null;

      const [orderRes, customersRes, servicesRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/order", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/customer", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/service", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      return {
        orders: orderRes.data,
        customers: customersRes.data,
        services: servicesRes.data,
      };
    },
    enabled: !!token,
  });

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
    } else {
      setIsDeleteModalOpen(true);
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

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <Package className="mr-2 h-7 w-7 text-blue-600" />
              Orders
            </h1>
            <p className="text-gray-600 mt-1">
              Manage laundry orders, track status, and process deliveries
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
            <button
              onClick={() => setIsOrderFormModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </button>
          </div>
        </div>

        <OrderStatsSummary />
      </div>

      <OrderTable
        orders={data?.orders ?? null}
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
          token={token}
          isEdit={isEdit}
          selectedOrder={selectedOrder ?? null}
          services={data?.services ?? null}
          customers={data?.customers ?? null}
        />
      )}

      {isDeleteModalOpen && (
        <ModalDelete
          isModalOpen={isDeleteModalOpen}
          isCloseModal={closeDeleteModal}
          token={token}
          selectedItem={selectedOrder ?? null}
          title="Order"
        />
      )}
    </div>
  );
};

export default OrdersPage;
