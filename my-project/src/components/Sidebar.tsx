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
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const navClass = (isActive: boolean) =>
    `flex items-center px-4 py-3 rounded-lg transition
  ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`;

  const navItems = [
    { label: "Dashboard", icon: Home, to: "/admin", end: true },
    { label: "Boards", icon: Package2, to: "orders-board" },
    { label: "Orders", icon: Package, to: "orders" },
    { label: "Customers", icon: Users, to: "customers" },
    { label: "Services", icon: Workflow, to: "services" },
    { label: "Reports", icon: BarChart3, to: "reports" },
  ];

  return (
    <>
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-700">LaundryPro</h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {navItems.map(({ label, icon: Icon, to, end }) => (
              <NavLink
                key={label}
                to={to}
                end={end}
                className={({ isActive }) => navClass(isActive)}>
                <Icon className="mr-3 h-5 w-5" />
                <span className="font-medium">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                <User className="h-5 w-5" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">admin@laundrypro.com</p>
            </div>
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
          <button className="p-2 rounded-md text-gray-700">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
