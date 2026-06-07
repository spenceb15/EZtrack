# Lessons Learned

## 2026-06-07 — MVP milestones M4–M8 build

### Lessons learned
- Before coding a milestone, check if it's already satisfied — M4 was complete; mapped each spec acceptance line to existing code and wrote zero new code.
- Headless verification that works without a GUI: `npm run typecheck` + `npm run build` + a node `.mjs` that ports the pure logic and asserts cases. Used for M6/M7/M8.
- Word-boundary keyword matching (space-wrap text + keywords, `replace(/[^a-z0-9]+/g, ' ')`) beats substring matching — fixed "ui"-inside-"guideline" false positive in `recommend.ts`.
- Derive health at render from live state instead of persisting a score — badge always reflects edits, no stored/derived sync bug (`utils/health.ts`).
- Inject `now = Date.now()` as a defaulted param into time-dependent pure fns so tests pin a fixed date; use `Date.UTC` for day-diff math to avoid TZ/DST drift.
- Resolve overlapping spec criteria with explicit precedence — §14 lists overlap, so Blocked > Needs Attention > Good decides ties.

### Preferences
- Every milestone: give the 5-part before-coding plan (understanding / files / build / not-build / risks) then the 7-part after-coding report (summary / files / run / complete / not-complete / known-issues / next).
- Make the smallest useful change; don't invent scope; ask before touching FULL_PRD features.
- `docs/MVP_SPEC.md` is the contract and wins all conflicts with `FULL_PRD.md`.
- Keep chat responses terse (caveman mode) — but written deliverables (docs, reports) stay clear prose.

### Decisions
- **Health derived, not stored**: avoids stale data; stored `project.health === 'Blocked'` retained as the manual "project blocked" override signal.
- **Stale threshold = 14 days**: spec says "recently" without a number; picked a concrete default.
- **M7 tiers 5/6 phase-based heuristic**: approximate "after recent build/UI work" via `project.phase` because no event history is tracked — building tracking would be forbidden automation/scope creep.
- **Agent rules first-match-wins, Codex first / Claude last**: safest (testing) match takes priority; Claude is the broadest fallback.

### Best practices confirmed
- Port pure logic to a node script and run it before claiming a milestone passes — caught nothing broken across M6–M8 because logic was proven, not assumed.
- Reuse existing CSS classes (`.bullet-list`) and extend with a tiny modifier (`.health-reasons`) rather than authoring new structures.
- Keep recommendation/selection logic as pure functions in `utils/` — easy to test headless and recompute each render.

## 2026-06-07 — M9 final MVP review

### Lessons learned
- Map every final acceptance criterion to an actual control and persistence path. Static review exposed one real gap: rules displayed correctly, but users could not add one.
- Test Electron with a fresh temporary `HOME` so launch, seed, edits, and reset behavior never touch real user data.
- Verify persistence by killing and restarting the Electron process, then inspect both rendered state and `app-data.json`; a React rerender is not a restart test.
- Browser-only tooling may not exercise an Electron preload bridge. Electron CDP preserves the real renderer, preload, IPC, and local storage path.
- Scope UI automation to the active modal when button labels repeat. An unscoped `Add task` lookup clicked the underlying page button instead of the modal submit button.
- Rendered-state review catches wording bugs that logic tests miss; a completed project initially reused the empty-project “get started” message.

### Final-review decisions
- Added only the missing MVP rule-creation path: rule text, severity, reason, generated ID/date, immutable project update.
- Rule editing/deletion remains out of scope because the MVP acceptance criterion requires adding and viewing rules, not full rule management.
- Exposed the existing stored `health === 'Blocked'` override as one project-form checkbox; clearing it returns health to derived logic without changing the schema.
- Keep isolated smoke scripts and screenshots in `/tmp`; do not add test artifacts or dependencies to the repository.

## 2026-06-07 — M10 D.A.I.L.Y real-world test

### Lessons learned
- Verify recommendation transitions with controls scoped to the named task. An unscoped `Complete` lookup can click the wrong repeated button and produce a false-positive workflow result.
- A persistence test must inspect the specific edited fields and object identities after a full process termination and restart, not merely confirm that the project name renders.
- Compare sample-data reset against the exact seed shape: project count, task IDs/statuses, rule count, and default agents. A visible D.A.I.L.Y card alone does not prove a complete reset.
- Review runtime dependencies as part of Electron security. Secure `BrowserWindow` preferences do not compensate for an Electron release with known high-severity advisories.
- Major Electron upgrades can trigger macOS Keychain prompts through Chromium Safe Storage even when the application has no credential or keychain code. Treat runtime upgrades as user-visible changes and do not launch them without explicit approval.
- Keep test artifacts inside the active project workspace unless the user explicitly authorizes another location. Do not use temporary profiles, scripts, or screenshots outside the workspace by default.

### M10 results
- D.A.I.L.Y answered all seven real-world workflow questions on the project detail screen.
- The initial recommendation selected the lesson-completion smoke test and advanced to the Byte box fix after the smoke-test task was completed.
- Project, task, and Do Not Change rule updates used immutable replacements and generated unique IDs.
- Local JSON changes survived an actual Electron termination and restart.
- Sample-data reset restored the D.A.I.L.Y seed project, three starter tasks, five rules, and four default agents.
- Type checking, production build, whitespace checks, routing, launch, minimum-window layout, and renderer console checks passed.

### Review decisions
- No product feature or architecture changes were needed for M10.
- Remove accidental workspace data artifacts instead of committing runtime-generated JSON.
- Keep dependency-toolchain upgrades separate from milestone documentation when the worktree contains both.
