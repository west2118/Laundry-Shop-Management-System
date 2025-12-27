import { X, AlertTriangle, Loader, Trash2 } from "lucide-react";
import { startTransition, useEffect, useTransition } from "react";
import type { CustomerType, OrderType, ServiceType } from "../../lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../UI/Modal";

type ModalDeleteProps = {
  token: string | null;
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedItem: ServiceType | CustomerType | OrderType | null;
  title: string;
};

const ModalDelete = ({
  token,
  isModalOpen,
  isCloseModal,
  selectedItem,
  title,
}: ModalDeleteProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `http://localhost:8080/api/v1/${title.toLowerCase()}/${
          selectedItem?._id
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res?.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);

      if (title === "Service") {
        queryClient.invalidateQueries({ queryKey: ["services"] });
      } else if (title === "Customer") {
        queryClient.invalidateQueries({ queryKey: ["customers"] });
      } else if (title === "Order") {
        queryClient.invalidateQueries({ queryKey: ["order-data"] });
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleDeleteService = (e: any) => {
    e.preventDefault();

    startTransition(async () => mutation.mutate());
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={`Delete ${title}`}>
      {/* Modal Body */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800">
              Delete this {title}?
            </h4>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              This {title} will be permanently removed from your laundry shop.
              All pricing, settings, and related data will be lost.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          ⚠️ This action cannot be undone.
        </div>

        {/* Footer INSIDE children */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            disabled={isPending}
            onClick={isCloseModal}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition border border-gray-300">
            Cancel
          </button>

          <button
            disabled={isPending}
            onClick={handleDeleteService}
            className="flex-1 flex items-center justify-center px-4 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm">
            {isPending && <Loader className="animate-spin h-5 w-5 mr-2" />}
            Delete {title}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
