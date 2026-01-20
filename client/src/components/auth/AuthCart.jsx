const AuthCard = ({ title, description, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg px-4">
      <div className="w-full max-w-26.25 bg-card-bg/10 backdrop-blur-xl
        border border-border rounded-2xl shadow-lg p-6">
        
        {title && (
          <h1 className="text-2xl font-bold text-brand-main text-center">
            {title}
          </h1>
        )}

        {description && (
          <p className="text-text-muted text-sm mt-2 text-center">
            {description}
          </p>
        )}

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthCard;
