import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Users,
  Settings,
  Table,
  X,
  TicketPercent,
} from "lucide-react";
import { useSelector } from "react-redux";

const menu = [
  { name: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { name: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { name: "Menu", to: "/admin/create/menu", icon: UtensilsCrossed },
  { name: "Coupon", to: "/admin/create/coupon", icon: TicketPercent },
  { name: "Tables", to: "/admin/tables", icon: Table },
  { name: "Users", to: "/admin/users", icon: Users },
];

const AdminSidebar = ({ open, onClose }) => {
  const userRole = useSelector((state) => state.auth?.user?.role);
  const isViewer = userRole === "viewer";

  const visibleMenu = isViewer
    ? menu.filter(
        (item) =>
          item.to === "/admin" ||
          item.to === "/admin/orders" ||
          item.to === "/admin/create/menu" ||
          item.to === "/admin/create/coupon" ||
          item.to === "/admin/tables" ||
          item.to === "/admin/users",
      )
    : menu;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-60 bg-card-bg border-r border-border flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close (mobile) */}
        <div className="md:hidden flex justify-end p-2">
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="px-4 py-4 text-xs font-semibold text-text-muted uppercase">
          Navigation
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {visibleMenu.map(({ name, to, icon: Icon }) => (
            <NavLink
              key={name}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition
                ${
                  isActive
                    ? "bg-hover text-text-main font-medium"
                    : "text-text-muted hover:bg-hover"
                }
              `
              }
            >
              <Icon className="w-4 h-4" />
              {name}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border text-xs text-text-muted">
          © Admin
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
