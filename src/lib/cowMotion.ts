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
