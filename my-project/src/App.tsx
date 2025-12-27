import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LaundryDashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Customers from "./pages/Customers";
import OrdersPage from "./pages/Orders";
import ServicesPage from "./pages/Services";
import ReportsPage from "./pages/Reports";
import RegisterPage from "./pages/Register";
import { useSyncInfo } from "./hooks/useSyncInfo";
import OrdersBoardPage from "./pages/OrdersBoard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/admin" element={<Layout />}>
        <Route index element={<LaundryDashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="orders-board" element={<OrdersBoardPage />} />
      </Route>

      <Route path="/">
        <Route path="register" element={<RegisterPage />} />
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
