import {
  ChefHat,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

const AppFooter = () => {
  return (
    <footer className="mt-20 bg-card-bg border-t border-border">
      {/* Top CTA */}
      <div className="bg-linear-to-r from-brand-soft/40 to-brand-main/20 py-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-text-main font-medium tracking-wide text-center sm:text-left">
            Simplify your restaurant workflow with{" "}
            <span className="font-semibold">TableOrbit</span>
          </p>

          <button className="px-4 py-2 rounded-lg bg-brand-main text-white text-sm font-semibold shadow-sm hover:opacity-90 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-text-main">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-soft border border-border flex items-center justify-center shadow-sm">
              <ChefHat className="w-5 h-5 text-brand-main" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-brand-main">TableOrbit</h2>
              <p className="text-[10px] uppercase tracking-wider text-text-subtle">
                Management Suite
              </p>
            </div>
          </div>

          <p className="text-sm text-text-muted leading-relaxed">
            Manage menus, orders, staff, and analytics — all in one beautifully
            designed dashboard.
          </p>

          <div className="flex gap-4 mt-3">
            <a className="text-text-subtle hover:text-brand-main transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a className="text-text-subtle hover:text-brand-main transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a className="text-text-subtle hover:text-brand-main transition">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-text-main font-semibold mb-3 text-sm">
            Quick Access
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-brand-main cursor-pointer transition">
              Dashboard
            </li>
            <li className="hover:text-brand-main cursor-pointer transition">
              Menu Builder
            </li>
            <li className="hover:text-brand-main cursor-pointer transition">
              Orders
            </li>
            <li className="hover:text-brand-main cursor-pointer transition">
              Reservations
            </li>
            <li className="hover:text-brand-main cursor-pointer transition">
              Staff Control
            </li>
          </ul>
        </div>

        {/* Office */}
        <div>
          <h3 className="text-text-main font-semibold mb-3 text-sm">
            Head Office
          </h3>

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-main mt-0.5" />
              <p className="text-sm text-text-muted leading-tight">
                Orbit Plaza, Green Park
                <br /> Jaipur, Rajasthan
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-main" />
              <span className="text-sm text-text-muted">
                +91 0000000000
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-main" />
              <span className="text-sm text-text-muted">
                support@tableorbit.com
              </span>
            </div>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-text-main font-semibold mb-3 text-sm">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-brand-main cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-brand-main cursor-pointer transition">
              Terms & Conditions
            </li>
            <li className="hover:text-brand-main cursor-pointer transition">
              Help Center
            </li>
            <li className="hover:text-brand-main cursor-pointer transition">
              Report Issue
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-5 text-center">
        <p className="text-[12px] text-text-muted">
          © {new Date().getFullYear()} TableOrbit — Built for Modern Restaurants.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
