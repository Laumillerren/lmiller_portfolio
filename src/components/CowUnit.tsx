"use client";

import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Cow, type CowVariant } from "./Cow";
import { SpeechBubble } from "./SpeechBubble";
import { useVisited } from "@/lib/useVisited";
import { WalkingFieldContext } from "./WalkingFieldContext";

const MAGNET_RADIUS = 130;
const MAGNET_STRENGTH = 0.16;
const OPEN_SCALE = 1.16;
const ENTER_EASE = [0.16, 1, 0.3, 1] as const;
const ENTER_BASE_DELAY = 0.45;
const ENTER_STAGGER = 0.03;
const ENTER_DISTANCE = 20;

// A single damped-harmonic-oscillator step (F = -kx - cv, a = F/m).
// Used for every spring in this component -- walking, magnet, and scale --
// so everything is driven by one predictable, hand-rolled physics loop
// instead of relying on framer-motion's own useSpring(motionValue) helper,
// which turned out not to react to updates coming from outside the
// component tree it was created in.
function stepSpring(
  value: number,
  target: number,
  velocity: number,
  stiffness: number,
  damping: number,
  dt: number,
): [number, number] {
  const accel = -stiffness * (value - target) - damping * velocity;
  const nextVelocity = velocity + accel * dt;
  return [value + nextVelocity * dt, nextVelocity];
}

export function CowUnit({
  href,
  label,
  meta,
  variant = "plain",
  size = 14,
  speed = 1,
  depth = 0.5,
  ctaLabel = "VIEW PROJECT →",
  className = "",
  enterIndex,
  enterAngle = 0,
}: {
  href: string;
  label: string;
  meta?: string;
  variant?: CowVariant;
  size?: number;
  speed?: number;
  depth?: number;
  ctaLabel?: string;
  className?: string;
  // When provided, the cow plays a one-time page-load entrance (staggered
  // by index, wandering in from `enterAngle` degrees). Omitted entirely for
  // cows rendered outside the initial page load (e.g. the footer's About /
  // Contact cows), which just appear at rest.
  enterIndex?: number;
  enterAngle?: number;
}) {
  const { visited, markVisited } = useVisited(href);
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const hasEntrance = enterIndex !== undefined && !reduceMotion;
  const enterRad = (enterAngle * Math.PI) / 180;
  // Rounded to 2dp: framer-motion's SSR style string is lower-precision
  // than the client's live numeric style, so an unrounded float here
  // causes a (harmless but noisy) hydration mismatch warning.
  const enterFromX = Math.round(Math.cos(enterRad) * ENTER_DISTANCE * 100) / 100;
  const enterFromY = Math.round(Math.sin(enterRad) * ENTER_DISTANCE * 100) / 100;
  const enterDelay = ENTER_BASE_DELAY + (enterIndex ?? 0) * ENTER_STAGGER;

  // This component also renders outside a WalkingField (the footer's About
  // / Contact cows), so fall back to inert local values there instead of
  // requiring the provider.
  const field = useContext(WalkingFieldContext);
  const fallbackShift = useMotionValue(0);
  const fallbackMouseX = useMotionValue(-9999);
  const fallbackMouseY = useMotionValue(-9999);
  const fallbackMouseActive = useMotionValue(0);
  const shift = field?.shift ?? fallbackShift;
  const mouseX = field?.mouseX ?? fallbackMouseX;
  const mouseY = field?.mouseY ?? fallbackMouseY;
  const mouseActive = field?.mouseActive ?? fallbackMouseActive;
  const setLocked = field?.setLocked ?? (() => {});

  // Each cow chases the same shared target with its own stiffness/damping
  // derived from `speed`, so different cows visibly lag or lead each other
  // while moving -- but since they're all chasing the same value, they
  // always converge to the exact same rest position (nothing drifts past
  // the edge of the row once scrolling stops).
  const speedT = Math.min(1, Math.max(0, (speed - 0.82) / (1.18 - 0.82)));
  const walkStiffness = 40 + speedT * 90;
  const walkDamping = 16 + speedT * 8;
  const walkVelocityRef = useRef(0);
  const x = useMotionValue(0);
  const rotate = useMotionValue(0);

  const depthScale = 0.9 + depth * 0.18;
  const depthOpacity = 0.75 + depth * 0.25;

  // Mouse-magnet attraction plus the click-to-open enlarge.
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const magnetScale = useMotionValue(depthScale);
  const magnetXVelocityRef = useRef(0);
  const magnetYVelocityRef = useRef(0);
  const magnetScaleVelocityRef = useRef(0);

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 40) / 1000;

    // Walk toward the shared scroll target.
    const walkTarget = -shift.get();
    const [nextX, nextXVel] = stepSpring(
      x.get(),
      walkTarget,
      walkVelocityRef.current,
      walkStiffness,
      walkDamping,
      dt,
    );
    walkVelocityRef.current = nextXVel;
    x.set(nextX);
    const targetRotate = Math.max(-3, Math.min(3, (nextXVel / 1500) * 3));
    rotate.set(rotate.get() + (targetRotate - rotate.get()) * Math.min(1, dt * 12));

    // Magnet attraction toward the cursor, plus the click-to-open enlarge.
    const restScale = (open ? OPEN_SCALE : 1) * depthScale;
    let targetMagnetX = 0;
    let targetMagnetY = 0;
    let targetScale = restScale;

    if (!open && mouseActive.get() !== 0 && rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseX.get() - cx;
      const dy = mouseY.get() - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < MAGNET_RADIUS) {
        const strength = 1 - dist / MAGNET_RADIUS;
        targetMagnetX = dx * MAGNET_STRENGTH * strength;
        targetMagnetY = dy * MAGNET_STRENGTH * strength;
        targetScale = restScale * (1 + 0.08 * strength);
      }
    }

    const [nextMagnetX, nextMagnetXVel] = stepSpring(
      magnetX.get(),
      targetMagnetX,
      magnetXVelocityRef.current,
      170,
      16,
      dt,
    );
    magnetXVelocityRef.current = nextMagnetXVel;
    magnetX.set(nextMagnetX);

    const [nextMagnetY, nextMagnetYVel] = stepSpring(
      magnetY.get(),
      targetMagnetY,
      magnetYVelocityRef.current,
      170,
      16,
      dt,
    );
    magnetYVelocityRef.current = nextMagnetYVel;
    magnetY.set(nextMagnetY);

    const [nextScale, nextScaleVel] = stepSpring(
      magnetScale.get(),
      targetScale,
      magnetScaleVelocityRef.current,
      170,
      18,
      dt,
    );
    magnetScaleVelocityRef.current = nextScaleVel;
    magnetScale.set(nextScale);
  });

  function openPreview() {
    setOpen(true);
    setLocked(true);
  }
  function closePreview() {
    setOpen(false);
    setLocked(false);
  }
  function toggle() {
    if (open) closePreview();
    else openPreview();
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closePreview();
    }
    function onDocPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closePreview();
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocPointerDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <motion.div
      initial={
        hasEntrance
          ? { opacity: 0, x: enterFromX, y: enterFromY }
          : false
      }
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: enterDelay, ease: ENTER_EASE }}
    >
      <motion.div ref={rootRef} style={{ x, rotate }} className="relative">
        <motion.div
          style={{
            x: magnetX,
            y: magnetY,
            scale: magnetScale,
            opacity: depthOpacity,
          }}
          className={`inline-flex flex-col items-center gap-2.5 ${className}`}
        >
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            className="group inline-flex flex-col items-center gap-2.5 outline-none cursor-pointer"
          >
            <SpeechBubble text={label} meta={meta} emphasized={open} />
            <span
              className="cow-glyph transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
              data-visited={visited}
            >
              <Cow variant={variant} size={size} />
            </span>
          </button>

          <motion.div
            initial={false}
            animate={
              open
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.85, y: 10 }
            }
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ pointerEvents: open ? "auto" : "none" }}
            aria-hidden={!open}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-20 w-56 border border-ink bg-paper px-4 py-3 text-center shadow-md"
          >
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation();
                closePreview();
              }}
              aria-label="Close"
              className="absolute right-2 top-1.5 text-ink-soft hover:text-accent transition-colors text-sm leading-none"
            >
              ×
            </button>
            <p className="text-xs tracking-[0.1em] uppercase">{label}</p>
            {meta ? (
              <p className="mt-1 text-[10px] text-ink-soft">{meta}</p>
            ) : null}
            <Link
              href={href}
              tabIndex={open ? 0 : -1}
              onClick={markVisited}
              className="mt-3 inline-block text-[11px] tracking-[0.1em] underline underline-offset-4 decoration-rule hover:text-accent transition-colors"
            >
              {ctaLabel}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
