import { useToast } from "@/components/ui/toast";
import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { success, error: toastError } = useToast();

  const sendMail = async () => {
    try {
      if (!email.trim()) {
        setError("Email is required");
        return;
      }

      setError(null);
      setLoading(true);

      await axios.post(`${API_URL}/api/v1/auth/forgot-password`, {
        email,
      });
      success("Recovery email sent", "Check your inbox (and spam folder)");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send recovery email";

      // Toast (global)
      toastError("Error", message);

      // Inline error (optional)
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMail();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-app-bg px-4">
      <div
        className="w-full max-w-[400px] flex flex-col gap-6 bg-card-bg/10 backdrop-blur-xl border border-border
        rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-6"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-brand-main">
            Account Recovery
          </h1>
        </div>

        {/* Description */}
        <p className="text-text-muted text-sm mt-1 text-center tracking-tight">
          Enter the email associated with your account to receive a password
          reset link.
        </p>
        {/* ERROR */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className=" w-full px-4 py-2.5 bg-hover border border-border rounded-lg text-text-main text-sm
           placeholder-text-muted focus:outline-none focus:border-brand-main/40 focus:ring-1 focus:ring-brand-main/20
           transition-all hover:border-brand-main/30"
          />

          <p className="text-xs text-text-muted">
            If the email exists, you'll receive a reset link.
          </p>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-brand-main hover:opacity-90 py-2.5 text-white border border-border shadow-md hover:shadow-lg disabled:opacity-60 font-semibold transition-all duration-150 rounded-xl active:scale-95 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
