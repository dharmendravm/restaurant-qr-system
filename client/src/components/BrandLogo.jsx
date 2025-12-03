import React from "react";
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";

export const BrandLogo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-3 group">
        <div
          className="
              w-11 h-11 rounded-2xl 
              bg-linear-to-br from-orange-500/40 to-yellow-500/20
              border border-orange-300/20 backdrop-blur-md
              shadow-[0_0_20px_rgba(255,165,0,0.3)]
              flex items-center justify-center 
              group-hover:scale-105 transition
            "
        >
          <Flame className="w-6 h-6 text-orange-300 drop-shadow-[0_0_8px_rgba(255,165,0,0.5)]" />
        </div>

        <div className="leading-tight">
          <h2
            className="
                text-xl font-extrabold tracking-wide 
                text-orange-300 drop-shadow-[0_0_10px_rgba(255,165,0,0.45)]
              "
          >
            ScanBite
          </h2>

          <p className="text-[9px] text-gray-400 uppercase tracking-widest">
            Restaurant Management
          </p>
        </div>
      </Link>
    </div>
  );
};
