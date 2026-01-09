const GlassCard = ({
  children,
  className = "",
  as: Component = "section",
}) => {
  return (
    <Component
      className={`
        relative overflow-hidden rounded-4xl
        border border-border
        bg-[radial-gradient(1200px_circle_at_20%_0%,color-mix(in_oklab,var(--color-brand-main),transparent_85%),transparent_45%),
            radial-gradient(900px_circle_at_80%_100%,color-mix(in_oklab,var(--color-brand-main),transparent_90%),transparent_55%),
            linear-gradient(180deg,var(--color-card-bg),var(--color-card-bg))]
        shadow-[0_60px_160px_rgba(0,0,0,0.55)]
        ${className}
      `}
    >
      {/* premium ambient glows */}
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 h-128 w-lg rounded-full bg-brand-main/15 blur-[200px]" />
      <div className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 h-128 w-lg rounded-full bg-brand-main/10 blur-[200px]" />

      {/* subtle glass sheen */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 to-transparent dark:from-white/3" />

      <div className="relative">
        {children}
      </div>
    </Component>
  );
};

export default GlassCard;




{/* <GlassCard className="p-8">
  <h3 className="text-xl font-semibold text-text-main mb-2">
    Chef’s Special
  </h3>
  <p className="text-sm text-text-muted">
    Seasonal dishes crafted with premium ingredients.
  </p>
</GlassCard> */}
