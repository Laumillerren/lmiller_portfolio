"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "framer-motion";

type WalkingFieldContextValue = {
  shift: MotionValue<number>;
  locked: boolean;
  setLocked: (locked: boolean) => void;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  mouseActive: MotionValue<number>;
};

export const WalkingFieldContext =
  createContext<WalkingFieldContextValue | null>(null);

export function useWalkingField() {
  const ctx = useContext(WalkingFieldContext);
  if (!ctx) {
    throw new Error("useWalkingField must be used within a WalkingField");
  }
  return ctx;
}
