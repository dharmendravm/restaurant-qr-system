import { useToast } from "@/components/ui/toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { success, error: toastError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      await axios.patch(`${API_URL}/api/v1/auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });

      success("Password updated", "You can now login with your new password");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to reset password";

      toastError("Error", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg px-4">
      <div
        className="w-full max-w-[400px] flex flex-col gap-6 bg-card-bg/10 backdrop-blur-xl border border-border
        rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-brand-main">
            Reset Password
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Choose a strong new password
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter new password"
            className=" w-full px-4 py-2.5 bg-hover border border-border rounded-lg text-text-main text-sm
           placeholder-text-muted focus:outline-none focus:border-brand-main/40 focus:ring-1 focus:ring-brand-main/20
           transition-all hover:border-brand-main/30"/>

          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="confirm new password"
            className=" w-full px-4 py-2.5 bg-hover border border-border rounded-lg text-text-main text-sm
           placeholder-text-muted focus:outline-none focus:border-brand-main/40 focus:ring-1 focus:ring-brand-main/20
           transition-all hover:border-brand-main/30"/>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-brand-main text-white font-semibold py-2.5 rounded-xl
              shadow-md hover:shadow-lg hover:opacity-90
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all active:scale-95"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
