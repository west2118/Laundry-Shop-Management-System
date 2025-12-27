import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Calendar,
  Download,
  Printer,
  Filter,
  MoreVertical,
  ChevronDown,
  Clock,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Activity,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  ShoppingBag,
  Zap,
  Sparkles,
  Wind,
  Thermometer,
  Star,
  ChevronRight,
  ChevronLeft,
  FileText,
  Eye,
  ExternalLink,
  RefreshCw,
  Target,
} from "lucide-react";

const ReportsPage = () => {
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
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name.includes("$") ? `$${entry.value}` : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Monthly Sales Overview
              </h2>
              <p className="text-gray-600 text-sm">
                Revenue and order trends for the year
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue ($)"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ stroke: "#10B981", strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-xl font-bold text-gray-900">$82,450</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-xl font-bold text-gray-900">2,561</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Most Used Services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Most Used Services
              </h2>
              <p className="text-gray-600 text-sm">
                Service popularity and revenue distribution
              </p>
            </div>
            <PieChartIcon className="h-6 w-6 text-purple-600" />
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value">
                  {serviceUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} orders`, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 space-y-3">
            {serviceUsageData.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: service.color }}
                  />
                  <span className="font-medium text-gray-900">
                    {service.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900">
                    {service.value} orders
                  </span>
                  <span className="text-sm text-gray-500 block">
                    {service.revenue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Sales & Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Daily Sales Performance
              </h2>
              <p className="text-gray-600 text-sm">
                Last 7 days revenue and order trends
              </p>
            </div>
            <LineChartIcon className="h-6 w-6 text-green-600" />
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="revenue"
                  name="Revenue ($)"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="orders"
                  name="Orders"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Summary</p>
                <p className="text-sm text-gray-600">Oct 9 - Oct 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$4,690</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.5% from last week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue by Service Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Revenue by Service Type
              </h2>
              <p className="text-gray-600 text-sm">
                Monthly revenue distribution
              </p>
            </div>
            <Activity className="h-6 w-6 text-blue-600" />
          </div>

          <div className="space-y-4">
            {revenueByService.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <div className="text-gray-600">{service.icon}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {service.service}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        ${service.revenue}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">
                    {service.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Total Revenue</p>
                <p className="text-sm text-gray-600">October 2023</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$5,756</p>
                <p className="text-sm text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.3% from last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Days & Quick Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Top Performing Days */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Top Performing Days
              </h2>
              <p className="text-gray-600 text-sm">
                Highest revenue days this month
              </p>
            </div>
            <Star className="h-6 w-6 text-yellow-600" />
          </div>

          <div className="space-y-4">
            {topDays.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{day.day}</p>
                    <p className="text-sm text-gray-500">{day.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{day.revenue}</p>
                  <p className="text-sm text-gray-500">{day.orders} orders</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-gray-900">Daily Target</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">$750</p>
                <p className="text-sm text-green-600">Achieved 4 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reports & Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Quick Reports</h2>
              <p className="text-gray-600 text-sm">
                Generate and export reports
              </p>
            </div>
            <FileText className="h-6 w-6 text-blue-600" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Daily Report</span>
              <span className="text-sm text-gray-500">Today's summary</span>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-medium text-gray-900">Monthly Report</span>
              <span className="text-sm text-gray-500">Full month analysis</span>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">Customer Report</span>
              <span className="text-sm text-gray-500">Customer insights</span>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <span className="font-medium text-gray-900">Service Report</span>
              <span className="text-sm text-gray-500">Service performance</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Download className="h-5 w-5 text-gray-600 mr-3" />
                <span className="font-medium text-gray-900">
                  Export Options
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                  PDF
                </button>
                <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                  Excel
                </button>
                <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                  CSV
                </button>
              </div>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
              <Printer className="mr-2 h-4 w-4" />
              Print Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
