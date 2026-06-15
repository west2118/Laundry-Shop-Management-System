import { useState } from "react";
import {
  Home,
  Package,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Menu,
  User,
  Activity,
  Workflow,
  CircuitBoard,
  Package2,
  LogOut,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { api, removeAccessToken } from "../lib/axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate()
  const { user, clearUser } = useUserStore();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      clearUser();
      removeAccessToken();
      navigate("/login")
      toast.success("Logged out successfully");
    }
  };

  const navClass = (isActive: boolean) =>
    `flex items-center px-4 py-3 rounded-lg transition
  ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`;

  const navItems = [
    { label: "Dashboard", icon: Home, to: `/${user?.role || "admin"}`, end: true, adminOnly: true },
    { label: "Boards", icon: Package2, to: "orders-board", adminOnly: false },
    { label: "Orders", icon: Package, to: "orders", adminOnly: true },
    { label: "Customers", icon: Users, to: "customers", adminOnly: true },
    { label: "Services", icon: Workflow, to: "services", adminOnly: true },
    { label: "Users", icon: User, to: "users", adminOnly: true },
    { label: "Reports", icon: BarChart3, to: "reports", adminOnly: true },
  ];

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Loading...";

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-700">LaundryPro</h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {!user ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center px-4 py-3 rounded-lg bg-gray-100 animate-pulse"
                >
                  <div className="w-5 h-5 bg-gray-50 rounded mr-3"></div>
                  <div className="h-4 bg-gray-50 rounded w-24"></div>
                </div>
              ))
            ) : (
              navItems.map(({ label, icon: Icon, to, end, adminOnly }) => {
                if (adminOnly && user?.role !== "admin") return null;

                return (
                  <NavLink
                    key={label}
                    to={to}
                    end={end}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => navClass(isActive)}>
                    <Icon className="mr-3 h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </NavLink>
                );
              })
            )}
          </nav>
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center overflow-hidden mr-2">
              <div className="shrink-0">
                {user ? (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    <User className="h-5 w-5" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
                )}
              </div>
              <div className="ml-3 truncate">
                {user ? (
                  <>
                    <p className="text-sm font-medium text-gray-700 truncate">{fullName}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 shrink-0 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar toggle (hidden on desktop) */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-700">LaundryPro</h1>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-700">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
