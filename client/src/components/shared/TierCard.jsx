const borderVariants = {
  Bronze: "hover:border-amber-600",     
  Silver: "hover:border-zinc-400",      
  Gold: "hover:border-yellow-400",       
  Diamond: "hover:border-cyan-300",       
  Ruby: "hover:border-rose-400",         
  Emerald: "hover:border-green-400",
  Sapphire: "hover:border-blue-500",     
  White: "hover:border-white",           
};



export const Tier = ({ title, range, offer, border}) => (
  <div className={`bg-[#00000040] border  border-gray-900 rounded-lg p-1.5 px-4 mb-2  transition delay-100 duration-300 ease-in-out ${borderVariants[border]}`}>
    <div className="flex items-center justify-between">
      <span className="text-gray-100 text-sm font-semibold">
        {title} Member
      </span>
      <span className="text-gray-400 text-xs">{range}</span>
    </div>
    <p className="text-gray-500 text-xs mt-1">{offer}</p>
  </div>
);