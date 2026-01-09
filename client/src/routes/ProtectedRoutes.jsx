import { getUserThunk } from "@/store/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const accessToken = localStorage.getItem("accessToken");
  const sessionToken = localStorage.getItem("sessionToken");

  // const { accessToken } = useSelector((s) => s.auth);
  const { user } = useSelector((s) => s.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) return;
    if (!user) {
      dispatch(getUserThunk());
    }
  }, [accessToken, user, dispatch]);

  if (!accessToken && !sessionToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
