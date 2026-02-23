import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdmin = () => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  const { user, loading } = useSelector((state) => state.auth);

  const viewerAllowedRoutes = [
    "/admin",
    "/admin/orders",
    "/admin/users",
    "/admin/tables",
    "/admin/create/menu",
    "/admin/create/coupon",
  ];

  if (!accessToken) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  if (loading || !user) {
    return null; 
  }

  if (user.role !== "admin" && user.role !== "viewer") {
    return <Navigate to="/" replace />;
  }

  if (user.role === "viewer") {
    const isAllowed = viewerAllowedRoutes.some(
      (route) =>
        location.pathname === route ||
        (route === "/admin/orders" && location.pathname.startsWith("/admin/orders/")),
    );

    if (!isAllowed) {
      return <Navigate to="/admin" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedAdmin;
