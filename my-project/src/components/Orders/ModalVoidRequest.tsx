import { AlertTriangle, Loader, XCircle } from "lucide-react";
import { useState } from "react";
import type { OrderType } from "../../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { toast } from "react-toastify";
import Modal from "../UI/Modal";

type ModalVoidRequestProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  order: OrderType;
};

const ModalVoidRequest = ({
  isModalOpen,
  isCloseModal,
  order,
}: ModalVoidRequestProps) => {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.put(`/order/${order._id}/request-void`, {
        voidReason: reason,
      });

      return res?.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["order-today"] });
      queryClient.invalidateQueries({ queryKey: ["orders-data"] });
      queryClient.invalidateQueries({ queryKey: ["void-requests"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleRequestVoid = (e: any) => {
    e.preventDefault();

    if (!reason.trim()) {
      return toast.error("Please provide a reason for the void request");
    }

    mutation.mutate();
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Request Order Void">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800">
              Request to Void Order {order._id.slice(0, 8)}...?
            </h4>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              This will submit a void request to the admin. You must provide a reason for this request.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Void Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for voiding..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[100px]"
          />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            disabled={mutation.isPending}
            onClick={isCloseModal}
            className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition border border-gray-300">
            Cancel
          </button>

          <button
            disabled={mutation.isPending}
            onClick={handleRequestVoid}
            className="px-6 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm flex items-center justify-center">
            {mutation.isPending && <Loader className="animate-spin h-4 w-4 mr-2" />}
            Submit Request
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalVoidRequest;
