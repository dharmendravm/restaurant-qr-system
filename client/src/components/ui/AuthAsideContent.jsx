import { Award, Gift, Percent, Sparkles } from 'lucide-react'
import React from 'react'
import LoyaltyCard from './LoyaltyCard'
import MembershipTier from './MembershipTier'

const AuthAsideContent = () => {
  return (
    <aside className="hidden lg:flex flex-col gap-4">
  {/* Welcome card */}
  <div className="bg-card-bg/10 border border-border backdrop-blur-md rounded-2xl px-6 py-1.5">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 flex items-center justify-center">
        <Sparkles className="text-brand-main drop-shadow" size={30} />
      </div>
      <div>
        <h4 className="text-lg font-semibold">Welcome Back</h4>
        <p className="text-text-muted text-sm mt-1">
          Continue earning and redeeming your points.
        </p>
      </div>
    </div>
  </div>

  {/* Loyalty Program */}
  <div className="bg-card-bg/10 border border-border rounded-2xl p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Award className="text-brand-main" /> Loyalty Program
      </h3>
      <span className="text-text-muted text-xs">Member benefits</span>
    </div>

    <div className="grid gap-2">
      <LoyaltyCard
        title="Earn Points"
        value="1 Point = ₹1"
        icon={<Gift className="w-5 h-5 text-emerald-300" />}
        border="Diamond"
      />
      <LoyaltyCard
        title="Redeem Points"
        value="100 Points = ₹10"
        icon={<Award className="w-5 h-5 text-cyan-300" />}
        border="Ruby"
      />
      <LoyaltyCard
        title="Bonus Points"
        value="+50 Points"
        icon={<Sparkles className="w-5 h-5 text-amber-300" />}
        border="Emerald"
      />
    </div>
  </div>

  {/* Membership Tiers */}
  <div className="bg-card-bg/10 border border-border rounded-2xl px-5 py-4">
    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Percent className="text-brand-main" /> Membership Tiers
    </h4>

    <MembershipTier
      title="Bronze"
      range="0-500 pts"
      offer="5% Discount"
      border="Bronze"
    />
    <MembershipTier
      title="Silver"
      range="501-2000 pts"
      offer="10% + Support"
      border="Silver"
    />
    <MembershipTier
      title="Gold"
      range="2000+ pts"
      offer="15% + Exclusive"
      border="Gold"
    />
  </div>
</aside>

  )
}

export default AuthAsideContent