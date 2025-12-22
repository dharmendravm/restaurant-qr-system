const AuthError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
      {message}
    </div>
  );
};

export default AuthError;
