import { Check, Edit, FileText, Printer, ShoppingBag } from "lucide-react";
import React from "react";
import Modal from "../UI/Modal";
import type { OrderType } from "../../lib/types";
import { dateConvert } from "../../lib/contants";

type OrderModalDetailsProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedOrder: OrderType | null;
};

const OrderModalDetails = ({
  isModalOpen,
  isCloseModal,
  selectedOrder,
}: OrderModalDetailsProps) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Order Details"
      width="max-w-[40%]">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          <p className="text-gray-500 text-sm mt-1">
            Example of order information view
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
            {selectedOrder?.orderStatus}
          </span>
        </div>
      </div>

      {/* Order Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium text-gray-900">{selectedOrder?._id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium text-gray-900">
            {dateConvert(selectedOrder?.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Customer</p>
          <p className="font-medium text-gray-900">
            {selectedOrder?.customer.fullName}
          </p>
        </div>
        <div>
          <ul className="text-sm text-gray-500">Service Type</ul>
          {selectedOrder?.items.map((item) => (
            <li key={item._id} className="font-medium text-gray-900 ml-4.5">
              {item.serviceName}
            </li>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center text-lg">
          <ShoppingBag className="h-5 w-5 mr-2 text-gray-700" />
          Items List
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="divide-y divide-gray-200">
            {selectedOrder?.items.map((item) => (
              <li key={item._id} className="flex justify-between py-2">
                <span className="text-gray-700">{item.serviceName}</span>
                <span className="font-medium">₱{item.subtotal}</span>
              </li>
            ))}
            <li className="flex justify-between py-2">
              <span className="text-gray-700">Discount</span>
              <span className="font-medium">₱{selectedOrder?.discount}</span>
            </li>
            <li className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-medium text-gray-900">Total Amount</span>
              <span className="font-medium">₱{selectedOrder?.totalAmount}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Special Instructions */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center text-lg">
          <FileText className="h-5 w-5 mr-2 text-gray-700" />
          Item Description
        </h3>
        <div className="bg-gray-100 rounded-lg p-4 space-y-1">
          {selectedOrder?.itemDescription.split(", ").map((item) => (
            <p className="text-sm text-gray-700 capitalize">• {item}</p>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3 flex items-center text-lg">
          <FileText className="h-5 w-5 mr-2 text-gray-700" />
          Special Instructions
        </h3>
        <div className="bg-blue-50 rounded-lg p-4 space-y-1">
          {selectedOrder?.specialInstructions.split(", ").map((item) => (
            <p className="text-sm text-gray-700 capitalize">• {item}</p>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
          <Edit className="h-4 w-4 mr-2" />
          Edit Order
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Printer className="h-4 w-4 mr-2" />
          Print Invoice
        </button>
      </div>
    </Modal>
  );
};

export default OrderModalDetails;
