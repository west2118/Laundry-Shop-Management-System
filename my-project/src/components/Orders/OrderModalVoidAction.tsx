import { AlertCircle, CheckCircle, Loader, XCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import Modal from "../UI/Modal";
import type { OrderType } from "../../lib/types";

type ModalVoidActionProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  order: OrderType;
  actionType: "approve" | "reject";
};

const OrderModalVoidAction = ({
  isModalOpen,
  isCloseModal,
  order,
  actionType,
}: ModalVoidActionProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const endpoint = actionType === "approve" ? "approve-void" : "reject-void";
      const res = await api.put(`/order/${order._id}/${endpoint}`);
      return res?.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["order-today"] });
      queryClient.invalidateQueries({ queryKey: ["orders-data"] });
      queryClient.invalidateQueries({ queryKey: ["order-stats-data"] });
      queryClient.invalidateQueries({ queryKey: ["order-board-data"] });
      queryClient.invalidateQueries({ queryKey: ["void-requests"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleAction = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };

  const isApprove = actionType === "approve";

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={isApprove ? "Approve Void Request" : "Reject Void Request"}>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
              isApprove ? "bg-green-100" : "bg-red-100"
            }`}>
            {isApprove ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <XCircle className="h-6 w-6 text-red-600" />
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800">
              {isApprove
                ? `Approve Void for Order ${order._id.slice(0, 8)}...?`
                : `Reject Void for Order ${order._id.slice(0, 8)}...?`}
            </h4>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {isApprove
                ? "This will change the order status to 'voided' and it will no longer be processed. This action cannot be undone."
                : "This will reject the staff's void request and the order will continue its normal process."}
            </p>
          </div>
        </div>

        {order.voidReason && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
              Reason Provided by Staff
            </span>
            <p className="text-sm text-gray-800 italic">"{order.voidReason}"</p>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            disabled={mutation.isPending}
            onClick={isCloseModal}
            className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition border border-gray-300">
            Cancel
          </button>

          <button
            disabled={mutation.isPending}
            onClick={handleAction}
            className={`px-6 py-2.5 text-white rounded-lg transition shadow-sm flex items-center justify-center ${
              isApprove
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}>
            {mutation.isPending && (
              <Loader className="animate-spin h-4 w-4 mr-2" />
            )}
            {isApprove ? "Approve Void" : "Reject Void"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModalVoidAction;
