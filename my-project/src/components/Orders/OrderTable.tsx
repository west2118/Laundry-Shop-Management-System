import React, { useState } from "react";
import { Search } from "lucide-react";
import type { OrderType } from "../../lib/types";
import { fetchData } from "../../lib/utils";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination";
import OrderTableRow from "./OrderTableRow";
import TableOrderRowSkeleton from "../SkeletonLoading/TableOrderRowSkeleton";

type OrderTableProps = {
  handleSelectOrder: (
    order: OrderType,
    action: "edit" | "delete" | "details"
  ) => void;
  token: string | null;
};

type DataType = {
  orders: OrderType[];
  total: number;
  totalPages: number;
  page: number;
};

const OrderTable = ({ handleSelectOrder, token }: OrderTableProps) => {
  const limit = 10;
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);

  const { data: ordersData, isLoading: isOrdersLoading } = useQuery<DataType>({
    queryKey: ["orders-data", page, limit, debouncedSearch, status],
    queryFn: fetchData(
      `http://localhost:8080/api/v1/orders?page=${page}${
        status !== "All" ? `&status=${status}` : ""
      }&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""}`,
      token
    ),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">All Orders</h2>
            <p className="text-gray-600 text-sm">
              Recent laundry orders and their current status
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center space-x-3">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-process">In Process</option>
              <option value="ready">Ready</option>
              <option value="picked-up">Picked Up</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {(!ordersData || isOrdersLoading) && <TableOrderRowSkeleton />}

            {!isOrdersLoading &&
              ordersData?.orders.map((order) => (
                <OrderTableRow
                  key={order._id}
                  order={order}
                  handleSelectOrder={handleSelectOrder}
                />
              ))}

            {/* Loaded but empty */}
            {!isOrdersLoading && ordersData?.orders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>

          {/* Table Footer */}
          {ordersData && ordersData?.totalPages >= 1 && (
            <tfoot>
              <tr>
                <td colSpan={7} className="px-6 py-4">
                  <Pagination
                    limit={limit}
                    page={page}
                    total={ordersData?.total}
                    totalPages={ordersData?.totalPages}
                    setPage={setPage}
                  />
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
