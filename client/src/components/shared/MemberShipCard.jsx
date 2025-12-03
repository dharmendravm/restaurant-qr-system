const borderVariants = {       
  Diamond: "hover:border-cyan-300",       
  Ruby: "hover:border-rose-400",         
  Emerald: "hover:border-green-400",
  Sapphire: "hover:border-blue-500",     
  White: "hover:border-white",           
};

export const Card = ({ title, value, border }) => (
  <div className={`bg-[rgba(255,255,255,0.02)] border border-white/6 transition delay-100 duration-300 ease-in-out ${borderVariants[border]} rounded-lg p-3 flex items-center justify-between`}>
    <h4 className="text-gray-100 text-sm font-semibold hover:border-amber-300">{title}</h4>
    <p className="text-gray-400 text-xs">{value}</p>
  </div>
);