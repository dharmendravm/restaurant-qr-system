import { useState } from "react";
import { Save, Lock } from "lucide-react";
import { changePasswordApi } from "@/lib/user.api";
import { useToast } from "@/components/ui/toast";

/* ---------- INPUT FIELD ---------- */

const PasswordField = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-text-muted">{label}</label>

    <input
      type="password"
      value={value}
      onChange={onChange}
      className="w-full rounded-lg border border-border px-4 py-2 text-sm
        bg-card-bg text-text-main
        focus:outline-none focus:ring-2 focus:ring-brand-main/30
        hover:bg-hover"
    />
  </div>
);

/* ---------- PAGE ---------- */

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const { success, error: toastError } = useToast();

  const handleSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toastError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      toastError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toastError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await changePasswordApi({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      success("Password updated successfully");
    } catch (err) {
      toastError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card-bg p-6 shadow-sm space-y-6">
        {/* ---------- HEADER ---------- */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-main/10 flex items-center justify-center">
            <Lock className="text-brand-main" size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text-main">
              Change Password
            </h1>
            <p className="text-xs text-text-muted">
              Update your account password
            </p>
          </div>
        </div>

        {/* ---------- FORM ---------- */}
        <div className="space-y-4">
          <PasswordField
            label="Current Password"
            value={form.currentPassword}
            onChange={(e) =>
              setForm({ ...form, currentPassword: e.target.value })
            }
          />

          <PasswordField
            label="New Password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />

          <PasswordField
            label="Confirm New Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>
        {/* ---------- ACTION ---------- */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2
            rounded-xl bg-brand-main px-6 py-2.5 text-sm font-semibold text-white
            hover:brightness-110 transition disabled:opacity-60"
        >
          <Save size={16} />
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
