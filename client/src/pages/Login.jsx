import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice.js';
import { Link } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight, UtensilsCrossed, Award, Gift, Percent } from 'lucide-react';


const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
    
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

   
      <div className="relative w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
        
          <div className="w-full">
           
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-gray-200" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">SavoryBites</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Restaurant Management</p>
                </div>
              </div>
            </div>

           
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400 text-xs">
                Sign in to access your account and rewards
              </p>
            </div>

           
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                  <span className="text-red-400 text-xs">!</span>
                </div>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

        
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all duration-200 text-sm"
                    placeholder="riteshpatidar088@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all duration-200 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-900/50 border-gray-700 rounded focus:ring-2 focus:ring-gray-600"
                  />
                  <label htmlFor="remember" className="ml-2 text-xs text-gray-400">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-xs text-white/80 hover:text-white transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

        
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-white font-medium hover:text-gray-300 inline-flex items-center gap-1">
                  Sign up <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>

     
          <div className="w-full space-y-8">
         
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-6 h-6 text-gray-400" />
                <h3 className="text-lg font-bold text-gray-100">Your Benefits</h3>
              </div>
              <p className="text-gray-400 text-xs">
                Access your loyalty points, membership tier, and exclusive offers
              </p>
            </div>

     
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-gray-400" />
                <h3 className="text-lg font-bold text-gray-100">Loyalty Points</h3>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="text-3xl font-bold text-gray-200 mb-1">0</div>
                  <p className="text-gray-500 text-xs">Current Points</p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Earn Rate</span>
                    <span className="text-gray-300 font-semibold">1 Point = ₹1</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Redeem Rate</span>
                    <span className="text-gray-300 font-semibold">100 Points = ₹10</span>
                  </div>
                </div>
              </div>
            </div>

          
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-6 h-6 text-gray-400" />
                <h3 className="text-lg font-bold text-gray-100">Membership Tiers</h3>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-100 font-semibold text-sm">Bronze</span>
                    <span className="text-gray-400 text-xs">0-500 Points</span>
                  </div>
                  <p className="text-gray-500 text-[10px]">5% discount on orders</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-100 font-semibold text-sm">Silver</span>
                    <span className="text-gray-400 text-xs">501-2000 Points</span>
                  </div>
                  <p className="text-gray-500 text-[10px]">10% discount + Priority support</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-100 font-semibold text-sm">Gold</span>
                    <span className="text-gray-400 text-xs">2000+ Points</span>
                  </div>
                  <p className="text-gray-500 text-[10px]">15% discount + Exclusive offers</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
              <h4 className="text-base font-semibold text-gray-100 mb-2">Member Benefits</h4>
              <ul className="space-y-1.5 text-xs text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                  Earn points on every order
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                  Redeem points for discounts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                  Tier-based discounts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                  Exclusive member offers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;