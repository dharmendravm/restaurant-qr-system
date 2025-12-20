import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useToast } from "@/components/ui/toast";
import {
  Menu as MenuIcon,
  X,
  User,
  LogOut,
  ChevronDown,
  Home,
  UtensilsCrossed,
  Shield,
  ShoppingCart,
} from "lucide-react";
import AppFooter from "../components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";

const AuthenticatedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const { name, email, role } = useSelector((state) => state.auth);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.clear();
      dispatch(logout());
      success("Logged out", "You have been signed out.");
      navigate("/login");
    } catch (err) {
      toastError("Logout failed", "Please try again.");
    }
  };

  const displayName = name || "Guest";
  const displayRole = role || "customer";
  const displayEmail = email || "No email";

  const scrollToMenu = () => {
    const el = document.getElementById("menu-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // FAF7F3
  return (
    <div className="min-h-screen bg-app-bg text-text-main">
      {/* background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-24 h-72 w-72 rounded-full bg-brand-soft/40 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-brand-main/20 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex justify-center w-full">
        <nav className="w-full md:w-full rounded-b-md bg-blend-color backdrop-blur-xl px-4 md:px-6 py-2">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-2 sm:gap-3 group select-none">
              {/* Logo box */}
              <BrandLogo/>

              {/* Text */}
              <div className="leading-tight">
                <h2 className="font-extrabold tracking-wide text-heading text-base sm:text-xl">
                  TableOrbit
                </h2>

                <p className="uppercase tracking-widest text-[7px] sm:text-[9px] lg:text-[10px] text-subtitle">
                  Restaurant Management
                </p>
              </div>
            </div>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-6 text-[12px] font-semibold">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 rounded-full px-3 py-1 text-text-main hover:bg-hover hover:text-brand-main transition"
                >
                  <Home className="w-5 h-5 " />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={scrollToMenu}
                  className="flex items-center gap-2 rounded-full px-3 py-1 text-text-main hover:bg-hover hover:text-brand-main transition"
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  Menu
                </Link>
              </li>

              {displayRole === "admin" && (
                <li>
                  <Link
                    to="/admin/menu"
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-admin text-white"
                  >
                    <Shield className="w-5 h-5" />
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            {/*Cart + theme + Profile + mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle  */}
              <div className="mr-2 flex justify-end">
                <ThemeToggle />
              </div>

              {/* Cart  */}
              <Link to="/user/cart" className="flex gap-6">
                <ShoppingCart className="text-text-main hover:text-brand-main transition" />
              </Link>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-text-main hover:text-brand-main transition-colors"
                onClick={() => setIsMobileOpen((p) => !p)}
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>

              {/* Desktop profile dropdown */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsProfileOpen((p) => !p)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg border border-border shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-main flex items-center justify-center shadow">
                    <User className="w-4 h-4 text-white" />
                  </div>

                  <div className="text-left leading-tight">
                    <p className="text-[11px] font-semibold text-text-main line-clamp-1">
                      {displayName}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-text-muted line-clamp-1">
                      {displayRole}
                    </p>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-text-muted transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <>
                    <button
                      className="fixed inset-0 z-10 cursor-default"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-4 w-64 bg-card-bg border border-border rounded-2xl shadow-2xl">
                      <div className="p-4 border-b border-border bg-card-bg">
                        <p className="text-sm font-semibold text-text-main line-clamp-1">
                          {displayName}
                        </p>
                        <p className="text-[11px] text-text-muted line-clamp-1">
                          {displayEmail}
                        </p>
                        <p className="mt-1 text-[9px] uppercase tracking-wide text-brand-main">
                          {displayRole}
                        </p>
                      </div>

                      <div className="p-2">
                        <Link
                          to="/user/profile"
                          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-brand-main hover:bg-hover rounded-xl transition"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileOpen(false);
                            handleLogout();
                          }}
                          className="mt-1 w-full flex items-center gap-2 px-3 py-2 text-[12px] text-danger hover:bg-hover rounded-xl transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile nav panel */}
          {isMobileOpen && (
            <div className="md:hidden mt-3 border-t border-border pt-3 space-y-2 text-sm">
              <Link
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-2 rounded-full px-3 py-1 text-text-main hover:text-brand-main transition"
              >
                <Home className="w-5 h-5 " />
                Home
              </Link>

              <Link
                onClick={() => {
                  scrollToMenu();
                  setIsMobileOpen(false);
                }}
                className="flex items-center gap-2 rounded-full px-3 py-1 text-text-main hover:text-brand-main transition"
              >
                <UtensilsCrossed className="w-5 h-5 " />
                Menu
              </Link>

              {displayRole === "admin" && (
                <Link
                  to="/admin/menu"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-admin text-white"
                >
                  <Shield className="w-5 h-5 " />
                  Admin
                </Link>
              )}

              <Link
                to="/user/profile"
                className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-text-main hover:bg-hover transition"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-danger hover:bg-hover transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Page content */}
      <main className="pt-14 pb-10 px-4 flex justify-center ">
        <div className="w-full max-w-6xl">{children || <Outlet />}</div>
      </main>
      <AppFooter />
    </div>
  );
};

export default AuthenticatedLayout;
