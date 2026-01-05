const AuthError = ({ message }) => {
  if (!message) return null;

  const text =
    typeof message === "string"
      ? message
      : message?.message || JSON.stringify(message);

  return (
    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
      {text}
    </div>
  );
};

export default AuthError;
