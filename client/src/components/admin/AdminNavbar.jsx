import { Menu, LogOut } from "lucide-react";
import ThemeToggle from "../shared/ThemeToggle";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../ui/toast";

const AdminNavbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error } = useToast();

  const handleLogout = () => {
    try {
      localStorage.clear();
      dispatch(logout());
      success("Logged out", "You have been signed out.");
      navigate("/login");
    } catch {
      error("Logout failed", "Please try again.");
    }
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-card-bg">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu />
        </button>

        <div className="px-3 py-1 border border-border rounded-2xl">
          <span className="skeleton skeleton-text">TableOrbit</span>
          {/* <h1 className="text-sm font-semibold">TableOrbit</h1> */}
        </div>
      </div>
      <div>
        <Link to='/' className="text-xs">
        Home
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="p-2 rounded-xl text-danger hover:bg-danger/10"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
