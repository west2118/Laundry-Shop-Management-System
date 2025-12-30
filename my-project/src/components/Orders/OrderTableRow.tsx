import { dateConvert } from "../../lib/contants";
import { Calendar, Edit, Eye, Package, Trash, User } from "lucide-react";
import type { OrderType } from "../../lib/types";
import {
  getPaymentStatusBadge,
  getServiceBadge,
  getStatusBadge,
} from "../../lib/utils";

type OrderTableRowProps = {
  order: OrderType;
  handleSelectOrder: (
    order: OrderType,
    action: "edit" | "delete" | "details"
  ) => void;
};

const OrderTableRow = ({ order, handleSelectOrder }: OrderTableRowProps) => {
  const { color, icon: StatusIcon, label } = getStatusBadge(order.orderStatus);

  const {
    color: paymentColor,
    icon: PaymentStatusIcon,
    label: paymentLabel,
  } = getPaymentStatusBadge(order.paymentStatus);

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <Package className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <span className="font-medium text-blue-600">{order._id}</span>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <Calendar className="h-3 w-3 mr-1" />
              {dateConvert(order.createdAt)}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <span className="font-medium text-gray-900">
            {order.customer.fullName}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
          <StatusIcon className="h-3 w-3" />
          {label}
        </span>
      </td>
      <td className="py-4 px-6 space-y-2">
        {order.items.map((item) => {
          const { color, label } = getServiceBadge(item.serviceName);

          return (
            <div key={item._id} className="flex flex-col space-y-1">
              <span
                className={`px-2 py-1 rounded text-xs font-medium border ${color}`}>
                {label}
              </span>
            </div>
          );
        })}
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <span className="font-bold text-gray-900">
            ₱{order.totalAmount.toFixed(2)}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 capitalize">
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${paymentColor}`}>
          <PaymentStatusIcon className="h-3 w-3" />
          {paymentLabel}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex space-x-2">
          <button
            onClick={() => handleSelectOrder(order, "details")}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="View Details">
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleSelectOrder(order, "edit")}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
            title="Update Status">
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleSelectOrder(order, "delete")}
            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition">
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;
