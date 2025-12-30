import { Search } from "lucide-react";
import React, { useState } from "react";
import type { CustomerType } from "../../lib/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../stores/useUserStore";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { fetchData } from "../../lib/utils";
import Pagination from "../Pagination";
import CustomerTableRow from "./CustomerTableRow";
import CustomerTableRowSkeleton from "../SkeletonLoading/CustomerTableRowSkeleton";

type CustomersTableProps = {
  handleSelectCustomer: (
    selectedCustomer: CustomerType,
    action: "edit" | "details" | "delete"
  ) => void;
};

type DataType = {
  customers: CustomerType[] | null;
  total: number;
  totalPages: number;
  page: number;
};

const CustomersTable = ({ handleSelectCustomer }: CustomersTableProps) => {
  const token = useUserStore((state) => state.userToken);

  const limit = 10;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceInput(search);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["customer-data", page, limit, debouncedSearch, status],
    queryFn: fetchData(
      `http://localhost:8080/api/v1/customers?page=${page}&limit=${limit}${
        debouncedSearch ? `&search=${debouncedSearch}` : ""
      }`,
      token
    ),
    enabled: !!token,
    placeholderData: keepPreviousData,
  });

  console.log(data?.customers);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Customer List</h2>
            <p className="text-gray-600 text-sm">
              All registered customers of your laundry shop
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(!data || isLoading) && <CustomerTableRowSkeleton />}

            {!isLoading &&
              data?.customers?.map((customer) => (
                <CustomerTableRow
                  key={customer._id}
                  customer={customer}
                  handleSelectCustomer={handleSelectCustomer}
                />
              ))}

            {!isLoading && data?.customers?.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>

          {data && data?.totalPages >= 1 && (
            <tfoot>
              <tr>
                <td colSpan={5} className="px-6 py-4">
                  <Pagination
                    limit={limit}
                    page={page}
                    total={data?.total}
                    totalPages={data?.totalPages}
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

export default CustomersTable;
