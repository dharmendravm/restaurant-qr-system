import { useToast } from "@/components/ui/toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthCard from "@/components/auth/AuthCart";
import AuthError from "@/components/auth/AuthError";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";

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
    <AuthCard title="Reset Password" description="Choose a strong new password">
      <AuthError message={error} />

      <form onSubmit={handleSubmit} className="space-y-5 mt-3">
        <AuthInput
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <AuthInput
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <AuthButton loading={loading} loadingText="Updating...">
          Change Password
        </AuthButton>
      </form>
    </AuthCard>
  );
};

export default ResetPassword;
