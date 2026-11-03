import { describe, expect, it } from "vitest";
import {
  clampFlashes,
  flashAllowed,
  flashPolicy,
  maxFlashesInWindow,
} from "./flash";

describe("flash threshold", () => {
  it("allows 3 per second and refuses 4", () => {
    expect(flashAllowed(3, 1000).allowed).toBe(true);
    expect(flashAllowed(4, 1000).allowed).toBe(false);
    expect(flashAllowed(3, 500).allowed).toBe(false);
    expect(flashAllowed(0, 1000).allowed).toBe(true);
  });

  it("maxFlashesInWindow at 1s is 3", () => {
    expect(maxFlashesInWindow(1000)).toBe(3);
    expect(maxFlashesInWindow(2000)).toBe(6);
  });

  it("clamp pulls 10 down to 3 in 1s", () => {
    expect(clampFlashes(10, 1000)).toBe(3);
  });

  it("policy bundles fields", () => {
    const p = flashPolicy(4, 1000);
    expect(p.allowed).toBe(false);
    expect(p.maxFlashes).toBe(3);
  });
});
