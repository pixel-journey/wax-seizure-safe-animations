"use client";

import { useEffect, useMemo, useState } from "react";
import { Cases } from "./Cases";
import { downloadText, exportFlashMarkdown } from "./exportReport";
import {
  clampFlashes,
  flashPolicy,
  SAMPLE_FLASHES,
} from "./flash";
import { FLASH_MYTHS, GLOSSARY } from "./myths";
import { decodeShareState, encodeShareState } from "./shareState";

const LS_KEY = "pxj-flash-policy-v1";

export function Demo() {
  const [flashes, setFlashes] = useState("3");
  const [windowMs, setWindowMs] = useState("1000");
  const [shareMsg, setShareMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromUrl = decodeShareState(window.location.search);
    if (fromUrl.flashes || fromUrl.windowMs) {
      if (fromUrl.flashes) setFlashes(fromUrl.flashes);
      if (fromUrl.windowMs) setWindowMs(fromUrl.windowMs);
      return;
    }
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as { flashes?: string; windowMs?: string };
      if (p.flashes) setFlashes(p.flashes);
      if (p.windowMs) setWindowMs(p.windowMs);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ flashes, windowMs }));
    } catch {
      /* ignore */
    }
  }, [flashes, windowMs]);

  const policy = useMemo(() => {
    try {
      const f = Number(flashes);
      const w = Number(windowMs);
      const p = flashPolicy(f, w);
      const clamped = clampFlashes(f, w);
      return { ok: true as const, p, clamped };
    } catch (e) {
      return {
        ok: false as const,
        reason: e instanceof Error ? e.message : "Invalid input",
      };
    }
  }, [flashes, windowMs]);

  const copyShare = async () => {
    const qs = encodeShareState({ flashes, windowMs });
    const path =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}?${qs}`
        : `?${qs}`;
    try {
      await navigator.clipboard.writeText(path);
      setShareMsg("Share URL copied");
    } catch {
      setShareMsg(path);
    }
  };

  return (
    <main className="wrap">
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>Flash count policy lab</h1>
      <p className="lede">
        Count-only check inspired by WCAG 2.3.1 general flash (≤3 / second). No animation
        is played. Area and red flash are not measured.
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {SAMPLE_FLASHES.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setFlashes(String(s.flashes));
              setWindowMs(String(s.windowMs));
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        Flash count
        <input
          value={flashes}
          onChange={(e) => setFlashes(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "1rem" }}>
        Window ms
        <input
          value={windowMs}
          onChange={(e) => setWindowMs(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
        />
      </label>

      {policy.ok ? (
        <>
          <p>
            allowed: <strong>{policy.p.allowed ? "yes" : "no"}</strong> — {policy.p.reason}
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            max in window: <strong>{policy.p.maxFlashes}</strong> · clamped request:{" "}
            <strong>{policy.clamped}</strong> · rate milliHz:{" "}
            <strong>{policy.p.rateMilliHz}</strong>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() =>
                downloadText(
                  "flash-policy.md",
                  exportFlashMarkdown({
                    flashes,
                    windowMs,
                    allowed: String(policy.p.allowed),
                    reason: policy.p.reason,
                    maxFlashes: String(policy.p.maxFlashes),
                    clamped: String(policy.clamped),
                  })
                )
              }
            >
              Download MD
            </button>
            <button type="button" onClick={() => void copyShare()}>
              Copy share URL
            </button>
          </div>
          {shareMsg && (
            <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>{shareMsg}</p>
          )}
        </>
      ) : (
        <p>{policy.reason}</p>
      )}

      <Cases />

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Runbook</h2>
        <ol style={{ fontSize: "0.9rem" }}>
          <li>Count planned flashes in a time window.</li>
          <li>Run flashPolicy before shipping an effect.</li>
          <li>Prefer clampFlashes or a static alternative when refused.</li>
          <li>Still offer reduced-motion paths.</li>
        </ol>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Glossary</h2>
        <dl>
          {GLOSSARY.map((g) => (
            <div key={g.term} style={{ marginBottom: "0.5rem" }}>
              <dt>
                <strong>{g.term}</strong>
              </dt>
              <dd style={{ margin: 0 }}>{g.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        URL overrides localStorage when present. See EDUCATION.md · SECURITY.md
      </p>
    </main>
  );
}
