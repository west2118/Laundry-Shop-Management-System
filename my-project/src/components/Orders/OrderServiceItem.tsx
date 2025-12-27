import { DollarSign, Tag } from "lucide-react";
import type { ServiceType } from "../../lib/types";

type OrderServiceItemProps = {
  services: ServiceType[] | null;
  index: number;
  item: {
    service: string;
    unit: string;
    count: number;
  };
  handleOrderFormChange: (index: number, field: string, value: string) => void;
};

const OrderServiceItem = ({
  services,
  item,
  index,
  handleOrderFormChange,
}: OrderServiceItemProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
          <Tag className="h-4 w-4 mr-2" />
          Service Type
        </label>
        <select
          value={item.service}
          onChange={(e) =>
            handleOrderFormChange(index, "service", e.target.value)
          }
          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Select service</option>
          {services?.map((service) => (
            <option key={service._id} value={service._id}>
              {service?.serviceName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
          <Tag className="h-4 w-4 mr-2" />
          Per Unit
        </label>
        <select
          value={item.unit}
          onChange={(e) => handleOrderFormChange(index, "unit", e.target.value)}
          className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="" disabled>
            Select unit
          </option>
          <option value="kg">per kg</option>
          <option value="item">per item</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          Weight Quantity
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0.00"
          value={item.count}
          onChange={(e) =>
            handleOrderFormChange(index, "count", e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default OrderServiceItem;
