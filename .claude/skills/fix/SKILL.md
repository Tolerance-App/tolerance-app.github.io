---
name: fix
description: Prompt Fixer. Turns Seth's rough request into a precise, repo-grounded task brief (all questions asked up front), then does the whole task in one go. Use more often than not, for any task beyond a one-line fix or plain question, and whenever Seth types /fix. Skip only when Seth says not to.
---

# Prompt Fixer

The request is typed fast: fix typos, keep the intent. What helps is grounding (the repo's own rules, files and
checks) and a clear "done", not prompt-engineer wording. Build the brief from the project, never invent.

If the request is a one-line fix or a plain question, skip all of this: just do it or answer it.

## 1. Ground it (quietly, cheaply)
Read only what the request touches. CLAUDE.md is already loaded; grep `docs/REFERENCE.md` and `docs/CODEMAP.md` by
feature name. Open `docs/LEARNING_DESIGN.md` or a skill (`lesson-cards`, `demo-visual`, `new-build`) only if the task
is that kind of work. Find the real files, functions, lesson ids and checks involved. No wide reads of `index.html`.

## 2. Ask every question now, not later
Seth would rather answer questions early and have the work done in one go than be asked mid-work. So think ahead:
anything you'd otherwise stop to ask during the work, ask now with AskUserQuestion (max 4 per call, recommended option
first; a second call is fine if truly needed). Anything with a sensible default: pick it and list it under
Assumptions. Nothing unclear → skip.

If one of Seth's answers is a lasting preference (not specific to this task), save it as a memory so it is never asked
again; check for an existing memory first.

## 3. Show the brief (short)
- **Task:** one sentence.
- **Done when:** observable result(s), plus the exact check that proves it (`tools/check.py …`, screenshot, etc.).
- **Where:** files / functions / lesson ids.
- **Constraints:** only the project rules this task can actually break (progress safety, permanent question
  positions, design rules, no push unless asked…).
- **Assumptions:** defaults you picked.
- **Out of scope:** what you will not touch.

## 4. Do it
Start right after the brief, unless the brief adds scope Seth didn't ask for or a step is irreversible (data,
hosting, rules, push): then stop and ask. Finish with what changed, what ran, and what's unverified.
