import React from 'react'
import {
  Sparkles,
  Award,
  Percent,
} from "lucide-react";
import { Tier } from "@/components/TierCard";
import { Card } from "@/components/MemberShipCard";

const RightContent = () => {
  return (
          <aside className="flex flex-col justify-start gap-3 min-w-0">
            {/* Welcome Card */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-white/6 backdrop-blur-md rounded-2xl px-6 p-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Sparkles className="text-orange-300" size={30} />
                </div>
                <div>
                  <h4 className="text-white text-lg font-semibold">
                    Welcome Back
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">
                    Continue earning and redeeming your points.
                  </p>
                </div>
              </div>
            </div>

            {/* Loyalty Program */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <Award className="text-orange-300" /> Loyalty Program
                </h3>
                <span className="text-gray-400 text-xs">Member benefits</span>
              </div>

              <div className="grid gap-3">
                <Card title="Earn Points" value="1 Point = ₹1" />
                <Card title="Redeem Points" value="100 Points = ₹10" />
                <Card title="Bonus Points" value="+50 Points" />
              </div>
            </div>

            {/* Membership */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-2xl px-6 p-2">
              <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Percent className="text-orange-300" /> Membership Tiers
              </h4>
              <Tier title="Bronze" range="0-500 pts" offer="5% Discount" />
              <Tier title="Silver" range="501-2000 pts" offer="10% + Support" />
              <Tier title="Gold" range="2000+ pts" offer="15% + Exclusive" />
            </div>
          </aside>
  )
}

export default RightContent