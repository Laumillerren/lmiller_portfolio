const CLOUD_ART = `     .--.
  .-(    ).
 (___.__)__)`;

export function Cloud({
  size = 14,
  duration = 16,
  delay = 0,
  className = "",
}: {
  size?: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <pre
      className={`cloud font-mono whitespace-pre leading-[1.15] select-none pointer-events-none ${className}`}
      style={{
        fontSize: size,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    >
      {CLOUD_ART}
    </pre>
  );
}
