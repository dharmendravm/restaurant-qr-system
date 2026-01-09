import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight, GiftIcon, UserPlus, LockKeyhole, TabletSmartphone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register as authRegister } from "@/store/authSlice";

import { BrandLogo } from "@/components/shared/BrandLogo";
import AuthError from "@/components/auth/AuthError";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthAsideContent from "@/components/ui/AuthAsideContent";
import { useToast } from "@/components/ui/toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  const { success, error: toastError } = useToast(); // toast helpers

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    dispatch(authRegister(formData))
      .unwrap()
      .then(() => {
        success(
          "Account created",
          "Welcome to TableOrbit! Your account is ready."
        );
        navigate("/login");
      })
      .catch((err) => {
        toastError(
          "Registration failed",
          err?.message || "Something went wrong. Please try again."
        );
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-6  overflow-hidden  bg-app-bg text-text-main ">
      <div className="relative w-full max-w-6xl rounded-2xl lg:rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col">
            <div className="bg-card-bg/10 border border-border backdrop-blur-xl rounded-2xl p-5 px-6 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <div>
                <div className="mb-4">
                  <BrandLogo />
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main leading-tight">
                  Create Account
                </h1>
                <p className="text-text-main text-sm mt-2 max-w-lg">
                  Join{" "}
                  <span className="bg-brand-main-200 font-bold">
                    TableOrbit
                  </span>{" "}
                  & unlock premium restaurant rewards.
                  <GiftIcon
                    size={16}
                    className="inline ml-1 -translate-y-0.5 text-brand-main"
                  />
                </p>

                <AuthError message={error || passwordError} />

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AuthInput
                      autoFocus
                      label="Full Name"
                      icon={<User />}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                      required
                    />
                    <AuthInput
                      label="Email address"
                      icon={<Mail />}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@gmail.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AuthInput
                      label="Phone number"
                      icon={<TabletSmartphone />}
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Mobail"
                      required
                    />
                    <AuthInput
                      label="Password"
                      icon={<Lock />}
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters place"
                      required
                    />
                  </div>

                  <AuthInput
                    label="Confirm Password"
                    icon={<LockKeyhole />}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Confirm password"
                    required
                  />

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="checkbox validator w-4 h-4"
                      required
                      title="Required"
                    />

                    <p className="text-text-muted text-xs">
                      I agree to the{" "}
                      <span className="text-text-accent underline">Terms</span>{" "}
                      &{" "}
                      <span className="text-text-accent underline">
                        Privacy Policy
                      </span>
                    </p>
                  </div>

                  <AuthButton
                    loading={loading}
                    loadingText="Creating Account..."
                  >
                    <UserPlus className="w-5 h-5" />
                    Register Now
                  </AuthButton>
                </form>
              </div>

              <div className="pt-2 text-center text-xs text-text-muted">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-text-accent font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Sign in <ArrowRight className="w-4" />
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <AuthAsideContent />
        </div>
      </div>
    </div>
  );
};

export default Register;
