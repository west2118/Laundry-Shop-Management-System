import {
  Plus,
  Edit,
  Tag,
  TrendingUp,
  ShoppingBag,
  RefreshCw,
  Trash,
} from "lucide-react";
import type { ServiceType } from "../../lib/types";
import {
  getCategoryBadge,
  getServiceIcon,
  getServiceStatusBadge,
} from "../../lib/contants";

type ServiceTableRowProps = {
  service: ServiceType;
  handleSelectCard: (service: ServiceType, action: "edit" | "delete") => void;
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

const ServiceTableRow = ({
  service,
  handleSelectCard,
}: ServiceTableRowProps) => {
  const IconService = getServiceIcon(service.serviceName);
  const category = getCategoryBadge(service?.category);
  const IconCategory = category.icon;

  const status = getServiceStatusBadge(service.status);
  const IconStatus = status.icon;

  return (
    <tr key={service._id} className="hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <div className="text-blue-600">
              <IconService className="h-4 w-4 text-gray-600" />
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-900">
              {service.serviceName}
            </span>
            <p className="text-sm text-gray-500">{service.description}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
          <IconCategory className="h-3 w-3" />
          {category.label}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <span className="font-bold text-gray-900">₱{service.pricePerKg}</span>
          <span className="text-xs text-gray-500 ml-1">per Kg</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-gray-900">
            ₱{service.pricePerItem}
          </span>
          <span className="text-xs text-gray-500 ml-1">per Item</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
          <IconStatus className="h-3 w-3" />
          {status.label}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <ShoppingBag className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-medium text-gray-900">
            {service.totalOrders}
          </span>
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
  );
};

export default ServiceTableRow;
