import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useToast } from "@/components/ui/toast";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Menu as MenuIcon, X, User, LogOut, ChevronDown } from "lucide-react";


const AuthenticatedLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();

  const { name, email, role } = useSelector((state) => state.auth);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    try {
      dispatch(logout());
      success("Logged out", "You have been signed out.");
      navigate("/login");
    } catch (err) {
      toastError("Logout failed", "Please try again.");
    }
  };

  const displayName = name || "Guest";
  const displayRole = role || "customer";

  return (
    <div className="min-h-screen bg-[#fff6eb] text-[#1b130c]">
      {/* background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-24 h-72 w-72 rounded-full bg-[#ffe0b3]/50 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#ffd6e3]/40 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex justify-center w-full">
        <nav className="mt-2 w-11/12 md:w-10/12 rounded-2xl bg-[#29250d]/95 backdrop-blur-xl border border-[#f3e2d2] shadow-[0_14px_40px_rgba(0,0,0,0.28)] px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <BrandLogo />

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-6 text-[11px] font-semibold text-[#f5eee6]">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-[#f97316]/90 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-[#cfc249] hover:text-white transition-colors"
                >
                  Menu
                </Link>
              </li>
              {displayRole === "admin" && (
                <li>
                  <Link
                    to="/admin/menu"
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-[#10b981] hover:text-white transition-colors"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>

            {/* Profile + mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                className="md:hidden text-[#f5eee6] hover:text-white transition-colors"
                onClick={() => setIsMobileOpen((p) => !p)}
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>

              {/* Desktop profile dropdown */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsProfileOpen((p) => !p)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#f3e2d2]/40 text-[#f5eee6] shadow-sm hover:bg-white/10 hover:border-[#f97316]/60 transition-colors"
                >
                  {/* avatar */}
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-500/80 to-amber-400/80 flex items-center justify-center shadow-[0_0_0_1px_rgba(248,250,252,0.35)]">
                    <User className="w-4 h-4 text-amber-50 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                  </div>

                  {/* name + role */}
                  <div className="text-left leading-tight">
                    <p className="text-[11px] font-semibold text-[#fff7ec] line-clamp-1">
                      {displayName}
                    </p>
                    <p className="text-[10px] uppercase tracking-wide text-[#fbbf24]/90 line-clamp-1">
                      {displayRole}
                    </p>
                  </div>

                  {/* chevron */}
                  <ChevronDown
                    className={`w-4 h-4 text-[#f3e2d2]/80 transition-transform ${
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
                    <div className="absolute right-0 mt-2 w-64 bg-[#29250d]/95 border border-[#f3e2d2]/40 rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.65)] backdrop-blur-xl z-20 overflow-hidden">
                      <div className="p-4 border-b border-[#f3e2d2]/25 bg-white/5">
                        <p className="text-sm font-semibold text-[#fff7ec] line-clamp-1">
                          {displayName}
                        </p>
                        <p className="text-[11px] text-[#f3e2d2]/80 line-clamp-1">
                          {email || "No email"}
                        </p>
                        <p className="mt-1 text-[9px] uppercase tracking-wide text-[#f97316]/85">
                          {displayRole}
                        </p>
                      </div>
                      <div className="p-2">
                        <button
                          type="button"
                          className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-[#f5eee6] hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileOpen(false);
                            handleLogout();
                          }}
                          className="mt-1 w-full flex items-center gap-2 px-3 py-2 text-[12px] text-rose-400 hover:bg-rose-500/15 rounded-xl transition-colors"
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
            <div className="md:hidden mt-3 border-t border-[#f3e2d2]/40 pt-3 space-y-2 text-sm">
              <Link
                to="/"
                onClick={() => setIsMobileOpen(false)}
                className="block px-3 py-2 rounded-xl text-[#f5eee6] hover:bg-white/10 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/menu"
                onClick={() => setIsMobileOpen(false)}
                className="block px-3 py-2 rounded-xl text-[#f5eee6] hover:bg-white/10 transition-colors"
              >
                Menu
              </Link>
              {displayRole === "admin" && (
                <Link
                  to="/admin/menu"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2 rounded-xl text-[#f5eee6] hover:bg-white/10 transition-colors"
                >
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Page content */}
      <main className="pt-24 pb-10 px-4 flex justify-center">
        <div className="w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
