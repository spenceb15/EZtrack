# Agent Rules for AI Project Dashboard

## Source of Truth

`docs/MVP_SPEC.md` is the build contract.

`docs/FULL_PRD.md` is future context only.

If the MVP and PRD conflict, follow the MVP.

Do not implement features from the full PRD unless they are explicitly included in the MVP.

## Current Product Goal

Build a simple local-first dashboard that helps the user:

* Track AI-assisted projects
* See project progress
* See current phase
* See recommended next step
* Choose the right AI agent
* Understand why that agent is recommended
* Track simple tasks
* Track Do Not Change rules
* See last session summary

## Knowledge Graph

This is a developer tool to help coding agents navigate this codebase — it is not an app feature.
Do not confuse it with "Graphify integration" in the Do Not Build list, which refers to a future
product feature that lets the dashboard automatically graph the projects it tracks.

This project has a graphify knowledge graph covering all source files and docs.
Query it before reading any doc in full:

```
graphify-out/.venv/bin/graphify query "<your question>"
```

Example queries:
```
graphify-out/.venv/bin/graphify query "What is the source of truth hierarchy?"
graphify-out/.venv/bin/graphify query "What features are explicitly out of scope?"
graphify-out/.venv/bin/graphify query "Where is data persistence handled?"
graphify-out/.venv/bin/graphify query "What data types exist and where are they defined?"
```

Use `--dfs` to trace a specific execution path:
```
graphify-out/.venv/bin/graphify query "persist save flow" --dfs
```

Query first to orient. Read a specific file only when you need exact implementation details.
Source of truth when docs conflict: `docs/MVP_SPEC.md` wins.

## Do Not Build Yet

Do not build:

* Automated handoffs
* Agent relay
* Graphify integration
* MCP registry
* Full pipelines
* Cloud backend
* Login/accounts
* GitHub integration
* File watching
* Automatic repo analysis
* AI-generated recommendations
* Usage tracking automation

## Coding Rules

* Keep the app simple.
* Make the smallest effective change.
* Prefer readable code over clever abstractions.
* Do not add unnecessary dependencies.
* Do not create advanced future architecture before the MVP needs it.
* Do not redesign unrelated areas.
* Do not remove working functionality without explaining why.
* Do not leave the app in a broken state.

## Required End-of-Session Output

Every coding agent must end with:

1. Summary of changes
2. Files changed
3. How to run or test
4. Known issues
5. What was intentionally not built
6. Recommended next step

## Context Management

After each milestone completes, run `/compact` before starting the next milestone. This preserves token budget across milestones. Do not start a new milestone in a context window that already contains a completed one.

After each milestone completes, update the knowledge graph so it reflects the new files:

```
/graphify . --update
```

Run this the same way you run `/compact` — at the end of every milestone, before moving on.

