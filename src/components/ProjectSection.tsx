export function ProjectSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-8 border-t border-rule first:border-t-0 first:pt-0">
      <h3 className="text-[11px] tracking-[0.2em] text-ink-soft mb-3">
        {heading}
      </h3>
      <div className="text-sm leading-relaxed max-w-2xl text-ink">
        {children}
      </div>
    </div>
  );
}
