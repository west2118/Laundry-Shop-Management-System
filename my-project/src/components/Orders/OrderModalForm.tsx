import { useEffect, useState, useTransition } from "react";
import Modal from "../UI/Modal";
import {
  Plus,
  User,
  DollarSign,
  Tag,
  Percent,
  FileText,
  ShoppingBag,
  X,
  ShoppingCart,
  Loader,
  Minus,
  ClipboardList,
  Mail,
  Contact,
  CardSim,
} from "lucide-react";
import { useForm } from "../../hooks/useForm";
import type { CustomerType, OrderType, ServiceType } from "../../lib/types";
import OrderServiceItem from "./OrderServiceItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type OrderModalFormProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  token: string | null;
  isEdit: boolean;
  services: ServiceType[] | null;
  customers: CustomerType[] | null;
  selectedOrder: OrderType | null;
};

type FormData = {
  customer: string;
  itemDescription: string;
  specialInstructions: string;
  paymentStatus: string;
  discount: number;
};

type FormCustomerData = {
  fullName: string;
  email: string;
  contact: string;
};

type OrderItemForm = {
  service: string;
  serviceName: string;
  unit: string;
  count: number;
  unitPrice: number;
  subtotal: number;
};

type FormOrderData = {
  items: OrderItemForm[];
};

const OrderModalForm = ({
  token,
  isModalOpen,
  isCloseModal,
  isEdit,
  services,
  customers,
  selectedOrder,
}: OrderModalFormProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const { formData, handleChange, setField } = useForm<FormData>({
    customer: "",
    itemDescription: "",
    specialInstructions: "",
    paymentStatus: "",
    discount: 0,
  });
  const [formCustomerData, setFormCustomerData] = useState<FormCustomerData>({
    fullName: "",
    email: "",
    contact: "",
  });
  const [formOrderData, setFormOrderData] = useState<FormOrderData>({
    items: [
      {
        service: "",
        serviceName: "",
        unit: "",
        count: 0,
        unitPrice: 0,
        subtotal: 0,
      },
    ],
  });

  useEffect(() => {
    if (!selectedOrder) return;

    setField("customer", selectedOrder?.customer._id || "");
    setField("itemDescription", selectedOrder?.itemDescription || "");
    setField("specialInstructions", selectedOrder?.specialInstructions || "");
    setField("paymentStatus", selectedOrder?.paymentStatus || "");
    setField("discount", selectedOrder?.discount || 0);

    setFormOrderData({
      items: selectedOrder?.items || [],
    });
  }, [selectedOrder]);

  const addOrderForm = () => {
    setFormOrderData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          service: "",
          serviceName: "",
          unit: "",
          count: 0,
          unitPrice: 0,
          subtotal: 0,
        },
      ],
    }));
  };

  const minusOrderForm = () => {
    setFormOrderData((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.slice(0, -1) : prev.items,
    }));
  };

  const handleOrderFormChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormOrderData((prev) => {
      const updatedItems = [...prev.items];
      const item = { ...updatedItems[index], [field]: value };

      if (field === "service") {
        const selectedService = services?.find((s) => s._id === value);

        if (selectedService) {
          item.serviceName = selectedService.serviceName;
        }
      }

      if (field === "service" || field === "unit") {
        const selectedService = services?.find((s) => s._id === item.service);

        if (selectedService) {
          if (item.unit === "kg") {
            item.unitPrice = selectedService.pricePerKg;
          } else if (item.unit === "item") {
            item.unitPrice = selectedService.pricePerItem;
          } else {
            item.unitPrice = 0;
          }
        }
      }

      const count = Number(item.count) || 0;
      item.count = count;
      item.subtotal = item.unitPrice * count;

      updatedItems[index] = item;
      return { ...prev, items: updatedItems };
    });
  };

  const totalAmount =
    formOrderData.items.reduce((sum, item) => sum + item.subtotal, 0) -
    Number(formData.discount || 0);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let res;

      const payload = {
        customer:
          formData.customer === "new" ? formCustomerData : formData.customer,
        items: formOrderData.items,
        itemDescription: formData.itemDescription,
        specialInstructions: formData.specialInstructions,
        paymentStatus: formData.paymentStatus,
        discount: Number(formData.discount),
        totalAmount,
      };

      if (isEdit) {
        if (!selectedOrder) return;

        res = await axios.put(
          `http://localhost:8080/api/v1/order/${selectedOrder?._id}`,
          { payload },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.post("http://localhost:8080/api/v1/order", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      return res.data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["order-data"] });
      queryClient.invalidateQueries({ queryKey: ["order-board-data"] });
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
      title={isEdit ? "Edit Order" : "Add Order"}
      width="max-w-[40%]">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Customer
            </label>
            <select
              name="customer"
              value={formData.customer}
              onChange={(e) => setField("customer", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select customer</option>
              {customers?.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.fullName}
                </option>
              ))}
              <option value="new">Create New Customer</option>
            </select>
          </div>

          {formData?.customer === "new" && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Customer Details
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter customer name"
                    name="fullName"
                    value={formCustomerData.fullName}
                    onChange={handleCustomerChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Contact className="h-4 w-4" />
                      Contact
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter contact number"
                      name="contact"
                      value={formCustomerData.contact}
                      onChange={handleCustomerChange}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                      name="email"
                      value={formCustomerData.email}
                      onChange={handleCustomerChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Section */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Orders
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={minusOrderForm}
                type="button"
                className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                <Minus className="h-4 w-4" />
              </button>

              <button
                onClick={addOrderForm}
                type="button"
                className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {formOrderData.items.map((item, index) => (
            <OrderServiceItem
              key={index}
              index={index}
              item={item}
              services={services}
              handleOrderFormChange={handleOrderFormChange}
            />
          ))}

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <CardSim className="h-4 w-4 mr-2" />
              Payment Status
            </label>
            <select
              value={formData.paymentStatus}
              onChange={(e) => setField("paymentStatus", e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" disabled>
                Select Payment Status
              </option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Items Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the items for laundry (e.g., 5 shirts, 3 pants, 2 sweaters...)"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Special Instructions
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any special instructions for this order..."
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Percent className="h-4 w-4 mr-2" />
              Discount
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center">
              {isPending && <Loader className="animate-spin h-5 w-5 mr-2" />}
              {isEdit ? "Edit Order" : "Add Order"}
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

export default OrderModalForm;
