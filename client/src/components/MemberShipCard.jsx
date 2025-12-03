export const Card = ({ title, value, Border }) => (
  <div className={`bg-[rgba(255,255,255,0.02)] border border-white/6 transition delay-150 duration-300 ease-in-out hover:${Border} rounded-lg p-3 flex items-center justify-between`}>
    <h4 className="text-gray-100 text-sm font-semibold hover:border-amber-300">{title}</h4>
    <p className="text-gray-400 text-xs">{value}</p>
  </div>
);