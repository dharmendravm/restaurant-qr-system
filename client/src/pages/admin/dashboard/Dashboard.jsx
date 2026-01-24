import React, { useEffect } from "react";
import GlassCard from "@/components/ui/Cart";
import {
  ShoppingBag,
  IndianRupee,
  Clock,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderForDashBoard,
  getOrderStatusForDashBoard,
} from "@/features/admin-orders/adminOrderSlice";

const METRICS = (data) => [
  {
    label: "Today's Orders",
    value: data?.todayOrders ?? 0,
    icon: ShoppingBag,
  },
  {
    label: "Today's Revenue",
    value: `₹ ${data?.todayRevenue ?? 0}`,
    icon: IndianRupee,
  },
  {
    label: "In Progress",
    value: data?.inProgress ?? "?",
    icon: Clock,
  },
  {
    label: "Cancelled",
    value: data?.cancelled ?? "?",
    icon: XCircle,
  },
];

// const RECENT_ORDERS = (data) => [
//   {
//     id: data?.orderNumber ?? 0,
//     name: data?.userId?.name ?? "there",
//     room: "S-01",
//     total: `₹ ${data?.finalAmount}`,
//     status: "New",
//   },
//   {
//     id: "ORD-29302",
//     name: "Jerome Bell",
//     room: "D-08",
//     total: "₹310",
//     status: "In Progress",
//   },
//   {
//     id: "ORD-29303",
//     name: "Riya Sharma",
//     room: "A-02",
//     total: "₹560",
//     status: "Ready",
//   },
// ];

/*  UI BITS  */

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

export default function AdminDashboard() {
  const { metrics, error, loading } = useSelector(
    (state) => state.adminOrders
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderStatusForDashBoard());
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4">
      {/* HEADER */}

      <header>
        <p className="text-xs uppercase tracking-widest text-text-muted">
          Admin
        </p>
        <h1 className="text-2xl font-semibold text-text-main">Dashboard</h1>
      </header>

      {/* METRICS */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {METRICS(metrics).map((m) => (
          <MetricCard key={m.label} {...m} count={metrics} />
        ))}
      </section>

    </div>
  );
}
