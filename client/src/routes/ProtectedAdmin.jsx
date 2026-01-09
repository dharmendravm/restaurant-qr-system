import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedAdmin = () => {
  const accessToken = localStorage.getItem("accessToken");

  const { user, loading } = useSelector((state) => state.auth);

  

  if (!accessToken) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  if (loading || !user) {
    return null; 
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdmin;
