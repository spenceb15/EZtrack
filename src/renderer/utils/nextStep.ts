import type { AgentName, Project, Task } from '../types'
import { suggestAgent } from './recommend'

// "What should I do next?" — rule-based next-action selector (MVP_SPEC §11.1 + M7).
// Pure functions, no AI. Picks one project + one task, explains why, names an
// agent, and surfaces Do Not Change rules as cautions (§11.2 output format).

export interface NextStep {
  project: Project
  task: Task | null
  reason: string
  agent: AgentName
  why: string
  cautions: string[]
}

// Lower tier = more urgent. Mirrors the §11.1 priority order.
interface Pick {
  task: Task | null
  tier: number
  reason: string
}

const isOpen = (t: Task) => t.status !== 'Complete'
const looksLike = (t: Task, agent: AgentName) =>
  suggestAgent({ title: t.title, description: t.description }).agent === agent

// Choose the single best task within one project.
function pickTask(project: Project): Pick {
  const tasks = project.tasks
  if (tasks.length === 0) {
    return { task: null, tier: 9, reason: 'No tasks yet — create the first task to define the next move.' }
  }
  const find = (fn: (t: Task) => boolean) => tasks.find(fn) ?? null

  let t = find((x) => x.status === 'Blocked' && x.priority === 'Critical')
  if (t) return { task: t, tier: 1, reason: 'A critical task is blocked — unblocking it is the highest priority.' }

  t = find((x) => x.status === 'Ready' && x.priority === 'Critical')
  if (t) return { task: t, tier: 2, reason: 'A critical task is ready to start.' }

  t = find((x) => x.status === 'Ready' && x.priority === 'High')
  if (t) return { task: t, tier: 3, reason: 'A high-priority task is ready to start.' }

  t = find((x) => x.status === 'In Progress')
  if (t) return { task: t, tier: 4, reason: 'A task is already in progress — finish it before starting new work.' }

  // Heuristic (phase-based, since build/UI history is not tracked):
  if (project.phase === 'Testing' || project.phase === 'Build & Refine') {
    t = find((x) => isOpen(x) && x.status !== 'Blocked' && looksLike(x, 'Codex'))
    if (t) return { task: t, tier: 5, reason: `Project is in ${project.phase} — verify recent work with a testing/regression task.` }
  }
  if (project.phase === 'UX Review') {
    t = find((x) => isOpen(x) && x.status !== 'Blocked' && looksLike(x, 'Gemini'))
    if (t) return { task: t, tier: 6, reason: 'Project is in UX Review — a review/critique task fits the current phase.' }
  }

  t = find((x) => x.status === 'Ready')
  if (t) return { task: t, tier: 7, reason: 'Oldest ready task — next in line.' }

  t = find(isOpen)
  if (t) return { task: t, tier: 8, reason: 'Next open task.' }

  return { task: null, tier: 9, reason: 'All tasks are complete — add a new task or advance the project.' }
}

function cautionsFor(project: Project): string[] {
  return project.doNotChangeRules
    .filter((r) => r.severity === 'Hard Rule' || r.severity === 'Warning')
    .map((r) => r.rule)
}

function toNextStep(project: Project, pick: Pick): NextStep {
  const task = pick.task
  const agent = task ? task.recommendedAgent : project.recommendedAgent
  const why = task
    ? task.whyThisAgent || suggestAgent({ title: task.title, description: task.description }).why
    : project.whyThisAgent || 'Define the next task, then pick the agent that fits it.'
  return { project, task, reason: pick.reason, agent, why, cautions: cautionsFor(project) }
}

// Single project (Project Detail button).
export function recommendForProject(project: Project): NextStep {
  return toNextStep(project, pickTask(project))
}

// Across all projects (Dashboard button). Picks the most urgent task by tier,
// tie-broken by project order. Returns null only when there are no projects.
export function recommendNext(projects: Project[]): NextStep | null {
  if (projects.length === 0) return null
  let best: { project: Project; pick: Pick } | null = null
  for (const project of projects) {
    const pick = pickTask(project)
    if (!best || pick.tier < best.pick.tier) best = { project, pick }
  }
  return best ? toNextStep(best.project, best.pick) : null
}
