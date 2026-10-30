"use client";

import { useMemo, useState } from "react";
import { flashAllowed } from "./flash";
import { FLASH_MYTHS } from "./myths";

export function Demo() {
  const [flashes, setFlashes] = useState(3);
  const [windowMs, setWindowMs] = useState(1000);
  const result = useMemo(
    () => flashAllowed(flashes, windowMs),
    [flashes, windowMs]
  );

  return (
    <main className="wrap">
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>Three flashes a second, not four</h1>
      <p className="lede">
        Count threshold from WCAG 2.3.1 general flash. Does not measure area or red
        flashes. Does not play an animation.
      </p>

      <section
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid #a855f744",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontSize: "1rem", marginTop: 0 }}>Myths vs reality</h2>
        {FLASH_MYTHS.map((m) => (
          <div key={m.myth} style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
            <p style={{ margin: 0 }}>
              <strong>Myth:</strong> {m.myth}
            </p>
            <p style={{ margin: "0.25rem 0 0" }}>
              <strong>Reality:</strong> {m.reality}
            </p>
          </div>
        ))}
      </section>

      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        Flashes in window (0–100)
        <input
          type="number"
          min={0}
          max={100}
          value={flashes}
          onChange={(e) => setFlashes(Number(e.target.value))}
          style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "1rem" }}>
        Window (ms, 1–10000)
        <input
          type="number"
          min={1}
          max={10000}
          value={windowMs}
          onChange={(e) => setWindowMs(Number(e.target.value))}
          style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
        />
      </label>

      <p>
        <strong>{result.allowed ? "Allowed" : "Refused"}</strong> — {result.reason}
      </p>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        See POLICY.md · companions: reduced-motion-dashboard, haptic-feedback-simulator.
      </p>
    </main>
  );
}
