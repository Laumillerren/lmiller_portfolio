// Caution-tape markers for projects that aren't finished yet. Set `wip: true`
// on an entry in src/data/work.ts or src/data/otherThings.ts to show them.

// Small tilted sign pinned to a cow's speech bubble on the home page.
export function WipSign({ className = "" }: { className?: string }) {
  return (
    <span
      className={`caution-stripes inline-block p-[3px] rotate-[8deg] shadow-sm ${className}`}
    >
      <span className="block bg-cream px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.14em] leading-none text-ink whitespace-nowrap">
        WORK IN PROGRESS
      </span>
    </span>
  );
}

// Full-width strip across the top of a project page.
export function WipBanner() {
  return (
    <div className="caution-stripes py-2.5" role="status">
      <p className="mx-auto w-fit bg-cream px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-ink">
        WORK IN PROGRESS · CHECK BACK SOON
      </p>
    </div>
  );
}
