import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { Loader } from "lucide-react";
import { getAccessToken } from "../lib/axios";

const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useUserStore();
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Outlet />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/orders-board`} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
