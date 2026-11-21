# Security — flash rate clamp (max 3/s)

## Closed in tests

| Issue | Behavior |
| --- | --- |
| `flashAllowed(3, 1000)` | allowed (equal boundary) |
| `flashAllowed(4, 1000)` | not allowed |
| `clampFlashes(10, 1000)` | **3** |
| `clampFlashes(2, 1000)` | **2** (no raise) |
| Window under 334 ms | `maxFlashesInWindow` → **0** |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Area / red flash | Not measured — WCAG 2.3.1 needs more than rate |
| Canvas / video playback | Host must apply the count; this lab does not animate |
| Medical / clinical claims | Forbidden marketing |
| `prefers-reduced-motion` | Host concern; pair with [reduced-motion dashboard](https://github.com/pixel-journey/wax-reduced-motion-dashboard) |

## Attack angles

1. Marketing "seizure-proof" from a pure rate check.  
2. Using pack-collapse (`shown: 1`) where clamp-to-3 was intended.  
3. Ignoring area / brightness / red thresholds in the WCAG understanding doc.  
4. Animating anyway when `flashAllowed` is false.  
5. Claiming WCAG conformance from unit tests alone.

## Honesty limits

Nothing is animated. Not a medical clearance. Not a full WCAG 2.3.1 measurement.

| Sibling | Excess behavior |
| --- | --- |
| **This (animations)** | **clamp** to 3/s |
| [pack-opening canvas](https://github.com/pixel-journey/wax-seizure-safe-pack-opening-canvas) | collapse to **shown: 1** |
| [reduced-motion](https://github.com/pixel-journey/wax-reduced-motion-dashboard) | frames → 1, duration → 0 |

[WCAG understanding](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html).
