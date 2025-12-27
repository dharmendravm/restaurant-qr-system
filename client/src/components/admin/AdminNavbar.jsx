import { useDispatch } from "react-redux";
import ThemeToggle from "../shared/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { logout } from "@/redux/authSlice";
import { useToast } from "../ui/toast";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error } = useToast();

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

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-card-bg/50">
      <div className="px-3 py-2 border border-border rounded-3xl">
      <h1 className="text-sm font-semibold text-text-main">TableOrbit</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-text-muted">Admin</span>
      </div>

      <div className="flex gap-1 justify-end">
        <ThemeToggle />
     
      <button
        onClick={() => {
          handleLogout();
        }}
        className=" flex items-center gap-3 px-4 py-2 text-sm text-danger rounded-2xl hover:bg-danger/10 transition"
      >
        <LogOut className="w-4 h-4" />
      </button>
       </div>
    </header>
  );
};

export default AdminNavbar;
