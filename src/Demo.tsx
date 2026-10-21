"use client";

import { flashAllowed } from "./flash";

export function Demo() {
  const safe = flashAllowed(3, 1000);
  const fast = flashAllowed(4, 1000);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>Three flashes a second, not four</h1>
      <p className="lede">This is the count threshold from WCAG 2.3.1. It does not measure area or red flashes, and it does not play an animation.</p>
      <p>3 in 1000 ms: {safe.reason}.</p>
      <p>4 in 1000 ms: {fast.reason}.</p>
    </main>
  );
}
