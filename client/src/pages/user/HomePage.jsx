import React from "react";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";

const HomePage = () => {
  return (
    <main className="container mx-auto px-4 space-y-12 lg:space-y-16">
      <HeroSection />
      <MenuSection />
    </main>
  );
};

export default HomePage;
