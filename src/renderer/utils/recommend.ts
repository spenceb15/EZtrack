import type { AgentName, Project, Task } from '../types'
import type { AgentRecommendation } from '../types/agentRecommendationTypes'

// Rule-based agent recommendation helper (MVP_SPEC M6 + §12.3).
// Pure, keyword-driven, no AI. Maps a task's wording to one agent + a reason.
// Acceptance: Codex = testing/bugs, Claude Code = building,
// Gemini = UX review, ChatGPT = planning/specs.

export interface AgentSuggestion {
  agent: AgentName
  why: string
}

export interface ProjectAgentRecommendation {
  agent: AgentName
  reason: string
}

// Ordered rules — first keyword match wins. Correctness work takes precedence,
// followed by explicit review, planning, and general implementation work.
const RULES: { agent: AgentName; why: string; keywords: string[] }[] = [
  {
    agent: 'Codex',
    why: 'Testing or bug-fix work — Codex is best for regression checks and minimal, correct diffs.',
    keywords: [
      'test',
      'tests',
      'testing',
      'bug',
      'bugs',
      'fix',
      'fixes',
      'fixed',
      'fixing',
      'regression',
      'regressions',
      'error',
      'errors',
      'typescript',
      'crash',
      'crashes',
      'broken',
      'smoke test',
      'smoke tests',
      'debug',
      'debugging',
      'lint',
      'linting'
    ]
  },
  {
    agent: 'Gemini',
    why: 'Review or UX work — Gemini is best for critique, design feedback, and spotting requirement gaps.',
    keywords: [
      'ux review',
      'user experience review',
      'review',
      'reviews',
      'reviewing',
      'critique',
      'critiques',
      'critiquing',
      'visual review',
      'visual critique',
      'usability review',
      'design feedback',
      'evaluate',
      'evaluates',
      'evaluating',
      'evaluation',
      'audit',
      'audits',
      'auditing',
      'requirement gap',
      'requirement gaps'
    ]
  },
  {
    agent: 'ChatGPT',
    why: 'Planning or spec work — ChatGPT is best for planning, PRDs, specs, and architecture reasoning.',
    keywords: [
      'plan',
      'plans',
      'planning',
      'prd',
      'prds',
      'spec',
      'specs',
      'specification',
      'specifications',
      'strategy',
      'architecture',
      'document',
      'documentation',
      'docs',
      'research',
      'outline',
      'roadmap',
      'prompt',
      'prompts'
    ]
  },
  {
    agent: 'Claude Code',
    why: 'Feature or build work — Claude Code is best for implementing and modifying app features.',
    keywords: [
      'build',
      'building',
      'implement',
      'implementing',
      'implementation',
      'feature',
      'features',
      'component',
      'components',
      'refactor',
      'refactoring',
      'screen',
      'screens',
      'integrate',
      'integration',
      'ui'
    ]
  }
]

const DEFAULT: AgentSuggestion = {
  agent: 'Claude Code',
  why: 'Defaulting to Claude Code for general build work. Switch to Codex (testing/bugs), Gemini (UX review), or ChatGPT (planning) if the task fits better.'
}

const PRIORITY_WEIGHT: Record<Task['priority'], number> = {
  Low: 10,
  Medium: 20,
  High: 35,
  Critical: 50
}

export function suggestAgent(input: { title: string; description?: string }): AgentSuggestion {
  const text = ` ${`${input.title} ${input.description ?? ''}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()} `

  for (const rule of RULES) {
    if (rule.keywords.some((keyword) => text.includes(` ${keyword} `))) {
      return { agent: rule.agent, why: rule.why }
    }
  }

  return { ...DEFAULT }
}

function topActionableTask(project: Project): Task | null {
  const actionable = project.tasks.filter((task) => task.status === 'Ready' || task.status === 'In Progress')
  if (actionable.length === 0) return null

  return actionable.reduce((best, task) => {
    const bestWeight = PRIORITY_WEIGHT[best.priority] + (best.status === 'In Progress' ? 5 : 0)
    const taskWeight = PRIORITY_WEIGHT[task.priority] + (task.status === 'In Progress' ? 5 : 0)
    return taskWeight > bestWeight ? task : best
  })
}

export function recommendAgent(project: Project): ProjectAgentRecommendation {
  const blockedTasks = project.tasks.filter((task) => task.status === 'Blocked')
  const sessionText = [project.lastSession?.summary ?? '', project.lastSession?.problems ?? '', project.nextStep]
    .join(' ')
    .toLowerCase()

  if (project.phase === 'UX Review') {
    return {
      agent: 'Gemini',
      reason: 'This project is in UX review, so Gemini is the best fit for critique, usability feedback, and design gaps.'
    }
  }

  if (
    project.phase === 'Testing' ||
    blockedTasks.length > 0 ||
    /(bug|error|test|regression|debug|fix|broken|crash)/.test(sessionText)
  ) {
    return {
      agent: 'Codex',
      reason: 'Blocked work or bug-focused testing calls for a narrow debugging pass, which makes Codex the best fit.'
    }
  }

  const topTask = topActionableTask(project)
  if (topTask) {
    const suggestion = suggestAgent({ title: topTask.title, description: topTask.description })
    return { agent: suggestion.agent, reason: suggestion.why }
  }

  if (project.phase === 'Planning') {
    return {
      agent: 'ChatGPT',
      reason: 'Planning work benefits most from outlining options, shaping the approach, and tightening the next decision.'
    }
  }

  return {
    agent: 'Claude Code',
    reason: 'This is implementation-heavy work, so Claude Code is the best fit for making progress without broad process overhead.'
  }
}

export function getAgentRecommendations(project: Project): AgentRecommendation[] {
  const recommendations: AgentRecommendation[] = []

  const openTasks = project.tasks.filter(t => t.status !== 'Complete')
  const blockedTasks = project.tasks.filter(t => t.status === 'Blocked')
  const sessionText = [
    project.lastSession?.summary ?? '',
    project.lastSession?.problems ?? '',
  ].join(' ').toLowerCase()

  if (project.phase === 'Planning' && openTasks.length < 5) {
    recommendations.push(
      { agent: 'Claude Code', reason: 'Best for brainstorming and ideation in early-stage planning.' },
      { agent: 'Codex', reason: 'Strong at scaffolding initial ideas into working code.' },
    )
  } else if (project.phase === 'Build & Refine') {
    const volume = openTasks.length >= 5 ? 'large volume of' : 'current'
    recommendations.push(
      { agent: 'ChatGPT', reason: `Expert guidance for the ${volume} open coding tasks.` },
      { agent: 'Gemini', reason: 'Resolves complex build-phase issues quickly.' },
    )
  } else if (project.phase === 'Testing') {
    recommendations.push(
      { agent: 'Claude Code', reason: 'Excels at debugging and writing thorough test cases.' },
      { agent: 'ChatGPT', reason: 'Useful for generating test scenarios and edge cases.' },
    )
  } else if (project.phase === 'UX Review') {
    recommendations.push(
      { agent: 'ChatGPT', reason: 'Strong at evaluating user experience and suggesting improvements.' },
      { agent: 'Gemini', reason: 'Effective at interaction and visual design feedback.' },
    )
  } else {
    recommendations.push(
      { agent: 'Claude Code', reason: `Reliable general-purpose agent for the ${project.phase} phase.` },
    )
  }

  if (blockedTasks.length > 0 && !recommendations.some(r => r.agent === 'Claude Code')) {
    recommendations.push({
      agent: 'Claude Code',
      reason: `${blockedTasks.length} blocked task(s) — Claude Code is effective at unblocking.`,
    })
  }

  if (
    (sessionText.includes('bug') || sessionText.includes('error')) &&
    !recommendations.some(r => r.agent === 'Claude Code')
  ) {
    recommendations.push({
      agent: 'Claude Code',
      reason: 'Recent session notes mention bugs or errors — Claude Code is strong at debugging.',
    })
  }

  return recommendations
}
