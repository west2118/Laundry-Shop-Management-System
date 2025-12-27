import { Users, Plus, Filter } from "lucide-react";
import { useState } from "react";
import CustomerModalForm from "../components/Customers/CustomerModalForm";
import StatsSummaryCards from "../components/Customers/StatsSummaryCards";
import CustomersTable from "../components/Customers/CustomersTable";
import CustomerDetailsModal from "../components/Customers/CustomerDetailsModal";
import { useUserStore } from "../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import type { CustomerType } from "../lib/types";
import { fetchData } from "../lib/utils";
import ModalDelete from "../components/Services/ServiceModalDelete";

const Customers = () => {
  const token = useUserStore((state) => state.userToken);
  const [isEdit, setIsEdit] = useState(false);
  const [isCustomerFormModal, setIsCustomerFormModal] = useState(false);
  const [isCustomerDetailsModal, setIsCustomerDetailsModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(
    null
  );

  const { data, isError, isLoading } = useQuery<CustomerType[]>({
    queryKey: ["customers"],
    queryFn: fetchData("http://localhost:8080/api/v1/customer", token),
    enabled: !!token,
  });

  const handleSelectCustomer = (
    customer: CustomerType,
    action: "edit" | "delete" | "details"
  ) => {
    setSelectedCustomer(customer);

    if (action === "edit") {
      setIsEdit(true);
      setIsCustomerFormModal(true);
    } else if (action === "details") {
      setIsCustomerDetailsModal(true);
    } else {
      setIsDeleteModalOpen(true);
    }
  };

  const closeCustomerFormModal = () => {
    setIsCustomerFormModal(false);
    setIsEdit(false);
    setSelectedCustomer(null);
  };

  const closeCustomerDetailsModal = () => {
    setIsCustomerDetailsModal(false);
    setSelectedCustomer(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <Users className="mr-2 h-7 w-7 text-blue-600" />
              Customers
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your laundry shop customers and their information
            </p>
          </div>
          <button
            onClick={() => setIsCustomerFormModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add New Customer
          </button>
        </div>

        {/* Stats Summary */}
        <StatsSummaryCards />
      </div>

      <CustomersTable
        customers={data ?? null}
        handleSelectCustomer={handleSelectCustomer}
      />

      {isCustomerFormModal && (
        <CustomerModalForm
          isModalOpen={isCustomerFormModal}
          isCloseModal={closeCustomerFormModal}
          token={token}
          isEdit={isEdit}
          selectedCustomer={selectedCustomer ?? null}
        />
      )}

      {isCustomerDetailsModal && (
        <CustomerDetailsModal
          isModalOpen={isCustomerDetailsModal}
          isCloseModal={closeDeleteModal}
          selectedCustomer={selectedCustomer ?? null}
        />
      )}

      {isDeleteModalOpen && (
        <ModalDelete
          isModalOpen={isDeleteModalOpen}
          isCloseModal={closeDeleteModal}
          token={token}
          selectedItem={selectedCustomer ?? null}
          title="Customer"
        />
      )}
    </div>
  );
};

export default Customers;
