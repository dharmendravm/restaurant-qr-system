import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "@/store/userSlice";
import {
  Pencil,
  ShoppingBag,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

import GlassCard from "@/components/ui/Cart";

/* ================= SMALL UI PARTS ================= */

const Field = ({ label, value, disabled = false }) => (
  <div>
    <label className="block text-xs font-medium text-text-muted mb-1">
      {label}
    </label>
    <input
      defaultValue={value}
      disabled={disabled}
      className={`
        w-full rounded-xl border border-border
        bg-hover px-4 py-2 text-sm text-text-main
        focus:outline-none focus:ring-2 focus:ring-brand-main/30
        ${disabled ? "opacity-70 cursor-not-allowed" : ""}
      `}
    />
  </div>
);

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl border border-border bg-card-bg/80 backdrop-blur p-5">
    <div className="flex items-center gap-4">
      <Icon size={20} className="text-brand-main" />
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-2xl font-semibold text-text-main">
          {value}
        </p>
      </div>
    </div>
  </div>
);

/* ================= COMPONENT ================= */

export default function UserProfile() {
  const dispatch = useDispatch();
  const userId = useSelector((s) => s.auth.user?.id);
  const { user, loading } = useSelector((s) => s.user);

  useEffect(() => {
    if (userId) dispatch(getUserThunk());
  }, [userId, dispatch]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6 animate-pulse">
        <div className="h-32 bg-card-bg rounded-3xl" />
        <div className="h-80 bg-card-bg rounded-3xl" />
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-14">
    {/* ===== Header (Glass) ===== */}
      <GlassCard className="p-8">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-text-main">
          Account Settings
        </h1>
        <p className="mt-1 max-w-xl text-sm text-text-muted">
          Manage your personal information and account activity.
        </p>
      </GlassCard>

      {/* ===== Personal Information (Glass) ===== */}
      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold mb-6">
          Personal Information
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full Name" value={user?.name} />
          <Field label="Email" value={user?.email} />
          <Field label="Phone Number" value={user?.phone || ""} />
          <Field
            label="Account Type"
            value={user?.accountType}
            disabled
          />
        </div>

        <div className="mt-6">
          <button
            className="
              inline-flex items-center gap-2
              rounded-full bg-brand-main
              px-6 py-2.5
              text-sm font-semibold text-white
              shadow-[0_18px_45px_color-mix(in_oklab,var(--color-brand-main),transparent_60%)]
              transition hover:brightness-110
            "
          >
            <Pencil size={16} />
            Save Changes
          </button>
        </div>
      </GlassCard>

      {/* ===== Account Overview (Light Cards) ===== */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Account Overview
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={ShoppingBag}
            label="Total Orders"
            value={user?.totalOrders ?? 0}
          />

          <StatCard
            icon={IndianRupee}
            label="Total Spend"
            value={`₹ ${user?.totalSpends ?? 0}`}
          />

          <StatCard
            icon={ShieldCheck}
            label="Account Status"
            value={user?.isActive ? "Active" : "Inactive"}
          />
        </div>
      </section>
    </div>
  );
}
