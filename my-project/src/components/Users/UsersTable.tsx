import { Search } from "lucide-react";
import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { UserType } from "../../lib/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounceInput } from "../../hooks/useDebounceInput";
import { fetchData } from "../../lib/utils";
import Pagination from "../Pagination";
import UserTableRow from "./UserTableRow";
import UserTableRowSkeleton from "../SkeletonLoading/UserTableRowSkeleton";

type DataType = {
  users: UserType[] | null;
  total: number;
  totalPages: number;
  page: number;
};

const UsersTable = () => {
  const limit = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const debouncedSearch = useDebounceInput(search);

  const setPage = useCallback((value: React.SetStateAction<number>) => {
    setSearchParams((prev) => {
      const currentPage = parseInt(prev.get("page") || "1", 10);
      const next = typeof value === "function" ? value(currentPage) : value;
      prev.set("page", next.toString());
      return prev;
    }, { replace: true });
  }, [setSearchParams]);

  const setSearch = useCallback((newSearch: string) => {
    setSearchParams((prev) => {
      if (!newSearch) prev.delete("search");
      else prev.set("search", newSearch);
      prev.set("page", "1");
      return prev;
    }, { replace: true });
  }, [setSearchParams]);

  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["users-data", page, limit, debouncedSearch],
    queryFn: fetchData(
      `http://localhost:8080/api/v1/users?page=${page}&limit=${limit}${debouncedSearch ? `&search=${debouncedSearch}` : ""
      }`
    ),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">User List</h2>
            <p className="text-gray-600 text-sm">
              All registered administrators and staff
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(!data || isLoading) && <UserTableRowSkeleton />}

            {!isLoading &&
              data?.users?.map((user) => (
                <UserTableRow
                  key={user._id}
                  user={user}
                />
              ))}

            {!isLoading && data?.users?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>

          {data && data?.totalPages >= 1 && (
            <tfoot>
              <tr>
                <td colSpan={4} className="px-6 py-4 border-t border-gray-200">
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

export default UsersTable;
