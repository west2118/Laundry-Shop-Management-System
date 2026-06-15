import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex max-h-screen bg-white">
      {/* Mobile Overlay */}
      <Sidebar />

      <div className="flex-1 overflow-auto min-h-screen pt-16 md:pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
