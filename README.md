# wax-seizure-safe-animations

> **Trust label:** `educational-reference`  
> **Status:** Full-thrust + polish (2026-11-03)  
> **Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

**One-sentence goal:** Teach a **count-only** flash-rate gate inspired by WCAG 2.3.1 general flash (≤3 / second) — without playing flashing content or claiming medical safety.

## What is actually in the repo

| Piece | Role |
|-------|------|
| `src/flash.ts` | `flashAllowed`, max, clamp, policy |
| `src/*.test.ts` | Boundary and range tests |
| `src/Demo.tsx` | Interactive counts — **no flash rendered** |
| `EDUCATION.md` / `POLICY.md` / `SECURITY.md` | Teaching + boundaries |

The course is [EDUCATION.md](EDUCATION.md).

## Quick start

```bash
npm install
npm test
npm run dev
```

```ts
import { flashAllowed, clampFlashes } from "./src/flash";

flashAllowed(3, 1000).allowed; // true
flashAllowed(4, 1000).allowed; // false
clampFlashes(10, 1000); // 3
```

## Related

- `wax-reduced-motion-dashboard`
- `wax-seizure-safe-pack-opening-canvas`

## License

MIT — Pixel Journey
