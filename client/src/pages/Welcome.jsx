import { BrandLogo } from "@/components/shared/BrandLogo";
import { Gift, LogIn, Sparkles, User, UserPlus } from "lucide-react";
import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UtensilsCrossed, ChefHat, Leaf, Bell, Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { session as createSession } from "@/redux/guestSlice";
import { useToast } from "@/components/ui/toast";

// "bb691f994512",
//         "qrCodeURL": "http://localhost:5173/welcome?qr=bb691f994512",
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
      const deviceId = getDeviceId();

      await dispatch(createSession({ deviceId, qrSlug })).unwrap();

      success("Guest session started");
      navigate("/menu");
    } catch (err) {
      toastError("Guest login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 overflow-hidden">
      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col justify-center">
            {/* welcome card */}
            <div className="bg-[#ffffff08] border mb-3 border-white/6 backdrop-blur-md rounded-2xl px-7 p-2 ">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Sparkles
                    className="text-orange-300 drop-shadow-[0_0_4px_orange]"
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
                      className=" w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                    >
                      <LogIn className="w-5 h-5 text-white/90" />
                      <span className="text-sm">Log In</span>
                    </Link>

                    {/* //! action */}
                    <Link
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleContinueAsGuest();
                      }}
                      className=" w-full border border-white/15 bg-gray-800/5 hover:bg-gray-600/10 text-white/90 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                    >
                      <User className="w-5 h-5 text-white/70" />
                      <span className="text-sm">Continue as Guest</span>
                    </Link>
                  </div>

                  <Link
                    to="/register"
                    className="w-full bg-orange-500/90  hover:bg-orange-500  text-white font-medium py-3 rounded-xl border border-orange-400/20 backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-200 active:scale-95
  "
                  >
                    <UserPlus className="w-5 h-5 text-white/90" />
                    <span className="text-sm">Register Now</span>
                  </Link>
                </form>
              </div>
            </div>
          </div>

          <aside className="flex flex-col justify-start gap-4">
            <div className="bg-[#ffffff05] border border-white/6 rounded-2xl p-6 ">
              <div className="grid gap-3">
                <div className="grid gap-3">
                  {features.map((item, i) => (
                    <FeatureCard key={i} {...item} />
                  ))}
                </div>
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
    color: "text-amber-300",
    title: "Table-Linked Experience",
    desc: "Scan → App auto-connects with your table for a smooth dining flow.",
  },
  {
    icon: ChefHat,
    color: "text-rose-300",
    title: "Chef Highlights",
    desc: "See who crafted your dish and their speciality.",
  },
  {
    icon: Leaf,
    color: "text-emerald-300",
    title: "Ingredient Transparency",
    desc: "Know where your ingredients come from — fresh & clean.",
  },
  {
    icon: Bell,
    color: "text-blue-300",
    title: "Silent Service Mode",
    desc: "Need service? Request quietly without calling loudly.",
  },
  {
    icon: Sparkles,
    color: "text-purple-300",
    title: "Dynamic Rewards",
    desc: "Weather, time & behavior based bonuses for a unique experience.",
  },
  {
    icon: Clock,
    color: "text-orange-300",
    title: "Live Kitchen Heat Map",
    desc: "Track dish wait-times in real time. No surprises.",
  },
];

const FeatureCard = ({ icon: Icon, color, title, desc }) => {
  return (
    <div
      className="bg-white/3 border border-white/10 rounded-xl p-2.5 backdrop-blur-xl
      transition-all duration-300 hover:bg-white/6 hover:-translate-y-0.5
      flex items-start gap-3"
    >
      <Icon className={`w-5 h-5 ${color}`} />
      <div>
        <h4 className="text-gray-100 text-sm font-semibold">{title}</h4>
        <p className="text-gray-400 text-xs mt-1">{desc}</p>
      </div>
    </div>
  );
};
