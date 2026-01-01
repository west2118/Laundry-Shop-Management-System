import React from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import type { ServiceType } from "../../lib/types";
import ServiceTableRow from "./ServiceTableRow";

type ServiceTableProps = {
  services: ServiceType[] | null;
  handleSelectCard: (service: ServiceType, action: "edit" | "delete") => void;
};

const ServiceTable = ({ services, handleSelectCard }: ServiceTableProps) => {
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
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
            {services?.map((service) => (
              <ServiceTableRow
                key={service._id}
                service={service}
                handleSelectCard={handleSelectCard}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">Showing 8 services</p>
          <div className="flex items-center space-x-2 mt-3 md:mt-0">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTable;
