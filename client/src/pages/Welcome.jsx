import { BrandLogo } from "@/components/shared/BrandLogo";
import { GlowBG } from "@/components/shared/GlowBG";
import { Card } from "@/components/shared/MemberShipCard";
import {
  Award,
  Gift,
  LogIn,
  Sparkles,
  User,
  UserPlus,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 overflow-hidden">
      <GlowBG />
      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col justify-center">
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 backdrop-blur-xl rounded-2xl p-5 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <div className="p-3">
                {/* Logo */}
                <div className="mb-4">
                  <BrandLogo />
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Welcome To TableOrbit
                </h1>
                <p className="text-gray-400 text-sm mt-2 max-w-lg">
                  Sign in to access your premium rewards.
                  <Gift
                    size={16}
                    className="inline ml-1 -translate-y-0.5 text-orange-300"
                  />
                </p>

                {/* FORM */}
                <form className="mt-8 space-y-5">

                  {/* SUBMIT */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      to="/login"
                      className="w-full bg-emerald-50 hover:bg-emerald-100 text-black font-semibold 
                  py-3 rounded-lg shadow-lg shadow-orange-500/20 transition delay-150 active:scale-95 
                  flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-5" />
                      <span>Log-in</span>
                    </Link>
                    {/* //! action */}
                    <Link
                      to=""
                      className="w-full bg-zinc-800 text-gray-200 border border-zinc-700 hover:bg-zinc-700 k font-semibold 
                  py-3 rounded-lg shadow-lg shadow-orange-500/20 transition delay-150 active:scale-95 
                  flex items-center justify-center gap-2"
                    >
                      <User className="w-5" />
                      <span>Continue as Guest</span>
                    </Link>
                  </div>

                  <Link
                    to="/register"
                    className="w-full bg-amber-300 hover:bg-orange-400 font-semibold 
                  py-3 rounded-lg shadow-lg shadow-orange-500/20 transition delay-150 active:scale-95 
                  flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5" />
                    <span>Register Now</span>
                  </Link>
                </form>
              </div>
            </div>
          </div>

          <aside className="flex flex-col justify-start gap-3">
            {/* welcome card */}
            <div className="bg-[#ffffff08] border border-white/6 backdrop-blur-md rounded-2xl px-6 p-2 ">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Sparkles
                    className="text-orange-300 animate-pulse drop-shadow-[0_0_10px_orange]"
                    size={30}
                  />
                </div>
                <div>
                  <h4 className="text-white text-lg font-semibold">
                    Welcome Bonus
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Enjoy <span className="font-semibold">20% off</span> on your
                    first order.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#ffffff05] border border-white/6 rounded-2xl p-6 ">
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
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
