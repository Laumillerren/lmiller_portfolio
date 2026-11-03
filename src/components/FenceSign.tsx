"use client";

import { useContext, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { WalkingFieldContext } from "./WalkingFieldContext";
import { stepSpring } from "@/lib/cowMotion";

// Spring settings of a mid-speed cow, so the sign walks with the herd.
const STIFFNESS = 85;
const DAMPING = 20;

// A wooden-sign marker at the start of a group in the side-project herd.
export function FenceSign({ title, note }: { title: string; note?: string }) {
  const field = useContext(WalkingFieldContext);
  const fallbackShift = useMotionValue(0);
  const shift = field?.shift ?? fallbackShift;
  const x = useMotionValue(0);
  const velocity = useRef(0);

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 40) / 1000;
    const [next, nextVelocity] = stepSpring(
      x.get(),
      -shift.get(),
      velocity.current,
      STIFFNESS,
      DAMPING,
      dt,
    );
    velocity.current = nextVelocity;
    x.set(next);
  });

  return (
    <motion.div
      style={{ x }}
      className="flex flex-col items-center shrink-0 md:self-end"
    >
      <div className="border-2 border-ink bg-cream px-4 py-2.5 text-center shadow-[4px_4px_0_var(--ink)]">
        <p className="text-[11px] font-semibold tracking-[0.18em] whitespace-nowrap">
          {title}
        </p>
        {note ? (
          <p className="mt-1 text-[10px] tracking-[0.08em] text-ink-soft whitespace-nowrap">
            {note}
          </p>
        ) : null}
      </div>
      <div className="flex gap-6" aria-hidden="true">
        <span className="block h-12 w-1.5 bg-ink-soft" />
        <span className="block h-12 w-1.5 bg-ink-soft" />
      </div>
    </motion.div>
  );
}
