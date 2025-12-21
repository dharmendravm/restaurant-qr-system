import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  GiftIcon,
  UserPlus,
  LockKeyhole,
  TabletSmartphone,
  Gift,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { BrandLogo } from "@/components/BrandLogo";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/authSlice";

// import { Card } from "@/components/ui/MemberShipCard";
import { Award, Percent, Sparkles } from "lucide-react";
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
    console.log("Form submitted:", formData);

    // Register API call + toast on success / error
    dispatch(register(formData))
      .unwrap()
      .then(() => {
        success(
          "Account created",
          "Welcome to TableOrbit! Your account is ready."
        );
        navigate("/");
      })
      .catch((err) => {
        toastError(
          "Registration failed",
          err?.message || "Something went wrong. Please try again."
        );
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4  overflow-hidden  bg-app-bg text-text-main ">
      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch overflow-hidden">
          <div className="flex flex-col">
            <div className="bg-card-bg border border-border backdrop-blur-xl rounded-2xl p-5 px-6 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <div>
                <div className="mb-4">
                  <BrandLogo />
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold text-text-main leading-tight">
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

                {error && (
                  <div className="mt-4 p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm">
                    {error}
                  </div>
                )}
                {passwordError && (
                  <div className="mt-4 p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm">
                    {passwordError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputFild
                      label="Full Name"
                      icon={
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      }
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                    />

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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputFild
                      label="Phone number"
                      icon={
                        <TabletSmartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      }
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Mobail"
                    />
                    <InputFild
                      label="Password"
                      icon={
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      }
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => {
                        handleChange(e);
                        setPasswordStrength(
                          getPasswordStrength(e.target.value)
                        );
                      }}
                      placeholder="At least 6 characters place"
                    />
                  </div>

                  <InputFild
                    label="Confirm Password"
                    icon={
                      <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    }
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Confirm password"
                  />

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-400 mt-1"
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

                  <button
                    type="submit"
                    className="w-full bg-brand-main  hover:opacity-90 text-text-main font-medium py-2.5 rounded-xl border border-brand-main backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                  >
                    {loading ? (
                      " Creating Account..."
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 text-text-main/90" />
                        <span className="text-sm">Register Now</span>
                      </>
                    )}
                  </button>
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

          {/* RightContent */}
          <aside className="flex flex-col justify-start gap-3">
            {/* welcome card */}
            <div
              className="bg-card-bg border border-border backdrop-blur-md rounded-2xl px-6 p-2 
            "
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Sparkles
                    className="text-brand-main/80 drop-shadow-[0_0_4px_orange]"
                    size={30}
                  />
                </div>
                <div>
                  <h4 className="text-text-muteded text-lg font-semibold">
                    Welcome Bonus
                  </h4>
                  <p className="text-text-muted text-sm mt-1">
                    Enjoy <span className="font-semibold">20% off</span> on your
                    first order.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card-bg border border-border rounded-2xl p-6 ">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
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
              <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Percent className="bg-brand-main-300" /> Membership Tiers
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

export default Register;

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
      <label className="text-xs text-text-muted mb-2 block">{label}</label>
      <div className="relative">
        {icon}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-11 pr-3 py-2.5 bg-hover border border-border rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20 transition-all duration-200 text-sm"
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
    className={`
      bg-card-bg border border-white/10 rounded-xl px-4 p-2
      backdrop-blur-xl flex items-center justify-between 
      transition-all duration-300 ease-out cursor-pointer
      hover:bg-[#1a1a1a]/50 hover:-translate-y-0.5
      ${borderVariants[border]}
    `}
  >
    <div className="flex items-center gap-3">
      <div className="opacity-80">{iconMap[title]}</div>
      <h4 className="text-text-main text-sm font-medium">{title}</h4>
    </div>

    <p className="text-text-muted text-xs font-normal">{value}</p>
  </div>
);
