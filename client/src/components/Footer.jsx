import {
  ChefHat,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  InstagramIcon,
} from "lucide-react";

const AppFooter = () => {
  return (
    <footer className="mt-20 bg-[#fffaf5] border-t border-orange-200/60">
      {/* Top CTA */}
      <div className="bg-linear-to-r from-amber-200/40 to-orange-200/20 py-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-orange-700 font-medium tracking-wide text-center sm:text-left">
            Simplify your restaurant workflow with{" "}
            <span className="font-semibold">TableOrbit</span>
          </p>

          <button className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-semibold shadow-sm hover:bg-orange-700 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-[#3a2f27]">

        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-200/60 border border-orange-300 flex items-center justify-center shadow-sm">
              <ChefHat className="w-5 h-5 text-orange-700" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-orange-700">TableOrbit</h2>
              <p className="text-[10px] uppercase tracking-wider text-orange-600">
                Management Suite
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Manage menus, orders, staff, and analytics — all in one beautifully designed dashboard.
          </p>

          <div className="flex gap-4 mt-3">
            <a className="text-gray-500 hover:text-orange-600 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a className="text-gray-500 hover:text-orange-600 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a className="text-gray-500 hover:text-orange-600 transition">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-orange-700 font-semibold mb-3 text-sm">Quick Access</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-600 cursor-pointer transition">Dashboard</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Menu Builder</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Orders</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Reservations</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Staff Control</li>
          </ul>
        </div>

        {/* Office */}
        <div>
          <h3 className="text-orange-700 font-semibold mb-3 text-sm">Head Office</h3>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-700 mt-0.5" />
              <p className="text-sm text-gray-700 leading-tight">
                Orbit Plaza, Green Park  
                <br /> Jaipur, Rajasthan
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-700" />
              <span className="text-sm text-gray-700">+91 0000000000</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-700" />
              <span className="text-sm text-gray-700">support@tableorbit.com</span>
            </div>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-orange-700 font-semibold mb-3 text-sm">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-600 cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Terms & Conditions</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Help Center</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Report Issue</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-200 py-5 text-center">
        <p className="text-[12px] text-gray-600">
          © {new Date().getFullYear()} TableOrbit — Built for Modern Restaurants.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
