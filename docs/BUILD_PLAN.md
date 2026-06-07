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

# 17. Future Build Order After MVP

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

