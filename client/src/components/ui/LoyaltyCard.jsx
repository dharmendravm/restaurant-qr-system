import { borderVariants } from "./borderVariants";

const LoyaltyCard = ({ title, value, icon, border }) => {
  return (
    <div
      className={`
        bg-card-bg/30 border border-border rounded-lg px-4 p-1
        transition-all duration-300 ease-out cursor-pointer
        hover:bg-hover hover:-translate-y-0.5
        ${borderVariants[border]}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="opacity-80">{icon}</div>
        <h4 className="text-text-main text-sm font-medium">{title}</h4>
      </div>

      <p className="text-text-muted text-xs">{value}</p>
    </div>
  );
};

export default LoyaltyCard;
