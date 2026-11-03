// Deterministic pseudo-random value in [min, max) from a seed string, so
// each cow always gets the same speed/depth across renders without needing
// to store it anywhere.
export function seededRange(seed: string, min: number, max: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const t = (hash % 1000) / 1000;
  return min + t * (max - min);
}

// A single damped-harmonic-oscillator step (F = -kx - cv, a = F/m).
// Used for every spring in the herd (CowUnit walking, magnet, and scale, plus
// FenceSign) --
// so everything is driven by one predictable, hand-rolled physics loop
// instead of relying on framer-motion's own useSpring(motionValue) helper,
// which turned out not to react to updates coming from outside the
// component tree it was created in.
export function stepSpring(
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
