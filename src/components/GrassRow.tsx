const BLADE_COUNT = 220;
const DELAYS = [0, 0.15, 0.3, 0.45, 0.3, 0.15];

export function GrassRow({ size = 16 }: { size?: number }) {
  return (
    <div
      className="w-full overflow-hidden whitespace-nowrap leading-none select-none pointer-events-none"
      style={{ color: "var(--grass)", fontSize: size }}
      aria-hidden="true"
    >
      {Array.from({ length: BLADE_COUNT }).map((_, i) => (
        <span
          key={i}
          className="grass-blade font-mono"
          style={{ animationDelay: `${DELAYS[i % DELAYS.length]}s` }}
        >
          {"/\\"}
        </span>
      ))}
    </div>
  );
}
