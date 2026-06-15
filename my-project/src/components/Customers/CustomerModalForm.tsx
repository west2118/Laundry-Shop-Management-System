import { FileText, Mail, MapPin, Phone, User, UserPlus, Loader } from "lucide-react";
import Modal from "../UI/Modal";
import { useEffect, useTransition } from "react";
import { useForm } from "../../hooks/useForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import type { CustomerType } from "../../lib/types";
import { toast } from "react-toastify";

type CustomerModalFormProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  isEdit: boolean;
  selectedCustomer: CustomerType | null;
};

type FormData = {
  fullName: string;
  email: string;
  contact: string;
};

const CustomerModalForm = ({
  isModalOpen,
  isCloseModal,
  isEdit,
  selectedCustomer,
}: CustomerModalFormProps) => {
  const queryClient = useQueryClient();
  const { formData, handleChange, setField } = useForm<FormData>({
    fullName: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    if (!selectedCustomer) return;

    setField("fullName", selectedCustomer?.fullName || "");
    setField("email", selectedCustomer?.email || "");
    setField("contact", selectedCustomer?.contact || "");
  }, [selectedCustomer]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let res;

      if (isEdit) {
        if (!selectedCustomer) return;

        res = await api.put(
          `/customer/${selectedCustomer?._id}`,
          { formData }
        );
      } else {
        res = await api.post(
          "/customer",
          formData
        );
      }

      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    mutation.mutate(formData);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={isEdit ? "Edit Customer" : "Add Customer"}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter customer name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter phone number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              disabled={mutation.isPending}
              onClick={isCloseModal}
              type="button"
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition">
              Cancel
            </button>

            <button
              disabled={mutation.isPending}
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center justify-center">
              {mutation.isPending ? (
                <Loader className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              {isEdit ? "Edit Customer" : "Add Customer"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CustomerModalForm;
