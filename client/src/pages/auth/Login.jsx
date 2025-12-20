import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";
import { Mail, Lock, ArrowRight, Gift, LogIn } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { GoogleLoginUI } from "@/components/ui/GoogleUI";
import { Sparkles, Award, Percent } from "lucide-react";
import { useToast } from "@/components/ui/toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const { success, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-app-bg text-text-main">
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LeftContent */}
          <div className="flex flex-col justify-center">
            <div className="bg-card-bg border border-border backdrop-blur-lg rounded-2xl p-5 shadow-lg">
              <div>
                {/* Logo */}
                <div className="mb-4">
                  <BrandLogo />
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold text-text-main leading-tight">
                  Welcome Back
                </h1>
                <p className="text-text-muted text-sm mt-2 max-w-lg">
                  Sign in to access your premium rewards.
                  <Gift
                    size={16}
                    className="inline ml-1 -translate-y-0.5 text-brand-main"
                  />
                </p>

                {/* ERROR */}
                {error && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* EMAIL */}
                  <InputFild
                    label="Email address"
                    icon={
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    }
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@gmail.com"
                  />

                  {/* PASSWORD */}
                  <InputFild
                    label="Password"
                    icon={
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    }
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                  />

                  {/* SUBMIT */}
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="w-full bg-brand-main hover:opacity-90 text-text-main font-medium py-2.5 rounded-xl border border-border flex items-center justify-center gap-2 transition-all duration-150 active:scale-95"
                  >
                    {loading ? (
                      "Signing in..."
                    ) : (
                      <>
                        <LogIn className="w-5 text-text-main/80" />
                        Sign In
                      </>
                    )}
                  </button>

                  {/* GOOGLE LOGIN */}
                  <GoogleLoginUI />
                </form>
                <div className="pt-2 text-center text-xs text-text-muted">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-text-main font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Register <ArrowRight className="w-4" />
                    </Link>
                  </p>
                    <Link to="/recovery">
                    Forgot Password{" "}
                    </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RightContent  */}
          <aside className="flex flex-col justify-start gap-3 min-w-0">
            {/* Welcome Card */}
            <div className="bg-card-bg border border-border backdrop-blur-md rounded-2xl px-6 p-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Sparkles className="text-brand-main drop-shadow" size={30} />
                </div>
                <div>
                  <h4 className="text-text-main text-lg font-semibold">
                    Welcome Back
                  </h4>
                  <p className="text-text-muted-300 text-sm mt-1">
                    Continue earning and redeeming your points.
                  </p>
                </div>
              </div>
            </div>

            {/* Loyalty Program */}
            <div className="bg-card-bg border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-text-main text-lg font-semibold flex items-center gap-2">
                  <Award className="text-brand-main" /> Loyalty Program
                </h3>
                <span className="text-text-muted text-xs">Member benefits</span>
              </div>

              <div className="grid gap-3">
                <Card
                  title="Earn Points"
                  value="1 Point = ₹1"
                  border="Diamond"
                />
                <Card
                  title="Redeem Points"
                  value="100 Points = ₹10"
                  border="Ruby"
                />
                <Card
                  title="Bonus Points"
                  value="+50 Points"
                  border="Emerald"
                />
              </div>
            </div>

            {/* Membership */}
            <div className="bg-card-bg border border-border rounded-2xl px-6 p-2">
              <h4 className="text-text-main text-lg font-semibold mb-4 flex items-center gap-2">
                <Percent className="text-brand-main" /> Membership Tiers
              </h4>
              <Tier
                title="Bronze"
                range="0-500 pts"
                offer="5% Discount"
                border="Bronze"
              />
              <Tier
                title="Silver"
                range="501-2000 pts"
                offer="10% + Support"
                border="Silver"
              />
              <Tier
                title="Gold"
                range="2000+ pts"
                offer="15% + Exclusive"
                border="Gold"
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Login;

const InputFild = ({
  label,
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="text-xs text-text-muted-300 mb-2 block">{label}</label>
      <div className="relative">
        {icon}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-11 pr-3 py-2.5
          bg-hover
          border border-border
          rounded-lg
          text-text-main
          placeholder-text-muted
          focus:outline-none
          focus:border-brand-main/40
          focus:ring-1 focus:ring-brand-main/20
          transition-all duration-200 text-sm"
        />
      </div>
    </div>
  );
};

const borderVariants = {
  Bronze: "hover:border-amber-900",
  Silver: "hover:border-zinc-400",
  Gold: "hover:border-yellow-400",
  Diamond: "hover:border-cyan-300",
  Ruby: "hover:border-rose-300",
  Emerald: "hover:border-green-300",
};

const Tier = ({ title, range, offer, border }) => (
  <div
    className={`bg-card-bg border  border-border rounded-lg p-1 px-4 mb-2  transition-all duration-300 ease-out cursor-pointer
      hover:bg-hover hover:-translate-y-0.5 ${borderVariants[border]}`}
  >
    <div className="flex items-center justify-between">
      <span className="text-text-main text-sm font-semibold">
        {title} Member
      </span>
      <span className="text-text-muted text-xs">{range}</span>
    </div>
    <p className="text-text-muted text-xs mt-1">{offer}</p>
  </div>
);

const iconMap = {
  "Earn Points": <Gift className="w-5 h-5 text-emerald-300" />,
  "Redeem Points": <Award className="w-5 h-5 text-cyan-300" />,
  "Bonus Points": <Sparkles className="w-5 h-5 text-amber-300" />,
};

const Card = ({ title, value, border }) => (
<div
  className={`bg-card-bg border border-border rounded-lg p-1 px-4 mb-2
  transition-all duration-300 ease-out cursor-pointer
  hover:bg-hover hover:-translate-y-0.5 ${borderVariants[border]}`}
>
    <div className="flex items-center gap-3">
      <div className="opacity-80">{iconMap[title]}</div>
      <h4 className="text-text-main text-sm font-medium">{title}</h4>
    </div>

    <p className="text-text-muted text-xs font-normal">{value}</p>
  </div>
);
