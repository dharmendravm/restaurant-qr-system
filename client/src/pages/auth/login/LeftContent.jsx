import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";
import {
  Mail,
  Lock,
  ArrowRight,
  Gift,
  UserCheck,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { GoogleLoginUI } from "@/components/GoogleUI";
import { InputFild } from "@/components/InputFild";


const LeftContent = () => {
      const dispatch = useDispatch();
      const { loading, error } = useSelector((state) => state.auth);
    
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
        dispatch(login(formData));
      };

  return (
          <div className="flex flex-col justify-center">  
          {/* •••••••• */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 backdrop-blur-xl rounded-2xl p-5 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
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
                    type="submit"
                    className="w-full bg-amber-300 hover:bg-orange-500 text-black font-semibold 
                  py-3 rounded-lg shadow-lg shadow-orange-500/20 transition active:scale-95 
                  flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      "Signing in..."
                    ) : (
                      <>
                        <UserCheck className="w-5" />
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
  )
}

export default LeftContent