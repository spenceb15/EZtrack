# Graph Report - .  (2026-06-07)

## Corpus Check
- 4 files · ~28,541 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 208 nodes · 429 edges · 16 communities (12 shown, 4 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.82)
- Token cost: 4,200 input · 980 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Modal & Prompt UI|Modal & Prompt UI]]
- [[_COMMUNITY_Session & Rule Forms|Session & Rule Forms]]
- [[_COMMUNITY_Project Form|Project Form]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Design Concepts & Lessons|Design Concepts & Lessons]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_App Data Validation|App Data Validation]]
- [[_COMMUNITY_MVP Scope Rules|MVP Scope Rules]]
- [[_COMMUNITY_Electron Main Process|Electron Main Process]]
- [[_COMMUNITY_Agent Protocol Docs|Agent Protocol Docs]]
- [[_COMMUNITY_App State Handlers|App State Handlers]]
- [[_COMMUNITY_Build Config Detail|Build Config Detail]]
- [[_COMMUNITY_Package Entry|Package Entry]]
- [[_COMMUNITY_Renderer Entry|Renderer Entry]]
- [[_COMMUNITY_TS Config Root|TS Config Root]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Project` - 12 edges
3. `AgentName` - 11 edges
4. `App()` - 10 edges
5. `computeHealth()` - 9 edges
6. `persist Function` - 9 edges
7. `Task` - 8 edges
8. `Agent` - 8 edges
9. `isRecord()` - 8 edges
10. `MVP Spec - Build Contract for AI Project Dashboard` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Project Health Score Logic` --rationale_for--> `computeHealth()`  [EXTRACTED]
  docs/BUILD_PLAN.md → src/renderer/utils/health.ts
- `Prompt Generation Feature` --rationale_for--> `generatePrompt()`  [EXTRACTED]
  docs/BUILD_PLAN.md → src/renderer/utils/prompt.ts
- `Lessons Learned - MVP Build Retrospective` --references--> `Health Derived at Render (Not Stored)`  [EXTRACTED]
  docs/lessons-learned.md → src/renderer/utils/health.ts
- `computeHealth()` --semantically_similar_to--> `generatePrompt()`  [INFERRED] [semantically similar]
  src/renderer/utils/health.ts → src/renderer/utils/prompt.ts
- `Local-First JSON File Storage` --semantically_similar_to--> `Sequential Save Queue Pattern`  [INFERRED] [semantically similar]
  src/main/index.ts → src/renderer/App.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Project Health Evaluation Pipeline** — utils_health_computehealth, utils_health_dayssince, utils_health_plural, utils_health_stale_days [EXTRACTED 1.00]
- **MVP Multi-Agent Build Workflow** — docs_build_plan_claude_code_agent, docs_build_plan_codex_agent, docs_build_plan_agent_protocol, docs_build_plan_mvp_spec [EXTRACTED 1.00]
- **Prompt Context Assembly from Project Data** — utils_prompt_generateprompt, utils_prompt_severity_order, docs_build_plan_prompt_generation_concept [INFERRED 0.85]

## Communities (16 total, 4 thin omitted)

### Community 0 - "Modal & Prompt UI"
Cohesion: 0.15
Nodes (23): Modal(), AgentBadge(), EmptyState(), HealthBadge(), PhaseBadge(), PriorityBadge(), ProgressBar(), Section() (+15 more)

### Community 1 - "Session & Rule Forms"
Cohesion: 0.12
Nodes (20): RuleForm(), RuleFormValues, SessionFormValues, ITEMS, Sidebar(), Agent: ChatGPT, Agent: Claude Code, Agent: Codex (+12 more)

### Community 2 - "Project Form"
Cohesion: 0.20
Nodes (14): ProjectForm(), ProjectFormValues, TaskForm(), TaskFormValues, PHASES, PRIORITIES, TASK_STATUSES, api (+6 more)

### Community 3 - "Package Dependencies"
Cohesion: 0.10
Nodes (20): dependencies, react, react-dom, description, devDependencies, electron, @types/node, @types/react (+12 more)

### Community 4 - "Design Concepts & Lessons"
Cohesion: 0.17
Nodes (17): D.AI.L.Y Sample Project - Real-World Test Case, Health Derived at Render (Not Stored), Rule-Based Agent Recommendation (No AI), Lessons Learned - MVP Build Retrospective, AgentName, Task, cautionsFor(), looksLike() (+9 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module, moduleResolution (+9 more)

### Community 6 - "App Data Validation"
Cohesion: 0.26
Nodes (15): agentNames, healthStates, isAgent(), isAppData(), isLastSession(), isOneOf(), isProject(), isRecord() (+7 more)

### Community 7 - "MVP Scope Rules"
Cohesion: 0.17
Nodes (13): Agent Rules - Coding Constraints Document, Do Not Change Rules - Agent Safety Guardrails, Local-First Architecture (No Cloud, No Login), MVP Scope Discipline - Dashboard First, OS Later, Build Plan - Milestone-by-Milestone Implementation Guide, Prompt Generation Feature, Full PRD - AgentOS Dashboard Future Product Vision, MVP Spec - Build Contract for AI Project Dashboard (+5 more)

### Community 8 - "Electron Main Process"
Cohesion: 0.20
Nodes (12): Atomic Write via Temp File Rename, DATA_DIR, DATA_FILE, IPC Channel: data:load, IPC Channel: data:path, IPC Channel: data:save, loadData(), Local-First JSON File Storage (+4 more)

### Community 9 - "Agent Protocol Docs"
Cohesion: 0.25
Nodes (9): Coding Agent Protocol, ChatGPT Agent, Claude Code Agent, Codex Agent, FULL_PRD.md (future context), Gemini Agent, AI Project Dashboard Build Plan, MVP Project Tracking Loop (+1 more)

### Community 10 - "App State Handlers"
Cohesion: 0.22
Nodes (9): addRule Handler, addTask Handler, createProject Handler, logSession Handler, persist Function, Sequential Save Queue Pattern, setTaskStatus Handler, updateProject Handler (+1 more)

## Knowledge Gaps
- **66 isolated node(s):** `name`, `version`, `description`, `main`, `license` (+61 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `App()` connect `Session & Rule Forms` to `Project Form`, `App State Handlers`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `persist Function` connect `App State Handlers` to `Session & Rule Forms`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `Sequential Save Queue Pattern` connect `App State Handlers` to `Electron Main Process`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _70 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Session & Rule Forms` be split into smaller, more focused modules?**
  _Cohesion score 0.1164021164021164 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._