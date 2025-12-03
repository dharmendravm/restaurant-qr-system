import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  GiftIcon,
} from 'lucide-react'
import { BrandLogo } from "@/components/BrandLogo";
import { InputFild } from "@/components/InputFild";
import { useDispatch } from "react-redux";



const LeftContent = () => {
      const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    dispatch(register(formData));
  };
  return (
          <div className="flex flex-col">
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 backdrop-blur-xl rounded-2xl p-5 px-6 flex flex-col justify-between shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              <div>
                <div className="mb-4">
                  <BrandLogo />
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  Create Account
                </h1>
                <p className="text-gray-400 text-sm mt-2 max-w-lg">
                  Join FlavorFusion & unlock premium restaurant rewards.
                  <GiftIcon
                    size={16}
                    className="inline ml-1 -translate-y-0.5 text-orange-300"
                  />
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputFild
                      label="Full Name"
                      icon={
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      }
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters"
                    />
                  </div>

                  <InputFild
                    label="Confirm Password"
                    icon={
                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    }
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm password"
                  />
                  
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-400 mt-1"
                    />
                    <p className="text-gray-400 text-xs">
                      I agree to the{" "}
                      <span className="text-orange-300 underline">Terms</span> &{" "}
                      <span className="text-orange-300 underline">
                        Privacy Policy
                      </span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-300 hover:bg-orange-500 text-black font-semibold 
                py-3 rounded-lg shadow-lg shadow-orange-500/20 transition delay-150 duration-300 ease-in-out active:scale-95 
                flex items-center justify-center gap-2"
                  >
                    Register
                  </button>
                </form>
              </div>

              <div className="pt-2 text-center text-xs text-gray-500">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-white font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Sign in <ArrowRight className="w-4" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
  )
}

export default LeftContent