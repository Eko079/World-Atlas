export default function LoadingExperience() {
  return (
    <div
      className="screen-veil fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink"
      aria-hidden="true"
    >
      <p className="hero-fade font-display text-2xl font-semibold uppercase tracking-[0.5em] text-paper sm:text-3xl">
        World Atlas
      </p>

      <div className="hero-fade mt-8 flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-mist">
          Loading Nation
        </span>
        <div className="flex gap-1.5">
          {["0", "0", "1"].map((c, i) => (
            <span
              key={i}
              className="pulse-soft font-display text-3xl font-semibold text-accent"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {c}
            </span>
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-[0.3em] text-mist/60">
          IDN
        </span>
      </div>
    </div>
  );
}
