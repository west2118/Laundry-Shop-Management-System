import {
  BarChart3,
  Download,
} from "lucide-react";
import ReportMonthlySales from "../components/Reports/ReportMonthlySales";
import ReportMostUsedServices from "../components/Reports/ReportMostUsedServices";
import ReportDailySalesChart from "../components/Reports/ReportDailySalesChart";
import ReportStatsMetrics from "../components/Reports/ReportStatsMetrics";
import ReportAverageRevenueChart from "../components/Reports/ReportAverageRevenueChart";

const ReportsPage = () => {
  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <BarChart3 className="mr-2 h-7 w-7 text-blue-600" />
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Track performance, analyze trends, and generate insights
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <ReportStatsMetrics />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Sales Chart */}
        <ReportMonthlySales />

        {/* Most Used Services */}
        <ReportDailySalesChart />
      </div>

      {/* Daily Sales & Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <ReportAverageRevenueChart />

        {/* Revenue by Service Type */}
        <ReportMostUsedServices />
      </div>
    </div>
  );
};

export default ReportsPage;
