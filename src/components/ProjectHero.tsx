import { Cow, type CowVariant } from "./Cow";

// Navy header block at the top of a project page.
export function ProjectHero({
  title,
  variant,
  meta,
  children,
}: {
  title: string;
  variant: CowVariant;
  meta?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="bg-ink text-cream border-2 border-ink p-6 sm:p-10 shadow-[8px_8px_0_var(--accent)]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <Cow variant={variant} size={14} className="shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight">
            {title.toUpperCase()}
          </h1>
          {meta ? (
            <p className="mt-2 text-xs tracking-[0.14em] text-cream/70 uppercase">
              {meta}
            </p>
          ) : null}
        </div>
      </div>
      {children ? (
        <div className="mt-6 text-sm leading-relaxed max-w-2xl">{children}</div>
      ) : null}
    </header>
  );
}

// Chunky link button that presses into its shadow on hover.
export function ActionLink({
  href,
  children,
  primary = false,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  // Opens in a new tab (used for live project sites).
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-block border-2 border-ink px-4 py-2 text-xs font-semibold tracking-[0.14em] shadow-[4px_4px_0_var(--ink)] transition-[transform,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--ink)] ${
        primary ? "bg-accent text-ink" : "bg-cream text-ink"
      }`}
    >
      {children}
    </a>
  );
}
