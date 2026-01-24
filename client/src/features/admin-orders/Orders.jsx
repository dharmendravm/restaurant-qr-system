import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight, ChevronRight } from "lucide-react";

import {
  getOrderForDashBoard,
  getOrderStatusForDashBoard,
} from "@/features/admin-orders/adminOrderSlice";
import { Link } from "react-router-dom";

const StatusDot = ({ status }) => {
  const statusMap = {
    preparing: "bg-amber-500",
    ready: "bg-emerald-500",
    pending: "bg-rose-500",
    served: "bg-green-500",
  };

  return (
    <span
      className={`h-2.5 w-2.5 rounded-full ${
        statusMap[status] || "bg-card-bg/70"
      }`}
    />
  );
};

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const {
    orders = [],
    loading,
    error,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getOrderForDashBoard());
    dispatch(getOrderStatusForDashBoard());
  }, [dispatch]);

  if (loading) {
    return <div className="p-6 text-sm bg-card-bg">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-sm text-danger">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* HEADER */}
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-text-muted">
          Admin Panel
        </p>
        <h1 className="text-3xl font-semibold text-text-main">Dashboard</h1>
      </header>

      {/* GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT ORDERS */}
        <div className="lg:col-span-2 rounded-xl border bg-card-bg/50 shadow-sm ">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-medium text-text-main">Recent Orders</h2>

            <a
              href="/admin/orders"
              className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight size={14} />
            </a>
          </div>

          <div className="divide-y">
            {orders.length === 0 ? (
              <p className="p-5 text-sm text-text-main">
                No recent orders found.
              </p>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="
                    flex items-center gap-4 px-5 py-4
                    hover:bg-btn-black/20 transition
                    cursor-pointer border border-border"
                >
                  <StatusDot status={order.orderStatus} />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-main truncate">
                      {order.userId?.name || "Guest"}
                    </p>
                    <p className="text-xs text-text-main">
                      Table {order.tableNumber}
                    </p>
                  </div>

                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="flex items-center gap-1 text-sm font-medium text-text-main hover:underline "
                  >
                    View
                    <ChevronRight size={14} />
                  </Link>
                  <p className="text-sm font-semibold text-text-main">
                    ₹{order.finalAmount}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="rounded-xl border bg-card-bg/50 shadow-sm">
          <div className="px-5 py-4 border-b border-border/60">
            <h2 className="font-medium text-text-main">Quick Actions</h2>
          </div>

          <div className="p-4 space-y-2 border-b border-border/60">
            {[
              { label: "Manage Orders", link: "/admin/orders" },
              { label: "Manage Menu", link: "/admin/menu" },
              { label: "Categories", link: "/admin/categories" },
              { label: "Users", link: "/admin/users" },
            ].map((item) => (
              <a
                key={item.link}
                href={item.link}
                className="
                  block rounded-lg px-4 py-2.5 text-sm
                  text-text-main
                  hover:bg-btn-black/50 transition
                "
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
