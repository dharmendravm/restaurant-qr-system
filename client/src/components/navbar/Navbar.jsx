import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
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
  UserPlus,
} from "lucide-react";

import ThemeToggle from "@/components/shared/ThemeToggle";
import { BrandLogo } from "@/components/shared/BrandLogo";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { success, error } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      localStorage.clear();
      dispatch(logout());
      success("Logged out", "You have been signed out.");
      navigate("/login");
    } catch (err) {
      console.error("Error during logout:", err);
      error("Logout failed", "Please try again.");
    }
  };

  const displayName = user?.name || "Guest";
  const displayRole = user?.role || "customer";
  const displayEmail = user?.email || "No email";

  const scrollToMenu = () => {
    const el = document.getElementById("menu-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  const isLoggedInUser = user?.role === "admin" || user?.role === "customer";
  const isGuest = !isLoggedInUser;

  return (
    <header className="sticky top-0 z-40 flex justify-center w-full">
      <nav className="w-full md:w-full rounded-b-md bg-blend-color backdrop-blur-xl px-4 md:px-6 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3 group select-none">
            {/* Logo box */}
            <BrandLogo />

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
                className="flex items-center gap-2 rounded-full px-3 py-1 text-text-main hover:bg-hover hover:text-brand-main transition border border-border"
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
                  to="/admin"
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-card-bg animate-pulse text-text-accent 
                  hover:text-admin ease-in delay-150 duration-300 transition-all"
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
              className="cursor-pointer md:hidden text-text-main hover:text-brand-main transition-colors"
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
                className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-bg border border-border shadow-sm"
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
                  className={` w-4 h-4 text-text-muted transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileOpen && (
                <>
                  {/* Backdrop */}
                  <button
                    className="fixed inset-0 z-10 cursor-default"
                    onClick={() => setIsProfileOpen(false)}
                    aria-hidden="true"
                  />

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-4 w-64 z-20 bg-card-bg border border-border rounded-2xl shadow-2xl">
                    {/* Header */}
                    <div className="p-4 border-b border-border">
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

                    {/* Actions */}
                    <div className="p-2">
                      {isLoggedInUser ? (
                        <Link
                          to="/user/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-brand-main hover:bg-hover rounded-xl transition"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                      ) : (
                        <Link
                          to="/register"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-text-main hover:bg-hover rounded-xl transition"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Register Now</span>
                        </Link>
                      )}

                      {isGuest && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileOpen(false);
                            handleLogout();
                          }}
                          className="mt-1 w-full flex items-center gap-2 px-3 py-2 text-[12px] text-danger hover:bg-hover rounded-xl transition"
                        >
                          <X className="w-4 h-4" />
                          <span>destroy session</span>
                        </button>
                      )}
                      {isLoggedInUser && (
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
                      )}
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
                className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-app-bg text-text-main"
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
  );
};

export default Navbar;

const MenuItem = ({ icon: Icon, label, to, active }) => {
  const base = "flex items-center gap-3 px-4 py-2 text-sm transition";

  const activeStyle = "bg-hover text-text-main relative";

  const inactiveStyle = "text-text-muted hover:bg-hover";

  const content = (
    <div className={`${base} ${active ? activeStyle : inactiveStyle}`}>
      {active && (
        <span className="absolute left-0 h-full w-0.75 bg-brand-main rounded-r" />
      )}
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
};
