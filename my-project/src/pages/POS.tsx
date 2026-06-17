import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import type { CustomerType, OrderItem, ServiceType } from "../lib/types";
import ServiceGrid from "../components/POS/ServiceGrid";
import CartSummary from "../components/POS/CartSummary";

export type FormCustomerData = {
  fullName: string;
  email: string;
  contact: string;
};

const POSPage = () => {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [customer, setCustomer] = useState<string>("");
  const [formCustomerData, setFormCustomerData] = useState<FormCustomerData>({
    fullName: "",
    email: "",
    contact: "",
  });
  const [itemDescription, setItemDescription] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [discount, setDiscount] = useState<number>(0);

  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: ["services-data"],
    queryFn: async () => {
      const res = await api.get("/service");
      return res.data as ServiceType[];
    },
  });

  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["customers-data"],
    queryFn: async () => {
      const res = await api.get("/customer");
      return res.data as CustomerType[];
    },
  });

  const handleAddService = (service: ServiceType, unit: "kg" | "item") => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.service === service._id && item.unit === unit
      );

      const unitPrice = unit === "kg" ? service.pricePerKg : service.pricePerItem;

      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].count += 1;
        updated[existingItemIndex].subtotal =
          updated[existingItemIndex].count * updated[existingItemIndex].unitPrice;
        return updated;
      }

      return [
        ...prev,
        {
          _id: Date.now().toString(), // temp ID
          service: service._id,
          serviceName: service.serviceName,
          unit,
          count: 1,
          unitPrice,
          subtotal: unitPrice,
        },
      ];
    });
  };

  const handleUpdateQuantity = (index: number, newCount: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      if (newCount <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].count = newCount;
      updated[index].subtotal = updated[index].count * updated[index].unitPrice;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
    setCustomer("");
    setFormCustomerData({ fullName: "", email: "", contact: "" });
    setItemDescription("");
    setSpecialInstructions("");
    setPaymentStatus("pending");
    setDiscount(0);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] md:min-h-screen lg:h-screen lg:overflow-hidden">
      {/* Left Panel: Service Selection Grid */}
      <div className="flex-1 p-4 md:p-6 lg:overflow-y-auto hide-scrollbar">
        <ServiceGrid
          services={services || []}
          isLoading={isLoadingServices}
          onAddService={handleAddService}
        />
      </div>

      {/* Right Panel: Cart & Checkout */}
      <div className="w-full lg:w-[400px] xl:w-[450px] bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col lg:h-screen lg:overflow-y-auto z-30 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] lg:shadow-none">
        <CartSummary
          cartItems={cartItems}
          customers={customers || []}
          isLoadingCustomers={isLoadingCustomers}
          customer={customer}
          setCustomer={setCustomer}
          formCustomerData={formCustomerData}
          setFormCustomerData={setFormCustomerData}
          itemDescription={itemDescription}
          setItemDescription={setItemDescription}
          specialInstructions={specialInstructions}
          setSpecialInstructions={setSpecialInstructions}
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          discount={discount}
          setDiscount={setDiscount}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          clearCart={clearCart}
        />
      </div>
    </div>
  );
};

export default POSPage;
