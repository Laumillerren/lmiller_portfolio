"use client";

import { useState } from "react";
import { Cow } from "./Cow";
import { SpeechBubble } from "./SpeechBubble";
import { useVisited } from "@/lib/useVisited";

export function SkillCow({ label, blurb }: { label: string; blurb: string }) {
  const [open, setOpen] = useState(false);
  const { visited, markVisited } = useVisited(`skill:${label}`);

  return (
    <button
      type="button"
      onClick={() => {
        setOpen((v) => !v);
        markVisited();
      }}
      aria-expanded={open}
      className="group inline-flex flex-col items-center gap-2.5 outline-none text-center"
    >
      <SpeechBubble text={label} emphasized={open} />
      <span
        className="cow-glyph transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04] cursor-pointer"
        data-visited={visited}
      >
        <Cow />
      </span>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out w-56"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pt-1 text-[11px] leading-relaxed text-ink-soft">
            {blurb}
          </p>
        </div>
      </div>
    </button>
  );
}
