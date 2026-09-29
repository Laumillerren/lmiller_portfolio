"use client";

import Link from "next/link";
import { Cow, type CowVariant } from "./Cow";
import { SpeechBubble } from "./SpeechBubble";
import { useVisited } from "@/lib/useVisited";

export function CowUnit({
  href,
  label,
  meta,
  variant = "plain",
  size = 14,
  className = "",
}: {
  href: string;
  label: string;
  meta?: string;
  variant?: CowVariant;
  size?: number;
  className?: string;
}) {
  const { visited, markVisited } = useVisited(href);

  return (
    <Link
      href={href}
      onClick={markVisited}
      className={`group inline-flex flex-col items-center gap-2.5 outline-none ${className}`}
    >
      <SpeechBubble text={label} meta={meta} />
      <span
        className="cow-glyph transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04] group-focus-visible:-translate-y-1 cursor-pointer"
        data-visited={visited}
      >
        <Cow variant={variant} size={size} />
      </span>
    </Link>
  );
}
