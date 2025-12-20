function FindYourAccount() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-app-bg px-4">
      <div className="w-full max-w-[400px] flex flex-col gap-6">
        
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-main">
            Find Your Account
          </h1>
        </div>

        {/* Description */}
        <p className="text-text-main text-sm text-center">
          Please enter your email address to search for your account.
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="
              w-full px-4 py-2.5
              bg-hover
              border border-border
              rounded-lg
              text-text-main text-sm
              placeholder-text-muted
              focus:outline-none
              focus:border-brand-main/40
              focus:ring-1 focus:ring-brand-main/20
              transition-all
            "
          />

          {/* helper / error space (future-proof UI) */}
          <p className="text-xs text-text-muted">
            We'll send a password reset link if the account exists.
          </p>

          <button
            type="submit"
            className="
              w-full bg-brand-main hover:opacity-90
              text-text-main font-medium
              py-2.5 rounded-xl
              border border-border
              transition-all duration-150
              active:scale-95
            "
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default FindYourAccount;
