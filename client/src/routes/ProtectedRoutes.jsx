import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const accessToken = localStorage.getItem("accessToken");
  const sessionToken = localStorage.getItem("sessionToken");
  

  if (!accessToken && !sessionToken) {
    return <Navigate to="/login" replace/>;
  }

  return <Outlet />
};

export default ProtectedRoutes;
