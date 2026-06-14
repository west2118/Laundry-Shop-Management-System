import { BarChart3, Download, Calendar } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ReportMostUsedServices from "../components/Reports/ReportMostUsedServices";
import ReportStatsMetrics from "../components/Reports/ReportStatsMetrics";
import ReportRevenueOrdersChart from "../components/Reports/ReportRevenueOrdersChart";

const ReportsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const now = new Date();
  const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1)
    .toLocaleDateString("en-CA");
  const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toLocaleDateString("en-CA");

  const startDate = searchParams.get("startDate") || defaultStart;
  const endDate = searchParams.get("endDate") || defaultEnd;

  const handleDateChange = (type: "startDate" | "endDate", value: string) => {
    setSearchParams(
      (prev) => {
        prev.set(type, value);
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <BarChart3 className="mr-2 h-7 w-7 text-blue-600" />
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Track performance, analyze trends, and generate insights
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 items-center">
          {/* Date Range Picker */}
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange("startDate", e.target.value)}
              className="text-sm border-none focus:ring-0 text-gray-700 bg-transparent"
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => handleDateChange("endDate", e.target.value)}
              className="text-sm border-none focus:ring-0 text-gray-700 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <ReportStatsMetrics startDate={startDate} endDate={endDate} />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Revenue and Orders Chart */}
        <ReportRevenueOrdersChart startDate={startDate} endDate={endDate} />

        {/* Most Used Services */}
        <ReportMostUsedServices startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default ReportsPage;
