import { describe, expect, it } from "vitest";
import {
  clampFlashes,
  flashAllowed,
  flashPolicy,
  flashesPerSecondMilli,
  maxFlashesInWindow,
} from "./flash";

describe("flash threshold", () => {
  it("allows 3 per second and refuses 4", () => {
    expect(flashAllowed(3, 1000).allowed).toBe(true);
    expect(flashAllowed(4, 1000).allowed).toBe(false);
    expect(flashAllowed(3, 500).allowed).toBe(false);
    expect(flashAllowed(0, 1000).allowed).toBe(true);
  });

  it("rejects out-of-range inputs", () => {
    expect(flashAllowed(-1, 1000).allowed).toBe(false);
    expect(flashAllowed(3, 0).allowed).toBe(false);
    expect(flashAllowed(3, 10_001).allowed).toBe(false);
  });

  it("maxFlashesInWindow scales", () => {
    expect(maxFlashesInWindow(1000)).toBe(3);
    expect(maxFlashesInWindow(2000)).toBe(6);
    expect(maxFlashesInWindow(333)).toBe(0);
  });

  it("clamp pulls high counts down", () => {
    expect(clampFlashes(10, 1000)).toBe(3);
    expect(clampFlashes(2, 1000)).toBe(2);
  });

  it("policy bundles fields", () => {
    const p = flashPolicy(4, 1000);
    expect(p.allowed).toBe(false);
    expect(p.maxFlashes).toBe(3);
    expect(p.rateMilliHz).toBe(flashesPerSecondMilli(4, 1000));
  });

  it("exactly 3 Hz boundary uses inequality flashes*1000 <= 3*windowMs", () => {
    expect(flashAllowed(6, 2000).allowed).toBe(true);
    expect(flashAllowed(7, 2000).allowed).toBe(false);
  });
});
