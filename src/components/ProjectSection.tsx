export type BlockTone = "cream" | "grass" | "ink";

const TONES: Record<BlockTone, { block: string; number: string; label: string }> = {
  cream: { block: "bg-cream text-ink", number: "text-accent", label: "text-ink-soft" },
  grass: { block: "bg-grass text-cream", number: "text-cream", label: "text-cream/80" },
  ink: { block: "bg-ink text-cream", number: "text-accent", label: "text-cream/70" },
};

// A numbered, colored content block on the project pages. Thick border and
// a hard offset shadow, lifting slightly on hover.
export function ProjectSection({
  heading,
  index,
  tone = "cream",
  meta,
  className = "",
  children,
}: {
  heading: string;
  meta?: string;
  index: number;
  tone?: BlockTone;
  className?: string;
  children: React.ReactNode;
}) {
  const t = TONES[tone];
  return (
    <section
      className={`${t.block} border-2 border-ink p-6 sm:p-7 shadow-[6px_6px_0_var(--ink)] motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-1 ${className}`}
    >
      <div className={`flex items-baseline gap-3 ${meta ? "mb-1" : "mb-4"}`}>
        <span className={`text-3xl font-semibold leading-none ${t.number}`}>
          {String(index).padStart(2, "0")}
        </span>
        <h2 className={`text-[11px] font-semibold tracking-[0.2em] ${t.label}`}>
          {heading}
        </h2>
      </div>
      {meta ? (
        <p className={`mb-4 text-[10px] tracking-[0.14em] uppercase ${t.label}`}>
          {meta}
        </p>
      ) : null}
      <div className="text-sm leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

// Cycles tones so neighboring blocks never share a color.
export function toneFor(i: number): BlockTone {
  return (["cream", "grass", "ink"] as const)[i % 3];
}
