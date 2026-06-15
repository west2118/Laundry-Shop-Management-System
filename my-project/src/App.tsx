import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LaundryDashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Customers from "./pages/Customers";
import OrdersPage from "./pages/Orders";
import ServicesPage from "./pages/Services";
import ReportsPage from "./pages/Reports";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import { useSyncInfo } from "./hooks/useSyncInfo";
import OrdersBoardPage from "./pages/OrdersBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import UsersPage from "./pages/Users";
import RoleRoute from "./components/RoleRoute";
import RoleParamRoute from "./components/RoleParamRoute";
import POSPage from "./pages/POS";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleParamRoute />}>
          <Route path="/:role" element={<Layout />}>
            <Route element={<RoleRoute allowedRoles={["admin", "staff"]} />}>
              <Route path="orders-board" element={<OrdersBoardPage />} />
              <Route path="pos" element={<POSPage />} />
            </Route>

            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route index element={<LaundryDashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="/">
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </>
  )
);

const App = () => {
  useSyncInfo();

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
