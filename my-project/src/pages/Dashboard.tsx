import {
  Bell,
  Search,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
} from "lucide-react";
import DashboardStatsSummary from "../components/Dashboard/DashboardStatsSummary";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../stores/useUserStore";
import axios from "axios";
import DashboardRevenueChart from "../components/Dashboard/DashboardRevenueChart";
import DashboardServiceTypesChart from "../components/Dashboard/DashboardServiceTypesChart";
import DashboardRecentOrders from "../components/Dashboard/DashboardRecentOrders";
import DashboardStatus from "../components/Dashboard/DashboardStatus";

const LaundryDashboard = () => {
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      if (!token) return null;

      const [
        ordersStatsRes,
        orderDailyRevenueRes,
        orderServicesRes,
        orderRecentRes,
      ] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/order-stats-weekly", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/order-daily-sales", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/order-service-weekly", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/order-recent", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      return {
        ordersStats: ordersStatsRes.data,
        orderDailyRevenue: orderDailyRevenueRes.data,
        orderServices: orderServicesRes.data,
        orderRecent: orderRecentRes.data,
      };
    },
    enabled: !!token,
  });

  return (
    <div className="flex-1 flex flex-col md:ml-0">
      <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back! Here's what's happening with your laundry business
                today.
              </p>
            </div>
            {/* <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
            </div> */}
          </div>
        </div>

        {/* Quick Stats */}
        <DashboardStatsSummary ordersStats={data?.ordersStats} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
          {/* Revenue Chart */}
          <DashboardRevenueChart dailyRevenueData={data?.orderDailyRevenue} />

          {/* Service Type Distribution */}
          <DashboardServiceTypesChart serviceTypeData={data?.orderServices} />
        </div>

        {/* Recent Orders & Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Orders */}
          <DashboardRecentOrders ordersRecent={data?.orderRecent} />

          {/* Status Distribution */}
          <DashboardStatus statusDistributionData={data?.ordersStats} />
        </div>
      </main>
    </div>
  );
};

export default LaundryDashboard;
