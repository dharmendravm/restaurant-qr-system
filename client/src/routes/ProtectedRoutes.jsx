import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const sessionToken = localStorage.getItem("sessionToken");

  if (!accessToken && !sessionToken) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoutes;
