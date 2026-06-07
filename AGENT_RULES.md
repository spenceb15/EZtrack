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

