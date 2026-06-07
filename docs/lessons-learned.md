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

## 2026-06-07 — M11–M13 V1 workflow reviews

### Lessons learned
- Session logging must distinguish creating a new session from editing the previous one. A new log should always default to today, the recommended agent, and blank narrative fields rather than pre-populating stale session content.
- Verify local persistence with a complete Electron termination and restart using the same isolated profile. Keep `HOME` and Chromium user data inside a workspace-only review directory and pass `--password-store=basic` to avoid macOS Keychain prompts.
- Test prompt generation with sparse synthetic projects, not only complete seed data. This exposed blank session labels and a dangling instruction to address a missing next step.
- Preserve utility purity through non-mutating array operations. Filtering before sorting prevents `generatePrompt` from reordering the project's stored Do Not Change rules.
- Clipboard tests need a genuinely focused Electron window. Background CDP calls can trigger Chromium permission rejection even when the production click path is correct; verify both the transient `Copied!` state and exact clipboard readback.
- Clipboard rejection must be handled even when the normal focused path succeeds, otherwise denied permissions produce an unhandled promise rejection.
- Time-based health logic is easiest to review with a fixed `now` value and table-driven project variants. Compare Blocked results directly with the pre-change implementation to prove precedence and wording remain unchanged.
- In a mixed worktree, stage explicit files and inspect the cached diff before committing. M11/M12 renderer work, M13 health logic, documentation, Electron upgrades, and generated Graphify output should remain independently attributable.

## 2026-06-07 — M17 Simple Project History

### Lessons learned
- Keep the single `lastSession` field — it's already used by `computeHealth` and `generatePrompt` for current-state signals. Add `sessionHistory` alongside it rather than replacing it; the two serve different purposes.
- Prepend new entries (`[newSession, ...existing]`) rather than append so the list is newest-first at storage time — no sort needed at render time.
- For the export fallback, `project.sessionHistory ?? (project.lastSession ? [project.lastSession] : [])` preserves the single session for old data without a history array, so exports stay useful after upgrading.
- The "Last session" display section is a natural candidate to become "Session history" — when there's one entry it looks identical, when there are many it shows the full log. No new section is needed.
- The curly-quote `"…"` form inside JSX string attributes causes a TypeScript parse error; use single-quoted outer string (`'…'`) or escape characters.

### M17 results
- `sessionHistory?: LastSession[]` added to `Project` type and validated as optional in `isProject`.
- `createProject` initializes `sessionHistory: []`; `logSession` prepends each new entry.
- "Last session" section replaced with "Session history" — all entries newest-first as cards.
- `generateSummary` exports full history with fallback for legacy data.
- Seed project updated with its one initial session in `sessionHistory`.
- Type check and production build both pass (56 modules, 306.31 kB).

## 2026-06-07 — M16 Knowledge Notes

### Lessons learned
- The same optional-field pattern (`?` in type, `=== undefined || Array.isArray(...)` in validator) applies to array fields as well as record fields. Missing means no data yet; present must be structurally valid.
- Add-only list features follow the Do Not Change rules pattern exactly: `makeId` + `today()` in the handler, spread-append in `persist`, empty-state in the UI, modal form with a new `FormValues` type.
- Knowledge notes belong in both `generatePrompt` (AI context) and `generateSummary` (archival export). They are the same kind of content as Description and Current Goal — contextual facts the AI needs.
- `knowledgeNotes ?? []` at every read site avoids null checks in render and utility functions without mutating the stored data.

### M16 results
- `KnowledgeNote` type added; `knowledgeNotes?: KnowledgeNote[]` field added to `Project`.
- `isProject` validator accepts the field as optional with structural check when present.
- `createProject` initializes `knowledgeNotes: []`; `addKnowledgeNote` appends immutably.
- "Knowledge" section in Project Detail with "Add note" button, list, and empty state.
- Notes included in `generatePrompt` (`### Knowledge`) and `generateSummary` (`## Knowledge`).
- Type check and production build both pass (56 modules, 305.92 kB).

## 2026-06-07 — M15 Agent Usage Tracking

### Lessons learned
- Add new persistent fields as optional (`?`) in both the type and the validator when the field may be absent on already-saved user data. Strict validation of new required fields breaks load for any project saved before the upgrade.
- The validator's role is to accept structurally valid data, not to backfill defaults. Add defaults in the write path (`createProject`, `logSession`) so the field is always present going forward; tolerate its absence on read.
- Incrementing a count in an immutable update requires a safe spread: `{ ...(p.agentUsageCounts ?? {}), [agent]: ((p.agentUsageCounts ?? {})[agent] ?? 0) + 1 }` — handles both the undefined-field case and missing keys.
- Seed data should reflect the actual state of the seed project. The D.AI.L.Y seed has one logged session by Claude Code, so `agentUsageCounts: { 'Claude Code': 1 }` is correct rather than `{}`.

### M15 results
- `agentUsageCounts` field added as optional to `Project` type and validated correctly in `isProject`.
- `createProject` initializes the field to `{}`; `logSession` increments the correct agent's count.
- "Agent usage" section appears in Overview, sorted by count, hidden when empty.
- Existing saved data without the field continues to load and pass validation.
- Type check and production build both pass.

## 2026-06-07 — M14 Export Project Summary

### Lessons learned
- Native Electron save dialogs require `dialog` from the main process — `dialog.showSaveDialog` returns `{ canceled, filePath }`. Always guard both `canceled` and `filePath` before writing.
- `BrowserWindow.getFocusedWindow()` can return null if focus moved; fall back to `getAllWindows()[0]` so the dialog always has an owner window.
- Export feedback works without a modal: set a transient string state (`'idle' | 'saved' | 'cancelled'`) on the triggering button, then reset after 2 seconds — same pattern as the PromptCard copy button.
- Keep `generateSummary` and `generatePrompt` as separate functions. The prompt is optimized for AI context (omits complete tasks, active-only); the summary is archival (includes everything). They serve different audiences and should not be merged.
- File export must include all tasks (including complete ones) because the export is an archival snapshot, not a working context document.

### M14 results
- `generateSummary(project)` is a pure Markdown generator covering all project fields.
- `file:export` IPC handler opens a native save dialog, writes the file, and returns a boolean result to the renderer.
- `exportFile` is exposed through the preload bridge and typed in `env.d.ts`.
- "Export summary" button shows transient "Saved!" or "Cancelled" feedback for 2 seconds after the dialog resolves.
- No new modal, no new component, no new dependencies.

### M11–M13 results
- M11 session logging matches `LastSession`, updates projects immutably, defaults new logs correctly, and persists through an Electron restart.
- M12 prompt generation is pure, omits empty fields, orders rules by severity, copies the complete prompt, and closes through Escape or the close button.
- M13 treats missing and stale sessions as attention signals, reports recent sessions in Good reasons, and preserves both existing Blocked paths.
- Type checking, production builds, and whitespace checks passed after the focused fixes.
