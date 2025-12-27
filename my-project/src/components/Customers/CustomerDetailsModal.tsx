import {
  Phone,
  Mail,
  MapPin,
  FileText,
  ShoppingBag,
  DollarSign,
  Calendar,
  User,
  Download,
  Printer,
  X,
  Save,
  Trash2,
  CheckCircle,
  Info,
  Star,
  UserPlus,
} from "lucide-react";
import Modal from "../UI/Modal";
import type { CustomerType } from "../../lib/types";
import { dateConvert } from "../../lib/contants";

type CustomerDetailsModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedCustomer: CustomerType | null;
};

const CustomerDetailsModal = ({
  isModalOpen,
  isCloseModal,
  selectedCustomer,
}: CustomerDetailsModalProps) => {
  const getStatusBadge = (status) => {
    const statusStyles = {
      Active: "bg-green-100 text-green-800",
      VIP: "bg-purple-100 text-purple-800",
      New: "bg-blue-100 text-blue-800",
      Inactive: "bg-gray-100 text-gray-800",
    };

    const statusIcons = {
      Active: <CheckCircle className="h-3 w-3 mr-1" />,
      VIP: <Star className="h-3 w-3 mr-1" />,
      New: <UserPlus className="h-3 w-3 mr-1" />,
      Inactive: <X className="h-3 w-3 mr-1" />,
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {statusIcons[status]}
        {status}
      </span>
    );
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Customer's Details">
      <div className="flex flex-col gap-6">
        <div className="border border-gray-200 rounded-lg p-5">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {selectedCustomer?.fullName}
              </h3>
              <p className="text-gray-600 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Customer since {dateConvert(selectedCustomer?.createdAt)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Contact Information
              </p>
              <div className="flex items-center text-gray-900 mb-1">
                <Phone className="h-4 w-4 mr-3 text-gray-500" />
                {selectedCustomer?.contact}
              </div>
              <div className="flex items-center text-gray-900">
                <Mail className="h-4 w-4 mr-3 text-gray-500" />
                {selectedCustomer?.email}
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Order Statistics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Total Orders
              </span>
              <span className="font-bold text-gray-800">12</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Total Spent
              </span>
              <span className="font-bold text-gray-800">$287.50</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Order Value</span>
              <span className="font-bold text-gray-800">$23.96</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Last Order Date
              </span>
              <span className="font-bold text-gray-800">Oct 15, 2023</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomerDetailsModal;
