import React from "react";
import {
  Droplets,
  Wind,
  Plus,
  Search,
  Eye,
  Edit,
  MoreVertical,
  DollarSign,
  Tag,
  Percent,
  Clock,
  CheckCircle,
  Download,
  Printer,
  TrendingUp,
  Package,
  ShoppingBag,
  X,
  Zap,
  Thermometer,
  Sparkles,
  RefreshCw,
  Star,
  Truck,
  ChevronLeft,
  ChevronRight,
  Trash,
} from "lucide-react";
import type { ServiceType } from "../../lib/types";

// Service categories with icons
export const categories = [
  {
    name: "Basic",
    icon: <Package className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-800",
    count: 2,
  },
  {
    name: "Premium",
    icon: <Star className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-800",
    count: 3,
  },
  {
    name: "Express",
    icon: <Zap className="h-4 w-4" />,
    color: "bg-yellow-100 text-yellow-800",
    count: 1,
  },
  {
    name: "Discount",
    icon: <Percent className="h-4 w-4" />,
    color: "bg-green-100 text-green-800",
    count: 1,
  },
  {
    name: "Additional",
    icon: <Plus className="h-4 w-4" />,
    color: "bg-orange-100 text-orange-800",
    count: 1,
  },
];

// Service icons mapping
export const serviceIcons = {
  "Wash & Fold": <Droplets className="h-5 w-5" />,
  "Dry Clean": <Wind className="h-5 w-5" />,
  "Wash & Iron": <Wind className="h-5 w-5" />,
  "Express Service": <Zap className="h-5 w-5" />,
  "Steam Iron": <Thermometer className="h-5 w-5" />,
  "Delicate Wash": <Sparkles className="h-5 w-5" />,
  "Bulk Discount": <Percent className="h-5 w-5" />,
  "Pickup & Delivery": <Truck className="h-5 w-5" />,
};

// Recent price updates
export const priceUpdates = [
  {
    service: "Wash & Fold",
    action: "Price increased",
    change: "+$2.00",
    time: "2 days ago",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    service: "Dry Clean",
    action: "Price updated",
    change: "-$0.50",
    time: "1 week ago",
    icon: <RefreshCw className="h-4 w-4" />,
  },
  {
    service: "Bulk Discount",
    action: "New discount added",
    change: "10% off",
    time: "2 weeks ago",
    icon: <Tag className="h-4 w-4" />,
  },
  {
    service: "Express Service",
    action: "Service activated",
    change: "New",
    time: "3 weeks ago",
    icon: <Plus className="h-4 w-4" />,
  },
];

// Status badge styling
export const getStatusBadge = (status: string) => {
  const statusConfig = {
    Active: {
      color: "bg-green-100 text-green-800",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
    Inactive: {
      color: "bg-gray-100 text-gray-800",
      icon: <X className="h-3 w-3 mr-1" />,
    },
    "Coming Soon": {
      color: "bg-blue-100 text-blue-800",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
  };

  const config = statusConfig[status] || {
    color: "bg-gray-100 text-gray-800",
    icon: <Package className="h-3 w-3 mr-1" />,
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {status}
    </span>
  );
};

// Category badge styling
export const getCategoryBadge = (category: string) => {
  const categoryConfig = categories.find(
    (c) => c.name.toLowerCase() === category.toLowerCase()
  );
  if (!categoryConfig) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${categoryConfig.color}`}>
      {React.cloneElement(categoryConfig.icon, { className: "h-3 w-3 mr-1" })}
      {category}
    </span>
  );
};

// Service icon component
export const getServiceIcon = (serviceName: string) => {
  return serviceIcons[serviceName] || <Package className="h-5 w-5" />;
};

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
              <tr key={service._id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <div className="text-blue-600">
                        {getServiceIcon(service.serviceName)}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {service.serviceName}
                      </span>
                      <p className="text-sm text-gray-500">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {getCategoryBadge(service.category)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <span className="font-bold text-gray-900">
                      ₱{service.pricePerKg}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">per Kg</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-gray-900">
                      ₱{service.pricePerItem}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">per Item</span>
                  </div>
                </td>
                <td className="py-4 px-6">{getStatusBadge(service.status)}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium text-gray-900">0</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleSelectCard(service, "edit")}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSelectCard(service, "delete")}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
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
