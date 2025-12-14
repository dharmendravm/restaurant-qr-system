import { User, Mail, Phone, Shield, Lock, Verified, VerifiedIcon } from "lucide-react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <div className="w-full mx-auto mt-6 flex gap-6">

      {/* SIDEBAR */}
      <aside className="w-60 bg-white border border-gray-200 rounded-2xl p-5 h-fit">
        <p className="text-xs font-semibold text-gray-500 mb-4">USER SETTINGS</p>

        <nav className="space-y-1">
          <Link
            className="
              flex items-center gap-3 px-3 py-2 rounded-xl
              bg-orange-50 border border-orange-200 text-orange-700 font-medium
            "
          >
            <User className="w-4 h-4" />
            Personal Info
          </Link>

          <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 w-full text-gray-700">
            <Lock className="w-4 h-4" />
            Password
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 w-full text-gray-700">
            <Mail className="w-4 h-4" />
            Notifications
          </button>

          <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 w-full text-gray-700">
            <Shield className="w-4 h-4" />
            Security
          </button>
        </nav>
      </aside>

      {/* MAIN PROFILE FORM */}
      <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Personal Information
        </h1>

        {/* Profile Image */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src=""
            className="w-28 h-28 rounded-full border border-gray-300 object-cover"
          />
          <button className="px-4 py-2 bg-orange-600 text-white text-sm rounded-xl hover:bg-orange-700 transition font-medium">
            Change Photo
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">First Name</label>
            <input
              className="mt-1 px-3 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              placeholder="Dharmendra"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Last Name</label>
            <input
              className="mt-1 px-3 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              placeholder="Verma"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col relative">
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              className="mt-1 px-3 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="demo@example.com"
              type="email"
            />
            <Verified className="absolute right-3 top-1/2  translate-1 w-4 h-4 text-gray-500 " />
          </div>

          {/* Phone */}
          <div className="flex flex-col relative">
            <label className="text-sm text-gray-600">Phone Number</label>
            <input 
              className="mt-1 px-3 py-2 rounded-xl  border border-gray-300 bg-gray-50 text-sm focus:ring-1 focus:ring-orange-400 outline-none "
              placeholder="+91 "
            />
              <Verified className="absolute right-3 top-1/2  translate-1 w-4 h-4 text-gray-500 " />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-10">
          <button className="px-6 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
