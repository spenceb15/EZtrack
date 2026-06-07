# AI Project Dashboard — Initial MVP Specification

Working Codename: AI Project Dashboard
Future Brand: TBD
Version: MVP 0.1
Primary Goal: Build a simple local-first dashboard that helps the user track AI-assisted projects, understand progress, identify next steps, and choose the right AI agent for each task.

---

# 1. Product Summary

The initial MVP is a local-first project dashboard for people building software with AI coding assistants.

The product is not yet an agent operating system, automation platform, handoff relay, or full workflow engine.

The first build should focus on one simple promise:

> Open the dashboard and immediately understand what projects are active, how far along they are, what should happen next, and which AI agent should be used.

The MVP should help the user avoid losing context between coding sessions and reduce uncertainty about what to do next.

---

# 2. Core Use Case

The user has multiple projects being built with tools like Claude Code, Codex, ChatGPT, Gemini, and future coding agents.

The user needs to know:

1. What projects are active.
2. What stage each project is in.
3. How much progress has been made.
4. What task should be done next.
5. Which agent is best for that task.
6. Why that agent is recommended.
7. What should not be changed.
8. What happened during the last session.

---

# 3. MVP Product Promise

The MVP succeeds if the user can open the app and answer these questions in under 30 seconds:

* What project should I work on?
* What is the current status?
* What is the next step?
* Which agent should I use?
* Why should I use that agent?
* What should I be careful not to change?

---

# 4. MVP Scope

## 4.1 Included in Initial Build

The initial MVP should include:

1. Local desktop app shell
2. Project dashboard
3. Project creation/editing
4. Project progress tracking
5. Project phase tracking
6. Simple task tracking
7. Recommended next step
8. Recommended agent
9. “Why this agent?” explanation
10. Agent profiles
11. Do Not Change rules
12. Last session summary
13. Basic project health indicator
14. Settings page
15. Local persistence

---

## 4.2 Not Included in Initial Build

The initial MVP should not include:

1. Automated handoffs
2. Agent relay
3. Graphify integration
4. MCP registry
5. Full pipelines
6. Team templates
7. AI-generated project doctor
8. Automatic usage tracking
9. Cloud sync
10. User accounts
11. GitHub integration
12. File watching
13. Automatic repo analysis
14. Prompt execution
15. Agent automation

These features can be added later after the dashboard is useful.

---

# 5. Recommended Tech Stack

Use a simple local-first stack:

* Electron
* React
* TypeScript
* SQLite or local JSON
* Tailwind CSS or CSS modules
* Local file-system persistence

Recommended for fastest first build:

```text
Electron + React + TypeScript + local JSON
```

Recommended for a more durable version:

```text
Electron + React + TypeScript + SQLite
```

For the first build, local JSON is acceptable if speed matters more than long-term architecture.

Suggested local data folder:

```text
~/AIProjectDashboard/
  app-data.json
```

Later, the app can migrate to SQLite.

---

# 6. Main App Navigation

The MVP should have simple navigation.

## Sidebar Navigation

Required pages:

1. Dashboard
2. Projects
3. Agents
4. Settings

Optional MVP pages:

5. Tasks
6. Notes

Recommended initial sidebar:

```text
Dashboard
Projects
Agents
Settings
```

Keep navigation simple. Avoid exposing advanced systems too early.

---

# 7. Main Dashboard

The dashboard is the most important screen.

It should show all active projects as cards.

## 7.1 Project Card Fields

Each project card should show:

* Project name
* Short description
* Current phase
* Progress percentage
* Health status
* Next step
* Recommended agent
* Last worked on date
* Open task count
* Blocked task count

Example card:

```text
D.AI.L.Y Learning App

Phase: UX + Functionality Review
Progress: 68%
Health: Good

Next Step:
Run smoke test on lesson completion flow.

Recommended Agent:
Codex

Why:
This is a testing/regression task. Codex is better for minimal fixes and correctness checks.

Open Tasks: 9
Blocked: 1
Last Worked On: June 6

[Open Project]
[Mark Next Step Complete]
```

---

# 8. Project Detail Page

Each project should have a detail page.

## 8.1 Required Sections

The project detail page should include:

1. Project overview
2. Current phase
3. Progress bar
4. Health status
5. Current goal
6. Recommended next step
7. Recommended agent
8. Task list
9. Do Not Change rules
10. Last session summary
11. Project notes

---

## 8.2 Project Overview Fields

Each project should have:

* Project name
* Description
* Project type
* Current phase
* Progress percentage
* Current goal
* Status
* Last worked on
* Last agent used
* Recommended next agent

Example:

```text
Project Name: D.AI.L.Y
Description: Local-first AI learning app with daily lessons, XP, streaks, and Byte mascot progression.
Type: Local-first learning app
Current Phase: UX + Functionality Review
Progress: 68%
Current Goal: Improve onboarding and preserve working lesson flow.
Status: In Progress
Last Agent Used: Claude Code
Recommended Next Agent: Codex
```

---

# 9. Project Phases

The MVP should use simple default project phases.

## 9.1 Default Phases

1. Planning
2. Building
3. Testing
4. Refining
5. Stable

Alternative more software-specific labels:

1. Planning
2. Build & Refine
3. Smoke Testing
4. UX + Functionality Review
5. Stable / Complete

Recommended MVP phases:

```text
Planning
Build & Refine
Testing
UX Review
Stable
```

---

## 9.2 Phase-Based Progress

Use simple progress defaults:

```text
Planning = 10%
Build & Refine = 35%
Testing = 60%
UX Review = 80%
Stable = 100%
```

The user should be able to manually override progress.

Progress should not try to be too clever in MVP.

---

# 10. Task System

Tasks should be simple.

## 10.1 Task Fields

Each task should include:

* ID
* Project ID
* Title
* Description
* Status
* Priority
* Recommended agent
* Why this agent
* Acceptance criteria
* Notes
* Created date
* Updated date

---

## 10.2 Task Statuses

Use these statuses:

```text
Backlog
Ready
In Progress
Blocked
Complete
```

Avoid too many statuses in the first build.

---

## 10.3 Task Priorities

Use:

```text
Low
Medium
High
Critical
```

---

## 10.4 Example Task

```json
{
  "id": "task_001",
  "projectId": "daily",
  "title": "Run smoke test on lesson completion flow",
  "description": "Check that lessons can be completed and progress is saved correctly after recent UI changes.",
  "status": "Ready",
  "priority": "High",
  "recommendedAgent": "Codex",
  "whyThisAgent": "Codex is best for testing, regression checks, and minimal corrective fixes.",
  "acceptanceCriteria": [
    "Lesson can be completed",
    "XP updates correctly",
    "Progress bar updates correctly",
    "No unrelated UI redesigns are made"
  ],
  "notes": "Preserve existing lesson logic."
}
```

---

# 11. Recommended Next Step System

This is the centerpiece of the MVP.

The dashboard should show a recommended next step for each project.

The user should also have a button:

```text
[What should I do next?]
```

When clicked, the app should recommend one task and one agent.

---

## 11.1 MVP Recommendation Logic

Use simple rule-based logic.

Priority order:

1. Critical blocked task
2. Critical ready task
3. High-priority ready task
4. In-progress task
5. Testing task after recent build work
6. UX review task after UI changes
7. Oldest ready task
8. If no tasks exist, recommend creating a task

---

## 11.2 Example Output

```text
Recommended Next Step

Project:
D.AI.L.Y

Task:
Run smoke test on lesson completion flow.

Recommended Agent:
Codex

Why:
Recent UI work may have affected working lesson behavior. This is a testing and regression task, so Codex is the safest next tool.

Be careful:
Do not rewrite the lesson logic. Do not redesign Byte. Do not make broad UI changes.
```

---

# 12. Agent Recommendation System

The MVP should help the user choose the right AI agent.

## 12.1 Default Agents

Include four default agents:

1. Claude Code
2. Codex
3. Gemini
4. ChatGPT

---

## 12.2 Agent Profiles

Each agent should have:

* Name
* Best use cases
* Strengths
* Weaknesses
* Risk warnings
* Best task types

---

## 12.3 Default Agent Rules

### Claude Code

Best for:

* Feature implementation
* UI building
* Component work
* Refactoring
* Larger code edits

Risks:

* May over-redesign
* May change unrelated files
* Needs strict boundaries

Use when:

```text
The task requires building or modifying app features.
```

---

### Codex

Best for:

* Bug fixing
* Tests
* Regression checks
* TypeScript errors
* Minimal diffs
* Correctness

Risks:

* May be less useful for broad product design or UX direction

Use when:

```text
The task requires debugging, testing, or careful minimal changes.
```

---

### Gemini

Best for:

* UX review
* Visual critique
* Requirement gaps
* Large-context review
* Design feedback

Risks:

* May produce broad suggestions instead of specific implementation steps

Use when:

```text
The task requires reviewing, critiquing, or evaluating the project.
```

---

### ChatGPT

Best for:

* Planning
* PRDs
* Specs
* Prompt writing
* Architecture reasoning
* Strategy
* Documentation

Risks:

* May not directly edit local code unless paired with a coding tool

Use when:

```text
The task requires thinking, planning, explaining, or preparing instructions.
```

---

# 13. Do Not Change Rules

Every project should support a simple Do Not Change list.

This protects stable features from AI agents.

## 13.1 Rule Fields

Each rule should include:

* Rule text
* Severity
* Reason
* Created date

Severity options:

```text
Hard Rule
Warning
Note
```

---

## 13.2 Example Rules for D.AI.L.Y

```text
Hard Rule:
Do not redesign Byte mascot without explicit approval.

Hard Rule:
Do not remove glowing concentric rings.

Hard Rule:
Do not rewrite working lesson logic.

Warning:
Avoid broad UI changes outside the assigned task.

Note:
Preserve local-first architecture.
```

---

# 14. Project Health Indicator

The MVP should not have a complicated health score.

Use a simple status:

```text
Good
Needs Attention
Blocked
```

Optionally show a percentage later.

---

## 14.1 MVP Health Logic

A project is **Good** if:

* It has an active or ready task
* It has a clear next step
* It has no critical blocked tasks
* It has Do Not Change rules

A project **Needs Attention** if:

* It has no next step
* It has no tasks
* It has blocked tasks
* It has not been updated recently
* It has no Do Not Change rules

A project is **Blocked** if:

* The active task is blocked
* A critical task is blocked
* The user has marked the project as blocked

---

## 14.2 Example Health Output

```text
Health: Needs Attention

Reasons:
- 1 blocked task
- No recent session summary
- Next step is defined
- Do Not Change rules exist
```

---

# 15. Last Session Summary

Each project should have a simple last session summary.

## 15.1 Fields

* Date
* Agent used
* What was done
* Files changed
* Problems found
* Recommended next step

---

## 15.2 Example

```text
Last Session

Date: June 6
Agent: Claude Code
Summary:
Updated the dashboard UI and made onboarding changes.

Problems:
Byte mascot was accidentally placed inside an unwanted box.

Recommended Next Step:
Use Codex to remove the Byte box without redesigning the mascot or changing glow rings.
```

This does not need to be a full agent log yet.

---

# 16. Data Model

For the initial MVP, the simplest data model is enough.

## 16.1 App Data Shape

```json
{
  "settings": {
    "experienceMode": "builder",
    "theme": "dark"
  },
  "projects": [],
  "agents": []
}
```

---

## 16.2 Project Shape

```json
{
  "id": "project_daily",
  "name": "D.AI.L.Y",
  "description": "Local-first AI learning app.",
  "type": "Learning App",
  "phase": "UX Review",
  "progress": 68,
  "health": "Good",
  "currentGoal": "Improve onboarding while preserving working lesson flow.",
  "nextStep": "Run smoke test on lesson completion flow.",
  "recommendedAgent": "Codex",
  "whyThisAgent": "Codex is best for testing and regression checks.",
  "lastAgentUsed": "Claude Code",
  "lastWorkedOn": "2026-06-06",
  "tasks": [],
  "doNotChangeRules": [],
  "lastSession": {
    "date": "2026-06-06",
    "agent": "Claude Code",
    "summary": "Updated UI and onboarding.",
    "problems": "Byte mascot box issue appeared.",
    "recommendedNextStep": "Use Codex for targeted fix."
  },
  "notes": ""
}
```

---

## 16.3 Task Shape

```json
{
  "id": "task_001",
  "title": "Run smoke test on lesson completion flow",
  "description": "Check that lesson completion, XP, streak, and progress still work.",
  "status": "Ready",
  "priority": "High",
  "recommendedAgent": "Codex",
  "whyThisAgent": "Testing and regression check.",
  "acceptanceCriteria": [
    "Lesson completion works",
    "XP updates",
    "Progress updates",
    "No unrelated redesigns"
  ],
  "notes": ""
}
```

---

## 16.4 Agent Shape

```json
{
  "id": "codex",
  "name": "Codex",
  "bestFor": [
    "Bug fixing",
    "Testing",
    "Regression checks",
    "Minimal diffs"
  ],
  "risks": [
    "Not the best tool for broad UX direction"
  ],
  "recommendedFor": [
    "bugs",
    "tests",
    "regression",
    "typescript",
    "minimal fixes"
  ]
}
```

---

# 17. Required Screens

## 17.1 Dashboard Screen

Purpose:

Show all projects and the most important next action.

Required elements:

* App title
* Project cards
* Global “What should I work on?” button
* Project status badges
* Recommended agent badge
* Health badge

---

## 17.2 Project Detail Screen

Purpose:

Show everything needed to resume a project.

Required sections:

* Project overview
* Progress
* Phase
* Current goal
* Next step
* Recommended agent
* Task list
* Do Not Change rules
* Last session summary
* Notes

---

## 17.3 Project Editor

Purpose:

Create and edit projects.

Required fields:

* Name
* Description
* Type
* Phase
* Progress
* Current goal
* Next step
* Recommended agent
* Notes

---

## 17.4 Task Editor

Purpose:

Create and edit tasks.

Required fields:

* Title
* Description
* Status
* Priority
* Recommended agent
* Why this agent
* Acceptance criteria
* Notes

---

## 17.5 Agents Screen

Purpose:

Show when to use each agent.

Required elements:

* Agent cards
* Strengths
* Risks
* Best task types
* Editable notes

---

## 17.6 Settings Screen

Purpose:

Basic app settings.

Required settings:

* Experience mode
* Theme
* Data location display
* Reset sample data option

---

# 18. Experience Mode for MVP

The app can include experience mode, but keep it simple.

## 18.1 Builder Mode

Builder Mode should use plain language.

Examples:

Instead of:

```text
Regression check
```

Say:

```text
Check that something working before did not break.
```

Instead of:

```text
Recommended Agent: Codex
```

Say:

```text
Best AI tool for this step: Codex, because this is a careful testing task.
```

---

## 18.2 Expert Mode

Expert Mode can show more direct technical language.

Examples:

```text
Recommended Agent: Codex
Reason: Regression test / minimal-diff bug fix.
```

For MVP, this can be a simple toggle that changes labels and visible detail.

---

# 19. Initial D.AI.L.Y Seed Project

The MVP should include an optional sample project based on D.AI.L.Y.

## 19.1 Project

```text
Name:
D.AI.L.Y

Description:
A local-first AI learning app with daily lessons, XP, streaks, progress tracking, and a robot companion named Byte.

Phase:
UX Review

Progress:
68%

Current Goal:
Improve onboarding and dashboard polish while preserving working lesson/progress functionality.

Next Step:
Run smoke test on lesson completion flow.

Recommended Agent:
Codex

Why:
Recent UI changes may have affected working app behavior. Codex is best for testing and minimal regression fixes.

Last Agent Used:
Claude Code
```

---

## 19.2 Starter Tasks

### Task 1

```text
Title:
Run smoke test on lesson completion flow

Status:
Ready

Priority:
High

Recommended Agent:
Codex

Why:
This is a testing and regression task.

Acceptance Criteria:
- Lesson can be completed
- XP updates correctly
- Progress bar updates correctly
- Streak behavior still works
- No unrelated UI redesigns
```

---

### Task 2

```text
Title:
Fix Byte mascot box issue

Status:
Ready

Priority:
High

Recommended Agent:
Codex

Why:
This is a targeted visual bug fix that should avoid broad redesign.

Acceptance Criteria:
- Remove unwanted box around Byte
- Preserve Byte mascot design
- Preserve glowing rings
- Do not change unrelated dashboard layout
```

---

### Task 3

```text
Title:
Review onboarding flow for beginner clarity

Status:
Backlog

Priority:
Medium

Recommended Agent:
Gemini

Why:
This is a UX review task and benefits from critique before implementation.

Acceptance Criteria:
- Identify confusing steps
- Suggest plain-English improvements
- Do not modify code
```

---

## 19.3 Starter Do Not Change Rules

```text
- Do not redesign Byte mascot without explicit approval.
- Do not remove glowing concentric rings.
- Do not rewrite working lesson logic.
- Do not convert the app to a cloud backend.
- Do not make broad UI changes outside the assigned task.
```

---

# 20. Initial Build Milestones

## Milestone 1 — App Shell

Goal:

Create the basic desktop app.

Build:

* Electron + React + TypeScript app
* Dark mode layout
* Sidebar navigation
* Dashboard page
* Projects page
* Agents page
* Settings page

Acceptance criteria:

* App launches
* Sidebar works
* Pages render
* No data persistence required yet

---

## Milestone 2 — Local Data

Goal:

Store and load projects locally.

Build:

* Local JSON persistence
* Seed default agents
* Seed sample D.AI.L.Y project
* Load data on app start
* Save edits locally

Acceptance criteria:

* Sample project appears
* Changes persist after restart
* Default agents appear

---

## Milestone 3 — Dashboard Cards

Goal:

Make the dashboard useful.

Build:

* Project cards
* Progress bar
* Phase badge
* Health badge
* Next step display
* Recommended agent display
* Open project button

Acceptance criteria:

* User can understand project status from card
* D.AI.L.Y card shows useful next step
* Recommended agent appears clearly

---

## Milestone 4 — Project Detail Page

Goal:

Let the user resume a project.

Build:

* Overview section
* Phase/progress section
* Current goal
* Next step
* Recommended agent
* Task list
* Do Not Change rules
* Last session summary
* Notes

Acceptance criteria:

* User can open D.AI.L.Y and understand current state
* Task list appears
* Do Not Change rules appear
* Last session summary appears

---

## Milestone 5 — Project and Task Editing

Goal:

Make the dashboard editable.

Build:

* Create project
* Edit project
* Add task
* Edit task
* Complete task
* Block task
* Update next step
* Update recommended agent

Acceptance criteria:

* User can manage project state manually
* User can update tasks
* Dashboard updates from changes

---

## Milestone 6 — Agent Recommendation Helper

Goal:

Help the user choose the right agent.

Build:

* Agent profile cards
* Agent strengths
* Agent risks
* Agent best use cases
* Rule-based recommendation helper
* “Why this agent?” display

Acceptance criteria:

* Each task can show recommended agent
* User can understand why the agent was chosen
* Default logic recommends Codex for testing/bugs, Claude Code for building, Gemini for UX review, ChatGPT for planning/specs

---

## Milestone 7 — What Should I Do Next?

Goal:

Add the central recommendation feature.

Build:

* Button on dashboard
* Button on project detail
* Rule-based next action selector
* Recommendation card

Acceptance criteria:

* User clicks button
* App recommends one project/task
* App explains why
* App recommends an agent
* App shows caution notes from Do Not Change rules

---

## Milestone 8 — Polish and Usability

Goal:

Make the MVP pleasant enough to use daily.

Build:

* Better empty states
* Better visual hierarchy
* Plain-English labels
* Health warnings
* Agent badges
* Simple settings
* Reset sample data

Acceptance criteria:

* App feels calm and clear
* Beginner can understand it
* No overwhelming advanced systems appear

---

# 21. Claude Code Build Prompts

## 21.1 Prompt 1 — App Shell

```text
You are building the initial MVP of an AI Project Dashboard.

The product is a local-first desktop dashboard that helps users track AI-assisted coding projects, see progress, identify next steps, and choose the right AI agent.

Build only the app shell.

Use:
- Electron
- React
- TypeScript

Create:
1. Dark mode layout
2. Sidebar navigation
3. Dashboard page
4. Projects page
5. Agents page
6. Settings page
7. Placeholder Project Detail page
8. Clean folder structure

Do not build:
- Automated handoffs
- Agent relay
- Graphify
- MCP registry
- Pipelines
- Cloud backend
- Login

Important:
Keep the app simple. This is a dashboard MVP, not a full agent operating system.

After finishing, provide:
1. Summary of changes
2. Files changed
3. How to run the app
4. Known issues
5. Recommended next task
```

---

## 21.2 Prompt 2 — Local Data and Sample Project

```text
Continue building the AI Project Dashboard MVP.

Current task:
Add local data persistence and seed sample data.

Build:
1. Local JSON data store
2. Default agents:
   - Claude Code
   - Codex
   - Gemini
   - ChatGPT
3. Sample D.AI.L.Y project
4. Starter D.AI.L.Y tasks
5. Starter Do Not Change rules
6. Load data on app start
7. Save data after edits

Do not add advanced features.

The goal is to make the dashboard show real useful data.

After finishing, provide:
1. Summary
2. Files changed
3. Data shape
4. How persistence works
5. Recommended next task
```

---

## 21.3 Prompt 3 — Dashboard Cards

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build useful project dashboard cards.

Each card should show:
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

Keep the design clean, calm, and beginner-friendly.

Do not add pipelines, handoffs, Graphify, or automation.

After finishing, provide:
1. Summary
2. Files changed
3. UI behavior
4. Known issues
5. Recommended next task
```

---

## 21.4 Prompt 4 — Project Detail Page

```text
Continue building the AI Project Dashboard MVP.

Current task:
Build the Project Detail page.

The page should show:
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

The purpose of this page is to let the user return to a project and immediately understand what is going on.

Do not build handoff generation yet.

After finishing, provide:
1. Summary
2. Files changed
3. How to test
4. Known issues
5. Recommended next task
```

---

## 21.5 Prompt 5 — Editing Projects and Tasks

```text
Continue building the AI Project Dashboard MVP.

Current task:
Add editing for projects and tasks.

Build:
1. Create project
2. Edit project
3. Add task
4. Edit task
5. Mark task complete
6. Mark task blocked
7. Update recommended agent
8. Update next step
9. Save all changes locally

Keep forms simple and usable.

Do not add advanced workflow systems.

After finishing, provide:
1. Summary
2. Files changed
3. How data updates
4. Known issues
5. Recommended next task
```

---

## 21.6 Prompt 6 — What Should I Do Next?

```text
Continue building the AI Project Dashboard MVP.

Current task:
Implement the “What should I do next?” feature.

Build:
1. Button on dashboard
2. Button on project detail page
3. Rule-based recommendation logic
4. Recommendation card

Recommendation logic should prioritize:
1. Critical ready tasks
2. High-priority ready tasks
3. In-progress tasks
4. Blocked tasks that need user attention
5. Testing tasks after build/refine phase
6. Oldest ready task
7. If no task exists, recommend creating a task

The recommendation should include:
- Project
- Task
- Recommended agent
- Why this agent
- Why this task now
- Caution notes from Do Not Change rules

Do not add AI-generated recommendations. This should be rule-based for MVP.

After finishing, provide:
1. Summary
2. Files changed
3. Recommendation rules
4. How to test
5. Recommended next task
```

---

# 22. Codex Review Prompts

## 22.1 Codex Review Prompt

```text
You are reviewing the AI Project Dashboard MVP.

Your role:
Correctness reviewer.

Check for:
1. TypeScript errors
2. Broken imports
3. Broken routing
4. Data persistence bugs
5. State update bugs
6. Unsafe Electron patterns
7. Overbuilt or unnecessary features
8. UI regressions

Do not:
- Redesign the UI
- Add advanced features
- Add handoff automation
- Add Graphify
- Add pipelines
- Rewrite the architecture

Allowed:
- Minimal fixes
- Bug reports
- Type fixes
- Small cleanup
- Clear recommendations

Required output:
1. Issues found
2. Fixes made
3. Files changed
4. Remaining risks
5. Recommended next task
```

---

# 23. MVP Acceptance Criteria

The initial MVP is complete when:

1. App launches locally.
2. User can see a dashboard of projects.
3. User can create a project.
4. User can edit a project.
5. User can see project progress.
6. User can assign a project phase.
7. User can add tasks.
8. User can edit tasks.
9. User can mark tasks complete or blocked.
10. User can see a recommended next step.
11. User can see a recommended agent.
12. User can understand why that agent is recommended.
13. User can add Do Not Change rules.
14. User can see a last session summary.
15. User can open D.AI.L.Y as a sample project.
16. User can click “What should I do next?” and receive a useful recommendation.
17. All data persists locally after app restart.
18. No cloud account is required.
19. No handoff automation is required.
20. No advanced agent relay exists.

---

# 24. Success Definition

The MVP succeeds if the user opens the dashboard and thinks:

```text
I know where my projects stand.
I know what to work on next.
I know which AI agent to use.
I know what not to let the agent change.
```

The MVP does not need to automate handoffs yet.

The MVP should first become the dashboard the user actually wants to open before starting a coding session.

---

# 25. Future Features After MVP

After the dashboard is useful, add features in this order:

## V1

1. Basic prompt generation
2. Manual handoff generation
3. Session logging
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

# 26. Guiding Principle

Do not build an operating system first.

Build the useful dashboard first.

The core loop is:

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

Everything else should wait.

