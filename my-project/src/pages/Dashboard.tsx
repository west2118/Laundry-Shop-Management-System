import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Home,
  Package,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
  User,
  Bell,
  Search,
  TrendingUp,
  Calendar,
  Clock,
  Truck,
  Plus,
  FileText,
  DollarSign,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ShoppingBag,
  Activity,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
} from "lucide-react";
import DashboardStatsSummary from "../components/Dashboard/DashboardStatsSummary";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../stores/useUserStore";
import axios from "axios";
import { WithSkeleton } from "../components/WithSkeleton";
import CardsSkeleton from "../components/SkeletonLoading/CardsSkeleton";

const LaundryDashboard = () => {
  const token = useUserStore((state) => state.userToken);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      if (!token) return null;

      const [ordersStatsRes, customersRes, servicesRes] = await Promise.all([
        axios.get("http://localhost:8080/api/v1/order-stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/customer", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8080/api/v1/service", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      return {
        ordersStats: ordersStatsRes.data,
        customers: customersRes.data,
        services: servicesRes.data,
      };
    },
    enabled: !!token,
  });

  console.log("Stats: ", data?.ordersStats);

  // Static data for recent orders
  const recentOrders = [
    {
      id: "ORD-1001",
      customer: "John Smith",
      status: "Ready",
      type: "Wash & Fold",
      date: "2023-10-15",
      amount: "$24.50",
    },
    {
      id: "ORD-1002",
      customer: "Emma Johnson",
      status: "Pending",
      type: "Dry Clean",
      date: "2023-10-15",
      amount: "$18.75",
    },
    {
      id: "ORD-1003",
      customer: "Michael Brown",
      status: "In Progress",
      type: "Wash & Iron",
      date: "2023-10-14",
      amount: "$32.00",
    },
  ];

  // Chart data
  const weeklyRevenueData = [
    { name: "Mon", revenue: 420, orders: 18 },
    { name: "Tue", revenue: 580, orders: 24 },
    { name: "Wed", revenue: 510, orders: 21 },
    { name: "Thu", revenue: 690, orders: 28 },
    { name: "Fri", revenue: 820, orders: 35 },
    { name: "Sat", revenue: 950, orders: 42 },
    { name: "Sun", revenue: 720, orders: 31 },
  ];

  const serviceTypeData = [
    { name: "Wash & Fold", value: 156, color: "#3B82F6" },
    { name: "Dry Clean", value: 89, color: "#10B981" },
    { name: "Wash & Iron", value: 74, color: "#8B5CF6" },
    { name: "Premium", value: 23, color: "#F59E0B" },
  ];

  const statusDistributionData = [
    { status: "Completed", value: 300, color: "#10B981" },
    { status: "In Progress", value: 24, color: "#3B82F6" },
    { status: "Pending", value: 18, color: "#F59E0B" },
  ];

  // Status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      Ready: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      "In Progress": "bg-blue-100 text-blue-800",
      "Picked Up": "bg-purple-100 text-purple-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

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
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <DashboardStatsSummary ordersStats={data?.ordersStats} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Weekly Revenue
                </h3>
                <p className="text-gray-600 text-sm">Last 7 days performance</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Revenue"]}
                    labelFormatter={(label) => `Day: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ stroke: "#3B82F6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Type Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Service Types
                </h3>
                <p className="text-gray-600 text-sm">Distribution by service</p>
              </div>
              <PieChartIcon className="h-5 w-5 text-purple-500" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value">
                    {serviceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} orders`, "Count"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders & Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Recent Orders
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Latest laundry orders and their status
                  </p>
                </div>
                <BarChartIcon className="h-5 w-5 text-blue-500" />
              </div>
            </div>

            {/* Responsive table container */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <span className="font-medium text-blue-600">
                          {order.id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">
                          {order.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.type}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {order.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <a
                href="#"
                className="text-blue-600 font-medium text-sm hover:text-blue-800 flex items-center">
                View all orders
                <TrendingUp className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Order Status</h3>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-4">
              {statusDistributionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700">{item.status}</span>
                  </div>
                  <span className="font-bold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="status" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2023 LaundryPro Management System. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LaundryDashboard;
