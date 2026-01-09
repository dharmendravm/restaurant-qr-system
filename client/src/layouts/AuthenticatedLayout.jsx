import React from "react";
import { Outlet } from "react-router-dom";
import AppFooter from "../components/shared/Footer";
import Navbar from "@/components/navbar/Navbar";

const AuthenticatedLayout = () => {
    // const userRole = useSelector((state) => state.auth?.user?.role);

  return (
    <div className="min-h-screen bg-app-bg text-text-main">
      <Navbar />
      {/* Page content */}
      <main className="pt-14 pb-10 px-4 flex justify-center ">
        <div className="w-full max-w-6xl">
          {" "}
          <Outlet />
        </div>
      </main>
      <AppFooter />
    </div>
  );
};

export default AuthenticatedLayout;
