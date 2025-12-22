import { borderVariants } from "./borderVariants";

const MembershipTier = ({ title, range, offer, border }) => {
  return (
    <div
      className={`
        bg-card-bg/30 border border-border rounded-lg px-4 py-1 mb-1.5
        transition-all duration-300 ease-out cursor-pointer
        hover:bg-hover hover:-translate-y-0.5
        ${borderVariants[border]}
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-text-main text-sm font-semibold">
          {title} Member
        </span>
        <span className="text-text-muted text-xs">{range}</span>
      </div>

      <p className="text-text-muted text-xs mt-1">{offer}</p>
    </div>
  );
};

export default MembershipTier;
