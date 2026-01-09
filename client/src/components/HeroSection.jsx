import {
  ArrowRight,
  Calendar,
  Clock4,
  HandPlatter,
  Star,
  UtensilsCrossed,
} from "lucide-react";

import GlassCard from "@/components/ui/Cart";

const HeroSection = () => {
  const scrollToMenu = () => {
    document.getElementById("menu-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <GlassCard
      as="section"
      className="px-6 py-14 lg:px-16 lg:py-18 text-center"
    >
      <div className="mx-auto max-w-3xl">
        {/* rating */}
        <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/10 bg-card-bg/60 backdrop-blur px-5 py-2 text-[11px] font-semibold tracking-wide text-text-main shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          <Star className="h-3.5 w-3.5 fill-brand-main text-brand-main" />
          Rated 4.8 / 5 by 2,000+ diners
        </div>

        {/* heading */}
        <h1 className="text-[2.6rem] lg:text-[3.1rem] font-bold tracking-[-0.015em] text-text-main leading-tight mb-6">
          Experience
          <span className="block bg-linear-to-r from-brand-main via-brand-soft to-brand-main bg-clip-text text-transparent">
            Premium Vegetarian Dining
          </span>
        </h1>

        {/* description */}
        <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-text-muted mb-8">
          Handcrafted vegetarian recipes, premium ingredients, and a refined
          dining experience designed for those who value quality.
        </p>

        {/* features */}
        <div className="flex flex-wrap justify-center gap-8 mb-10 text-xs text-text-muted">
          <span className="inline-flex items-center gap-2">
            <Clock4 className="h-4 w-4 text-brand-main/80" />
            Fast Service
          </span>
          <span className="inline-flex items-center gap-2">
            <UtensilsCrossed className="h-4 w-4 text-brand-main/80" />
            100% Vegetarian
          </span>
          <span className="inline-flex items-center gap-2">
            <HandPlatter className="h-4 w-4 text-brand-main/80" />
            Premium Quality
          </span>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={scrollToMenu}
            className="group inline-flex items-center justify-center rounded-full bg-brand-main px-9 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_color-mix(in_oklab,var(--color-brand-main),transparent_65%)] transition-all duration-700 ease-out hover:brightness-110"
          >
            Explore Menu
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-700 group-hover:translate-x-1" />
          </button>

          <button className="inline-flex items-center justify-center rounded-full border border-border bg-card-bg/60 backdrop-blur px-9 py-4 text-sm font-semibold text-text-muted transition-all duration-700 ease-out hover:text-text-main hover:bg-hover">
            <Calendar className="mr-2 h-4 w-4" />
            Reserve Table
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default HeroSection;
