import Link from "next/link";

export function BackToCows() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-xs tracking-[0.14em] text-ink-soft hover:text-ink transition-colors"
    >
      <span aria-hidden="true">←</span> BACK TO THE COWS
    </Link>
  );
}
