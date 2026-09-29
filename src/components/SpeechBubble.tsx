export function SpeechBubble({
  text,
  meta,
  emphasized = false,
  className = "",
}: {
  text: string;
  meta?: string;
  emphasized?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative inline-flex ${className}`}>
      <div
        className={`border px-3 py-1.5 transition-colors duration-200 group-hover:bg-accent group-hover:border-accent group-focus-visible:bg-accent group-focus-visible:border-accent ${
          emphasized ? "bg-accent border-accent" : "bg-paper border-rule"
        }`}
      >
        <p
          className={`text-[11px] sm:text-xs tracking-[0.14em] uppercase leading-none whitespace-nowrap transition-colors duration-200 group-hover:text-white group-focus-visible:text-white ${
            emphasized ? "text-white" : ""
          }`}
        >
          {text}
        </p>
        {meta ? (
          <p
            className={`mt-1 text-[10px] tracking-[0.06em] leading-none whitespace-nowrap transition-colors duration-200 group-hover:text-white group-focus-visible:text-white ${
              emphasized ? "text-white" : "text-ink-soft"
            }`}
          >
            {meta}
          </p>
        ) : null}
      </div>
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-[7px] h-3 w-3 border-r border-b rotate-45 transition-colors duration-200 group-hover:bg-accent group-hover:border-accent group-focus-visible:bg-accent group-focus-visible:border-accent ${
          emphasized ? "bg-accent border-accent" : "bg-paper border-rule"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
