import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

import ProtectedRoutes from "@/routes/ProtectedRoutes";
import HomePage from "@/pages/HomePage";
import Welcome from "@/pages/Welcome";
import AuthenticatedLayout from "@/layout/AuthenticatedLayout";
import AdminRoute from "@/routes/AdminRoute";
import AdminMenu from "@/pages/admin/AdminMenu";
import UserProfile from "./pages/UserProfile";
import ForceDarkPages from "./routes/ForceDarkPages";
import CartPage from "./pages/CartPage/CartPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";


function App() {
  return (
    <div className="bg-background min-h-screen">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/welcome"
            element={
              <ForceDarkPages>
                <Welcome />
              </ForceDarkPages>
            }
          />
          <Route
            path="/login"
            element={
              <ForceDarkPages>
                <Login />
              </ForceDarkPages>
            }
          />
          <Route
            path="/register"
            element={
              <ForceDarkPages>
                <Register />
              </ForceDarkPages>
            }
          />
          {/* User Forgot Password */}
          <Route
            path="/recovery"
            element={
              <ForceDarkPages>
                <ForgotPassword />
              </ForceDarkPages>
            }
          />
          {/* User reset Password */}
          <Route
            path="/reset-password/:token"
            element={
              <ForceDarkPages>
                <ResetPassword />
              </ForceDarkPages>
            }
          />

          {/* Protected Routes with main app layout */}
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <AuthenticatedLayout>
                  <HomePage />
                </AuthenticatedLayout>
              </ProtectedRoutes>
            }
          />

          {/* User Profile */}
          <Route
            path="/user/profile"
            element={
              <ProtectedRoutes>
                <AuthenticatedLayout>
                  <UserProfile />
                </AuthenticatedLayout>
              </ProtectedRoutes>
            }
          />

          {/* User Cart */}
          <Route
            path="/user/cart"
            element={
              <ProtectedRoutes>
                <AuthenticatedLayout>
                  <CartPage />
                </AuthenticatedLayout>
              </ProtectedRoutes>
            }
          />
          {/* Admin dashboard */}
          <Route
            path="/admin/menu"
            element={
              <AdminRoute>
                <AuthenticatedLayout>
                  <AdminMenu />
                </AuthenticatedLayout>
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
