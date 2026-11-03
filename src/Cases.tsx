"use client";

const CASES = [
  {
    title: "3 per second",
    body: "3 flashes in 1000ms → allowed under the count gate.",
  },
  {
    title: "4 per second",
    body: "4 flashes in 1000ms → refused.",
  },
  {
    title: "Burst window",
    body: "3 flashes in 500ms → refused (rate above 3/s).",
  },
  {
    title: "Clamp",
    body: "clampFlashes(10, 1000) → 3 so designers can fail closed.",
  },
  {
    title: "Not a medical cert",
    body: "Area and red flash are out of scope; no animation is played.",
  },
] as const;

export function Cases() {
  return (
    <section aria-label="Teaching cases" style={{ marginTop: "2rem" }}>
      <h2 style={{ fontSize: "1rem" }}>Cases</h2>
      <ul style={{ paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
        {CASES.map((c) => (
          <li key={c.title} style={{ marginBottom: "0.5rem" }}>
            <strong>{c.title}.</strong> {c.body}
          </li>
        ))}
      </ul>
    </section>
  );
}
