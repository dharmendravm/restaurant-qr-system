import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, UserPlus, ArrowRight, UtensilsCrossed, Gift, Award, Percent, Sparkles, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
        setShowPassword(prev => !prev);
    } else if (field === 'confirmPassword') {
        setShowConfirmPassword(prev => !prev);
    }
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
      isValid = false;
    }

    if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
        isValid = false;
    } else if (formData.phone.length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits.';
        isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    if (!termsChecked) {
        newErrors.terms = 'You must agree to the terms.';
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted successfully:', formData);
    } else {
        console.log('Form submission blocked due to errors.');
    }
  };
  
  const getInputClasses = (fieldName) => `
    w-full pl-9 pr-10 py-2.5 bg-gray-900/50 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all duration-200 text-sm
    ${errors[fieldName] 
        ? 'border-2 border-red-500 focus:ring-red-500 focus:border-red-500' 
        : 'border border-gray-800 focus:ring-2 focus:ring-gray-600 focus:border-gray-600'}
  `;
  
  const ErrorMessage = ({ error }) => (
    error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null
  );

  return (
    // CHANGE 1: Use 'min-h-screen' and 'py-12' to ensure spacing, 
    // but the key changes are below in the content wrapper.
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12"> 
    
      {/* Background Blobs (unchanged) */}
      <style>
        {`
            @keyframes blob {
                0% { transform: translate(0, 0) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0, 0) scale(1); }
            }
            .animate-blob {
                animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.5, 1);
            }
            .animation-delay-2000 {
                animation-delay: 2s;
            }
        `}
      </style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      
      {/* CHANGE 2: This wrapper ensures the content doesn't exceed 100% of the viewport height (vh) 
         and becomes scrollable if the content is too tall. We use 'max-h-[95vh]' and 'overflow-y-auto'
         to limit its size within the screen. */}
      <div className="relative w-full max-w-7xl mx-auto px-6 max-h-[95vh] overflow-y-auto custom-scrollbar"> 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-gray-950/30 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-gray-800 shadow-2xl">
          
          {/* Registration Form Column (Form content is largely unchanged) */}
          <div className="w-full">
            {/* ... Form Header and Title ... */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-gray-200" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">SavoryBites</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Restaurant Loyalty</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-white mb-2">Create Your Account</h1>
              <p className="text-gray-400 text-sm">
                Join our loyalty program and start earning rewards instantly.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={getInputClasses('name')} placeholder="Enter Full Name" />
                  </div>
                  <ErrorMessage error={errors.name} />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={getInputClasses('email')} placeholder="Enter your Email" />
                  </div>
                  <ErrorMessage error={errors.email} />
                </div>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-300">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={getInputClasses('phone')} placeholder="Enter Mobile No." maxLength="15" />
                  </div>
                  <ErrorMessage error={errors.phone} />
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} className={getInputClasses('password')} placeholder="Enter Password" />
                    <button type="button" onClick={() => togglePasswordVisibility('password')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white" aria-label={showPassword ? "Hide password" : "Show password"}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <ErrorMessage error={errors.password} />
                  <p className="mt-1 text-xs text-gray-500">Min. 6 characters</p>
                </div>
              </div>

            
              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-300">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} className={getInputClasses('confirmPassword')} placeholder="Confirm Password" />
                  <button type="button" onClick={() => togglePasswordVisibility('confirmPassword')} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
                <ErrorMessage error={errors.confirmPassword} />
              </div>

              
              <div className="flex items-start pt-1">
                <input id="terms" type="checkbox" checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} className={`mt-0.5 w-4 h-4 rounded focus:ring-2 transition-all duration-100 ${
                    errors.terms 
                        ? 'bg-red-900 border-red-500 focus:ring-red-500' 
                        : 'bg-gray-900/50 border-gray-700 focus:ring-gray-600'
                    }`}
                />
                <label htmlFor="terms" className="ml-2 text-xs text-gray-400">
                  I agree to the{' '}<a href="#" className="text-white/80 hover:text-white underline">Terms</a> and{' '}<a href="#" className="text-white/80 hover:text-white underline">Privacy Policy</a>
                </label>
              </div>
              <ErrorMessage error={errors.terms} />

              <button type="submit" className="w-full py-2.5 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-md">
                <UserPlus className="w-5 h-5" />
                <span>Create Account</span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-white font-medium hover:text-gray-300 inline-flex items-center gap-1">
                  Sign in <ArrowRight className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>

        
          {/* Benefits Column (unchanged) */}
          <div className="w-full space-y-8 lg:mt-0 mt-8">
            {/* ... Benefit details ... */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-gray-100">Welcome Bonus!</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-green-400" />
                  <span className="text-gray-100 font-semibold text-base">20% Welcome Discount</span>
                </div>
                <p className="text-gray-400 text-sm ml-7">Get 20% off on your first order after registration.</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-gray-100">Loyalty Points Program</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:border-gray-600 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-100 font-semibold text-sm">Earn Points</span>
                    <span className="text-yellow-300 font-extrabold text-sm">1 Point = ₹1</span>
                  </div>
                  <p className="text-gray-500 text-xs">Earn 1 point for every ₹1 you spend.</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:border-gray-600 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-100 font-semibold text-sm">Redeem Points</span>
                    <span className="text-yellow-300 font-extrabold text-sm">100 Points = ₹10</span>
                  </div>
                  <p className="text-gray-500 text-xs">Use points to get discounts on future orders.</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:border-gray-600 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-100 font-semibold text-sm">Bonus Points</span>
                    <span className="text-yellow-300 font-extrabold text-sm">+50 Points</span>
                  </div>
                  <p className="text-gray-500 text-xs">Get 50 bonus points *just for registering*.</p>
                </div>
              </div>
            </div>

            {/* Membership Tiers */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-bold text-gray-100">Membership Tiers</h3>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:bg-gray-900 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-100 font-semibold text-sm">Bronze Member</span>
                    <span className="text-gray-400 text-xs">0-500 Points</span>
                  </div>
                  <p className="text-gray-500 text-[10px]">5% discount on all orders</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:bg-gray-900 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-100 font-semibold text-sm">Silver Member</span>
                    <span className="text-gray-400 text-xs">501-2000 Points</span>
                  </div>
                  <p className="text-gray-500 text-[10px]">10% discount + Priority support</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:bg-gray-900 transition">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-100 font-semibold text-sm">Gold Member</span>
                    <span className="text-gray-400 text-xs">2000+ Points</span>
                  </div>
                  <p className="text-gray-500 text-[10px]">15% discount + Exclusive offers</p>
                </div>
              </div>
            </div>

            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5">
              <h4 className="text-base font-semibold text-gray-100 mb-3">Additional Perks</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Birthday special offers and discounts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Early access to new menu items
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Free delivery on orders above ₹500
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Exclusive member-only events
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Register;