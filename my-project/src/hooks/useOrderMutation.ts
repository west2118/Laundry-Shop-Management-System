import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { toast } from "react-toastify";

export type OrderPayload = {
  customer: any;
  items: any[];
  itemDescription: string;
  specialInstructions: string;
  paymentStatus: string;
  discount: number;
  totalAmount: number;
};

type UseOrderMutationProps = {
  onSuccessCallback?: () => void;
  isEdit?: boolean;
  orderId?: string;
};

export const useOrderMutation = ({
  onSuccessCallback,
  isEdit,
  orderId,
}: UseOrderMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: OrderPayload) => {
      let res;
      if (isEdit && orderId) {
        res = await api.put(`/order/${orderId}`, payload);
      } else {
        res = await api.post("/order", payload);
      }
      return res.data;
    },
    onSuccess: (response) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      toast.success(response.message || "Order saved successfully!");

      // Invalidate all related queries to keep dashboard/tables synced
      queryClient.invalidateQueries({ queryKey: ["order-stats-data"] });
      queryClient.invalidateQueries({ queryKey: ["order-board-data"] });
      queryClient.invalidateQueries({ queryKey: ["orders-data"] });
      queryClient.invalidateQueries({ queryKey: ["order-today"] });
      queryClient.invalidateQueries({ queryKey: ["report-stats"] });
      queryClient.invalidateQueries({ queryKey: ["report-revenue-trend"] });
      queryClient.invalidateQueries({ queryKey: ["report-most-services"] });
      queryClient.invalidateQueries({ queryKey: ["customer-stats"] });
      queryClient.invalidateQueries({ queryKey: ["service-stats"] });
      // Dashboard keys
      queryClient.invalidateQueries({ queryKey: ["order-stats-weekly"] });
      queryClient.invalidateQueries({ queryKey: ["order-service-weekly"] });
      queryClient.invalidateQueries({ queryKey: ["order-daily-sales"] });
      queryClient.invalidateQueries({ queryKey: ["order-recent"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    },
  });
};
