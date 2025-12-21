import {
  ArrowRight,
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
        <p className="bg-hover text-brand-main border border-border inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold mb-3">
          <HandPlatter className="text-brand-main h-3 w-3" />
          Fresh • Fast • Made with Love
        </p>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-main leading-tight mb-3">
          Savor the Taste of <br />
          <span className="text-brand-main">Perfection.</span>
        </h1>

        <p className="max-w-md text-sm text-text-muted mb-5">
          Fresh ingredients, mouth-watering recipes and a passion for good food
          delivered to your table or ready for pick-up.
        </p>

        <div className="flex flex-row mb-4 justify-start gap-2">
          <div className="inline-flex items-center gap-1 text-[11px] text-text-subtle">
            <Clock4 className="h-4 w-4 text-brand-main" />
            Fast Delivery
          </div>
          <div className="inline-flex items-center gap-1 text-[11px] text-[#a08f7d] sm:flex-c">
            <UtensilsCrossed className="h-4 w-4 text-brand-main" />
            100% Vegetarian
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 mb-4">
          <button
            onClick={scrollToMenu}
            className="cursor-pointer group w-full bg-brand-main text-white hover:opacity-90 sm:w-auto items-center rounded-full flex justify-center px-6 py-2.5 text-sm font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.25)] active:scale-95 transition"
          >
            Explore Menu
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="cursor-pointer w-full bg-btn-black text-white hover:opacity-90 sm:w-auto rounded-full flex justify-center items-center px-6 py-2.5 text-sm font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.25)] active:scale-95 transition">
            <Calendar className="h-4 w-4 mr-2" />
            Reserve a Table
          </button>

          <button className="cursor-pointer w-full bg-hover text-brand-main border border-border hover:border-brand-main sm:w-auto rounded-full flex justify-center items-center px-21 py-2.5 text-xs sm:text-sm font-semibold  transition delay-75 ease-in-out duration-100">
            Free Delivery Above ₹500
          </button>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] text-cat-all-bg">
          <div className="p-1 rounded-full bg-hover">
            <Star className="h-4 w-4 text-brand-main
" />
          </div>
          4.8/5 rated by 2k+ happy diners
        </div>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl shadow-sm overflow-hidden border border-border bg-card-bg">
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
