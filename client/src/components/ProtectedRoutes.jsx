import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoutes;
