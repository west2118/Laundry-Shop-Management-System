import { ShoppingCart, User, Plus, Minus, Trash2, Loader, CheckCircle2 } from "lucide-react";
import type { CustomerType, OrderItem } from "../../lib/types";
import { toast } from "react-toastify";
import type { FormCustomerData } from "../../pages/POS";
import { useOrderMutation } from "../../hooks/useOrderMutation";

type CartSummaryProps = {
  cartItems: OrderItem[];
  customers: CustomerType[];
  isLoadingCustomers: boolean;
  customer: string;
  setCustomer: (val: string) => void;
  formCustomerData: FormCustomerData;
  setFormCustomerData: React.Dispatch<React.SetStateAction<FormCustomerData>>;
  itemDescription: string;
  setItemDescription: (val: string) => void;
  specialInstructions: string;
  setSpecialInstructions: (val: string) => void;
  paymentStatus: string;
  setPaymentStatus: (val: string) => void;
  discount: number;
  setDiscount: (val: number) => void;
  onUpdateQuantity: (index: number, count: number) => void;
  onRemoveItem: (index: number) => void;
  clearCart: () => void;
};

const CartSummary = ({
  cartItems,
  customers,
  isLoadingCustomers,
  customer,
  setCustomer,
  formCustomerData,
  setFormCustomerData,
  itemDescription,
  setItemDescription,
  specialInstructions,
  setSpecialInstructions,
  paymentStatus,
  setPaymentStatus,
  discount,
  setDiscount,
  onUpdateQuantity,
  onRemoveItem,
  clearCart,
}: CartSummaryProps) => {
  const mutation = useOrderMutation({
    onSuccessCallback: clearCart,
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
  const totalAmount = subtotal - (Number(discount) || 0);

  const handleCustomerFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    if (!customer) {
      toast.error("Please select a customer");
      return;
    }
    if (customer === "new" && !formCustomerData.fullName) {
      toast.error("Please provide the new customer's full name");
      return;
    }
    if (!itemDescription) {
      toast.error("Please provide an item description");
      return;
    }

    const payload = {
      customer: customer === "new" ? formCustomerData : customer,
      items: cartItems.map(({ service, serviceName, unit, count, unitPrice, subtotal }) => ({
        service,
        serviceName,
        unit,
        count,
        unitPrice,
        subtotal,
      })),
      itemDescription,
      specialInstructions,
      paymentStatus,
      discount: Number(discount),
      totalAmount,
    };

    mutation.mutate(payload);
  };

  return (
    <div className="flex flex-col lg:h-full h-auto bg-white relative">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <ShoppingCart className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-bold text-gray-800">Current Order</h2>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
          {cartItems.length} items
        </span>
      </div>

      {/* Scrollable Content */}
      <div className="lg:flex-1 lg:overflow-y-auto p-4 space-y-6 h-auto hide-scrollbar">

        {/* Cart Items List */}
        <div className="max-h-[30vh] overflow-y-auto pr-1 hide-scrollbar">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <ShoppingCart className="h-10 w-10 mx-auto mb-2 text-gray-300" />
              <p>Cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div key={index} className="flex flex-col p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 pr-2">
                      <h4 className="font-semibold text-gray-800 text-sm">{item.serviceName}</h4>
                      <p className="text-xs text-gray-500 capitalize">{item.unit} (₱{item.unitPrice})</p>
                    </div>
                    <button onClick={() => onRemoveItem(index)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    {item.unit === "kg" ? (
                      <div className="flex items-center">
                        <input
                          type="number"
                          min="0"
                          value={item.count === 0 ? "" : item.count}
                          onChange={(e) => onUpdateQuantity(index, Number(e.target.value))}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                          placeholder="0"
                        />
                        <span className="ml-2 text-xs text-gray-500">kg</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <input
                          type="number"
                          min="0"
                          value={item.count === 0 ? "" : item.count}
                          onChange={(e) => onUpdateQuantity(index, Number(e.target.value))}
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                          placeholder="0"
                        />
                        <span className="ml-2 text-xs text-gray-500">items</span>
                      </div>
                    )}
                    <span className="font-bold text-gray-800 text-sm">₱{item.subtotal}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Customer Details */}
        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">Customer</label>
            <select
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">{isLoadingCustomers ? "Loading..." : "Select Customer"}</option>
              {customers?.map((c) => (
                <option key={c._id} value={c._id}>{c.fullName}</option>
              ))}
              <option value="new">+ Add New Customer</option>
            </select>
          </div>

          {customer === "new" && (
            <div className="bg-blue-50 p-3 rounded-lg space-y-3 border border-blue-100">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formCustomerData.fullName}
                onChange={handleCustomerFormChange}
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact"
                  value={formCustomerData.contact}
                  onChange={handleCustomerFormChange}
                  className="w-1/2 text-sm px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formCustomerData.email}
                  onChange={handleCustomerFormChange}
                  className="w-1/2 text-sm px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="space-y-3 border-t border-gray-100 pt-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">Item Description *</label>
            <input
              type="text"
              placeholder="e.g. 5 T-shirts, 2 Jeans"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">Special Instructions</label>
            <input
              type="text"
              placeholder="e.g. Wash in cold water"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

      </div>

      {/* Footer / Checkout */}
      <div className="border-t border-gray-200 bg-white p-4 space-y-3 sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">₱{subtotal}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Discount</span>
          <div className="flex items-center">
            <span className="mr-1 text-gray-500">₱</span>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-16 px-2 py-1 text-right border border-gray-300 rounded-md text-sm"
              min="0"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
          <span className="text-gray-800 font-bold">Total</span>
          <span className="text-blue-600 font-bold text-xl">₱{totalAmount}</span>
        </div>

        <div className="flex gap-2 mt-4">
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-1/3 px-2 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-medium text-gray-700"
          >
            <option value="pending">Unpaid</option>
            <option value="paid">Paid</option>
          </select>

          <button
            onClick={handleCheckout}
            disabled={mutation.isPending || cartItems.length === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center"
          >
            {mutation.isPending ? (
              <Loader className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <CheckCircle2 className="h-5 w-5 mr-2" />
            )}
            {mutation.isPending ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
