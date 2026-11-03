import { describe, expect, it } from "vitest";
import { decodeShareState, encodeShareState } from "./shareState";

describe("shareState", () => {
  it("round-trips", () => {
    const raw = encodeShareState({ flashes: "3", windowMs: "1000" });
    const d = decodeShareState(raw);
    expect(d.flashes).toBe("3");
    expect(d.windowMs).toBe("1000");
  });
});
