const AuthInput = ({ label, icon, className = "", ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label className="text-xs text-text-muted-300 mb-2 block">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </span>
        )}

        <input
          {...props}
          className={`w-full ${icon ? "pl-11" : "pl-3"} pr-3 py-2.5
       bg-hover border border-border rounded-lg
       text-text-main placeholder-text-muted
       focus:outline-none focus:border-brand-main/40
       focus:ring-1 focus:ring-brand-main/20
       transition-all duration-200 text-sm`}
        />
      </div>
    </div>
  );
};

export default AuthInput;
