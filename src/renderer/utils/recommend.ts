import type { AgentName } from '../types'

// Rule-based agent recommendation helper (MVP_SPEC M6 + §12.3).
// Pure, keyword-driven, no AI. Maps a task's wording to one agent + a reason.
// Acceptance: Codex = testing/bugs, Claude Code = building,
// Gemini = UX review, ChatGPT = planning/specs.

export interface AgentSuggestion {
  agent: AgentName
  why: string
}

// Ordered rules — first keyword match wins.
// Codex is checked first (safest, minimal-diff work), Claude Code last
// because its keywords ("ui", "add") are the broadest and most generic.
const RULES: { agent: AgentName; why: string; keywords: string[] }[] = [
  {
    agent: 'Codex',
    why: 'Testing or bug-fix work — Codex is best for regression checks and minimal, correct diffs.',
    keywords: [
      'test',
      'bug',
      'fix',
      'regression',
      'error',
      'typescript',
      'crash',
      'broken',
      'smoke',
      'debug',
      'lint'
    ]
  },
  {
    agent: 'Gemini',
    why: 'Review or UX work — Gemini is best for critique, design feedback, and spotting requirement gaps.',
    keywords: ['ux', 'review', 'critique', 'visual', 'usability', 'feedback', 'evaluate', 'audit']
  },
  {
    agent: 'ChatGPT',
    why: 'Planning or spec work — ChatGPT is best for planning, PRDs, specs, and architecture reasoning.',
    keywords: ['plan', 'prd', 'spec', 'strategy', 'architecture', 'document', 'docs', 'research', 'outline', 'roadmap']
  },
  {
    agent: 'Claude Code',
    why: 'Feature or build work — Claude Code is best for implementing and modifying app features.',
    keywords: ['build', 'implement', 'feature', 'component', 'refactor', 'screen', 'integrate', 'ui']
  }
]

const DEFAULT: AgentSuggestion = {
  agent: 'Claude Code',
  why: 'Defaulting to Claude Code for general build work. Switch to Codex (testing/bugs), Gemini (UX review), or ChatGPT (planning) if the task fits better.'
}

export function suggestAgent(input: { title: string; description?: string }): AgentSuggestion {
  const text = `${input.title} ${input.description ?? ''}`.toLowerCase()
  for (const rule of RULES) {
    if (rule.keywords.some((k) => text.includes(k))) {
      return { agent: rule.agent, why: rule.why }
    }
  }
  return DEFAULT
}
