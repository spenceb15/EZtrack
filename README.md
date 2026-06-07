# AI Project Dashboard

A local-first desktop dashboard for tracking AI-assisted software projects, understanding project progress, identifying next steps, and choosing the right AI agent for each task.

## Current Status

This project is in the initial MVP build phase.

The first version is intentionally simple. It is not yet an automated agent operating system, handoff relay, Graphify integration, MCP registry, or full workflow automation platform.

The immediate goal is to build a useful dashboard first.

---

## Product Purpose

AI Project Dashboard helps users answer four questions quickly:

1. What projects am I working on?
2. How far along is each project?
3. What should I do next?
4. Which AI agent should I use for the next task?

The dashboard is designed for people building software with AI tools such as:

* Claude Code
* Codex
* Gemini
* ChatGPT
* Future AI coding agents

The app should reduce context loss, decision fatigue, and uncertainty between AI-assisted coding sessions.

---

## Core MVP Promise

The MVP succeeds if the user can open the app and immediately understand:

* Which projects are active
* What phase each project is in
* How much progress has been made
* What the next recommended task is
* Which AI agent should handle that task
* Why that agent is recommended
* What should not be changed
* What happened during the last session

---

## Source of Truth for Build Scope

The project documentation should be read in this order:

1. `docs/MVP_SPEC.md`
2. `docs/FULL_PRD.md`
3. `AGENT_RULES.md`
4. `README.md`

Important:

* `docs/MVP_SPEC.md` is the current build contract.
* `docs/FULL_PRD.md` is future product context.
* If the MVP and PRD conflict, follow the MVP.
* Do not build full PRD features unless they are explicitly included in the MVP.

---

## Initial MVP Features

The initial build should include:

* Local desktop app shell
* Project dashboard
* Project creation and editing
* Project progress tracking
* Project phase tracking
* Simple task tracking
* Recommended next step
* Recommended agent
* “Why this agent?” explanation
* Agent profiles
* Do Not Change rules
* Last session summary
* Basic project health indicator
* Settings page
* Local persistence

---

## Not Included in Initial MVP

Do not build these yet:

* Automated handoffs
* Agent relay
* Graphify integration
* MCP registry
* Full pipelines
* Development team templates
* Cloud sync
* Login/accounts
* GitHub integration
* File watching
* Automatic repo analysis
* AI-generated recommendations
* Usage tracking automation
* Autonomous coding workflows

These may be added later after the dashboard itself is useful.

---

## Recommended Tech Stack

Initial MVP stack:

* Electron
* React
* TypeScript
* Local JSON persistence
* Tailwind CSS or CSS modules

Future durable stack may use:

* SQLite
* File-based project exports
* Generated project memory files
* Optional Graphify integration
* Optional handoff generation

---

## Suggested Project Structure

```text
agent-os-project/
  docs/
    MVP_SPEC.md
    FULL_PRD.md
    BUILD_PLAN.md

  src/
    components/
    pages/
    data/
    types/
    utils/

  AGENT_RULES.md
  README.md
  package.json
```

The structure may change as the app is implemented, but the project should remain simple during the MVP phase.

---

## Core Screens

The MVP should include these screens:

### Dashboard

Shows active projects and their current state.

Each project card should show:

* Project name
* Description
* Phase
* Progress
* Health
* Next step
* Recommended agent
* Why that agent
* Last worked on
* Open tasks
* Blocked tasks

### Project Detail

Shows everything needed to resume work on a project.

Sections:

* Overview
* Current phase
* Progress
* Current goal
* Recommended next step
* Recommended agent
* Task list
* Do Not Change rules
* Last session summary
* Notes

### Projects

Allows the user to create, edit, and manage projects.

### Agents

Explains when to use each AI agent.

Default agents:

* Claude Code
* Codex
* Gemini
* ChatGPT

### Settings

Stores basic app preferences.

Potential settings:

* Experience mode
* Theme
* Data location
* Reset sample data

---

## Default Agent Guidance

### Claude Code

Best for:

* Feature implementation
* UI building
* React components
* Refactoring
* Larger code edits

Risk:

* May over-redesign
* May change unrelated files
* Needs strict task boundaries

### Codex

Best for:

* Bug fixing
* Tests
* Regression checks
* TypeScript errors
* Minimal diffs
* Correctness

Risk:

* Less ideal for broad product direction or UX brainstorming

### Gemini

Best for:

* UX review
* Visual critique
* Requirement gaps
* Large-context review
* Design feedback

Risk:

* May produce broad suggestions instead of direct implementation steps

### ChatGPT

Best for:

* Planning
* PRDs
* Specs
* Prompt writing
* Architecture reasoning
* Documentation
* Strategy

Risk:

* Does not directly edit local code unless paired with a coding tool

---

## Initial Sample Project

The MVP should include or support a sample project:

### D.AI.L.Y

Description:

A local-first AI learning app with daily lessons, XP, streaks, progress tracking, and a robot companion named Byte.

Current phase:

UX Review

Current goal:

Improve onboarding and dashboard polish while preserving working lesson/progress functionality.

Recommended next step:

Run smoke test on lesson completion flow.

Recommended agent:

Codex

Why:

Recent UI changes may have affected working app behavior. Codex is best for testing and minimal regression fixes.

Important Do Not Change rules:

* Do not redesign Byte mascot without explicit approval.
* Do not remove glowing concentric rings.
* Do not rewrite working lesson logic.
* Do not convert the app to a cloud backend.
* Do not make broad UI changes outside the assigned task.

---

## MVP Build Order

Recommended implementation order:

1. App shell
2. Local data
3. Dashboard cards
4. Project detail page
5. Project and task editing
6. Agent recommendation helper
7. “What should I do next?” feature
8. Polish and usability

Do not start with automation, handoffs, Graphify, MCPs, or pipelines.

---

## Coding Agent Instructions

When using Claude Code, Codex, or another coding agent, follow these rules:

1. Read `docs/MVP_SPEC.md` first.
2. Treat the MVP as the build contract.
3. Use `docs/FULL_PRD.md` only for future context.
4. Do not expand scope without approval.
5. Make the smallest effective change.
6. Keep the app simple.
7. Prefer readable code over clever abstractions.
8. Do not add unnecessary dependencies.
9. Do not build future features early.
10. Do not leave the app in a broken state.

Every coding agent should end with:

1. Summary of changes
2. Files changed
3. How to run or test
4. Known issues
5. What was intentionally not built
6. Recommended next step

---

## MVP Acceptance Criteria

The initial MVP is complete when:

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
* No handoff automation is required.
* No advanced agent relay exists.

---

## Future Roadmap

### V1

* Basic prompt generation
* Manual handoff generation
* Session logging
* Better project health score
* Export project summary
* Agent usage tracking
* Knowledge notes
* Simple project history

### V2

* Graphify status
* Graph refresh reminders
* Handoff templates
* Pipeline templates
* Agent-specific startup prompts
* File-based project memory
* Optional Git changed-file detection

### V3

* Assisted handoff flow
* Open target tool
* Copy prompt automatically
* Watch files
* Detect changed files
* Suggest graph refresh
* Supervised agent relay

---

## Guiding Principle

Do not build an operating system first.

Build the useful dashboard first.

Core loop:

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

