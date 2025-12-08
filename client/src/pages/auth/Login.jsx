import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";
import { Mail, Lock, ArrowRight, Gift, LogIn } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
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
      })
      .catch((errMsg) => {
        toastError("Login failed", errMsg || "Something went wrong. Please try again.");
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LeftContent */}
          <div className="flex flex-col justify-center">
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 backdrop-blur-lg rounded-2xl p-5 flex    flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <div>
                {/* Logo */}
                <div className="mb-4">
                  <BrandLogo />
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Welcome Back
                </h1>
                <p className="text-gray-400 text-sm mt-2 max-w-lg">
                  Sign in to access your premium rewards.
                  <Gift
                    size={16}
                    className="inline ml-1 -translate-y-0.5 text-orange-300"
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
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                    className="w-full bg-orange-600  hover:bg-orange-500 text-white font-medium py-2.5 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all duration-150 active:scale-95"
                  >
                    {loading ? (
                      "Signing in..."
                    ) : (
                      <>
                        <LogIn className="w-5 text-white/80" />
                        Sign In
                      </>
                    )}
                  </button>

                  {/* GOOGLE LOGIN */}
                  <GoogleLoginUI />
                </form>
                <div className="pt-2 text-center text-xs text-gray-500">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-white font-medium hover:underline inline-flex items-center gap-1"
                    >
                      Register <ArrowRight className="w-4" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RightContent  */}
          <aside className="flex flex-col justify-start gap-3 min-w-0">
            {/* Welcome Card */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-white/6 backdrop-blur-md rounded-2xl px-6 p-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Sparkles
                    className="text-orange-300 drop-shadow-[0_0_4px_orange]"
                    size={30}
                  />
                </div>
                <div>
                  <h4 className="text-white text-lg font-semibold">
                    Welcome Back
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Continue earning and redeeming your points.
                  </p>
                </div>
              </div>
            </div>

            {/* Loyalty Program */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <Award className="text-orange-300" /> Loyalty Program
                </h3>
                <span className="text-gray-400 text-xs">Member benefits</span>
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
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-2xl px-6 p-2">
              <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Percent className="text-orange-300" /> Membership Tiers
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


const InputFild = ({label , icon , type , name , value , onChange , placeholder}) => {
  return (
      <div>
        <label className="text-xs text-gray-300 mb-2 block">{label}</label>
        <div className="relative">
          {icon}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full pl-11 pr-3 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20 transition-all duration-200 text-sm"
          />
        </div>
      </div>
  )
}


const borderVariants = {
  Bronze: "hover:border-amber-900",     
  Silver: "hover:border-zinc-400",      
  Gold: "hover:border-yellow-400",  
    Diamond: "hover:border-cyan-300",
  Ruby: "hover:border-rose-300",
  Emerald: "hover:border-green-300",     
};



const Tier = ({ title, range, offer, border}) => (
  <div className={`bg-[#00000040] border  border-gray-900 rounded-lg p-1 px-4 mb-2  transition-all duration-300 ease-out cursor-pointer
      hover:bg-[#1a1a1a]/20 hover:-translate-y-0.5 ${borderVariants[border]}`}>
    <div className="flex items-center justify-between">
      <span className="text-gray-100 text-sm font-semibold">
        {title} Member
      </span>
      <span className="text-gray-400 text-xs">{range}</span>
    </div>
    <p className="text-gray-500 text-xs mt-1">{offer}</p>
  </div>
);



const iconMap = {
  "Earn Points": (
    <Gift className="w-5 h-5 text-emerald-300" />
  ),
  "Redeem Points": (
    <Award className="w-5 h-5 text-cyan-300" />
  ),
  "Bonus Points": (
    <Sparkles className="w-5 h-5 text-amber-300" />
  ),
};

const Card = ({ title, value, border }) => (
  <div
    className={`
      bg-[#0f0f0f]/40 border border-white/10 rounded-xl px-4 p-2
      backdrop-blur-xl flex items-center justify-between 
      transition-all duration-300 ease-out cursor-pointer
      hover:bg-[#1a1a1a]/50 hover:-translate-y-0.5
      ${borderVariants[border]}
    `}
  >
    <div className="flex items-center gap-3">
      <div className="opacity-80">{iconMap[title]}</div>
      <h4 className="text-gray-100 text-sm font-medium">{title}</h4>
    </div>

    <p className="text-gray-400 text-xs font-normal">{value}</p>
  </div>
);
