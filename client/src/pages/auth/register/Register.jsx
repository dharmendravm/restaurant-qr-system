import React from "react";
import { GlowBG } from "@/components/GlowBG";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
// import { register } from '../redux/authSlice';

const Register = () => {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center py-4 px-4  overflow-hidden">
      <GlowBG />
      <GlowBG />

      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch overflow-hidden">
            <LeftContent/>
            <RightContent/>
        </div>
      </div>
    </div>
  );
};

export default Register;
