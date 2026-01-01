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
import ReportRevenueChart from "../components/Reports/ReportRevenueChart";
import axios from "axios";
import { useUserStore } from "../stores/useUserStore";
import { useQuery } from "@tanstack/react-query";

const ReportsPage = () => {
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading, error } = useQuery({
    queryKey: ["report-data"],
    queryFn: async () => {
      if (!token) return null;

      const [yearlySalesRes, dailySalesRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/order-yearly-sales", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/order-daily-sales", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      return {
        yearlySales: yearlySalesRes.data,
        dailySales: dailySalesRes.data,
      };
    },
    enabled: !!token,
  });

  console.log("Yearly Data: ", data?.yearlySales);
  console.log("Daily Data: ", data?.dailySales);

  // Monthly sales data
  const monthlySalesData = [
    { month: "Jan", revenue: 4250, orders: 142, avgOrder: 29.93 },
    { month: "Feb", revenue: 5120, orders: 168, avgOrder: 30.48 },
    { month: "Mar", revenue: 4890, orders: 156, avgOrder: 31.35 },
    { month: "Apr", revenue: 5670, orders: 189, avgOrder: 30.0 },
    { month: "May", revenue: 6230, orders: 198, avgOrder: 31.46 },
    { month: "Jun", revenue: 5890, orders: 185, avgOrder: 31.84 },
    { month: "Jul", revenue: 6540, orders: 210, avgOrder: 31.14 },
    { month: "Aug", revenue: 7120, orders: 225, avgOrder: 31.64 },
    { month: "Sep", revenue: 6890, orders: 218, avgOrder: 31.61 },
    { month: "Oct", revenue: 8245, orders: 256, avgOrder: 32.21 },
    { month: "Nov", revenue: 7450, orders: 234, avgOrder: 31.84 },
    { month: "Dec", revenue: 8120, orders: 248, avgOrder: 32.74 },
  ];

  // Daily sales data (last 7 days)
  const dailySalesData = [
    { day: "Mon", revenue: 420, orders: 18, avgOrder: 23.33 },
    { day: "Tue", revenue: 580, orders: 24, avgOrder: 24.17 },
    { day: "Wed", revenue: 510, orders: 21, avgOrder: 24.29 },
    { day: "Thu", revenue: 690, orders: 28, avgOrder: 24.64 },
    { day: "Fri", revenue: 820, orders: 35, avgOrder: 23.43 },
    { day: "Sat", revenue: 950, orders: 42, avgOrder: 22.62 },
    { day: "Sun", revenue: 720, orders: 31, avgOrder: 23.23 },
  ];

  // Most used services data
  const serviceUsageData = [
    { name: "Wash & Fold", value: 156, color: "#3B82F6", revenue: "$1,872.00" },
    { name: "Dry Clean", value: 89, color: "#10B981", revenue: "$756.50" },
    { name: "Wash & Iron", value: 74, color: "#8B5CF6", revenue: "$1,110.00" },
    { name: "Express", value: 42, color: "#F59E0B", revenue: "$1,050.00" },
    { name: "Steam Iron", value: 31, color: "#EF4444", revenue: "$155.00" },
  ];

  // Customer statistics
  const customerStats = [
    {
      title: "Total Customers",
      value: "142",
      change: "+8.4%",
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Repeat Rate",
      value: "68.5%",
      change: "+3.2%",
      icon: <RefreshCw className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Avg Order Value",
      value: "$32.21",
      change: "+5.7%",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Monthly Growth",
      value: "12.8%",
      change: "+1.5%",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  // Revenue by service type
  const revenueByService = [
    {
      service: "Wash & Fold",
      revenue: 1872,
      percentage: 32.5,
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      service: "Wash & Iron",
      revenue: 1110,
      percentage: 19.3,
      icon: <Thermometer className="h-4 w-4" />,
    },
    {
      service: "Dry Clean",
      revenue: 756,
      percentage: 13.1,
      icon: <Wind className="h-4 w-4" />,
    },
    {
      service: "Express",
      revenue: 1050,
      percentage: 18.2,
      icon: <Zap className="h-4 w-4" />,
    },
    {
      service: "Other",
      revenue: 968,
      percentage: 16.9,
      icon: <Package className="h-4 w-4" />,
    },
  ];

  // Top performing days
  const topDays = [
    { date: "2023-10-15", revenue: "$950", orders: 42, day: "Saturday" },
    { date: "2023-10-14", revenue: "$820", orders: 35, day: "Friday" },
    { date: "2023-10-08", revenue: "$780", orders: 33, day: "Sunday" },
    { date: "2023-10-07", revenue: "$760", orders: 32, day: "Saturday" },
  ];

  // Custom tooltip for charts
  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
  //         <p className="font-medium text-gray-900">{label}</p>
  //         {payload.map((entry, index) => (
  //           <p key={index} className="text-sm" style={{ color: entry.color }}>
  //             {entry.name}:{" "}
  //             {entry.name.includes("$") ? `$${entry.value}` : entry.value}
  //           </p>
  //         ))}
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
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
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {customerStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${
                    stat.color.split(" ")[0]
                  } rounded-lg flex items-center justify-center`}>
                  <div className={stat.color.split(" ")[1]}>{stat.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Sales Chart */}
        <ReportMonthlySales monthlySalesData={monthlySalesData} />

        {/* Most Used Services */}
        <ReportDailySalesChart dailySalesData={dailySalesData} />
      </div>

      {/* Daily Sales & Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <ReportRevenueChart />

        {/* Revenue by Service Type */}
        <ReportMostUsedServices serviceUsageData={serviceUsageData} />
      </div>
    </div>
  );
};

export default ReportsPage;
