import { Loader2 } from "lucide-react";

const AuthButton = ({
  loading,
  children,
  loadingText = "Processing...",
  className = "",
}) => {
  return (
    <button
      disabled={loading}
      type="submit"
      className={`w-full flex justify-center items-center gap-2
        bg-brand-main hover:opacity-90
        py-2.5 text-white border border-border
        shadow-md hover:shadow-lg
        disabled:opacity-60 disabled:cursor-not-allowed
        font-semibold transition-all duration-150
        rounded-xl active:scale-95 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;
