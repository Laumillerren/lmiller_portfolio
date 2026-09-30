"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cloud } from "./Cloud";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative shrink-0 pt-14 pb-8 md:pt-16 md:pb-8">
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
        className="absolute left-[24%] top-16 hidden md:block"
      />
      <Cloud
        size={11}
        duration={15}
        delay={3}
        className="absolute right-[26%] top-1 hidden lg:block"
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col items-center text-center">
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
            I build data systems, analyze messy problems, and make things on
            the internet.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.0, ease: "easeOut" }}
          className="mt-8 text-[11px] sm:text-xs tracking-[0.22em] text-ink-soft"
        >
          SELECT A COW TO EXPLORE
        </motion.div>
      </div>
    </div>
  );
}
