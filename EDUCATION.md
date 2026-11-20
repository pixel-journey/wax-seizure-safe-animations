# Education — at most three flashes a second, then clamp

> **Rung:** `npm test` passes. Nothing is animated. This is a count. It does not measure area, brightness, or red. It is not a medical claim and not a WCAG conformance test.  
> **The test is the rule.** Understanding: [WCAG 2.2 three flashes](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html). A different lab collapses excess to **one** reveal: [wax-seizure-safe-pack-opening-canvas](https://github.com/pixel-journey/wax-seizure-safe-pack-opening-canvas). Reduced motion is [wax-reduced-motion-dashboard](https://github.com/pixel-journey/wax-reduced-motion-dashboard).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Allow 3/s; refuse 4/s; clamp 10 → 3 |
| Intermediate | Explain the equal-boundary and short windows |
| Masterclass | Keep clamp-to-3 separate from pack collapse-to-1 |

---

## Beginner — one scene

Allowed when `flashes * 1000 <= 3 * windowMs`. The equal case is allowed.

| Call | Locked result |
| --- | --- |
| `flashAllowed(3, 1000)` | allowed |
| `flashAllowed(4, 1000)` | not allowed |
| `flashAllowed(3, 500)` | not allowed |
| `flashAllowed(0, 1000)` | allowed |
| `flashAllowed(6, 2000)` | allowed |
| `flashAllowed(7, 2000)` | not allowed |
| `maxFlashesInWindow(1000)` | `3` |
| `maxFlashesInWindow(2000)` | `6` |
| `maxFlashesInWindow(333)` | `0` |
| `clampFlashes(10, 1000)` | `3` |
| `clampFlashes(2, 1000)` | `2` |

```bash
npm test
```

---

## Intermediate

`maxFlashesInWindow(ms) = floor(3 * ms / 1000)`. Windows under 334 ms allow **zero** flashes under that formula.

The pack-opening lab does **not** clamp 4 reveals to 3. It sets `shown` to `1`. Do not mix the two functions.

HTTP pack examples in the repo are unsent and are not this count.

---

## Masterclass

### Common mistakes

1. Marketing "seizure-proof" from a pure rate check.  
2. Ignoring area / red thresholds in the WCAG understanding doc.  
3. Using pack-collapse behavior where clamp was intended.

### Exercises

1. 4 flashes in 1000 ms — allowed? (No.)  
2. clamp 10 in 1000 ms? (`3`.)  
3. Does this animate? (No.)

---

## What this course will not teach

- Medical clearance
- Full WCAG 2.3.1 measurement
- Pack unbox UX (see the pack lab)
