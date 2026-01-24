import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routesConfig } from "./routes/config";

// Layouts & Guards
import PageSkeleton from "./components/shared/skeletons/PageSkeleton";
const NotFound = lazy(() => import('@/components/ui/NotFound'))
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import ProtectedAdmin from "./routes/ProtectedAdmin";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import AdminLayout from "./layouts/AdminLayout";
import ForceDarkPages from "./routes/ForceDarkPages";

// Simple Loading Component
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center">Loading...</div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          {/* 1. PUBLIC ROUTES */}
          <Route element={<ForceDarkPages />}>
            {routesConfig.public.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* 2. USER PROTECTED ROUTES */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<AuthenticatedLayout />}>
              {routesConfig.user.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Route>

          {/* 3. ADMIN PROTECTED ROUTES */}
          <Route element={<ProtectedAdmin />}>
            <Route element={<AdminLayout />}>
              {routesConfig.admin.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Route>

          {/* 4. FALLBACK */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
