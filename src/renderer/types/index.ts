// Data model for the AI Project Dashboard MVP.
// Mirrors docs/MVP_SPEC.md section 16. Kept intentionally simple.

export type NavKey = 'dashboard' | 'projects' | 'project-detail' | 'agents' | 'settings'

export type Phase = 'Planning' | 'Build & Refine' | 'Testing' | 'UX Review' | 'Stable'
export type Health = 'Good' | 'Needs Attention' | 'Blocked'
export type TaskStatus = 'Backlog' | 'Ready' | 'In Progress' | 'Blocked' | 'Complete'
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical'
export type RuleSeverity = 'Hard Rule' | 'Warning' | 'Note'
export type AgentName = 'Claude Code' | 'Codex' | 'Gemini' | 'ChatGPT'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  recommendedAgent: AgentName
  whyThisAgent: string
  acceptanceCriteria: string[]
  notes: string
}

export interface DoNotChangeRule {
  id: string
  rule: string
  severity: RuleSeverity
  reason: string
  createdAt: string
}

export interface LastSession {
  date: string
  agent: string
  summary: string
  problems: string
  recommendedNextStep: string
}

export interface Project {
  id: string
  name: string
  description: string
  type: string
  phase: Phase
  progress: number
  health: Health
  currentGoal: string
  nextStep: string
  recommendedAgent: AgentName
  whyThisAgent: string
  lastAgentUsed: string
  lastWorkedOn: string
  tasks: Task[]
  doNotChangeRules: DoNotChangeRule[]
  lastSession: LastSession | null
  notes: string
}

export interface Agent {
  id: string
  name: AgentName
  bestFor: string[]
  risks: string[]
  recommendedFor: string[]
}

export interface AppSettings {
  experienceMode: 'builder' | 'expert'
  theme: 'dark' | 'light'
}

export interface AppData {
  settings: AppSettings
  projects: Project[]
  agents: Agent[]
}
