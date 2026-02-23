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
  Search,
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
  const isLoggedInUser =
    user?.role === "admin" || user?.role === "viewer" || user?.role === "customer";
  const isGuest = !isLoggedInUser;
  const canAccessAdmin = displayRole === "admin" || displayRole === "viewer";

  return (
    <header className="sticky top-0 z-40 flex justify-center w-full">
      <nav className="w-full md:w-full rounded-b-md bg-card-bg border-b border-border px-4 md:px-6 py-1">
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
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-bg" />
              <input
                type="text"
                placeholder="Search menu items..."
                // value={localSearchQuery}
                // onChange={handleSearchChange}
                className="w-full pl-8 pr-4 py-1 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-gray-600 transition-colors placeholder:ml-3"
              />
              {/* {localSearchQuery && (
                  <button
                    // onClick={() => {
                    //   setLocalSearchQuery('');
                    //   dispatch(setSearchQuery(''));
                    // }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )} */}
            </div>
          </div>

          {/*Cart + theme + Profile + mobile toggle */}
          <div className="flex items-center gap-3">
            {canAccessAdmin && (
              <Link
                to="/admin"
                className="hidden md:inline-flex relative items-center gap-2 rounded-full border border-brand-main/40 bg-brand-main/10 px-3 py-1 text-[11px] font-semibold text-brand-main shadow-sm transition hover:bg-brand-main hover:text-white"
                title="Open admin panel"
              >
                <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-brand-main animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-brand-main" />
                <span>Notice: Admin Panel</span>
              </Link>
            )}

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
                      {isLoggedInUser && displayRole !== "viewer" ? (
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
                      {canAccessAdmin && (
                        <li>
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileOpen(false)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-text-main hover:bg-hover rounded-xl transition"
                          >
                            <Shield className="w-4 h-4" />
                            <span>Admin Panel</span>
                          </Link>
                        </li>
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

            {canAccessAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMobileOpen(false)}
                className="relative flex items-center gap-2 rounded-full border border-brand-main/40 bg-brand-main/10 px-3 py-1.5 text-brand-main"
              >
                <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-brand-main animate-ping" />
                <Shield className="w-5 h-5 " />
                Notice: Admin Panel
              </Link>
            )}

            {displayRole !== "viewer" && (
              <Link
                to="/user/profile"
                className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-text-main hover:bg-hover transition"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            )}

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

const MenuItem = ({ label, to, active }) => {
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
