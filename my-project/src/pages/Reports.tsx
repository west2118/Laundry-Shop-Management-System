import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Calendar,
  Download,
  ChevronDown,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Zap,
  Sparkles,
  Wind,
  Thermometer,
  RefreshCw,
} from "lucide-react";
import ReportMonthlySales from "../components/Reports/ReportMonthlySales";
import ReportMostUsedServices from "../components/Reports/ReportMostUsedServices";
import ReportDailySalesChart from "../components/Reports/ReportDailySalesChart";
import axios from "axios";
import { useUserStore } from "../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";
import ReportStatsMetrics from "../components/Reports/ReportStatsMetrics";
import ReportAverageRevenueChart from "../components/Reports/ReportAverageRevenueChart";

const ReportsPage = () => {
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading, error } = useQuery({
    queryKey: ["report-data"],
    queryFn: async () => {
      if (!token) return null;

      const [
        reportStatsRes,
        monthlySalesRes,
        dailySalesRes,
        averageRevenueRes,
        orderMostRes,
      ] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/order-report-sales", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/order-monthly-sales", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/order-daily-sales", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/order-average-revenue", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/order-most-services", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      return {
        reportStats: reportStatsRes.data,
        monthlySales: monthlySalesRes.data,
        dailySales: dailySalesRes.data,
        averageRevenue: averageRevenueRes.data,
        orderMost: orderMostRes.data,
      };
    },
    enabled: !!token,
  });

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
        <ReportStatsMetrics reportStats={data?.reportStats} />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Sales Chart */}
        <ReportMonthlySales monthlySalesData={data?.monthlySales} />

        {/* Most Used Services */}
        <ReportDailySalesChart dailySalesData={data?.dailySales} />
      </div>

      {/* Daily Sales & Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <ReportAverageRevenueChart averageRevenueData={data?.averageRevenue} />

        {/* Revenue by Service Type */}
        <ReportMostUsedServices serviceUsageData={data?.orderMost} />
      </div>
    </div>
  );
};

export default ReportsPage;
