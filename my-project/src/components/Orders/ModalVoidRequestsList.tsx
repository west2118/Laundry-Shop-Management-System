import React, { useState } from "react";
import { AlertCircle, Package, User, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { OrderType } from "../../lib/types";
import { dateConvert } from "../../lib/contants";
import Modal from "../UI/Modal";
import OrderModalVoidAction from "./OrderModalVoidAction";

type ModalVoidRequestsListProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
};

const ModalVoidRequestsList = ({
  isModalOpen,
  isCloseModal,
}: ModalVoidRequestsListProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const { data: voidRequests, isLoading } = useQuery<OrderType[]>({
    queryKey: ["void-requests"],
    queryFn: async () => {
      const res = await api.get("/orders/void-requests");
      return res.data;
    },
  });

  const handleActionClick = (order: OrderType, type: "approve" | "reject") => {
    setSelectedOrder(order);
    setActionType(type);
    setIsActionModalOpen(true);
  };

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        isCloseModal={isCloseModal}
        title="Active Void Requests">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : voidRequests && voidRequests.length > 0 ? (
            <div className="space-y-4">
              {voidRequests.map((order) => (
                <div
                  key={order._id}
                  className="bg-white border border-red-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          Order #{order._id.slice(0, 8)}
                        </h4>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {dateConvert(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        ₱{order.totalAmount.toFixed(2)}
                      </p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 mt-1">
                        Void Requested
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded border border-gray-100 mb-4">
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {order.customer.fullName}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-700">Reason:</span>{" "}
                      <span className="italic">"{order.voidReason}"</span>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 border-t pt-3">
                    <button
                      onClick={() => handleActionClick(order, "reject")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                      Reject Request
                    </button>
                    <button
                      onClick={() => handleActionClick(order, "approve")}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition shadow-sm">
                      Approve Void
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No active void requests
              </h3>
              <p className="text-gray-500 text-sm">
                All void requests have been processed.
              </p>
            </div>
          )}
        </div>
      </Modal>

      {/* Action Confirmation Modal */}
      {isActionModalOpen && selectedOrder && (
        <OrderModalVoidAction
          isModalOpen={isActionModalOpen}
          isCloseModal={() => {
            setIsActionModalOpen(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
          actionType={actionType}
        />
      )}
    </>
  );
};

export default ModalVoidRequestsList;
