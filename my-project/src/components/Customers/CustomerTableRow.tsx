import {
  Calendar,
  Edit,
  Eye,
  Mail,
  Phone,
  ShoppingBag,
  Trash,
  User,
} from "lucide-react";
import type { CustomerType } from "../../lib/types";
import { dateConvert } from "../../lib/contants";

type CustomerTableRowProps = {
  customer: CustomerType;
  handleSelectCustomer: (
    selectedCustomer: CustomerType,
    action: "edit" | "details" | "delete"
  ) => void;
};

const CustomerTableRow = ({
  customer,
  handleSelectCustomer,
}: CustomerTableRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{customer.fullName}</p>
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Joined {dateConvert(customer.createdAt)}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center text-gray-900 mb-1">
          <Phone className="h-3 w-3 mr-2 text-gray-500" />
          {customer.contact}
        </div>
        <div className="flex items-center text-sm text-gray-500 truncate">
          <Mail className="h-3 w-3 mr-2" />
          {customer.email}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <ShoppingBag className="h-4 w-4 mr-2 text-gray-500" />
          <span className="font-medium text-gray-900">
            {customer.totalOrders ?? 0}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          <span className="font-medium text-gray-900">
            ₱{customer?.totalSpent?.toFixed(2) ?? 0}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex space-x-2">
          <button
            onClick={() => handleSelectCustomer(customer, "details")}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleSelectCustomer(customer, "edit")}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleSelectCustomer(customer, "delete")}
            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition">
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CustomerTableRow;
