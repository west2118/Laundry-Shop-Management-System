import {
  Package,
  User,
  Calendar,
  Eye,
  Edit,
  Loader,
  Trash,
} from "lucide-react";
import type { OrderType } from "../../lib/types";
import { dateConvert } from "../../lib/contants";
import { getServiceBadge, getStatusBadge } from "../../lib/utils";

type OrderItemProps = {
  order: OrderType;
  handleDragStart: any;
  handleSelectOrder: (
    order: OrderType,
    action: "edit" | "delete" | "details"
  ) => void;
};

const OrderItem = ({
  order,
  handleDragStart,
  handleSelectOrder,
}: OrderItemProps) => {
  const { color, icon: StatusIcon, label } = getStatusBadge(order.orderStatus);

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, order)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-move hover:shadow-md transition-shadow duration-200 hover:border-blue-300 active:border-blue-400 active:shadow-lg">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
            <Package className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <span className="font-bold text-blue-600">
              {order._id.slice(0, 8)}…
            </span>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              {dateConvert(order.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
            <StatusIcon className="h-3 w-3" />
            {label}
          </span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
          <User className="h-4 w-4 text-gray-600" />
        </div>
        <span className="font-medium text-gray-900">
          {order.customer.fullName}
        </span>
      </div>

      {/* Service Info */}
      {order.items.map((item) => {
        const { color, label } = getServiceBadge(item.serviceName);

        return (
          <div key={item._id} className="mb-3">
            <span
              className={`px-2 py-1 rounded text-xs font-medium border ${color}`}>
              {label}
            </span>
          </div>
        );
      })}

      {/* Order Details */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-bold text-gray-900">₱{order.totalAmount}</span>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => handleSelectOrder(order, "details")}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition">
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleSelectOrder(order, "edit")}
            className="p-1 text-green-600 hover:bg-green-50 rounded transition">
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Drag Handle */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-center">
        <div className="text-xs text-gray-400 flex items-center justify-center">
          <Loader className="h-3 w-3 mr-1" />
          Drag to move
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
