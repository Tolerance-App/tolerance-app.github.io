---
name: demo-visual
description: How to build or restyle Tolerance Lab demos, figures and lesson visuals (DEMOS registry, v17 2D engine, label layout, demo-check). Use for any new demo, visual, figure, or demo restyle.
---

# Demos and visuals

## Where they live
- `DEMOS` is the lab registry; ix:v17 is the data-driven 2D demo engine (`mk2D`). A model shows in the Lab only
  through its lesson (`DEMO_OVR`). v39 adds standalone "model sets" (`XD39` spec JSON, `XS39` sets).
- Look up helpers in `docs/CODEMAP.md` (search `mk2D`, `demoU`, `TIDY53`) before reading code.
- Seth wants every lesson to have a demo or visual, and any question that refers to a graph should show one.
- **Keep the ideas in existing demos** even when the visual style is redone.
- Two-state settings use Off/On pills, never a 0–1 slider.

## Layout rules (Seth: overlapping text "makes it feel cheap")
- Design for 375 px wide. The top-right plot `note` fits about 36 characters.
- Put labels beside their lines, not on them. Class `h52` (halo) only for labels that must cross a gridline.
- The `.demo svg` CSS strokes every shape with `currentColor`: put picture layers inside `<g stroke="none">` and
  set strokes explicitly.
- mk2D colour keys and y-axis names go in the strip above the plot (v53). `TIDY53` nudges colliding labels a few
  px, but don't rely on it.
- Use theme CSS variables for colours so dark and light both work. Monospace for numbers.

## Checks (must be clean before shipping)
1. `python tools/check.py demos <demoId…>` or `demolessons <lessonId…>`. It mounts each demo at default, every
   slider's min and max and every pill option, and reports `text-text`, `text-line` and `clipped`.
   Ship with an empty report.
2. The checker ignores curves, so look at it yourself:
   `python tools/check.py shot <lessonId> <scratchpad>/demo.png`, with the lesson opened to its demo card.
3. Physics check: the demo's equations and slider ranges must match the lesson's numbers (hand to the
   `content-checker` agent if unsure).
