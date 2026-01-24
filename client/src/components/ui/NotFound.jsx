import React from "react";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react"; // Make sure lucide-react is installed

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0b0f14] flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      
      {/* Background 404 Watermark */}
      <h1 className="text-[12rem] md:text-[22rem] font-black text-orange-500 opacity-5 absolute select-none leading-none">
        404
      </h1>

      <div className="relative z-10 flex flex-col items-center">
        {/* Error Message with Icon */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <Frown size={80} className="text-orange-500 transition-transform hover:scale-110" />
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Oops! Page Not Found
          </h2>
        </div>

        <p className="text-gray-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. 
          Let's get you back to the home page.
        </p>

        {/* Action Button */}
        <Link to="/">
          <button className="group relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95">
            <span>Back to Home</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 group-hover:translate-x-1 transition-transform" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="arrow-right" />
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>

      {/* Modern Radial Gradients for Depth */}
      <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-orange-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-150 h-150 bg-orange-900/10 rounded-full blur-[150px]"></div>
    </div>
  );
};

export default NotFound;