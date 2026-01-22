import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, updateProfileThunk } from "@/store/userSlice";
import {
  Pencil,
  ShoppingBag,
  IndianRupee,
  ShieldCheck,
  Camera,
  Save,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/toast";

/*  SMALL COMPONENTS  */

const Field = ({ label, value, disabled = false, onChange }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-text-muted">{label}</label>

    <input
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full rounded-lg border border-border px-4 py-2 text-sm
        bg-card-bg text-text-main
        focus:outline-none focus:ring-2 focus:ring-brand-main/30
        ${disabled ? "opacity-70 cursor-not-allowed" : "hover:bg-hover"}
      `}
    />
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="rounded-xl border border-border bg-card-bg p-5 shadow-sm">
    <div className="flex items-center gap-4">
      <div>
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-xl font-semibold text-text-main">{value}</p>
      </div>
    </div>
  </div>
);

/* ---------- MAIN COMPONENT ---------- */

export default function UserProfile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const { success, error: toastError } = useToast();

  const { user, loading, error, updateLoading } = useSelector((s) => s.user);
  const userId = useSelector((s) => s.auth.user?.id);

  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        updateProfileThunk({
          name: form.name,
          phone: form.phone,
        }),
      ).unwrap();
      success(result.message);
    } catch (err) {
      toastError(err);
    }
  };

  useEffect(() => {
    if (userId) dispatch(getUserThunk());
  }, [dispatch, userId]);

  
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    // later: upload using FormData
  };

  if (loading && !user) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6 animate-pulse">
        <div className="h-32 bg-card-bg rounded-xl" />
        <div className="h-80 bg-card-bg rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 text-text-main">
      {/* ---------- HEADER ---------- */}
      <div className="flex items-center gap-6 rounded-xl border border-border bg-card-bg p-6 shadow-sm">
        <div className="relative w-28 h-28">
          <UserAvatar
            name={user?.name}
            avatar={user?.avatar}
            preview={preview}
          />

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-1 right-1 w-9 h-9 rounded-full
              bg-brand-main text-white flex items-center justify-center
              hover:scale-105 transition"
          >
            <Camera size={16} />
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-text-main via-brand-main to-text-muted bg-size-[200%_100%] bg-clip-text text-transparent">
            {user?.name}
          </h1>

          <p className="text-sm text-text-muted">{user?.email}</p>
          <p className="text-xs text-brand-main mt-1">
            {user?.accountType}
            {user?.authProvider === "LOCAL"
              ? ""
              : ` •${" "} ${user?.authProvider}`}
          </p>
        </div>
      </div>

      {/* ---------- PERSONAL INFO ---------- */}
      <div className="rounded-xl border border-border bg-card-bg p-6 shadow-sm space-y-6">
        {error && (
          <p className="text-danger text-sm">{error.message || error}</p>
        )}
        <h2 className="text-lg font-semibold text-text-main">
          Personal Information
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Field label="Email" value={user?.email || ""} disabled />

          <Field
            label="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="flex pt-4 gap-2">
          <button
            onClick={handleSaveProfile}
            disabled={updateLoading}
            className="inline-flex items-center gap-2 rounded-xl
              bg-brand-main px-6 py-2.5 text-sm font-semibold text-white
              hover:brightness-110 transition"
          >
            <Save size={16} />
            Save Changes
          </button>
          <Link
            to="/user/change-password"
            className="inline-flex items-center gap-2 rounded-xl
              bg-brand-main px-6 py-2.5 text-sm font-semibold text-white
              hover:brightness-110 transition"
          >
            <Pencil size={16} />
            Change password
          </Link>
        </div>
      </div>

      {/* ---------- ACCOUNT OVERVIEW ---------- */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-text-main">
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

const UserAvatar = ({ name, avatar, preview }) => {
  // Name ka first letter (safe)
  const letter = name?.charAt(0)?.toUpperCase() || "?";

  if (preview || avatar) {
    return (
      <img
        src={preview || avatar}
        alt="User avatar"
        className="w-full h-full rounded-full object-cover border border-border"
      />
    );
  }

  // Fallback: Letter avatar
  return (
    <div
      className="
        w-full h-full rounded-full
        flex items-center justify-center
        bg-gray-500 text-brand-main
        text-3xl font-bold
        border border-border
      "
    >
      {letter}
    </div>
  );
};
