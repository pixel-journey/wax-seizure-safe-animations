/**
 * WCAG 2.3.1 general flash threshold: more than 3 flashes in one second is refused.
 * This does not measure screen area or red saturation — educational count check only.
 * No animation is played by these helpers.
 */

export type FlashVerdict = { allowed: boolean; reason: string };

export function flashAllowed(flashes: number, windowMs: number): FlashVerdict {
  if (!Number.isInteger(flashes) || flashes < 0 || flashes > 100) {
    return { allowed: false, reason: "flashes must be an integer from 0 to 100" };
  }
  if (!Number.isInteger(windowMs) || windowMs < 1 || windowMs > 10_000) {
    return { allowed: false, reason: "windowMs must be an integer from 1 to 10000" };
  }
  const allowed = flashes * 1000 <= 3 * windowMs;
  return {
    allowed,
    reason: allowed
      ? "at or under 3 flashes per second"
      : "more than 3 flashes per second",
  };
}

/** Maximum flashes allowed in windowMs at ≤3 Hz. */
export function maxFlashesInWindow(windowMs: number): number {
  if (!Number.isInteger(windowMs) || windowMs < 1 || windowMs > 10_000) {
    throw new Error("windowMs must be an integer from 1 to 10000");
  }
  return Math.floor((3 * windowMs) / 1000);
}

/** Flashes per second as a rational ×1000 (milli-Hz) for integer math. */
export function flashesPerSecondMilli(flashes: number, windowMs: number): number {
  if (!Number.isInteger(flashes) || flashes < 0 || flashes > 100) {
    throw new Error("flashes must be an integer from 0 to 100");
  }
  if (!Number.isInteger(windowMs) || windowMs < 1 || windowMs > 10_000) {
    throw new Error("windowMs must be an integer from 1 to 10000");
  }
  return Math.floor((flashes * 1000 * 1000) / windowMs);
}

export type FlashPolicy = {
  allowed: boolean;
  reason: string;
  maxFlashes: number;
  rateMilliHz: number;
};

export function flashPolicy(flashes: number, windowMs: number): FlashPolicy {
  const v = flashAllowed(flashes, windowMs);
  const maxFlashes = maxFlashesInWindow(windowMs);
  const rateMilliHz =
    Number.isInteger(flashes) &&
    flashes >= 0 &&
    flashes <= 100 &&
    Number.isInteger(windowMs) &&
    windowMs >= 1 &&
    windowMs <= 10_000
      ? flashesPerSecondMilli(flashes, windowMs)
      : 0;
  return {
    allowed: v.allowed,
    reason: v.reason,
    maxFlashes,
    rateMilliHz,
  };
}

/** Clamp a requested flash count down to the allowed maximum. */
export function clampFlashes(flashes: number, windowMs: number): number {
  const max = maxFlashesInWindow(windowMs);
  if (!Number.isInteger(flashes) || flashes < 0) {
    throw new Error("flashes must be a non-negative integer");
  }
  return Math.min(flashes, max);
}

export const SAMPLE_FLASHES = [
  { id: "safe3", label: "3 / 1000ms", flashes: 3, windowMs: 1000 },
  { id: "unsafe4", label: "4 / 1000ms", flashes: 4, windowMs: 1000 },
  { id: "burst", label: "3 / 500ms", flashes: 3, windowMs: 500 },
  { id: "calm", label: "1 / 1000ms", flashes: 1, windowMs: 1000 },
] as const;
