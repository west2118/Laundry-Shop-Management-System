
import DashboardStatsSummary from "../components/Dashboard/DashboardStatsSummary";
import DashboardRevenueChart from "../components/Dashboard/DashboardRevenueChart";
import DashboardServiceTypesChart from "../components/Dashboard/DashboardServiceTypesChart";
import DashboardRecentOrders from "../components/Dashboard/DashboardRecentOrders";
import DashboardStatus from "../components/Dashboard/DashboardStatus";

const LaundryDashboard = () => {
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
          </div>
        </div>

        {/* Quick Stats */}
        <DashboardStatsSummary />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
          {/* Revenue Chart */}
          <DashboardRevenueChart />

          {/* Service Type Distribution */}
          <DashboardServiceTypesChart />
        </div>

        {/* Recent Orders & Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Orders */}
          <DashboardRecentOrders />

          {/* Status Distribution */}
          <DashboardStatus />
        </div>
      </main>
    </div>
  );
};

export default LaundryDashboard;
