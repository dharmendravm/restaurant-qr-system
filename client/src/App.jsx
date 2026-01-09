import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "@/pages/user/Welcome";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import ProtectedRoutes from "@/routes/ProtectedRoutes";
import ForceDarkPages from "./routes/ForceDarkPages";

import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import HomePage from "@/pages/user/HomePage";
import CartPage from "./pages/Cart/CartPage";
import UserProfile from "./pages/user/UserProfile";

import ProtectedAdmin from "./routes/ProtectedAdmin";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import UsersPage from "./pages/admin/users/UserPage";
import TablesPage from "./pages/admin/tables/TablesPage";
import Users from "./pages/admin/orders/Orders";
import Checkout from "./pages/order/CheckOutPage";
import Orders from "./pages/admin/orders/Orders";
import OrderSuccess from "./pages/order/OrderSuccessPage";
import OrderDetails from "./pages/order/OrderDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<ForceDarkPages />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recovery" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/users" element={<Users />} />
          </Route>

          {/* Protected Routes with main app layout */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/cart" element={<CartPage />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/order-success/:orderId"
                element={<OrderSuccess />}
              />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
            </Route>
          </Route>

          <Route element={<ProtectedAdmin />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/tables" element={<TablesPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
