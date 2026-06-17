import { Check, Edit, FileText, Printer, ShoppingBag, User, Calendar, Receipt, CreditCard, Clock, CheckCircle2, Package, Tag, AlertCircle } from "lucide-react";
import React from "react";
import Modal from "../UI/Modal";
import type { OrderType } from "../../lib/types";
import { dateConvert } from "../../lib/contants";

type OrderModalDetailsProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedOrder: OrderType | null;
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
    case "in-process": return "bg-blue-100 text-blue-700 border-blue-200";
    case "ready": return "bg-indigo-100 text-indigo-700 border-indigo-200";
    case "picked-up": return "bg-green-100 text-green-700 border-green-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const OrderModalDetails = ({
  isModalOpen,
  isCloseModal,
  selectedOrder,
}: OrderModalDetailsProps) => {
  if (!selectedOrder) return null;

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Order Information"
      width="w-full max-w-2xl">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-6 mt-2">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">#{selectedOrder._id.slice(-6).toUpperCase()}</h2>
            <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${getStatusColor(selectedOrder.orderStatus)}`}>
              {selectedOrder.orderStatus}
            </span>
          </div>
          <p className="text-gray-500 text-sm flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-gray-400" />
            {dateConvert(selectedOrder.createdAt)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
            {selectedOrder?.orderStatus}
          </span>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60 flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-blue-200/50">
            <User className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Customer Details</p>
            <p className="font-bold text-gray-900">{selectedOrder.customer.fullName}</p>
            <p className="text-sm font-medium text-gray-500 truncate max-w-[180px]">{selectedOrder.customer.email}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60 flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 shadow-sm border border-purple-200/50">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Processed By</p>
            <p className="font-bold text-gray-900">{selectedOrder.createdBy?.firstName} {selectedOrder.createdBy?.lastName}</p>
            <p className="text-sm font-medium text-gray-500">Staff Member</p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 px-1">
          <ShoppingBag className="w-5 h-5 text-gray-800" />
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Order Items</h3>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-5 font-bold">Service</th>
                  <th className="py-3.5 px-5 font-bold text-right">Quantity</th>
                  <th className="py-3.5 px-5 font-bold text-right">Unit Price</th>
                  <th className="py-3.5 px-5 font-bold text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80">
                {selectedOrder.items.map((item) => (
                  <tr key={item._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="py-3.5 px-5">
                      <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{item.serviceName}</p>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="inline-flex items-center justify-center min-w-[3rem] px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100/50">
                        {item.count} <span className="text-blue-500 ml-1">{item.unit}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right text-sm font-medium text-gray-500">
                      ₱{item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-5 text-right font-bold text-gray-900">
                      ₱{item.subtotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50/50 p-5 border-t border-gray-200/80 space-y-3">
            <div className="flex justify-between text-sm font-medium text-gray-500 px-1">
              <span>Subtotal</span>
              <span className="text-gray-900">₱{(selectedOrder.totalAmount + selectedOrder.discount).toFixed(2)}</span>
            </div>
            {selectedOrder.discount > 0 && (
              <div className="flex justify-between text-sm font-semibold text-emerald-600 px-1">
                <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> Discount Applied</span>
                <span>- ₱{selectedOrder.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg pt-4 border-t border-gray-200/80 mt-2 px-1">
              <span className="font-extrabold text-gray-900">Total Payable</span>
              <span className="font-extrabold text-blue-600 text-xl tracking-tight">₱{selectedOrder.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      {(selectedOrder.itemDescription || selectedOrder.specialInstructions) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {selectedOrder.itemDescription && (
            <div className="bg-amber-50/50 border border-amber-200/60 p-4.5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-amber-800">
                <Package className="w-4.5 h-4.5" />
                <h4 className="font-bold text-[11px] uppercase tracking-wider">Item Descriptions</h4>
              </div>
              <ul className="space-y-1.5 ml-1 text-sm font-medium text-amber-900/80">
                {selectedOrder.itemDescription.split(",").map((desc, idx) => {
                  const trimmed = desc.trim();
                  return trimmed ? (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-sm"></span>
                      <span className="capitalize leading-relaxed">{trimmed}</span>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}

          {selectedOrder.specialInstructions && (
            <div className="bg-rose-50/50 border border-rose-200/60 p-4.5 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-rose-800">
                <AlertCircle className="w-4.5 h-4.5" />
                <h4 className="font-bold text-[11px] uppercase tracking-wider">Special Instructions</h4>
              </div>
              <ul className="space-y-1.5 ml-1 text-sm font-medium text-rose-900/80">
                {selectedOrder.specialInstructions.split(",").map((inst, idx) => {
                  const trimmed = inst.trim();
                  return trimmed ? (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 shadow-sm"></span>
                      <span className="capitalize leading-relaxed">{trimmed}</span>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
        <button
          onClick={isCloseModal}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors">
          Close
        </button>
        <button className="flex items-center justify-center px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-colors group">
          <Edit className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          Edit Order
        </button>
      </div>
    </Modal>
  );
};

export default OrderModalDetails;
