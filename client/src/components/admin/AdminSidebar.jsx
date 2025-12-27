import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Users,
  Settings,
  Table,
} from "lucide-react";

const menu = [
  { name: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { name: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { name: "Menu", to: "/admin/menu", icon: UtensilsCrossed },
  { name: "Tables", to: "/admin/tables", icon: Table },
  { name: "Users", to: "/admin/users", icon: Users },
  { name: "Settings", to: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  return (
    <aside className="w-60 border-r border-border bg-card-bg/50 flex flex-col">
      {/* Top */}
      <div className="px-4 py-4 text-xs font-semibold text-text-muted  uppercase">
        Navigation
      </div>
      {/* Menu */}
      <nav className="flex-1 px-2 space-y-1">
        {menu.map(({ name, to, icon: Icon }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              `
              flex items-center gap-3 px-3 py-2 rounded-xl text-sm
              transition
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
  );
};

export default AdminSidebar;
