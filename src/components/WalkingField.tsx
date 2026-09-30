"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { WalkingFieldContext } from "./WalkingFieldContext";

const DESKTOP_QUERY = "(min-width: 768px)";
const TOUCH_QUERY = "(pointer: coarse)";

export function WalkingField({
  top,
  children,
}: {
  top: React.ReactNode;
  children: React.ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // The raw scroll target. Each cow springs toward this with its own
  // stiffness/damping (see CowUnit), so they all end up at exactly the
  // same rest position -- no per-cow drift that could push one past the
  // edge of the visible row by the end of the scroll.
  const rawShift = useMotionValue(0);

  const shiftValueRef = useRef(0);
  const maxShiftRef = useRef(0);
  const lockedRef = useRef(false);
  const [locked, setLockedState] = useState(false);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const mouseActive = useMotionValue(0);

  function setLocked(next: boolean) {
    lockedRef.current = next;
    setLockedState(next);
  }

  useEffect(() => {
    function isDesktop() {
      return window.matchMedia(DESKTOP_QUERY).matches;
    }
    const isTouch = window.matchMedia(TOUCH_QUERY).matches;

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

      // A cow's preview is open: freeze the whole scene (pan and scroll)
      // until it's closed, so the bubble stays put while reading it.
      if (lockedRef.current) {
        e.preventDefault();
        return;
      }

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

    function onPointerMove(e: PointerEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      mouseActive.set(1);
    }
    function onPointerLeave() {
      mouseActive.set(0);
    }
    if (!isTouch) {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateMax);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [rawShift, mouseX, mouseY, mouseActive]);

  return (
    <WalkingFieldContext.Provider
      value={{ shift: rawShift, locked, setLocked, mouseX, mouseY, mouseActive }}
    >
      <motion.section
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-paper md:h-screen overflow-visible md:overflow-hidden flex flex-col"
      >
        {top}
        <div
          ref={viewportRef}
          className="flex-1 min-h-0 overflow-visible md:overflow-hidden flex md:items-center"
        >
          <div
            ref={rowRef}
            className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 w-full md:w-max px-6 sm:px-10 lg:px-14 py-6 md:py-10"
          >
            {children}
          </div>
        </div>
      </motion.section>
    </WalkingFieldContext.Provider>
  );
}
