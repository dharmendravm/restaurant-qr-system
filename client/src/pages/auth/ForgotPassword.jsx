import AuthButton from "@/components/auth/AuthButton";
import AuthCard from "@/components/auth/AuthCart";
import AuthError from "@/components/auth/AuthError";
import AuthInput from "@/components/auth/AuthInput";

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
    <AuthCard
      title="Account Recovery"
      description="Enter the email associated with your account"
    >
      <AuthError message={error} />

      <form onSubmit={handleSubmit} className="space-y-4 mt-3">
        <AuthInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <AuthButton loading={loading} loadingText="Sending...">
          Send Reset Link
        </AuthButton>
      </form>
    </AuthCard>
  );
}

export default ForgotPassword;
