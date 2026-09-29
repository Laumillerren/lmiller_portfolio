export type CowVariant =
  | "plain"
  | "book"
  | "yoga"
  | "basketball"
  | "data"
  | "quilt"
  | "spark";

// The literal default cowsay cow, character-for-character (minus the two
// leading "\" thought-connector strokes, which point at a bubble to the
// left in real cowsay output -- ours sits above instead). The "|" legs are
// split into their own spans so they can bob independently, front/back out
// of phase, for a small walking-in-place effect.
const HEAD = `            ^__^
            (oo)\\_______
            (__)\\       )\\/\\
`;

function Leg({ delay }: { delay: string }) {
  return (
    <span className="cow-leg" style={{ animationDelay: delay }}>
      |
    </span>
  );
}

type CowProps = {
  variant?: CowVariant;
  size?: number;
  className?: string;
};

export function Cow({ size = 14, className = "" }: CowProps) {
  return (
    <pre
      className={`font-mono whitespace-pre leading-[1.15] select-none ${className}`}
      style={{ fontSize: size }}
      aria-hidden="true"
    >
      {HEAD}
      {"                "}
      <Leg delay="0s" />
      <Leg delay="0s" />
      {"----w "}
      <Leg delay="0.28s" />
      {"\n"}
      {"                "}
      <Leg delay="0s" />
      <Leg delay="0s" />
      {"     "}
      <Leg delay="0.28s" />
      <Leg delay="0.28s" />
    </pre>
  );
}
