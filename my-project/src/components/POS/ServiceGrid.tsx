import { Loader, Package, Plus } from "lucide-react";
import type { ServiceType } from "../../lib/types";

type ServiceGridProps = {
  services: ServiceType[];
  isLoading: boolean;
  onAddService: (service: ServiceType, unit: "kg" | "item") => void;
};

const ServiceGrid = ({ services, isLoading, onAddService }: ServiceGridProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Loader className="h-8 w-8 animate-spin mb-4 text-blue-600" />
        <p>Loading services...</p>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
        <Package className="h-12 w-12 text-gray-300 mb-2" />
        <p>No services available.</p>
      </div>
    );
  }

  // Group services by category for better UX
  const categories = ["basic", "premium", "express", "additional"];
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Point of Sale</h2>
        <p className="text-gray-600 mb-6">Select services to add them to the order.</p>
      </div>

      {categories.map((category) => {
        const categoryServices = services.filter((s) => s.category === category && s.status === "active");
        if (categoryServices.length === 0) return null;

        return (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-bold text-gray-700 capitalize mb-4 pb-2 border-b border-gray-200">
              {category} Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryServices.map((service) => (
                <div 
                  key={service._id} 
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col justify-between h-full"
                >
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{service.serviceName}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3 h-10">{service.description}</p>
                  </div>
                  
                  <div className="mt-auto flex flex-row gap-2">
                    {Number(service.pricePerKg) > 0 ? (
                      <button
                        onClick={() => onAddService(service, "kg")}
                        className="flex-1 flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition text-sm font-bold border border-blue-100 shadow-sm"
                      >
                        <Plus className="h-5 w-5 mb-1" />
                        <span>By Kg</span>
                        <span className="text-xs font-medium text-blue-500">₱{service.pricePerKg}</span>
                      </button>
                    ) : null}

                    {Number(service.pricePerItem) > 0 ? (
                      <button
                        onClick={() => onAddService(service, "item")}
                        className="flex-1 flex flex-col items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition text-sm font-bold border border-purple-100 shadow-sm"
                      >
                        <Plus className="h-5 w-5 mb-1" />
                        <span>By Item</span>
                        <span className="text-xs font-medium text-purple-500">₱{service.pricePerItem}</span>
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceGrid;
