"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cloud } from "./Cloud";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ feature }: { feature?: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative shrink-0 pt-14 pb-8 md:pt-16 md:pb-8">
      <a
        href="#about-contact"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("about-contact")
            ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        }}
        className="absolute right-4 top-4 sm:right-6 z-10 border-2 border-ink bg-cream px-3 py-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] text-ink shadow-[3px_3px_0_var(--ink)] transition-[transform,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_var(--ink)]"
      >
        ABOUT &amp; CONTACT ↓
      </a>
      <Cloud
        size={13}
        duration={18}
        className="absolute left-[6%] top-0 hidden sm:block"
      />
      <Cloud
        size={10}
        duration={14}
        delay={2}
        className="absolute right-[12%] top-10 hidden sm:block"
      />
      <Cloud
        size={16}
        duration={20}
        delay={1}
        className="absolute left-[50%] top-4 hidden md:block"
      />
      <Cloud
        size={11}
        duration={15}
        delay={3}
        className="absolute right-[26%] top-1 hidden lg:block"
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
          >
            LAUREN MILLER
          </motion.h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
          >
            <p className="mt-3 text-xs sm:text-sm tracking-[0.18em] text-ink-soft uppercase">
              Data Engineer · Analytics · Data Science
            </p>
            <p className="mt-4 max-w-md text-sm sm:text-base text-ink-soft italic">
              Turning messy data into things people actually use.
            </p>
          </motion.div>
        </div>

        {feature ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          >
            {feature}
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

// Labeled divider that sits directly above the side-project herd.
export function SideProjectsLabel() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 1.0, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center gap-4 text-[11px] sm:text-xs tracking-[0.22em] text-ink-soft"
    >
      <span className="h-px flex-1 bg-rule" aria-hidden="true" />
      <span className="font-semibold">
        SIDE PROJECTS · SELECT A COW TO EXPLORE
      </span>
      <span className="h-px flex-1 bg-rule" aria-hidden="true" />
    </motion.div>
  );
}
