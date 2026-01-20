import { BrandLogo } from "@/components/shared/BrandLogo";
import { Gift, LogIn, Sparkles, User, UserPlus } from "lucide-react";
import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UtensilsCrossed, ChefHat, Leaf, Bell, Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { session as createSession } from "@/store/guestSlice";
import { useToast } from "@/components/ui/toast";
import { GoogleLoginUI } from "@/components/auth/buttons/GoogleLoginButton";
import { GitHubLoginUI } from "@/components/auth/buttons/GithubLoginButton";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { success, error: toastError } = useToast();

  const getDeviceId = () => {
    let id = localStorage.getItem("deviceId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("deviceId", id);
    }
    return id;
  };

  const handleContinueAsGuest = async () => {
    try {
      const qrSlug = searchParams.get("qr");

      if (!qrSlug) {
        toastError("Invalid QR link");
        return;
      }

      const existingSessionToken = localStorage.getItem("sessionToken");

      if (!existingSessionToken) {
        navigate("/");
      }

      const deviceId = getDeviceId();

      const res = await dispatch(createSession({ deviceId, qrSlug })).unwrap();

      localStorage.setItem("sessionToken", res.data.sessionToken);
      localStorage.setItem("tableNumber", res.data.tableNumber);

      success("Guest session started");
      navigate("/");
      
    } catch (err) {
      console.error("Error starting guest session:", err);
      toastError("Guest login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-app-bg text-text-main">
      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            {/* Welcome bonus */}
            <div className="bg-card-bg border border-border backdrop-blur-md rounded-2xl px-7 py-3 mb-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Sparkles className="text-brand-main drop-shadow" size={28} />
                </div>
                <div>
                  <h4 className="text-text-main text-lg font-semibold">
                    Welcome Bonus
                  </h4>
                  <p className="text-text-muted text-sm mt-1">
                    Enjoy <span className="font-semibold">20% off</span> on your
                    first order.
                  </p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-card-bg border border-border backdrop-blur-xl rounded-2xl p-5 shadow-lg">
              <div className="p-3">
                <div className="mb-4">
                  <BrandLogo />
                </div>

                <h1 className="text-3xl lg:text-4xl font-extrabold text-text-main">
                  Welcome To TableOrbit
                </h1>

                <p className="text-text-muted text-sm mt-2 max-w-lg">
                  Sign in to access your premium rewards.
                  <Gift
                    size={16}
                    className="inline ml-1 -translate-y-0.5 text-brand-main"
                  />
                </p>

                {/* ACTIONS */}
                <form className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      to="/login"
                      className="w-full bg-hover hover:bg-brand-fade text-text-main font-semibold py-3 rounded-xl border border-border flex items-center justify-center gap-2 transition active:scale-95"
                    >
                      <LogIn className="w-5 h-5" />
                      <span className="text-sm">Log In</span>
                    </Link>

                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleContinueAsGuest();
                      }}
                      className="w-full bg-card-bg hover:bg-hover border border-border text-text-main font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition active:scale-95"
                    >
                      <User className="w-5 h-5 text-text-muted" />
                      <span className="text-sm">Continue as Guest</span>
                    </Link>
                  </div>

                  <Link
                    to="/register"
                    className="w-full bg-brand-main hover:opacity-90 text-white font-medium py-2.5 rounded-xl border border-brand-main/30 flex items-center justify-center gap-2 transition active:scale-95"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span className="text-sm">Register Now</span>
                  </Link>

                  <div className="flex flex-col sm:flex-row gap-1.5">
                    <GoogleLoginUI />
                    <GitHubLoginUI />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="flex flex-col justify-start gap-4">
            <div className="bg-card-bg border border-border rounded-2xl p-6">
              <div className="grid gap-3">
                {features.map((item, i) => (
                  <FeatureCard key={i} {...item} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
const features = [
  {
    icon: UtensilsCrossed,
    title: "Table-Linked Experience",
    desc: "Scan → App auto-connects with your table for a smooth dining flow.",
  },
  {
    icon: ChefHat,
    title: "Chef Highlights",
    desc: "See who crafted your dish and their speciality.",
  },
  {
    icon: Leaf,
    title: "Ingredient Transparency",
    desc: "Know where your ingredients come from — fresh & clean.",
  },
  {
    icon: Bell,
    title: "Silent Service Mode",
    desc: "Need service? Request quietly without calling loudly.",
  },
  {
    icon: Sparkles,
    title: "Dynamic Rewards",
    desc: "Weather, time & behavior based bonuses for a unique experience.",
  },
  {
    icon: Clock,
    title: "Live Kitchen Heat Map",
    desc: "Track dish wait-times in real time. No surprises.",
  },
];

const FeatureCard = ({ icon, title, desc }) => {
  const Icon = icon;
  return (
    <div className="bg-card-bg border border-border rounded-xl p-2.5 transition hover:bg-hover flex items-start gap-3">
      <Icon className="w-5 h-5 text-brand-main" />
      <div>
        <h4 className="text-text-main text-sm font-semibold">{title}</h4>
        <p className="text-text-muted text-xs mt-1">{desc}</p>
      </div>
    </div>
  );
};
