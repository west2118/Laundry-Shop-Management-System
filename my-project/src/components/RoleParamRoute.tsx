import { Navigate, Outlet, useParams } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { Loader } from "lucide-react";

const RoleParamRoute = () => {
  const { role } = useParams<{ role: string }>();
  const { user } = useUserStore();

  if (!user) {
    return <Outlet />;
  }

  if (user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <Outlet />;
};

export default RoleParamRoute;
