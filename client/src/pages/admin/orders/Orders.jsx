import React from "react";
import GlassCard from "@/components/ui/Cart";

/* ================= CONSTANTS ================= */

const ORDER_STATUS = {
  NEW: "new",
  ON_PROGRESS: "on_progress",
  READY: "ready",
  CANCELLED: "cancelled",
};

const STATUS_META = {
  new: { label: "New", color: "text-brand-main" },
  on_progress: { label: "In Progress", color: "text-amber-500" },
  ready: { label: "Ready", color: "text-emerald-500" },
  cancelled: { label: "Cancelled", color: "text-red-500" },
};

const MOCK_ORDERS = [
  {
    id: "ORD-292983",
    customerName: "Alex Trie",
    initials: "AT",
    avatarColor: "from-fuchsia-500 to-pink-500",
    room: "S-01",
    total: 27.5,
    status: ORDER_STATUS.NEW,
    items: [
      { name: "Grilled salmon with vegetables", price: 18.5, qty: 1 },
      { name: "Garden salad", price: 9, qty: 1 },
    ],
    notes: "No dressing on the salad.",
  },
  {
    id: "ORD-289122",
    customerName: "Jerome Bell",
    initials: "JB",
    avatarColor: "from-sky-500 to-cyan-400",
    room: "D-08",
    total: 31,
    status: ORDER_STATUS.ON_PROGRESS,
    items: [
      { name: "Beef steak", price: 19, qty: 1 },
      { name: "Mashed potatoes", price: 12, qty: 1 },
    ],
    notes: "Steak well-done, no gravy on potatoes.",
  },
];

/* ================= UTILS ================= */

const money = (v) => `₹${v.toFixed(2)}`;

/* ================= UI ================= */

const StatusBadge = ({ status }) => {
  const meta = STATUS_META[status];

  return (
    <span
      className={`
        rounded-full border border-border px-3 py-1
        text-[11px] font-medium tracking-wide
        ${meta.color}
        bg-card-bg/60 backdrop-blur
      `}
    >
      {meta.label}
    </span>
  );
};

const OrderCard = ({ order }) => {
  const disabled = order.status === ORDER_STATUS.CANCELLED;
  const meta = STATUS_META[order.status];

  return (
    <div
      className={`
        flex items-center gap-4
        rounded-xl border border-border
        bg-card-bg/80
        px-4 py-3
        text-sm
        transition
        hover:bg-hover
        ${disabled ? "opacity-60 grayscale" : ""}
      `}
    >
      {/* avatar */}
      <div
        className={`h-9 w-9 shrink-0 rounded-full
        bg-linear-to-br text-white
        flex items-center justify-center
        text-xs font-semibold
        ${order.avatarColor}`}
      >
        {order.initials}
      </div>

      {/* main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">
            {order.customerName}
          </p>
          <span className="text-xs text-text-muted">
            • {order.room}
          </span>
        </div>

        <p className="text-xs text-text-muted truncate">
          {order.items[0]?.name}
          {order.items.length > 1 &&
            ` +${order.items.length - 1} more`}
        </p>
      </div>

      {/* status */}
      <span
        className={`
          shrink-0 rounded-full px-2 py-0.5
          text-[11px] font-medium
          border border-border
          ${meta.color}
          bg-card-bg/60
        `}
      >
        {meta.label}
      </span>

      {/* total */}
      <div className="text-right shrink-0">
        <p className="text-xs text-text-muted">Total</p>
        <p className="font-semibold">
          {money(order.total)}
        </p>
      </div>

      {/* action */}
      <button
        className="
          shrink-0 rounded-full border border-border
          px-2.5 py-1 text-xs
          hover:bg-hover transition
        "
      >
        View
      </button>
    </div>
  );
};


/* ================= PAGE ================= */

export default function Orders() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4">
      {/* HEADER */}
      <header>
        <p className="text-xs uppercase tracking-widest text-text-muted">
          Operations
        </p>
        <h1 className="text-2xl font-semibold text-text-main">
          Orders
        </h1>
      </header>

      {/* LIST */}
      <GlassCard glow className="p-5">
        <h2 className="font-semibold mb-4 text-text-main">
          Order Queue
        </h2>

        <div className="grid gap-4 max-h-140 overflow-y-auto no-scrollbar">
          {MOCK_ORDERS.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
