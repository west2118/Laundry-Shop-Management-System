import React from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { ServiceType } from "../../lib/types";
import ServiceTableRow from "./ServiceTableRow";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { useUserStore } from "../../stores/useUserStore";
import Pagination from "../Pagination";
import ServiceTableRowSkeleton from "../SkeletonLoading/ServiceTableRowSkeleton";
import { fetchData } from "../../lib/utils";

type ServiceTableProps = {
  handleSelectCard: (service: ServiceType, action: "edit" | "delete") => void;
};

type DataType = {
  services: ServiceType[];
  total: number;
  totalPages: number;
  page: number;
};

const ServiceTable = ({ handleSelectCard }: ServiceTableProps) => {
  const limit = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const debouncedSearch = useDebounceInput(search);

  const setPage = (value: React.SetStateAction<number>) => {
    setSearchParams((prev) => {
      const next = typeof value === "function" ? value(page) : value;
      prev.set("page", next.toString());
      return prev;
    }, { replace: true });
  };

  const setSearch = (newSearch: string) => {
    setSearchParams((prev) => {
      if (!newSearch) prev.delete("search");
      else prev.set("search", newSearch);
      prev.set("page", "1");
      return prev;
    }, { replace: true });
  };

  const setCategory = (newCategory: string) => {
    setSearchParams((prev) => {
      if (newCategory === "All") prev.delete("category");
      else prev.set("category", newCategory);
      prev.set("page", "1");
      return prev;
    }, { replace: true });
  };

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["services-data", page, limit, debouncedSearch, category],
    queryFn: fetchData(
      `http://localhost:8080/api/v1/services?page=${page}&limit=${limit}${category !== "All" ? `&category=${category}` : ""
      }${debouncedSearch ? `&search=${debouncedSearch}` : ""}`
    ),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">All Services</h2>
            <p className="text-gray-600 text-sm">
              Manage your laundry services and pricing
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center space-x-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="All">All Categories</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="express">Express</option>
              <option value="discount">Discount</option>
              <option value="additional">Additional</option>
              <option value="unknown">unknown</option>
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(!data || isLoading) && <ServiceTableRowSkeleton />}

            {data?.services.map((service) => (
              <ServiceTableRow
                key={service._id}
                service={service}
                handleSelectCard={handleSelectCard}
              />
            ))}

            {!isLoading && data?.services?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No services found
                </td>
              </tr>
            )}
          </tbody>

          {data && data?.totalPages >= 1 && (
            <tfoot>
              <tr>
                <td colSpan={6} className="px-6 py-4">
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

export default ServiceTable;
