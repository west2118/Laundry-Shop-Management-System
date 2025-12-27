import { toast } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import Modal from "../UI/Modal";
import {
  Tag,
  Clock,
  Package,
  X,
  Save,
  Layers,
  Settings,
  FileText,
  DollarSign,
  Timer,
  Loader,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { ServiceType } from "../../lib/types";
import { startTransition, useEffect, useTransition } from "react";

type ServiceModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  token: string | null;
  isEdit: boolean;
  selectedService: ServiceType | null;
};

type FormData = {
  serviceName: string;
  description: string;
  category: string;
  pricePerKg: number;
  pricePerItem: number;
  unitType: string;
  processingTime: string;
  status: string;
};

const ServiceModalForm = ({
  isModalOpen,
  isCloseModal,
  token,
  isEdit,
  selectedService,
}: ServiceModalProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { formData, handleChange, setField } = useForm<FormData>({
    serviceName: "",
    description: "",
    category: "",
    pricePerKg: 0,
    pricePerItem: 0,
    unitType: "",
    processingTime: "",
    status: "",
  });

  useEffect(() => {
    if (!selectedService) return;

    setField("serviceName", selectedService?.serviceName || "");
    setField("description", selectedService?.description || "");
    setField("category", selectedService?.category || "");
    setField("pricePerKg", selectedService?.pricePerKg || 0);
    setField("pricePerItem", selectedService?.pricePerItem || 0);
    setField("unitType", selectedService?.unitType || "");
    setField("processingTime", selectedService?.processingTime || "");
    setField("status", selectedService?.status || "");
  }, [selectedService]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let res;

      if (isEdit) {
        if (!selectedService) return;

        res = await axios.put(
          `http://localhost:8080/api/v1/service/${selectedService?._id}`,
          { formData },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.post(
          "http://localhost:8080/api/v1/service",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    startTransition(async () => mutation.mutate(formData));
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={isEdit ? "Edit Service" : "Add Service"}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Service Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter service name"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the service"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Layers className="h-4 w-4 mr-2" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => setField("category", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" disabled>
                Select category
              </option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="express">Express</option>
              <option value="discount">Discount</option>
              <option value="additional">Additional</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price per kg */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price per kg
              </label>
              <input
                min={1}
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="₱ / kg"
                name="pricePerKg"
                value={formData.pricePerKg}
                onChange={handleChange}
              />
            </div>

            {/* Price per item */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-700 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Price per item
              </label>
              <input
                min={1}
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="₱ / item"
                name="pricePerItem"
                value={formData.pricePerItem}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Timer className="h-4 w-4 mr-2" />
              Processing Time
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1 hour"
              name="processingTime"
              value={formData.processingTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Status
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Active</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-sm text-gray-700">Inactive</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center">
              {isPending && <Loader className="animate-spin h-5 w-5 mr-2" />}
              Save Service
            </button>

            <button
              disabled={isPending}
              onClick={isCloseModal}
              type="button"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ServiceModalForm;
