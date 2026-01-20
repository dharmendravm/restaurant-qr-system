import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/authSlice";
import { Mail, Lock, ArrowRight, Gift, LogIn } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { GoogleLoginUI } from "@/components/auth/buttons/GoogleLoginButton";
import { useToast } from "@/components/ui/toast";

import AuthError from "@/components/auth/AuthError";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthAsideContent from "@/components/ui/AuthAsideContent";
import { GitHubLoginUI } from "@/components/auth/buttons/GithubLoginButton";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const { success, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Login API call + toast on success / error
    dispatch(login(formData))
      .unwrap()
      .then(() => {
        success("Welcome back", "You have logged in successfully.");
        localStorage.removeItem("sessionToken");
      })
      .catch((errMsg) => {
        toastError(
          "Login failed",
          errMsg || "Something went wrong. Please try again."
        );
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg text-text-main px-4 sm:px-6 py-6">
      <div className="w-full max-w-6xl rounded-2xl lg:rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">
          {/* LeftContent */}
          <div className="flex flex-col justify-center w-full">
            <div className="bg-card-bg/10 border border-border backdrop-blur-lg rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg">
              <div>
                {/* Logo */}
                <div className="mb-4">
                  <BrandLogo />
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main leading-tight">
                  Welcome Back
                </h1>
                <p className="text-text-muted text-sm mt-2 max-w-lg">
                  Sign in to access your premium rewards.
                  <Gift
                    size={16}
                    className="inline ml-1 -translate-y-0.5 text-brand-main"
                  />
                </p>

                <AuthError message={error} />

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <AuthInput
                    autoFocus
                    label="Email address"
                    icon={<Mail />}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@gmail.com"
                    required
                  />

                  <AuthInput
                    label="Password"
                    icon={<Lock />}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    required
                    autoFocus={!!error}
                  />

                  <AuthButton loading={loading} loadingText="Signing in...">
                    <LogIn className="w-5" />
                    Sign In
                  </AuthButton>
                  
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <GoogleLoginUI />
                    <GitHubLoginUI />
                  </div>
                </form>

                <div className="pt-2 text-center text-xs text-text-muted">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-text-accent font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Register <ArrowRight className="w-4" />
                    </Link>
                  </p>
                  <Link to="/recovery" className="hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <AuthAsideContent />
        </div>
      </div>
    </div>
  );
};

export default Login;
