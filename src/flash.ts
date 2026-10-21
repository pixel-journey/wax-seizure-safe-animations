/**
 * WCAG 2.3.1 general flash threshold: more than 3 flashes in one second is refused.
 * This does not measure screen area or red saturation.
 */

export function flashAllowed(flashes: number, windowMs: number): { allowed: boolean; reason: string } {
  if (!Number.isInteger(flashes) || flashes < 0 || flashes > 100) {
    return { allowed: false, reason: "flashes must be an integer from 0 to 100" };
  }
  if (!Number.isInteger(windowMs) || windowMs < 1 || windowMs > 10_000) {
    return { allowed: false, reason: "windowMs must be an integer from 1 to 10000" };
  }
  const allowed = flashes * 1000 <= 3 * windowMs;
  return {
    allowed,
    reason: allowed ? "at or under 3 flashes per second" : "more than 3 flashes per second",
  };
}
