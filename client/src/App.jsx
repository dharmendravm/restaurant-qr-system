import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "@/pages/user/Welcome";
import Login from "@/pages/user/auth/Login";
import Register from "@/pages/user/auth/Register";
import ForgotPassword from "./pages/user/auth/ForgotPassword";
import ResetPassword from "./pages/user/auth/ResetPassword";

import ProtectedRoutes from "@/routes/ProtectedRoutes";
import ForceDarkPages from "./routes/ForceDarkPages";

import AuthenticatedLayout from "@/layout/AuthenticatedLayout";
import HomePage from "@/pages/user/HomePage";
import CartPage from "./pages/user/Cart/CartPage";
import UserProfile from "./pages/user/UserProfile";

function App() {
  return (
    <div className="bg-background min-h-screen">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<ForceDarkPages />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recovery" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          {/* Protected Routes with main app layout */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/cart" element={<CartPage />} />
            </Route>
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
