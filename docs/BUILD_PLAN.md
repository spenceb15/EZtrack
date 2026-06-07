# AI Project Dashboard — Build Plan

Version: 0.1
Status: Initial MVP build plan
Primary build tools: Claude Code for implementation, Codex for review
Primary source of truth: `docs/MVP_SPEC.md`

---

# 1. Purpose of This Build Plan

This document explains how to build the initial MVP of the AI Project Dashboard in a controlled, step-by-step way.

The goal is not to build the full AgentOS vision yet.

The goal is to build a functional local-first dashboard that helps the user:

1. See active projects.
2. Track project progress.
3. Understand project phase.
4. See the recommended next step.
5. Choose the right AI agent.
6. Understand why that agent is recommended.
7. Track simple tasks.
8. Track Do Not Change rules.
9. See a last session summary.
10. Persist data locally.

---

# 2. Build Scope Hierarchy

Coding agents should read project documents in this order:

1. `docs/MVP_SPEC.md`
2. `docs/FULL_PRD.md`
3. `AGENT_RULES.md`
4. `README.md`
5. `docs/BUILD_PLAN.md`

Important:

* `docs/MVP_SPEC.md` is the build contract.
* `docs/FULL_PRD.md` is future product context only.
* `docs/BUILD_PLAN.md` explains the order of implementation.
* If documents conflict, follow `docs/MVP_SPEC.md`.
* Do not implement features from the full PRD unless they are explicitly included in the MVP.

---

# 3. Initial Build Strategy

The first build should be simple and manual.

Do not begin with:

* Handoff automation
* Graphify integration
* Agent relay
* MCP registry
* Full pipelines
* Cloud sync
* Login/accounts
* GitHub integration
* Automatic repo analysis
* AI-generated recommendations

Begin with:

* A working app shell
* Local data
* A useful dashboard
* Project cards
* Task tracking
* Agent recommendation
* “What should I do next?” logic

The first product win is:

> Open the app and immediately know what project to work on, what the next step is, and which AI agent should handle it.

---

# 4. Recommended Agent Usage

## 4.1 Claude Code

Use Claude Code for implementation.

Best for:

* App shell
* React components
* UI layout
* Project pages
* Forms
* Local data flow
* Dashboard cards
* MVP feature implementation

Claude Code risk:

* May overbuild
* May drift into future PRD features
* May redesign beyond the MVP
* May add unnecessary abstractions

How to control Claude Code:

* Give one milestone at a time.
* Always remind it that `MVP_SPEC.md` wins.
* Explicitly list what not to build.
* Require a pre-coding plan.
* Require an end-of-session summary.

---

## 4.2 Codex

Use Codex after each Claude Code milestone.

Best for:

* TypeScript review
* Broken imports
* Broken routes
* Unsafe Electron patterns
* Data persistence bugs
* State update bugs
* Scope creep detection
* Minimal fixes

Codex risk:

* May not be ideal for broad UI/product implementation.
* May suggest architecture changes too early.

How to control Codex:

* Tell it to review, not redesign.
* Tell it to make minimal fixes only.
* Tell it to check alignment with `MVP_SPEC.md`.

---

## 4.3 ChatGPT

Use ChatGPT for:

* Product planning
* Prompt writing
* PRD refinement
* Build sequencing
* Feature scope decisions
* Plain-English explanations
* MVP vs V1/V2 decisions

---

## 4.4 Gemini

Use Gemini later for:

* UX review
* Visual critique
* Beginner-friendliness review
* Requirement gaps
* Product flow review

Do not use Gemini for the first implementation push unless the UI needs critique after the dashboard exists.

---

# 5. Required Coding Agent Protocol

Every coding agent session should follow this protocol.

## 5.1 Before Coding

The agent must respond with:

1. Understanding of the task.
2. Files it plans to create or modify.
3. Features it will build.
4. Features it will intentionally not build.
5. Risks or assumptions.

The user should review this before allowing code changes.

---

## 5.2 During Coding

The agent must follow these rules:

* Make the smallest effective change.
* Do not expand beyond the assigned milestone.
* Do not build future PRD features early.
* Do not add unnecessary dependencies.
* Keep code readable.
* Keep the app runnable.
* Do not leave broken imports or routes.
* Do not remove working functionality without explaining why.

---

## 5.3 After Coding

The agent must end with:

1. Summary of changes.
2. Files changed.
3. How to run or test.
4. What is complete.
5. What is not complete.
6. Known issues.
7. Recommended next task.

---

# 6. Milestone Overview

The MVP should be built in this order:

1. App Shell
2. Local Data
3. Dashboard Cards
4. Project Detail Page
5. Project and Task Editing
6. Agent Recommendation Helper
7. What Should I Do Next?
8. Polish and Usability
9. MVP Review
10. D.AI.L.Y Real-World Test

Do not skip ahead to handoffs, Graphify, pipelines, or automation.

---

# 7. Milestone 1 — App Shell

## Goal

Create the basic local desktop app structure.

## Build

* Electron app setup
* React app setup
* TypeScript setup
* Dark mode layout
* Sidebar navigation
* Dashboard page
* Projects page
* Project detail placeholder page
* Agents page
* Settings page
* Clean folder structure

## Do Not Build

* Local data persistence
* Handoffs
* Graphify
* Pipelines
* Agent relay
* MCP registry
* Cloud backend
* Login
* GitHub integration

## Acceptance Criteria

* App launches locally.
* Sidebar navigation works.
* Pages render without errors.
* Project structure is understandable.
* No advanced features are implemented.

## Claude Code Prompt

```text
You are building the initial MVP of my AI Project Dashboard.

Before coding, read:

1. docs/MVP_SPEC.md
2. docs/FULL_PRD.md
3. AGENT_RULES.md
4. README.md
5. docs/BUILD_PLAN.md

Important:
- docs/MVP_SPEC.md is the build contract.
- docs/FULL_PRD.md is future context only.
- Do not build future PRD features unless they are explicitly included in the MVP.
- This is a simple project dashboard MVP, not a full agent operating system.

Current task:
Build Milestone 1 — App Shell.

Use:
- Electron
- React
- TypeScript

Build:
1. Electron app setup
2. React app setup
3. TypeScript setup
4. Dark-mode app layout
5. Sidebar navigation
6. Dashboard page
7. Projects page
8. Project Detail placeholder page
9. Agents page
10. Settings page
11. Clean folder structure

Do not build:
- Automated handoffs
- Agent relay
- Graphify
- MCP registry
- Pipelines
- Cloud backend
- Login/accounts
- GitHub integration
- File watching
- Automatic repo analysis
- AI-generated recommendations

Before coding, respond with:
1. Your understanding of the task.
2. Files you plan to create or modify.
3. Features you will build.
4. Features you will intentionally not build.
5. Risks or assumptions.

After coding, provide:
1. Summary of changes.
2. Files changed.
3. How to run the app.
4. What is complete.
5. Known issues.
6. Recommended next task.
```

## Codex Review Prompt

```text
You are reviewing Milestone 1 of the AI Project Dashboard MVP.

Before reviewing, read:

1. docs/MVP_SPEC.md
2. AGENT_RULES.md
3. README.md
4. docs/BUILD_PLAN.md

Your role:
Correctness reviewer and minimal-fix engineer.

Check for:
1. TypeScript errors.
2. Broken imports.
3. Broken routes.
4. App launch issues.
5. Unsafe Electron patterns.
6. Unnecessary dependencies.
7. Scope creep beyond Milestone 1.
8. Mismatch with docs/MVP_SPEC.md.

Do not:
- Redesign the UI.
- Add local data persistence.
- Add handoffs.
- Add Graphify.
- Add pipelines.
- Add agent automation.
- Add future PRD features.

Allowed:
- Minimal fixes.
- TypeScript fixes.
- Broken import fixes.
- Route fixes.
- Small cleanup.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Whether the build still matches the MVP.
6. Recommended next task for Claude Code.
```

---

# 8. Milestone 2 — Local Data

## Goal

Add simple local persistence and seed data.

## Build

* Local JSON data store
* Default app settings
* Default agent profiles
* Sample D.AI.L.Y project
* Starter D.AI.L.Y tasks
* Starter Do Not Change rules
* Load data on app start
* Save data after edits

## Recommended Data Location

For MVP:

```text
~/AIProjectDashboard/app-data.json
```

If Electron setup makes this difficult, use the app’s user data directory.

## Default Agents

* Claude Code
* Codex
* Gemini
* ChatGPT

## Acceptance Criteria

* App loads sample data.
* Sample project appears on dashboard.
* Default agents appear on Agents page.
* Data persists after restart.
* No cloud account is required.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 2 — Local Data.

Before coding, read:
1. docs/MVP_SPEC.md
2. AGENT_RULES.md
3. README.md
4. docs/BUILD_PLAN.md

Build:
1. Local JSON persistence.
2. Default app settings.
3. Default agent profiles:
   - Claude Code
   - Codex
   - Gemini
   - ChatGPT
4. Sample D.AI.L.Y project.
5. Starter D.AI.L.Y tasks.
6. Starter Do Not Change rules.
7. Load data on app start.
8. Save data after edits if editing exists already.

Do not build:
- SQLite migration
- Cloud sync
- Login
- Handoff generation
- Graphify
- Pipelines
- Agent automation

Keep the data model simple and readable.

Before coding, respond with:
1. Data shape you plan to use.
2. Files you plan to create or modify.
3. How persistence will work.
4. What you will intentionally not build.

After coding, provide:
1. Summary.
2. Files changed.
3. Data shape.
4. How persistence works.
5. How to test.
6. Known issues.
7. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 2 — Local Data.

Check:
1. Data loads correctly.
2. Data saves correctly if save behavior exists.
3. Sample D.AI.L.Y project is valid.
4. Default agents are valid.
5. TypeScript types are clear.
6. No advanced features were added.
7. No cloud or login behavior was introduced.
8. MVP scope is preserved.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 9. Milestone 3 — Dashboard Cards

## Goal

Make the dashboard useful.

## Build

Each project card should show:

* Project name
* Description
* Current phase
* Progress percentage
* Health status
* Next step
* Recommended agent
* Why this agent
* Last worked on
* Open task count
* Blocked task count
* Open project button

## Acceptance Criteria

* User can understand project status from the card.
* D.AI.L.Y card shows a useful next step.
* Recommended agent is visible.
* Health state is visible.
* Project can be opened from the card.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 3 — Dashboard Cards.

Build useful project cards on the Dashboard page.

Each project card should show:
- Project name
- Description
- Current phase
- Progress percentage
- Health status
- Next step
- Recommended agent
- Why this agent
- Last worked on
- Open task count
- Blocked task count
- Open project button

Design goals:
- Calm
- Clear
- Beginner-friendly
- Dark mode first
- Not overly technical

Do not build:
- Handoffs
- Graphify
- Pipelines
- Automation
- AI-generated recommendations
- Full project editing yet unless already simple

After coding, provide:
1. Summary.
2. Files changed.
3. UI behavior.
4. How to test.
5. Known issues.
6. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 3 — Dashboard Cards.

Check:
1. Project cards render correctly.
2. Data maps correctly onto cards.
3. Open task and blocked task counts are accurate.
4. Open Project button works or gracefully handles placeholder routing.
5. No advanced scope was added.
6. UI does not hide key MVP information.
7. TypeScript remains clean.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 10. Milestone 4 — Project Detail Page

## Goal

Let the user resume a project without feeling lost.

## Build

The Project Detail page should show:

1. Project overview
2. Current phase
3. Progress
4. Current goal
5. Recommended next step
6. Recommended agent
7. Why this agent
8. Task list
9. Do Not Change rules
10. Last session summary
11. Notes

## Acceptance Criteria

* User can open D.AI.L.Y and understand the project state.
* Task list appears.
* Do Not Change rules appear.
* Last session summary appears.
* The next step is clear.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 4 — Project Detail Page.

The Project Detail page should help the user return to a project and immediately understand what is going on.

Show:
1. Project overview
2. Current phase
3. Progress
4. Current goal
5. Recommended next step
6. Recommended agent
7. Why this agent
8. Task list
9. Do Not Change rules
10. Last session summary
11. Notes

Do not build:
- Handoff generation
- Graphify
- Pipelines
- Agent relay
- Full automation
- Complex editing if not part of this milestone

After coding, provide:
1. Summary.
2. Files changed.
3. How to test.
4. Known issues.
5. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 4 — Project Detail Page.

Check:
1. Project routing works.
2. Project detail data renders correctly.
3. Missing project states are handled gracefully.
4. Task list displays correctly.
5. Do Not Change rules display correctly.
6. Last session summary displays correctly.
7. No handoff or automation scope was added.
8. TypeScript remains clean.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 11. Milestone 5 — Project and Task Editing

## Goal

Make the dashboard manually usable.

## Build

* Create project
* Edit project
* Add task
* Edit task
* Mark task complete
* Mark task blocked
* Update next step
* Update recommended agent
* Save changes locally

## Acceptance Criteria

* User can create a new project.
* User can edit an existing project.
* User can add and edit tasks.
* User can complete or block tasks.
* Changes persist after restart.
* Dashboard updates after edits.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 5 — Project and Task Editing.

Build:
1. Create project.
2. Edit project.
3. Add task.
4. Edit task.
5. Mark task complete.
6. Mark task blocked.
7. Update next step.
8. Update recommended agent.
9. Save all changes locally.

Keep forms simple and usable.

Do not build:
- Handoffs
- Graphify
- Pipelines
- Agent automation
- Complex validation beyond basic required fields
- Cloud sync

After coding, provide:
1. Summary.
2. Files changed.
3. How data updates.
4. How to test.
5. Known issues.
6. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 5 — Project and Task Editing.

Check:
1. Create project works.
2. Edit project works.
3. Add task works.
4. Edit task works.
5. Complete/block task actions work.
6. Local persistence works after restart.
7. Dashboard updates after edits.
8. No advanced features were added.
9. TypeScript remains clean.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 12. Milestone 6 — Agent Recommendation Helper

## Goal

Help the user choose the right AI agent.

## Build

* Agent profile cards
* Agent strengths
* Agent risks
* Agent best use cases
* Agent recommendation logic
* “Why this agent?” explanation

## Default Recommendation Rules

Use:

* Claude Code for building, UI implementation, components, feature work, and refactoring.
* Codex for bugs, tests, TypeScript errors, regression checks, and minimal fixes.
* Gemini for UX review, critique, visual review, and requirement gaps.
* ChatGPT for planning, PRDs, specs, strategy, documentation, and prompts.

## Acceptance Criteria

* User can view all agent profiles.
* Each task can show a recommended agent.
* User can understand why the agent was chosen.
* Recommendations are rule-based, not AI-generated.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 6 — Agent Recommendation Helper.

Build:
1. Agent profile cards.
2. Agent strengths.
3. Agent risks.
4. Agent best use cases.
5. Rule-based recommendation helper.
6. “Why this agent?” explanation.

Default rules:
- Claude Code for feature implementation, UI building, components, refactoring.
- Codex for bugs, tests, TypeScript errors, regression checks, minimal fixes.
- Gemini for UX review, visual critique, requirement gaps.
- ChatGPT for planning, PRDs, specs, documentation, strategy, prompts.

Do not build:
- AI-generated recommendations
- API calls
- Agent execution
- Automated handoffs
- Usage automation

After coding, provide:
1. Summary.
2. Files changed.
3. Recommendation rules.
4. How to test.
5. Known issues.
6. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 6 — Agent Recommendation Helper.

Check:
1. Agent profiles display correctly.
2. Recommendation logic is simple and deterministic.
3. “Why this agent?” explanations are clear.
4. No AI/API-based recommendation system was added.
5. No automation scope was added.
6. TypeScript remains clean.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 13. Milestone 7 — What Should I Do Next?

## Goal

Add the central recommendation feature.

## Build

* Dashboard button
* Project detail button
* Rule-based next action selector
* Recommendation card

## MVP Recommendation Priority

Prioritize:

1. Critical ready tasks
2. High-priority ready tasks
3. In-progress tasks
4. Blocked tasks that need user attention
5. Testing tasks after build/refine phase
6. Oldest ready task
7. If no task exists, recommend creating a task

## Recommendation Output

Show:

* Project
* Task
* Recommended agent
* Why this agent
* Why this task now
* Caution notes from Do Not Change rules

## Acceptance Criteria

* User clicks button.
* App recommends one project/task.
* App explains why.
* App recommends an agent.
* App shows caution notes.
* No AI-generated recommendation required.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 7 — What Should I Do Next?

Build:
1. Button on dashboard.
2. Button on project detail page.
3. Rule-based next action selector.
4. Recommendation card.

Recommendation logic should prioritize:
1. Critical ready tasks.
2. High-priority ready tasks.
3. In-progress tasks.
4. Blocked tasks that need user attention.
5. Testing tasks after build/refine phase.
6. Oldest ready task.
7. If no task exists, recommend creating a task.

Recommendation should include:
- Project
- Task
- Recommended agent
- Why this agent
- Why this task now
- Caution notes from Do Not Change rules

Do not build:
- AI-generated recommendations
- API calls
- Handoff generation
- Agent automation
- Graphify
- Pipelines

After coding, provide:
1. Summary.
2. Files changed.
3. Recommendation rules.
4. How to test.
5. Known issues.
6. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 7 — What Should I Do Next?

Check:
1. Recommendation button works.
2. Recommendation logic follows MVP priority.
3. Recommendation output includes project, task, agent, reason, and caution notes.
4. Empty states work.
5. Blocked task logic is handled clearly.
6. No AI/API recommendation was added.
7. No handoff automation was added.
8. TypeScript remains clean.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 14. Milestone 8 — Polish and Usability

## Goal

Make the MVP pleasant enough to use daily.

## Build

* Better empty states
* Better visual hierarchy
* Clear badges
* Plain-English labels
* Health warnings
* Agent badges
* Simple settings
* Reset sample data
* Basic error handling

## Acceptance Criteria

* App feels calm and clear.
* Dashboard is understandable.
* Beginner user can understand the next step.
* No overwhelming advanced systems appear.
* MVP feels usable enough for real project tracking.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 8 — Polish and Usability.

Improve:
1. Empty states.
2. Visual hierarchy.
3. Health badges.
4. Agent badges.
5. Plain-English labels.
6. Settings page.
7. Reset sample data option.
8. Basic error handling.
9. Overall beginner-friendliness.

Do not add:
- Handoffs
- Graphify
- Pipelines
- Automation
- New major features
- Full PRD features

Keep this polish pass focused on making the existing MVP easier to use.

After coding, provide:
1. Summary.
2. Files changed.
3. UX improvements.
4. How to test.
5. Known issues.
6. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 8 — Polish and Usability.

Check:
1. No existing functionality broke.
2. Empty states are clear.
3. Badges and labels are understandable.
4. Reset sample data works if implemented.
5. No future features were added.
6. TypeScript remains clean.
7. App still matches MVP_SPEC.md.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 15. Milestone 9 — MVP Review

## Goal

Verify that the MVP matches the spec.

## Review Checklist

The MVP is complete when:

* App launches locally.
* User can see a dashboard of projects.
* User can create a project.
* User can edit a project.
* User can see project progress.
* User can assign a project phase.
* User can add tasks.
* User can edit tasks.
* User can mark tasks complete or blocked.
* User can see a recommended next step.
* User can see a recommended agent.
* User can understand why that agent is recommended.
* User can add Do Not Change rules.
* User can see a last session summary.
* User can open D.AI.L.Y as a sample project.
* User can click “What should I do next?” and receive a useful recommendation.
* All data persists locally after app restart.
* No cloud account is required.
* No handoff automation exists.
* No advanced agent relay exists.

## Codex Final Review Prompt

```text
Perform a final MVP review of the AI Project Dashboard.

Read:
1. docs/MVP_SPEC.md
2. AGENT_RULES.md
3. README.md
4. docs/BUILD_PLAN.md

Review whether the app satisfies the MVP acceptance criteria.

Check:
1. App launch.
2. Dashboard.
3. Project creation/editing.
4. Task creation/editing.
5. Project progress.
6. Phase tracking.
7. Recommended next step.
8. Recommended agent.
9. Why this agent explanation.
10. Do Not Change rules.
11. Last session summary.
12. D.AI.L.Y sample project.
13. Local persistence.
14. Scope discipline.

Do not add new features.

Required output:
1. Passed acceptance criteria.
2. Failed acceptance criteria.
3. Bugs found.
4. Minimal fixes made, if any.
5. Remaining MVP gaps.
6. Recommendation: ready for D.AI.L.Y test or not ready.
```

---

# 16. Milestone 10 — D.AI.L.Y Real-World Test

## Goal

Use the dashboard with a real project.

## Test Scenario

Use the D.AI.L.Y project as the first real dashboard test.

The dashboard should help answer:

1. What phase is D.AI.L.Y in?
2. What is the current goal?
3. What is the next step?
4. Which agent should be used?
5. Why that agent?
6. What should not be changed?
7. What happened last session?

## Test Tasks

Seed these tasks:

### Task 1

```text
Run smoke test on lesson completion flow
```

Recommended agent:

```text
Codex
```

Why:

```text
This is a testing and regression task.
```

### Task 2

```text
Fix Byte mascot box issue
```

Recommended agent:

```text
Codex
```

Why:

```text
This is a targeted visual bug fix that should avoid broad redesign.
```

### Task 3

```text
Review onboarding flow for beginner clarity
```

Recommended agent:

```text
Gemini
```

Why:

```text
This is a UX review task.
```

## Success Criteria

The D.AI.L.Y test succeeds if:

* The dashboard makes the project state clear.
* The next task feels obvious.
* The recommended agent makes sense.
* The Do Not Change rules are visible.
* The app reduces the need to mentally reconstruct the project.

---

# 17. Milestone 11 — Manual Session Logging

## Goal

Let the user log what happened in a coding session directly from the dashboard.

## Build

* "Log session" button on Project Detail page
* Session form: date, agent used, summary, problems encountered, recommended next step
* Saves to `project.lastSession`
* Updates `project.lastWorkedOn` and `project.lastAgentUsed`
* Replaces any existing lastSession (one slot; no history list yet)

## Do Not Build

* Session history list (V2)
* Automated session capture
* Handoff generation
* Graphify
* Pipelines
* Cloud sync

## Acceptance Criteria

* User opens D.A.I.L.Y and clicks "Log session."
* Form pre-populates date with today and agent with `project.recommendedAgent`.
* User fills in summary, problems, next step and saves.
* Project Detail "Last session" section shows the new entry.
* `lastWorkedOn` and `lastAgentUsed` update on save.
* Data persists after Electron restart.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 11 — Manual Session Logging (first V1 feature).

Read first:
1. docs/MVP_SPEC.md
2. AGENT_RULES.md
3. README.md
4. docs/BUILD_PLAN.md

Context management: run /compact after this milestone completes before starting the next one.

Build:
1. "Log session" button on the Project Detail page.
2. A SessionForm modal: fields for date (default today), agent (default project.recommendedAgent), summary, problems, recommendedNextStep.
3. onLogSession handler in App.tsx that updates project.lastSession, project.lastAgentUsed, and project.lastWorkedOn.
4. Wire modal open/close state in ProjectDetail.tsx.
5. Pass onLogSession down from App through ProjectDetail.

Do not build:
- Session history list
- Automated session detection
- Handoffs
- Graphify
- Pipelines
- Cloud sync
- New dependencies

Before coding, respond with:
1. Understanding of the task.
2. Files to create or modify.
3. Features you will build.
4. Features you will intentionally not build.
5. Risks or assumptions.

After coding, provide:
1. Summary of changes.
2. Files changed.
3. How to test.
4. Known issues.
5. What was intentionally not built.
6. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 11 — Manual Session Logging.

Read:
1. docs/MVP_SPEC.md
2. AGENT_RULES.md

Check:
1. SessionForm fields match the LastSession type (date, agent, summary, problems, recommendedNextStep).
2. onLogSession handler updates lastSession, lastWorkedOn, and lastAgentUsed immutably.
3. Modal open/close state is correct.
4. Form pre-populates date and agent.
5. Data persists after Electron restart.
6. No session history list or automation was added.
7. TypeScript is clean — no implicit any, no unused imports.
8. App.tsx prop drilling is minimal and consistent with existing patterns.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 17.5. Milestone 12 — Basic Prompt Generation

## Goal

Let the user generate a ready-to-paste starter prompt for any project, pre-filled with project context, active tasks, Do Not Change rules, and last session notes.

## Build

* "Generate prompt" button on Project Detail page
* `generatePrompt(project)` utility — pure function, no side effects
* `PromptCard` component — displays generated text with a "Copy to clipboard" button
* Prompt includes: project name/type/phase/progress, description, current goal, recommended next step, recommended agent + why, active (non-complete) tasks, Do Not Change rules (Hard Rules first), last session (if any)

## Do Not Build

* API calls or AI-generated text
* Agent-specific formatting variants
* Saving or exporting prompts to disk
* Handoffs, automation, or pipelines

## Acceptance Criteria

* User clicks "Generate prompt" on a project.
* Modal opens showing a pre-filled text block.
* "Copy to clipboard" button copies the full prompt.
* Prompt includes all non-empty fields from the project.
* Empty fields (no currentGoal, no tasks, etc.) are omitted — no placeholder dashes in the output.
* Clicking "×" or pressing Escape closes the modal.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 12 — Basic Prompt Generation (second V1 feature).

Read first:
1. docs/MVP_SPEC.md
2. AGENT_RULES.md
3. README.md
4. docs/BUILD_PLAN.md

Context management: run /compact after this milestone completes before starting the next one.

Build:
1. src/renderer/utils/prompt.ts — pure function generatePrompt(project: Project): string.
   Include: name, type, phase, progress, description, currentGoal, nextStep, recommendedAgent + why,
   active tasks (non-complete), doNotChangeRules (Hard Rules first), lastSession.
   Skip empty fields entirely — no "—" placeholders.
2. src/renderer/components/PromptCard.tsx — renders prompt text in a <pre>, with a "Copy to clipboard" button.
   Button shows "Copied!" for 2 seconds after success.
3. ProjectDetail.tsx — add "Generate prompt" button in head-actions.
   On click: open modal with <PromptCard prompt={generatePrompt(project)} />.
4. styles.css — add .prompt-card, .prompt-actions, .prompt-text rules.

Do not build:
- AI generation or API calls
- Prompt history or saving
- Agent-specific template variants
- New dependencies

After coding, provide:
1. Summary of changes.
2. Files changed.
3. How to test.
4. Known issues.
5. What was intentionally not built.
6. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 12 — Basic Prompt Generation.

Read:
1. docs/MVP_SPEC.md
2. AGENT_RULES.md

Check:
1. generatePrompt is a pure function — no side effects, no imports beyond types.
2. Empty project fields are omitted from prompt output, not shown as dashes.
3. doNotChangeRules are sorted Hard Rule → Warning → Note.
4. PromptCard copy button uses navigator.clipboard.writeText and shows transient "Copied!" state.
5. Modal open/close state is correct — button in head-actions, modal at bottom of JSX.
6. No API calls or AI generation added.
7. TypeScript is clean.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 17.6. Milestone 13 — Better Project Health Score

## Goal

Close the gap between the MVP health logic and the §14.2 example output by incorporating `lastSession` into `computeHealth`. The spec example explicitly lists "No recent session summary" as an attention reason; the current implementation ignores `lastSession` entirely.

## Build

* `computeHealth` now checks `project.lastSession`:
  * `null` → attention reason "No session logged yet"
  * `lastSession.date` stale (> 14 days) → attention reason "Last session was X days ago"
  * Recent → adds "Recent session logged" to Good reasons
* Good state reasons become more specific:
  * "N active/ready tasks" instead of generic "Has an active or ready task"
  * "Recent session logged" when session is fresh

## Do Not Build

* Numeric health percentage (deferred per §14 "Optionally show a percentage later")
* Phase-specific health rules
* API calls or AI-generated health analysis
* New UI components — health reasons already render as a list

## Acceptance Criteria

* Project with no `lastSession` shows "No session logged yet" under Needs Attention.
* Project with a stale `lastSession.date` shows "Last session was X days ago" under Needs Attention.
* Project with a recent session logs "Recent session logged" as a Good reason.
* Good reason "Has an active or ready task" is replaced with the count form ("2 ready tasks", etc.).
* All existing tests pass — no regressions to Blocked logic.

## Claude Code Prompt

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build Milestone 13 — Better Project Health Score (V1 item 4).

Read first:
1. docs/MVP_SPEC.md (§14 health logic, §14.2 example output)
2. AGENT_RULES.md
3. src/renderer/utils/health.ts

Context management: run /compact after this milestone completes before starting the next one.

Change only src/renderer/utils/health.ts:
1. After the stale check, add a session signal:
   - project.lastSession === null → push "No session logged yet" to attention[]
   - lastSession.date is stale (> STALE_DAYS days old) → push "Last session was X days ago"
2. In the Good reasons block, replace "Has an active or ready task" with the count form:
   count the Ready + In Progress tasks and use plural() to build "N ready/active task(s)".
3. In the Good reasons block, add "Recent session logged" when a non-stale session exists.
4. Keep all existing Blocked logic unchanged.

Do not build:
- Numeric score / percentage
- Phase-specific rules
- New components or pages
- New dependencies

After coding:
1. Summary of changes.
2. Files changed.
3. How to test.
4. Known issues.
5. Recommended next task.
```

## Codex Review Prompt

```text
Review Milestone 13 — Better Project Health Score.

Read:
1. docs/MVP_SPEC.md §14
2. src/renderer/utils/health.ts

Check:
1. lastSession null → "No session logged yet" appears in attention reasons.
2. Stale lastSession.date → "Last session was X days ago" appears.
3. Recent session → "Recent session logged" appears in Good reasons.
4. Good reason uses count form for active/ready tasks.
5. Blocked logic unchanged.
6. No new imports, no new components, no numeric score.
7. TypeScript clean.

Make only minimal fixes.

Required output:
1. Issues found.
2. Fixes made.
3. Files changed.
4. Remaining risks.
5. Recommended next task.
```

---

# 17.7. Milestone 14 — Export Project Summary

## Goal

Let the user export a complete Markdown snapshot of any project to a local file — useful for archiving, sharing context with an agent outside the app, or reviewing project state in a text editor.

## Build

* "Export summary" button on Project Detail page
* `generateSummary(project)` utility — pure function in `utils/summary.ts`, no side effects
* `file:export` IPC handler in `main/index.ts` — opens native save dialog, writes `.md` file
* `exportFile` bridge in `preload/index.ts` and `env.d.ts`
* Transient "Saved!" / "Cancelled" button feedback (2 seconds), same pattern as PromptCard copy button

## Summary format (Markdown)

Includes: name, type, phase, progress, health, last worked on, last agent used, description, current goal, recommended next step + agent + why, **all** tasks (including complete), Do Not Change rules, last session, notes.

## Do Not Build

* Scheduled or automatic exports
* Export history or versioning
* PDF or HTML export variants
* Cloud upload or sharing
* Handoffs, pipelines, or automation

## Acceptance Criteria

* User clicks "Export summary" on a project detail page.
* Native macOS save dialog opens with a pre-suggested filename (`<project-name>-summary.md`).
* User selects a path and saves; button briefly shows "Saved!".
* User cancels dialog; button briefly shows "Cancelled".
* The written `.md` file contains all non-empty project fields in readable Markdown.
* Cancelling does not write any file.
* No new modal is required — the native dialog is the UI.

---

# 17.8. Milestone 15 — Agent Usage Tracking

## Goal

Show how many sessions each agent has been used for on a project, so the user can see which tools they actually reach for versus which ones are merely recommended.

## Build

* `agentUsageCounts?: Record<string, number>` on the `Project` type (optional for backward compat with existing saved data)
* `isProject` validator accepts the field as optional — missing means no counts yet, present must be `Record<string, number>`
* `createProject` initializes `agentUsageCounts: {}`
* `logSession` increments `agentUsageCounts[agent]` each time a session is saved
* "Agent usage" display in the Project Detail Overview section — sorted by count descending, hidden when empty

## Do Not Build

* Automatic session/agent detection
* Global agent usage leaderboard or cross-project view
* Usage charts or visualizations
* Usage-based recommendation adjustments
* New dependencies

## Acceptance Criteria

* Logging a session increments the count for the logged agent.
* Counts persist across Electron restarts.
* "Agent usage" appears in Overview only when at least one session has been logged.
* Agents sorted by session count (most-used first).
* New projects start with an empty counts map.
* Existing saved data without `agentUsageCounts` loads and passes validation without error.

---

# 17.9. Milestone 16 — Knowledge Notes

## Goal

Let the user store discrete, titled pieces of context per project — architecture decisions, key constraints, terminology, or reference snippets — that grow over time and appear in generated prompts and exports.

## Build

* `KnowledgeNote` type: `{ id, title, body, createdAt }`
* `knowledgeNotes?: KnowledgeNote[]` on `Project` (optional for backward compat)
* `isProject` validator accepts the field as optional — absent means no notes yet
* `createProject` initializes `knowledgeNotes: []`
* `addKnowledgeNote` handler in `App.tsx` — appends to the project's list
* "Knowledge" section in Project Detail — "Add note" button, list of notes, empty state
* `KnowledgeNoteForm` component — title (required) + body (required)
* `generatePrompt` includes `### Knowledge` block when notes exist
* `generateSummary` includes `## Knowledge` section when notes exist

## Do Not Build

* Editing or deleting notes
* Search or filter
* Tags or categories
* Auto-generated notes
* Note reordering

## Acceptance Criteria

* User can add a knowledge note (title + body) to a project.
* Notes appear in the "Knowledge" section on the Project Detail page.
* Notes persist across Electron restarts.
* Notes appear in the generated prompt (`### Knowledge`).
* Notes appear in the exported summary (`## Knowledge`).
* New projects start with an empty notes list.
* Existing saved data without `knowledgeNotes` loads without error.

---

# 17.10. Milestone 17 — Simple Project History

## Goal

Keep a growing log of all sessions the user has logged, so they can look back at what happened across multiple work sessions rather than only seeing the most recent one.

## Build

* `sessionHistory?: LastSession[]` on `Project` (optional for backward compat — newest-first)
* `isProject` validator accepts the field as optional — missing means no history yet, present must be `LastSession[]`
* `createProject` initializes `sessionHistory: []`
* `logSession` prepends the new session entry to `sessionHistory` (in addition to setting `lastSession`)
* "Last session" section in Project Detail replaced with "Session history" — all entries, newest first
* `generateSummary` exports full session history; falls back to `[lastSession]` for old data that predates this field
* `generatePrompt` unchanged — still uses `lastSession` (most recent, avoids bloating AI context)
* Seed project updated: `sessionHistory` initialized with its one existing session

## Do Not Build

* Edit or delete history entries
* Pagination or collapsing
* Timeline visualization
* Search or filter

## Acceptance Criteria

* Logging a session adds it to the top of the history list.
* History list appears in Project Detail, newest first.
* All session entries survive Electron restart.
* Existing saved data without `sessionHistory` loads without error.
* Export summary includes full session history.
* Generated prompt is unchanged (still uses only `lastSession`).

---

# 18. Future Build Order After MVP

After the MVP dashboard works, build future features in this order.

## V1

1. Manual session logging
2. Basic prompt generation
3. Manual handoff generation
4. Better project health score
5. Export project summary
6. Agent usage tracking
7. Knowledge notes
8. Simple project history

## V2

1. Graphify status
2. Graph refresh reminders
3. Handoff templates
4. Pipeline templates
5. Agent-specific startup prompts
6. File-based project memory
7. Optional Git changed-file detection

## V3

1. Assisted handoff flow
2. Open target tool
3. Copy prompt automatically
4. Watch files
5. Detect changed files
6. Suggest graph refresh
7. Supervised agent relay

---

# 18. Do Not Build Until Later

These features are explicitly out of scope for the initial MVP:

* Automated handoffs
* Agent relay
* Autonomous workflows
* Graphify integration
* MCP registry
* Complex pipelines
* Team templates
* Cloud backend
* Login/accounts
* GitHub integration
* File watching
* Automatic codebase analysis
* AI-generated next-step recommendations
* Usage tracking automation

If a coding agent tries to build these early, stop and redirect it to the MVP.

---

# 19. Suggested First Build Sequence

Use this exact order:

1. Claude Code — Milestone 1 App Shell
2. Codex — Review Milestone 1
3. Claude Code — Milestone 2 Local Data
4. Codex — Review Milestone 2
5. Claude Code — Milestone 3 Dashboard Cards
6. Codex — Review Milestone 3
7. Claude Code — Milestone 4 Project Detail Page
8. Codex — Review Milestone 4
9. Claude Code — Milestone 5 Project and Task Editing
10. Codex — Review Milestone 5
11. Claude Code — Milestone 6 Agent Recommendation Helper
12. Codex — Review Milestone 6
13. Claude Code — Milestone 7 What Should I Do Next
14. Codex — Review Milestone 7
15. Claude Code — Milestone 8 Polish
16. Codex — Final MVP Review
17. User — Test with D.AI.L.Y

---

# 20. Guiding Principle

Do not build an operating system first.

Build the useful dashboard first.

The MVP loop is:

```text
See project
↓
Understand progress
↓
Know next step
↓
Choose agent
↓
Do the work
↓
Update project
```

Everything else should wait until this loop works well.

