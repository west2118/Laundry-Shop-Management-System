import { useState } from "react";
import {
  Plus,
  Filter,
  DollarSign,
  CheckCircle,
  TrendingUp,
  ShoppingBag,
  Layers,
  Settings,
  PackageOpen,
} from "lucide-react";
import ServiceModalForm from "../components/Services/ServiceModalForm";
import { useUserStore } from "../stores/useUserStore";
import ServiceTable from "../components/Services/ServiceTable";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../lib/utils";
import type { ServiceType } from "../lib/types";
import StatsSummaryServices from "../components/Services/StatsSummaryServices";
import ModalDelete from "../components/Services/ServiceModalDelete";

const ServicesPage = () => {
  const token = useUserStore((state) => state.userToken);
  const [isEdit, setIsEdit] = useState(false);
  const [isServiceFormModalOpen, setIsServiceFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null
  );

  const handleSelectCard = (
    service: ServiceType,
    action: "edit" | "delete"
  ) => {
    setSelectedService(service);

    if (action === "edit") {
      setIsEdit(true);
      setIsServiceFormModalOpen(true);
    } else {
      setIsDeleteModalOpen(true);
    }
  };

  const closeServiceFormModal = () => {
    setIsServiceFormModalOpen(false);
    setIsEdit(false);
    setSelectedService(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <Settings className="mr-2 h-7 w-7 text-blue-600" />
              Services
            </h1>
            <p className="text-gray-600 mt-1">
              Manage laundry services, pricing, and categories
            </p>
          </div>
          <button
            onClick={() => setIsServiceFormModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <ServiceTable handleSelectCard={handleSelectCard} token={token} />

      {isServiceFormModalOpen && (
        <ServiceModalForm
          isModalOpen={isServiceFormModalOpen}
          isCloseModal={closeServiceFormModal}
          token={token}
          isEdit={isEdit}
          selectedService={selectedService ?? null}
        />
      )}

      {isDeleteModalOpen && (
        <ModalDelete
          isModalOpen={isDeleteModalOpen}
          isCloseModal={closeDeleteModal}
          token={token}
          selectedItem={selectedService ?? null}
          title="Service"
        />
      )}
    </div>
  );
};

export default ServicesPage;
