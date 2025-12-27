import {
  Package,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  PackageOpen,
  Loader,
} from "lucide-react";

const OrderStatsSummary = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">342</p>
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last week
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Today's Orders</p>
            <p className="text-2xl font-bold text-gray-800">24</p>
            <p className="text-xs text-blue-600 mt-1 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Oct 15, 2023
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <PackageOpen className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Revenue Today</p>
            <p className="text-2xl font-bold text-gray-800">$582</p>
            <p className="text-xs text-purple-600 mt-1 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              Average: $24.25/order
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Processing Time</p>
            <p className="text-2xl font-bold text-gray-800">3.2h</p>
            <p className="text-xs text-yellow-600 mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Average processing
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Loader className="h-6 w-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatsSummary;
