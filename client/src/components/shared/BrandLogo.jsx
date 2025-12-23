import React from "react";
import { ChefHat } from "lucide-react";

export const BrandLogo = () => {
  return (
    <div
      className="
      w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12
      rounded-xl sm:rounded-2xl
      bg-linear-to-br from-brand-soft to-brand-fade
     hover:border-brand-main backdrop-blur-md
      flex items-center justify-center
      transition-all duration-200
                "
    >
      <ChefHat className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-brand-main" />
    </div>
  );
};
