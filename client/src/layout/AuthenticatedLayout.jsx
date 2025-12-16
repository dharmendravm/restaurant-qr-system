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
  Cookie,
  UtensilsCrossed,
  Shield,
  ChefHat,
  ShoppingCart,
} from "lucide-react";
import AppFooter from "../components/Footer";

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
    document.getElementById("menu-section").scrollIntoView({
      behavior: "smooth",
    });
  };
  // FAF7F3
  return (
    <div className="min-h-screen bg-[#f5e3cb] text-[#1f2933]">
      {/* background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex justify-center w-full">
        <nav className="w-full md:w-full rounded-b-md bg-blend-color backdrop-blur-xl px-4 md:px-6 py-2">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-2 sm:gap-3 group select-none">
              <div className="  w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12  rounded-xl sm:rounded-2xl  bg-linear-to-br from-orange-500/70 to-yellow-400/10 border border-orange-300 hover:border-amber-500  backdrop-blur-md flex items-center justify-center transition-all duration-200">
                <ChefHat className="text-amber-900 w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </div>
              <div className="leading-tight">
                <h2 className="font-extrabold tracking-wide text-[#f97316] text-base sm:text-xl lg:text ">
                  TableOrbit
                </h2>

                <p className="uppercase tracking-widest text-[7px] sm:text-[9px] lg:text-[10px] text-[#4d433d] ">
                  Restaurant Management
                </p>
              </div>
            </div>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-6 text-[12px] font-semibold">
              <li>
                <Link
                  to="/"
                  className="flex items-center text-gray-900 gap-2 rounded-full px-3 py-1 hover:bg-amber-500 hover:text-white hover:shadow-md transition-all"
                >
                  <Home className="w-5 h-5 " />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={scrollToMenu}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 text-gray-900 hover:bg-orange-400 hover:text-white hover:shadow-md transition-all"
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  Menu
                </Link>
              </li>

              {displayRole === "admin" && (
                <li>
                  <Link
                    to="/admin/menu"
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-amber-600 text-white hover:bg-emerald-600 hover:shadow-md transition-all"
                  >
                    <Shield className="w-5 h-5" />
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            {/*Cart + Profile + mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Cart  */}
              <Link to="/user/cart" className="flex gap-6">
                <ShoppingCart />
              </Link>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-800 hover:text-black transition-colors"
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
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-gray-800 shadow-sm hover:bg-amber-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shadow">
                    <User className="w-4 h-4 text-white" />
                  </div>

                  <div className="text-left leading-tight">
                    <p className="text-[11px] font-semibold text-gray-900 line-clamp-1">
                      {displayName}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-gray-600 line-clamp-1">
                      {displayRole}
                    </p>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
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
                    <div className="absolute right-0 mt-4 w-64 bg-white border border-amber-200 rounded-2xl shadow-2xl backdrop-blur-xl z-20 overflow-hidden">
                      <div className="p-4 border-b border-amber-200 bg-white">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {displayName}
                        </p>
                        <p className="text-[11px] text-gray-500 line-clamp-1">
                          {displayEmail}
                        </p>
                        <p className="mt-1 text-[9px] uppercase tracking-wide text-orange-600">
                          {displayRole}
                        </p>
                      </div>

                      <div className="p-2">
                        <Link
                          to="/user/profile"
                          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-orange-600 hover:bg-orange-100 hover:text-orange-700 rounded-xl transition-colors"
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
                          className="mt-1 w-full flex items-center gap-2 px-3 py-2 text-[12px] text-rose-600 hover:bg-rose-100 rounded-xl transition-colors"
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
            <div className="md:hidden mt-3 border-t border-amber-200 pt-3 space-y-2 text-sm">
              <Link
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center text-gray-900 gap-2 rounded-full px-3 py-1 hover:bg-amber-100 transition-colors"
              >
                <Home className="w-5 h-5 " />
                Home
              </Link>

              <Link
                onClick={() => {
                  scrollToMenu();
                  setIsMobileOpen(false);
                }}
                className="flex items-center text-gray-900 gap-2 rounded-full px-3 py-1 hover:bg-orange-100 transition-colors"
              >
                <UtensilsCrossed className="w-5 h-5 " />
                Menu
              </Link>

              {displayRole === "admin" && (
                <Link
                  to="/admin/menu"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center text-gray-900 gap-2 rounded-full px-3 py-1 hover:bg-emerald-100 transition-colors"
                >
                  <Shield className="w-5 h-5 " />
                  Admin
                </Link>
              )}

              <Link
                to="/user/profile"
                className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-rose-600 hover:bg-rose-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Page content */}
      <main className="pt-15 pb-10 px-4 flex justify-center ">
        <div className="w-full max-w-6xl">{children || <Outlet />}</div>
      </main>
      <AppFooter />
    </div>
  );
};

export default AuthenticatedLayout;
