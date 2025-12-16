import {
  ArrowRight,
  Award,
  Calendar,
  Clock4,
  HandPlatter,
  Star,
  UtensilsCrossed,
} from "lucide-react";

const HeroSection = () => {

    const scrollToMenu = () => {
    document.getElementById("menu-section").scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.1fr] gap-10 items-center">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-[#fff1d6] px-3 py-1 text-[11px] font-semibold text-[#8b3a1a] border border-[#f5d9aa] mb-3">
          <HandPlatter className="text-[#f97316] h-3 w-3" />
          Fresh • Fast • Made with Love
        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1b130c] leading-tight mb-3">
          Savor the Taste of <br />
          <span className="text-[#f97316]">Perfection.</span>
        </h1>

        <p className="max-w-md text-sm text-[#7a6a5a] mb-5">
          Fresh ingredients, mouth-watering recipes and a passion for good food
          delivered to your table or ready for pick-up.
        </p>

        <div className="flex flex-row mb-4 justify-start gap-2">
          <div className="inline-flex items-center gap-1 text-[11px] text-[#a08f7d]">
            <Clock4 className="h-4 w-4 text-amber-600" />
            Fast Delivery
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] text-[#a08f7d] sm:flex-c">
            <UtensilsCrossed className="h-4 w-4 text-amber-600" />
            100% Vegetarian
          </div>
        </div>

        <div 
        onClick={scrollToMenu}
         className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 mb-4">
          <button className="group w-full sm:w-auto items-center rounded-full flex justify-center bg-[#1b130c] px-6 py-2.5 text-sm font-semibold text-[#fff6eb] shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:bg-[#2b1c0f] active:scale-95 transition">
            Explore Menu
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="w-full sm:w-auto rounded-full flex justify-center items-center bg-[#1b130c] px-6 py-2.5 text-sm font-semibold text-[#fff6eb] shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:bg-[#2b1c0f] active:scale-95 transition">
            <Calendar className="h-4 w-4 mr-2" />
            Reserve a Table
          </button>

          <button className="w-full sm:w-auto rounded-full flex justify-center items-center bg-[#fff1d6] px-21 py-2.5 text-xs sm:text-sm font-semibold text-[#8b3a1a] border border-[#f5d9aa] hover:border-[#fdb12f] transition delay-75 ease-in-out duration-100">
            Free Delivery Above ₹500
          </button>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] text-[#a08f7d]">
          <div className="p-1 rounded-full bg-amber-200">
            <Star className="h-4 w-4 text-amber-600" />
          </div>
          4.8/5 rated by 2k+ happy diners
        </div>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl shadow-sm overflow-hidden">
        <div className="aspect-15/10 w-full overflow-hidden">
          <img
            src="/burger.png"
            alt="Burger"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
