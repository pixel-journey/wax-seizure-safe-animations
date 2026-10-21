import { describe, expect, it } from "vitest";
import { flashAllowed } from "./flash";

describe("flash threshold", () => {
  it("allows 3 per second and refuses 4", () => {
    expect(flashAllowed(3, 1000).allowed).toBe(true);
    expect(flashAllowed(4, 1000).allowed).toBe(false);
    expect(flashAllowed(3, 500).allowed).toBe(false);
    expect(flashAllowed(0, 1000).allowed).toBe(true);
  });
});
