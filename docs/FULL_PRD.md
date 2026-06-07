# AgentOS Dashboard — MVP Build Plan and PRD Draft

Version: 0.1
Status: Draft for review
Primary test project: D.AI.L.Y
Build approach: Local-first desktop app, manual agent coordination first, automation later

---

# 1. Executive Summary

AgentOS Dashboard is a local-first command center for managing AI-assisted software projects across tools such as Claude Code, Codex, ChatGPT, Gemini, and future coding agents.

The first version should not attempt to automate agents. The first version should solve the immediate user pain:

> A user should be able to stop working on a project, return later, understand the current state, know what to do next, generate a safe handoff, and continue with the right AI agent without re-explaining everything from scratch.

The initial MVP should focus on project memory, task state, agent handoffs, do-not-change rules, project health, and a clear “What should I do next?” workflow.

The app should begin as a local-first desktop dashboard using Electron, React, TypeScript, SQLite, and generated Markdown/JSON files inside each tracked project’s `/agent-os/` folder.

---

# 2. Core Product Promise

AgentOS helps users safely resume and continue AI-assisted coding projects.

A successful first version should answer:

1. What project am I working on?
2. What phase is it in?
3. What was done recently?
4. What should I do next?
5. Which AI agent should I use?
6. What should the agent know before starting?
7. What should the agent not change?
8. Is the handoff current?
9. Is the project graph/map current?
10. How do I continue without re-explaining everything?

---

# 3. MVP Scope Decision

The original product vision is strong but too broad for a first build.

The MVP should be narrowed to one core loop:

```text
Open project
↓
Review current state
↓
Choose next task
↓
Generate safe agent prompt/handoff
↓
Run agent session manually
↓
Log what happened
↓
Update project memory
```

Everything in the MVP should support this loop.

---

# 4. MVP Features

## 4.1 Must-Have MVP Features

The MVP should include:

1. Local desktop app shell
2. First-launch experience mode selection
3. Project creation/import
4. Per-project `/agent-os/` folder generation
5. Project dashboard
6. Project detail page
7. Task management
8. Phase tracking
9. Do Not Change rules
10. Agent profiles
11. Basic role templates
12. Manual session logging
13. Handoff generator
14. Prompt generator
15. Manual knowledge graph status
16. Manual agent usage status
17. Rule-based project health score
18. Rule-based “What should I do next?” recommendation
19. Builder Mode and Expert Mode visibility differences
20. D.AI.L.Y test project setup

---

## 4.2 Not in MVP

The following should not be built in the first version:

1. Autonomous agent relay
2. Automatic Claude/Codex/Gemini execution
3. Full MCP registry automation
4. Automatic Graphify execution
5. Screenshot-based usage tracking
6. CLI log parsing
7. API usage integrations
8. Cost dashboard
9. Full editable team system
10. Complex pipeline-run history
11. Project Doctor with AI analysis
12. Learning Mode
13. Cloud backend
14. Login/accounts
15. GitHub requirement
16. Push/commit automation
17. Plugin marketplace

These can be moved into V1, V2, or later.

---

# 5. Product Naming

Recommended product name:

**AgentOS**

Recommended tagline:

**Mission Control for AI-assisted software projects.**

Recommended dashboard language:

* Product: AgentOS
* Main screen: Mission Control
* Core feature: Handoffs
* Beginner workflow: Continue Project
* Advanced workflow: Generate Agent Handoff

---

# 6. Target Users

## 6.1 Primary User: Beginner Builder

A beginner builder does not have deep coding knowledge but wants to build real software using AI coding agents.

Needs:

* Plain-English guidance
* Low intimidation
* Clear next steps
* Strong safety boundaries
* Protection against agents breaking working features
* Easy copy/paste prompts
* Simple project memory

Builder Mode should be designed primarily for this user.

---

## 6.2 Secondary User: AI Coding Assistant User

This user is not necessarily a professional developer but regularly uses Claude Code, Codex, ChatGPT, Gemini, or similar tools.

Needs:

* Agent-specific handoffs
* Role prompts
* Task boundaries
* Usage tracking
* Project memory
* Graph freshness awareness
* Repeatable workflows

Advanced Builder Mode should be designed for this user.

---

## 6.3 Tertiary User: Developer or Power User

This user understands software projects, agents, workflows, MCPs, pipelines, and handoffs.

Needs:

* Full project state
* Editable templates
* Prompt control
* Handoff structure
* Logs
* Roles
* Graph controls
* Advanced project health signals

Expert Mode should be designed for this user.

---

# 7. Experience Modes

## 7.1 First-Launch Question

On first launch, ask:

```text
What best describes you?

1. I am not a developer, but I want to build software with AI.
2. I use AI coding assistants regularly.
3. I am a developer or power user.
```

Map answers to:

1. Builder Mode
2. Advanced Builder Mode
3. Expert Mode

The user must be able to change this later in Settings.

---

## 7.2 Builder Mode

Builder Mode should hide technical complexity.

Show:

* Projects
* Current goal
* Progress
* Health
* Next recommended action
* Recommended AI tool
* Simple task list
* Continue Project button
* Handoff status
* Plain-English warnings

Hide or simplify:

* Raw JSON
* Full role configuration
* Full pipeline configuration
* MCP registry
* Advanced logs
* Advanced graph controls
* Raw prompt templates

Example Builder Mode card:

```text
D.AI.L.Y Learning App

Status: Needs testing
Progress: 68%
Next step: Test the lesson completion flow
Recommended tool: Codex
Why: Recent UI changes may have affected working lesson behavior.
Before starting: Use the current handoff.

[Continue Project]
```

---

## 7.3 Expert Mode

Expert Mode should expose:

* Full project files
* Tasks
* Roles
* Agents
* Prompt templates
* Handoffs
* Project memory
* Knowledge graph status
* Usage tracking
* Logs
* Raw Markdown/JSON views
* Advanced settings

---

# 8. Core Architecture

## 8.1 Recommended MVP Stack

Use:

* Electron
* React
* TypeScript
* SQLite
* Markdown file generation
* JSON file generation
* Local filesystem access
* Zustand or Redux
* Tailwind CSS or CSS modules

Recommended choice:

```text
Electron + React + TypeScript + SQLite + Markdown/JSON project files
```

---

## 8.2 Source of Truth Decision

The app should use SQLite as the internal source of truth.

The `/agent-os/` files should be generated mirrors that are readable by humans and AI agents.

Recommended rule:

```text
SQLite is the app source of truth.
Markdown and JSON files inside /agent-os/ are generated project context files.
```

For MVP, avoid full two-way sync.

If a user manually edits generated files, the app can later detect external changes and warn the user. Full import/diff conflict resolution can be added in V1.

---

## 8.3 Local-First Requirement

AgentOS must work without:

* Cloud account
* Login
* Server backend
* GitHub knowledge
* Paid API integrations
* Internet access

The app may eventually integrate with external tools, but the MVP must function fully offline.

---

# 9. Per-Project Folder Structure

Each tracked project should contain:

```text
/project-root/
  agent-os/
    START_HERE.md
    PROJECT_STATE.json
    TASKS.md
    PHASES.md
    AGENT_LOG.md
    BUGS.md
    DECISIONS.md
    DO_NOT_CHANGE.md
    SESSION_RULES.md
    HANDOFF_NEXT.md

    handoffs/
      HANDOFF_TO_CLAUDE.md
      HANDOFF_TO_CODEX.md
      HANDOFF_TO_GEMINI.md
      HANDOFF_TO_CHATGPT.md

    knowledge/
      product_vision.md
      architecture.md
      design_rules.md
      technical_decisions.md
      lessons_learned.md
      feature_map.md
      terminology.md

    graph/
      graph-summary.md
      graph-queries.md
      graph-refresh-log.md
      graph-manifest.json
```

For MVP, these files can be generated from app state.

---

# 10. Global App Data

Recommended local app folder:

```text
~/AgentOS/
  agentos.sqlite
  backups/
  exports/
  templates/
```

The database should store:

* Projects
* Tasks
* Agents
* Roles
* Sessions
* Handoffs
* Bugs
* Decisions
* Do Not Change rules
* Graph status
* Usage status
* Settings

---

# 11. Core Data Entities

## 11.1 Project

Fields:

* id
* name
* path
* description
* type
* currentPhase
* progress
* healthScore
* activeTaskId
* lastAgentId
* recommendedNextAgentId
* graphStatus
* handoffStatus
* createdAt
* updatedAt

---

## 11.2 Task

Fields:

* id
* projectId
* title
* description
* status
* priority
* recommendedRole
* recommendedAgent
* backupAgent
* relatedFiles
* acceptanceCriteria
* notes
* createdAt
* updatedAt

Statuses:

* Backlog
* Ready
* In Progress
* Waiting for Review
* Blocked
* Complete
* Failed

Priorities:

* Low
* Medium
* High
* Critical

---

## 11.3 Agent

Default agents:

* Claude Code
* Codex
* Gemini
* ChatGPT

Fields:

* id
* name
* provider
* strengths
* weaknesses
* bestUseCases
* riskWarnings
* startupInstructions
* shutdownInstructions
* manualUsageStatus
* resetTime
* notes

---

## 11.4 Session

A session is one completed interaction with an AI agent.

Fields:

* id
* projectId
* taskId
* agentId
* roleId
* startedAt
* endedAt
* summary
* filesChanged
* outcome
* issuesEncountered
* nextRecommendation
* createdAt

This is one of the most important entities in the product.

A session should generate or update:

* AGENT_LOG.md
* HANDOFF_NEXT.md
* project timeline
* health score
* next action recommendation

---

## 11.5 Handoff

Fields:

* id
* projectId
* taskId
* targetAgent
* targetRole
* status
* generatedAt
* basedOnSessionId
* graphStatusAtGeneration
* filePath

Statuses:

* Not Generated
* Current
* Needs Refresh
* Used
* Obsolete
* Failed

---

## 11.6 Do Not Change Rule

Fields:

* id
* projectId
* rule
* severity
* reason
* requiresApproval
* createdAt
* updatedAt

Severity levels:

* Hard Rule
* Soft Rule
* Review Required
* Deprecated

Example:

```json
{
  "rule": "Do not redesign Byte mascot.",
  "severity": "Hard Rule",
  "requiresApproval": true,
  "reason": "Previous agent added an unwanted box around Byte and damaged the visual identity."
}
```

---

# 12. Project Health Score

The MVP health score should be rule-based.

Starting formula:

```text
Project Health = 100

Subtract:
- 15 if no active task
- 10 if active task has no acceptance criteria
- 15 if handoff is stale
- 10 if graph is stale
- 20 if critical bugs exist
- 10 if blocked tasks exist
- 10 if no Do Not Change rules exist
- 10 if no recent session log exists
```

The app should always show why the score is what it is.

Example:

```text
Health: 72%

Good:
✓ Active task exists
✓ Do Not Change rules exist
✓ Current phase is clear

Warnings:
⚠ Active task has no acceptance criteria
⚠ Knowledge graph should be refreshed
⚠ 1 critical bug exists
```

---

# 13. What Should I Do Next?

This should be one of the most important features.

When clicked, AgentOS should recommend:

* Project
* Next task
* Recommended role
* Recommended agent
* Backup agent
* Why this task matters now
* Whether a graph refresh is needed
* Whether a handoff is needed
* Estimated session type
* Safety warnings

Example:

```text
Recommended Next Action

Project: D.AI.L.Y
Task: Run smoke test on lesson completion flow
Role: Test Engineer
Recommended Agent: Codex
Backup Agent: ChatGPT
Why: Recent UI changes may have affected working lesson behavior.
Graph Status: Good
Handoff Status: Needs Refresh
Recommended Session: 15-25 minute testing session

[Generate Handoff]
[Copy Codex Prompt]
```

Builder Mode should explain this in plain English.

Expert Mode can show the full rule logic.

---

# 14. Handoff Generator

The handoff generator is the MVP’s most important feature.

Every handoff should include:

1. Project name
2. Project purpose
3. Current phase
4. Current task
5. Assigned role
6. Recommended agent
7. Backup agent
8. Recent activity
9. Relevant files
10. Graph status
11. Do Not Change rules
12. Known bugs
13. Acceptance criteria
14. Allowed actions
15. Forbidden actions
16. Required output
17. End-of-session checklist

---

## 14.1 Claude Code Handoff Emphasis

Claude Code handoffs should emphasize:

* Implementation
* UI work
* Refactoring
* Project-wide changes only when allowed
* Avoiding unrelated edits
* Respecting Do Not Change rules

Warning to include:

```text
Do not broadly redesign unrelated components. Make the smallest effective change needed to complete the assigned task.
```

---

## 14.2 Codex Handoff Emphasis

Codex handoffs should emphasize:

* Minimal diffs
* Debugging
* Testing
* Type errors
* Regression prevention
* Correctness

Warning to include:

```text
Do not redesign UI unless the task specifically requires it. Prefer minimal targeted fixes.
```

---

## 14.3 Gemini Handoff Emphasis

Gemini handoffs should emphasize:

* Review
* Planning
* UX critique
* Requirement gaps
* Design risks
* Large-context analysis

Warning to include:

```text
Do not modify source code unless explicitly asked. Provide review findings and recommended next steps.
```

---

## 14.4 ChatGPT Handoff Emphasis

ChatGPT handoffs should emphasize:

* Planning
* Documentation
* Architecture reasoning
* PRD/spec refinement
* Security/privacy review
* Plain-English explanation

---

# 15. Knowledge Graph Layer

Graphify should be optional in the MVP.

## 15.1 MVP Graph Behavior

In MVP:

* User manually sets graph status.
* User manually enters last refresh date.
* User can paste or edit graph summary.
* AgentOS generates graph-aware instructions.
* AgentOS does not run Graphify automatically.

Graph statuses:

* Fresh
* Good
* Refresh Recommended
* Stale
* Missing
* Error

---

## 15.2 Graph Refresh Strategy

Do not refresh after every small subtask.

Refresh at natural workflow boundaries:

1. Before an agent switch
2. Before generating an important handoff
3. After major structural changes
4. After pipeline milestones
5. Before final QA
6. When graph freshness falls below threshold

Major structural changes include:

* New feature added
* New directory added
* New module added
* Large refactor
* Database schema change
* Routing change
* API change
* State management change

Recommended sequence:

```text
Agent work
↓
Update project memory
↓
Refresh knowledge graph if needed
↓
Generate handoff
↓
Switch to next agent
```

---

# 16. Safety and Guardrails

AgentOS should prevent runaway AI coding behavior.

Default rule:

```text
Make the smallest effective change. Do not perform broad rewrites unless explicitly instructed.
```

Agents should not be instructed to:

* Delete large folders
* Rewrite the whole app
* Change architecture without approval
* Add cloud services without approval
* Install packages without approval
* Commit or push automatically
* Modify auth/payment/data handling without approval
* Ignore Do Not Change rules

---

## 16.1 Prompt Privacy Rule

Generated prompts and handoffs should never include:

* API keys
* Tokens
* Credentials
* `.env` contents
* Private secrets
* Payment data
* Sensitive user data
* Unnecessary proprietary data

Add this default rule:

```text
Never include secrets, API keys, tokens, .env contents, private credentials, or sensitive user data in generated prompts or handoff files.
```

---

# 17. MVP Milestones

## Milestone 0 — Repo Setup and Product Guardrails

Goal:

Create the initial repository and lock the scope.

Tasks:

* Create Electron + React + TypeScript project
* Add basic folder structure
* Add README
* Add MVP scope document
* Add coding-agent rules
* Add initial design direction
* Add Do Not Change rules for AgentOS itself

Deliverables:

* Working dev environment
* App launches locally
* README explains purpose
* MVP scope is documented

Suggested Claude Code task:

```text
Set up the initial Electron + React + TypeScript app shell for AgentOS. Create a clean project structure, add a README, add placeholder pages for Dashboard, Projects, Settings, and Project Detail. Do not implement advanced features yet. Focus only on a working local desktop shell.
```

Suggested Codex task:

```text
Review the initial app shell for correctness, TypeScript issues, broken imports, unsafe Electron patterns, and obvious project structure problems. Do not redesign the app. Provide minimal fixes only.
```

---

## Milestone 1 — App Shell and Navigation

Goal:

Create the basic user interface.

Build:

* Sidebar navigation
* Dashboard page
* Projects page
* Settings page
* Placeholder Project Detail page
* Dark mode first design
* Basic responsive layout

Navigation for MVP:

Builder Mode:

* Projects
* Next Action
* Health
* Usage
* Settings

Expert Mode:

* Projects
* Tasks
* Agents
* Handoffs
* Graph
* Logs
* Settings

Acceptance criteria:

* App opens
* Navigation works
* Pages render
* No broken routes
* No advanced features required

---

## Milestone 2 — Experience Mode Onboarding

Goal:

Let the user choose their interface complexity.

Build:

* First-launch modal
* Three experience choices
* Save selected mode
* Settings toggle to change mode
* Conditional navigation based on mode

Modes:

* Builder
* Advanced Builder
* Expert

Acceptance criteria:

* User sees onboarding on first launch
* Selection is saved
* Mode can be changed later
* UI changes based on selected mode

---

## Milestone 3 — Local Database and Project Model

Goal:

Add persistent local app state.

Build:

* SQLite database
* Project table
* Settings table
* Basic data access layer
* Seed default agents
* Seed default roles

Acceptance criteria:

* App state persists after restart
* User can create a sample project
* Project appears on dashboard
* Default agents exist

---

## Milestone 4 — Project Creation and `/agent-os/` Generation

Goal:

Allow the user to create or import a local project.

Build:

* Create project form
* Select local folder
* Generate `/agent-os/` folder
* Generate starter files
* Save project path in SQLite

Required generated files:

* START_HERE.md
* PROJECT_STATE.json
* TASKS.md
* PHASES.md
* AGENT_LOG.md
* BUGS.md
* DECISIONS.md
* DO_NOT_CHANGE.md
* SESSION_RULES.md
* HANDOFF_NEXT.md

Acceptance criteria:

* User can create/import a project
* App creates `/agent-os/`
* Starter files are generated
* App can reopen the project later

---

## Milestone 5 — Task Management

Goal:

Track what needs to be done.

Build:

* Add task
* Edit task
* Complete task
* Block task
* Set priority
* Set recommended agent
* Set backup agent
* Add acceptance criteria
* Add related files

Acceptance criteria:

* Tasks persist
* Task status can be changed
* Active task can be selected
* TASKS.md can be regenerated

---

## Milestone 6 — Project Phases and Progress

Goal:

Track where the project is in the development process.

Default phases:

1. Build & Refine Code
2. Smoke Testing
3. UX + Functionality Review
4. Final Refinements
5. Complete / Stable

Build:

* Phase selector
* Phase status
* Progress calculation
* Phase display on dashboard

MVP progress calculation:

```text
Phase 1 = 20%
Phase 2 = 40%
Phase 3 = 60%
Phase 4 = 80%
Phase 5 = 100%
```

Acceptance criteria:

* Project phase can be updated
* Progress updates based on phase
* Dashboard shows phase and progress

---

## Milestone 7 — Do Not Change, Bugs, and Decisions

Goal:

Capture the project constraints that prevent agents from breaking important work.

Build:

* Do Not Change rules editor
* Bug list
* Decisions list
* Severity field for rules
* Export to Markdown

Acceptance criteria:

* User can add hard constraints
* User can add known bugs
* User can add project decisions
* Files regenerate correctly

---

## Milestone 8 — Agent Profiles and Usage Status

Goal:

Track available AI tools manually.

Build default profiles:

* Claude Code
* Codex
* Gemini
* ChatGPT

Each profile includes:

* Strengths
* Weaknesses
* Best use cases
* Risk warnings
* Usage status
* Reset time
* Notes

Usage statuses:

* Available
* Limited
* Unavailable
* Unknown

Acceptance criteria:

* Agent profiles display
* User can edit usage status
* Recommended agent appears on tasks/handoffs

---

## Milestone 9 — Session Logging

Goal:

Make it easy to record what happened after an AI session.

Build:

* Log session form
* Select project
* Select task
* Select agent
* Select role
* Add summary
* Add files changed
* Add issues encountered
* Add next recommendation

Acceptance criteria:

* Session appears in project timeline
* AGENT_LOG.md is regenerated
* Last agent updates on dashboard
* Session data can feed the next handoff

---

## Milestone 10 — Handoff Generator

Goal:

Generate useful handoff files for the next AI agent.

Build:

* Generate HANDOFF_NEXT.md
* Generate handoff to Claude Code
* Generate handoff to Codex
* Generate handoff to Gemini
* Generate handoff to ChatGPT
* Copy handoff button
* Save handoff status

Acceptance criteria:

* Handoff includes current project state
* Handoff includes active task
* Handoff includes Do Not Change rules
* Handoff includes acceptance criteria
* Handoff includes graph status
* Handoff includes required end-of-session output

---

## Milestone 11 — Prompt Generator

Goal:

Generate copy/paste prompts for agent sessions.

Build prompt types:

* Claude Code startup prompt
* Codex startup prompt
* Gemini review prompt
* ChatGPT planning prompt
* End-of-session update prompt

Acceptance criteria:

* User can generate and copy prompts
* Prompts are role-aware
* Prompts include safety rules
* Prompts include current task
* Prompts include required output format

---

## Milestone 12 — Manual Graph Status

Goal:

Track whether the project map/knowledge graph is current.

Build:

* Graph status field
* Last refresh date
* Freshness notes
* Graph summary editor
* Graph refresh recommendation
* Graph-aware handoff section

Acceptance criteria:

* User can mark graph as Fresh, Good, Refresh Recommended, Stale, Missing, or Error
* Handoff includes graph status
* App warns when graph is stale before handoff

---

## Milestone 13 — Project Health Score

Goal:

Show whether a project is safe and ready to continue.

Build:

* Rule-based health score
* Explanation panel
* Warning badges
* Dashboard health badge

Acceptance criteria:

* Health score updates from project state
* User can see why score is low
* Missing acceptance criteria, stale handoff, stale graph, critical bugs, and blocked tasks affect score

---

## Milestone 14 — What Should I Do Next?

Goal:

Guide the user to the best next action.

Build:

* Recommendation engine
* Builder Mode explanation
* Expert Mode detail view
* Generate prompt from recommendation
* Generate handoff from recommendation

MVP logic should prioritize:

1. Critical bugs
2. Blocked active task
3. Stale handoff
4. Stale graph before agent switch
5. Active task with acceptance criteria
6. Smoke testing after UI changes
7. QA before new feature work

Acceptance criteria:

* User clicks one button and gets a clear next action
* Recommendation includes agent, role, task, reason, and safety warnings

---

## Milestone 15 — D.AI.L.Y Test Project

Goal:

Use a real project to validate AgentOS.

Initial D.AI.L.Y setup:

Project Name: D.AI.L.Y
Type: Local-first AI learning app
Current Phase: UX + Functionality Review
Primary Agents: Claude Code, Codex, Gemini
Known Risk: Agents may over-redesign Byte mascot or dashboard UI
Important Rule: Preserve working lesson/progress functionality
Knowledge Graph Tool: Graphify

Initial Do Not Change rules:

* Do not redesign Byte mascot without explicit approval.
* Do not remove glowing concentric rings.
* Do not rewrite working lesson logic.
* Do not convert the app to a cloud backend.
* Do not make broad UI changes outside the assigned task.

Initial team:

* Product Lead — ChatGPT
* Frontend Builder — Claude Code
* UX Reviewer — Gemini
* Bug Fixer — Codex
* Test Engineer — Codex
* Documentation Writer — ChatGPT

Acceptance criteria:

* D.AI.L.Y can be imported
* `/agent-os/` is created
* Handoff can be generated
* Next action can be recommended
* A real Claude/Codex session can be logged
* User can return later and understand the project state

---

# 18. How to Begin Building Tomorrow

## Day 1 Goal

Do not try to build the full product.

The Day 1 goal is:

```text
Create the app shell, lock the MVP scope, and build enough structure that future Claude Code/Codex sessions cannot drift.
```

---

## Day 1 Work Plan

### Session 1 — ChatGPT Planning

Prepare these files manually before coding:

* `README.md`
* `MVP_SCOPE.md`
* `AGENT_RULES.md`
* `PRODUCT_PRD_DRAFT.md`

Purpose:

* Keep Claude Code focused
* Prevent scope creep
* Make Codex review easier

---

### Session 2 — Claude Code: App Shell

Paste this into Claude Code:

```text
You are building AgentOS, a local-first desktop dashboard for managing AI-assisted software projects.

Read the project files first:
- README.md
- MVP_SCOPE.md
- AGENT_RULES.md
- PRODUCT_PRD_DRAFT.md

Your task:
Create the initial Electron + React + TypeScript app shell.

Build only:
1. Electron app setup
2. React app setup
3. TypeScript configuration
4. Dark-mode dashboard layout
5. Sidebar navigation
6. Placeholder pages:
   - Dashboard
   - Projects
   - Project Detail
   - Agents
   - Handoffs
   - Settings
7. Basic routing
8. Clean folder structure

Do not build:
- Agent automation
- Graphify integration
- MCP registry
- Full pipelines
- Cloud backend
- Login
- Usage tracking automation

Rules:
- Make the smallest effective implementation.
- Do not add unnecessary packages.
- Do not over-design the UI.
- Do not implement features not listed above.
- After finishing, provide:
  1. Summary of changes
  2. Files changed
  3. How to run the app
  4. Known issues
  5. Recommended next step
```

---

### Session 3 — Codex: Review App Shell

Paste this into Codex:

```text
You are reviewing the initial AgentOS app shell.

Your role:
Code reviewer and correctness checker.

Review for:
1. TypeScript errors
2. Broken imports
3. Broken routes
4. Electron setup issues
5. Unsafe Electron patterns
6. Unnecessary dependencies
7. Project structure problems

Do not:
- Redesign the UI
- Add new features
- Rewrite the architecture
- Implement future features
- Make broad changes

Allowed:
- Minimal fixes
- Small structure improvements
- Clear bug reports
- Suggestions for next steps

Required output:
1. Issues found
2. Fixes made
3. Files changed
4. Remaining risks
5. Recommended next task
```

---

### Session 4 — Claude Code: Experience Mode Onboarding

Only after app shell works, use Claude Code again:

```text
You are continuing AgentOS.

Current task:
Implement the first-launch experience mode selection.

Build:
1. First-launch onboarding screen
2. Three options:
   - Beginner builder
   - AI coding assistant user
   - Developer or power user
3. Save selected mode locally
4. Settings control to change mode
5. Conditional navigation labels based on mode

Do not:
- Build task management
- Build handoff generation
- Build graph features
- Build automation

Acceptance criteria:
- User sees onboarding on first launch
- User can select a mode
- Selection persists after restart
- User can change mode in Settings
- Builder Mode shows simpler navigation than Expert Mode

After finishing, provide:
1. Summary
2. Files changed
3. How it was tested
4. Known issues
5. Recommended next step
```

---

### Session 5 — Codex: Review Onboarding

```text
Review the AgentOS experience mode onboarding implementation.

Check:
1. Persistence works
2. First-launch logic works
3. Settings mode switch works
4. Navigation changes correctly
5. No unrelated features were added
6. TypeScript is clean

Make only minimal fixes.

Required output:
1. Issues found
2. Fixes made
3. Files changed
4. Remaining risks
5. Recommended next task
```

---

# 19. Agent Workflow Rules

Use this pattern for every coding session.

## Before Agent Session

1. Define one task.
2. Define allowed files or areas.
3. Define forbidden changes.
4. Define acceptance criteria.
5. Decide which agent is best.
6. Generate a handoff or prompt.

---

## During Agent Session

The agent must:

1. Read the relevant context.
2. Summarize understanding.
3. State intended files to inspect.
4. State intended files to change.
5. Make the smallest effective change.
6. Avoid unrelated edits.

---

## After Agent Session

The agent must output:

```text
Session Summary:
Files Changed:
What Worked:
Known Issues:
Tests Run:
Recommended Next Step:
Graph Refresh Needed:
Handoff Update Needed:
```

The user should paste this summary back into AgentOS once session logging exists.

---

# 20. Claude Code vs Codex Division of Labor

## Claude Code Best Used For

Use Claude Code for:

* Building the app shell
* React components
* UI layout
* Feature implementation
* File generation UI
* Form flows
* Dashboard polish
* Builder Mode screens

Risk:

* May overbuild
* May redesign too much
* May change unrelated files

Control Claude with:

* Strict task boundaries
* Do Not Change rules
* File scope limits
* Acceptance criteria

---

## Codex Best Used For

Use Codex for:

* Minimal bug fixes
* TypeScript errors
* Tests
* Regression checks
* Data model review
* SQLite logic review
* File generation correctness
* Electron safety review

Risk:

* May be less helpful for broad product/UI direction

Control Codex with:

* Specific review task
* Minimal-diff instruction
* “Do not redesign” instruction

---

## ChatGPT Best Used For

Use ChatGPT for:

* Product strategy
* PRD refinement
* Prompt design
* Handoff templates
* Roadmap decisions
* Scope cuts
* UX wording
* Plain-English Builder Mode explanations

---

## Gemini Best Used For

Use Gemini for:

* UX critique
* Large-context review
* Visual consistency review
* Requirement gaps
* Beginner-friendliness review

---

# 21. V1 Roadmap

After the MVP works with D.AI.L.Y, build V1.

V1 should include:

1. Editable role templates
2. Basic pipeline templates
3. Better handoff lifecycle states
4. Graphify command configuration
5. Optional Git changed-file detection
6. Snapshot/checkpoint system
7. Improved Project Health Score
8. Better knowledge vault editor
9. Prompt template editor
10. Project Doctor rule-based analysis
11. Import/export AgentOS project package
12. Improved onboarding and tooltips

V1 goal:

```text
Make AgentOS feel like a reliable manual operating system for AI-assisted development.
```

---

# 22. V2 Roadmap

V2 should explore assisted automation.

V2 may include:

1. Assisted Mode
2. Open project folder from app
3. Copy prompt and open target tool
4. Watch file changes
5. Detect changed files
6. Detect stale graph from file activity
7. Run configured Graphify command
8. Parse structured agent session reports
9. Generate next handoff automatically after session log
10. Usage reset reminders
11. Cost/usage notes
12. More advanced pipeline execution

V2 goal:

```text
Reduce manual copy/paste and make the workflow smoother while keeping the user in control.
```

---

# 23. V3 / Future Agent Relay

Future versions may include:

1. Supervised auto mode
2. Launch next agent
3. Insert generated prompt
4. Monitor logs/files
5. Pause on risky actions
6. Require approval for destructive changes
7. Refresh graph automatically
8. Continue through pipeline steps
9. Stop on failed tests
10. Stop on large diffs
11. Stop on auth/payment/data changes
12. Stop when confidence is low

Future relay should never be built until the manual workflow is excellent.

---

# 24. Draft PRD

## 24.1 Product Name

Working name:

**AgentOS**

Full name:

**AgentOS Dashboard**

Tagline:

**Mission Control for AI-assisted software projects.**

---

## 24.2 Product Vision

AgentOS is a local-first desktop command center that helps users manage software projects built with AI coding agents.

It tracks project state, tasks, agent sessions, handoffs, do-not-change rules, knowledge graph freshness, and next recommended actions.

AgentOS is designed to help both beginner builders and power users continue AI-assisted development safely without losing context between sessions or tools.

---

## 24.3 Problem Statement

Users working with AI coding tools often lose track of:

* What has already been done
* What still needs to be done
* Which agent changed what
* Which files are safe to modify
* Which features should not be redesigned
* Which prompt should be given to the next agent
* Whether project memory is current
* Whether the knowledge graph is stale
* Whether the next step should be building, testing, reviewing, or fixing

This creates repeated context loss, duplicated work, broken features, over-redesigns, and anxiety for non-coders.

---

## 24.4 Target Users

Primary:

* Beginner builders using AI to build software

Secondary:

* AI coding assistant users coordinating multiple tools

Tertiary:

* Developers and power users managing agent workflows

---

## 24.5 Goals

MVP goals:

1. Help users create and track local AI-assisted projects.
2. Generate a useful `/agent-os/` folder inside each project.
3. Help users know what to do next.
4. Help users generate safe handoffs for Claude Code, Codex, Gemini, and ChatGPT.
5. Help users preserve project memory.
6. Help users prevent agents from damaging working features.
7. Help users manually track graph freshness and agent usage.
8. Provide simple Builder Mode and detailed Expert Mode.
9. Validate the workflow using D.AI.L.Y.

---

## 24.6 Non-Goals

MVP will not:

1. Automate agent execution.
2. Require cloud login.
3. Require GitHub.
4. Run Graphify automatically.
5. Track API usage automatically.
6. Control Claude Code or Codex directly.
7. Replace project management tools for teams.
8. Replace Git.
9. Replace IDEs.
10. Build a general AI assistant inside the app.

---

## 24.7 Core User Stories

### Beginner Builder

As a beginner builder, I want to open AgentOS and immediately know what to do next so I do not feel lost.

### Returning User

As a returning user, I want to see what happened last session so I can continue without rereading the whole project.

### AI Agent User

As an AI coding assistant user, I want AgentOS to generate a handoff so I can paste it into Claude Code or Codex.

### Safety-Conscious User

As a user, I want to define Do Not Change rules so agents do not break stable parts of my app.

### Project Owner

As a project owner, I want to see whether the project is healthy before I keep building new features.

### Graph-Aware User

As a user, I want to know whether the project graph is stale before switching agents.

---

## 24.8 MVP User Flow

Primary flow:

```text
User opens AgentOS
↓
User selects project
↓
AgentOS shows current state
↓
User clicks “What should I do next?”
↓
AgentOS recommends a task, role, and agent
↓
User generates a handoff
↓
User copies prompt into selected AI tool
↓
AI agent works
↓
User logs session result
↓
AgentOS updates project memory
```

---

## 24.9 Key Screens

MVP screens:

1. First-launch onboarding
2. Dashboard / Mission Control
3. Project detail
4. Tasks
5. Handoffs
6. Agents
7. Graph status
8. Logs
9. Settings

---

## 24.10 Dashboard Requirements

Dashboard project cards should show:

* Project name
* Current phase
* Progress
* Health
* Active task
* Last agent used
* Recommended next agent
* Handoff status
* Graph status
* Last updated

Builder Mode should simplify this.

Expert Mode should show more detail.

---

## 24.11 Project Detail Requirements

Project detail should show:

* Overview
* Current phase
* Active task
* Progress
* Health score
* Next recommended action
* Tasks
* Bugs
* Decisions
* Do Not Change rules
* Agent sessions
* Handoffs
* Graph status
* Settings

---

## 24.12 Handoff Requirements

Handoffs must be generated from current project state.

Each handoff must include:

* Project summary
* Current objective
* Current task
* Agent role
* Acceptance criteria
* Relevant files
* Recent activity
* Do Not Change rules
* Graph status
* Known bugs
* Allowed actions
* Forbidden actions
* End-of-session checklist

---

## 24.13 Prompt Generator Requirements

The prompt generator should generate:

* Claude Code prompt
* Codex prompt
* Gemini review prompt
* ChatGPT planning prompt
* End-of-session prompt

Prompts must include:

* Task scope
* Role
* Constraints
* Do Not Change rules
* Required output

---

## 24.14 Builder Mode Language Requirements

Builder Mode should translate technical language.

Examples:

```text
Regression
Plain English: Something that used to work may have broken after recent changes.

Knowledge graph stale
Plain English: The project map needs updating so future AI sessions understand recent changes.

Pipeline
Plain English: A step-by-step plan for completing a task safely.

Handoff
Plain English: A briefing you give the next AI tool so it knows what to do.
```

---

## 24.15 Technical Requirements

The MVP must:

* Run locally
* Store data locally
* Work offline
* Generate Markdown files
* Generate JSON files
* Avoid cloud dependencies
* Avoid login
* Avoid secret exposure
* Use safe file-system access
* Save user settings
* Persist project state

---

## 24.16 Security and Privacy Requirements

AgentOS must:

* Never include secrets in prompts
* Never include `.env` contents
* Warn before including sensitive files
* Avoid destructive file operations
* Avoid automatic commits/pushes
* Avoid automatic package installs
* Require explicit approval for risky actions in future automation

---

## 24.17 Success Metrics

MVP success can be measured by:

1. User can import D.AI.L.Y.
2. User can generate a useful handoff in under 2 minutes.
3. User can return after several days and understand the project state.
4. User can prevent agents from changing protected areas.
5. User can log an agent session.
6. User can identify the next best action.
7. User feels less context anxiety when switching agents.
8. User uses AgentOS for multiple real coding sessions.

---

## 24.18 MVP Acceptance Criteria

The MVP is complete when:

1. User can choose Builder, Advanced Builder, or Expert mode.
2. User can create or import a local project.
3. App creates a valid `/agent-os/` folder.
4. App generates required Markdown and JSON files.
5. User can create, edit, block, and complete tasks.
6. User can assign a phase, role, recommended agent, and acceptance criteria to a task.
7. User can add Do Not Change rules.
8. User can manually log an agent session.
9. App can generate a next-agent handoff.
10. App can generate startup prompts for Claude Code, Codex, Gemini, and ChatGPT.
11. User can copy prompts with one click.
12. App can show a rule-based project health score with explanations.
13. App can recommend a next action.
14. Builder Mode explains technical terms in plain English.
15. D.AI.L.Y can be imported and managed as the first real project.

---

# 25. Open Questions for Future PRD Review

These questions should be answered before finalizing the PRD.

## Product Focus

1. Is AgentOS primarily a dashboard, a prompt generator, a project memory system, or an automation controller?
2. What is the single most important user action: Continue Project, Generate Handoff, or What Should I Do Next?
3. Should the app optimize first for the user personally or for a broader beginner-builder audience?
4. Should AgentOS manage many projects or make one project extremely easy to resume?

---

## MVP Scope

5. Are pipelines needed in MVP, or should they wait until V1?
6. Are editable roles needed in MVP, or can roles be static templates?
7. Should usage tracking be included in MVP or moved to V1?
8. Should MCP/tool registry be visible in MVP or hidden until Expert Mode V1?

---

## Data and Files

9. Should SQLite be the only source of truth?
10. Should manual edits to Markdown files be imported later?
11. Should the app warn before overwriting hand-edited files?
12. Should old handoffs be archived automatically?

---

## Graphify

13. Is Graphify mandatory or optional?
14. How exactly does Graphify run?
15. What files does Graphify produce?
16. Should the MVP only track graph status manually?
17. What should count as a stale graph?

---

## Safety

18. Should AgentOS refuse to generate a handoff if there are no acceptance criteria?
19. Should package installs require a warning?
20. Should auth/payment/database changes require special approval?
21. Should prompts include a maximum number of files the agent is allowed to modify?

---

## D.AI.L.Y Validation

22. What is the first D.AI.L.Y task AgentOS should manage?
23. What D.AI.L.Y files should be protected?
24. What would make the first real handoff successful?
25. What would make AgentOS feel useful within one week?

---

# 26. Immediate Next Build Checklist

Before opening Claude Code tomorrow, create or save:

* README.md
* MVP_SCOPE.md
* AGENT_RULES.md
* PRODUCT_PRD_DRAFT.md

Then run this sequence:

1. Claude Code builds app shell.
2. Codex reviews app shell.
3. Claude Code adds onboarding mode selection.
4. Codex reviews onboarding.
5. Claude Code adds project model and sample dashboard.
6. Codex reviews data structure.
7. Claude Code adds `/agent-os/` file generation.
8. Codex reviews file generation safety.
9. Claude Code adds task management.
10. Codex reviews task state and persistence.

Do not start with Graphify, agent relay, MCPs, or automation.

The first win is a working local desktop app that can create a project, show its current state, and generate a safe handoff.

---

# 27. Guiding Principle

When in doubt, cut scope and strengthen the core loop.

The core loop is:

```text
Project state
↓
Next action
↓
Safe handoff
↓
Agent session
↓
Session log
↓
Updated project memory
```

AgentOS should not become a complicated project management app.

It should become the safest and clearest way for a beginner builder to coordinate AI coding agents.

