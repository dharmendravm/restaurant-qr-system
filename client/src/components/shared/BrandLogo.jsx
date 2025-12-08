import React from "react";
import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

export const BrandLogo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-3 group">
        <div
          className="
              w-11 h-11 rounded-2xl 
              bg-linear-to-br from-orange-500/30 to-yellow-400/10
              border border-orange-300/10 backdrop-blur-md
              shadow-[0_4px_15px_rgba(0,0,0,0.25)]
              flex items-center justify-center 
              group-hover:scale-105 transition
            "
        >
          <ChefHat className="w-6 h-6 text-orange-300 drop-shadow-[0_0_4px_orange]"
 />
        </div>

        <div className="leading-tight">
          <h2
            className="
                text-xl font-extrabold tracking-wide 
                text-orange-200 drop-shadow-[0_0_10px_rgba(255,165,0,0.45)]
              "
          >
            TableOrbit
          </h2>

          <p className="text-[9px] text-gray-400/80 uppercase tracking-widest">
            Restaurant Management
          </p>
        </div>
      </Link>
    </div>
  );
};
