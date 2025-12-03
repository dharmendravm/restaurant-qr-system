export const Tier = ({ title, range, offer }) => (
  <div className="bg-[#00000040] border border-gray-900 rounded-lg p-1.5 px-4 mb-2">
    <div className="flex items-center justify-between">
      <span className="text-gray-100 text-sm font-semibold">
        {title} Member
      </span>
      <span className="text-gray-400 text-xs">{range}</span>
    </div>
    <p className="text-gray-500 text-xs mt-1">{offer}</p>
  </div>
);