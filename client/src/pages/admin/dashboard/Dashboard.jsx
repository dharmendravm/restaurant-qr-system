import React from "react";
import GlassCard from "@/components/ui/Cart";
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  XCircle,
  ArrowRight,
} from "lucide-react";

/* ================= MOCK DATA ================= */

const METRICS = [
  {
    label: "Today's Orders",
    value: 24,
    icon: ShoppingBag,
  },
  {
    label: "Today's Revenue",
    value: "₹ 4,820",
    icon: IndianRupee,
  },
  {
    label: "In Progress",
    value: 6,
    icon: Clock,
  },
  {
    label: "Cancelled",
    value: 2,
    icon: XCircle,
  },
];

const RECENT_ORDERS = [
  {
    id: "ORD-29301",
    name: "Alex Trie",
    room: "S-01",
    total: "₹420",
    status: "New",
  },
  {
    id: "ORD-29302",
    name: "Jerome Bell",
    room: "D-08",
    total: "₹310",
    status: "In Progress",
  },
  {
    id: "ORD-29303",
    name: "Riya Sharma",
    room: "A-02",
    total: "₹560",
    status: "Ready",
  },
];

/* ================= UI BITS ================= */

const MetricCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-xl border border-border bg-card-bg/80 px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-lg bg-brand-main/10 text-brand-main flex items-center justify-center">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-lg font-semibold text-text-main">{value}</p>
      </div>
    </div>
  </div>
);

const StatusDot = ({ status }) => {
  const map = {
    New: "bg-brand-main",
    "In Progress": "bg-amber-500",
    Ready: "bg-emerald-500",
  };
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${map[status]}`}
    />
  );
};

/* ================= PAGE ================= */

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4">
      {/* HEADER */}
      <header>
        <p className="text-xs uppercase tracking-widest text-text-muted">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-text-main">
          Dashboard
        </h1>
      </header>

      {/* METRICS */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </section>

      {/* MAIN GRID */}
      <section className="grid lg:grid-cols-3 gap-6">
        {/* RECENT ORDERS */}
        <GlassCard glow={false} className="p-4 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-text-main">
              Recent Orders
            </h2>
            <a
              href="/admin/orders"
              className="text-xs text-brand-main hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </a>
          </div>

          <div className="space-y-2">
            {RECENT_ORDERS.map((o) => (
              <div
                key={o.id}
                className="
                  flex items-center gap-3
                  rounded-lg border border-border
                  px-3 py-2 text-sm
                  hover:bg-hover transition
                "
              >
                <StatusDot status={o.status} />

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {o.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    Room {o.room}
                  </p>
                </div>

                <p className="font-medium">{o.total}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* QUICK ACTIONS */}
        <GlassCard glow={false} className="p-4">
          <h2 className="font-semibold mb-3 text-text-main">
            Quick Actions
          </h2>

          <div className="space-y-2">
            <a
              href="/admin/orders"
              className="block rounded-lg border border-border px-3 py-2 text-sm hover:bg-hover"
            >
              Manage Orders
            </a>
            <a
              href="/admin/menu"
              className="block rounded-lg border border-border px-3 py-2 text-sm hover:bg-hover"
            >
              Manage Menu
            </a>
            <a
              href="/admin/categories"
              className="block rounded-lg border border-border px-3 py-2 text-sm hover:bg-hover"
            >
              Categories
            </a>
            <a
              href="/admin/users"
              className="block rounded-lg border border-border px-3 py-2 text-sm hover:bg-hover"
            >
              Users
            </a>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
