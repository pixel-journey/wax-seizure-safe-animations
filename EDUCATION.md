# Education — flash count policy

## Pattern

```text
allowed ⇔ flashes * 1000 ≤ 3 * windowMs
```

Inspired by WCAG 2.3.1 **general flash** guidance (more than three flashes per second).

## Limits of this lab

- Does **not** measure the portion of the screen that flashes
- Does **not** evaluate red flash thresholds
- Does **not** play or capture video

Use it to fail closed on obvious high-rate flash *counts*, then design calmer alternatives.

## Related

- `wax-reduced-motion-dashboard`
- `wax-seizure-safe-pack-opening-canvas`
