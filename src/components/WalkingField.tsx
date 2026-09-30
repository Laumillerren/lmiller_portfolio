"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DESKTOP_QUERY = "(min-width: 768px)";

export function WalkingField({
  top,
  children,
}: {
  top: React.ReactNode;
  children: React.ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const rawShift = useMotionValue(0);
  const smoothShift = useSpring(rawShift, { stiffness: 260, damping: 32, mass: 0.6 });
  const x = useTransform(smoothShift, (v) => -v);

  const shiftValueRef = useRef(0);
  const maxShiftRef = useRef(0);

  useEffect(() => {
    function isDesktop() {
      return window.matchMedia(DESKTOP_QUERY).matches;
    }

    function updateMax() {
      if (rowRef.current && viewportRef.current) {
        maxShiftRef.current = Math.max(
          0,
          rowRef.current.scrollWidth - viewportRef.current.clientWidth,
        );
      }
    }
    updateMax();
    window.addEventListener("resize", updateMax);

    function onWheel(e: WheelEvent) {
      if (!isDesktop()) return;

      const maxShift = maxShiftRef.current;
      const current = shiftValueRef.current;
      const atTop = window.scrollY <= 0;

      if (e.deltaY > 0 && current < maxShift) {
        e.preventDefault();
        shiftValueRef.current = Math.min(maxShift, current + e.deltaY);
        rawShift.set(shiftValueRef.current);
      } else if (e.deltaY < 0 && current > 0 && atTop) {
        e.preventDefault();
        shiftValueRef.current = Math.max(0, current + e.deltaY);
        rawShift.set(shiftValueRef.current);
      }
      // otherwise: let the browser scroll the page normally (into/out of the footer)
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateMax);
    };
  }, [rawShift]);

  return (
    <section className="bg-paper md:h-screen overflow-visible md:overflow-hidden flex flex-col">
      {top}
      <div
        ref={viewportRef}
        className="flex-1 min-h-0 overflow-visible md:overflow-hidden flex md:items-center"
      >
        <motion.div
          ref={rowRef}
          style={{ x }}
          className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 w-full md:w-max px-6 sm:px-10 lg:px-14 py-6 md:py-10"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
