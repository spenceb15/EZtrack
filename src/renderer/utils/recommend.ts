import type { AgentName } from '../types'

// Rule-based agent recommendation helper (MVP_SPEC M6 + §12.3).
// Pure, keyword-driven, no AI. Maps a task's wording to one agent + a reason.
// Acceptance: Codex = testing/bugs, Claude Code = building,
// Gemini = UX review, ChatGPT = planning/specs.

export interface AgentSuggestion {
  agent: AgentName
  why: string
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
