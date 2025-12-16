import axios from "axios";
import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import { MenuCard } from "@/components/ui/MenuCard";
import MenuSection from "@/components/MenuSection";
import CartPage from "@/components/Cart";

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  // useEffect(() => {
  //   axios.get(`${API_URL}/api/v1/menu`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //   });
  // }, []);



  return (
    <div className="space-y-12 container mx-auto px-4">
      <HeroSection />
      <CartPage/>

      {/* Signature dishes */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button className="rounded-full bg-[#1b130c] px-3 py-1.5 text-[#fff6eb] font-semibold">
              All
            </button>
            <button className="rounded-full bg-[#fff1d6] px-3 py-1.5 text-[#8b3a1a] font-semibold border border-[#f5d9aa]">
              Burger
            </button>
            <button className="rounded-full bg-[#ffe5e5] px-3 py-1.5 text-[#b43434] font-semibold border border-[#f5c4c4]">
              Wraps
            </button>
            <button className="rounded-full bg-[#e7f6ff] px-3 py-1.5 text-[#2563eb] font-semibold border border-[#bfdbfe]">
              Pizza
            </button>
          </div>
        </div>
        <MenuSection />
      </section>
    </div>
  );
};

export default HomePage;
