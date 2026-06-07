import type {
  Agent,
  AgentName,
  AppData,
  AppSettings,
  DoNotChangeRule,
  Health,
  KnowledgeNote,
  LastSession,
  Phase,
  Priority,
  Project,
  RuleSeverity,
  Task,
  TaskStatus
} from '../types'

const phases: Phase[] = ['Planning', 'Build & Refine', 'Testing', 'UX Review', 'Stable']
const healthStates: Health[] = ['Good', 'Needs Attention', 'Blocked']
const taskStatuses: TaskStatus[] = ['Backlog', 'Ready', 'In Progress', 'Blocked', 'Complete']
const priorities: Priority[] = ['Low', 'Medium', 'High', 'Critical']
const ruleSeverities: RuleSeverity[] = ['Hard Rule', 'Warning', 'Note']
const agentNames: AgentName[] = ['Claude Code', 'Codex', 'Gemini', 'ChatGPT']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isOneOf<T extends string>(value: unknown, options: T[]): value is T {
  return typeof value === 'string' && options.includes(value as T)
}

function isTask(value: unknown): value is Task {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.description === 'string' &&
    isOneOf(value.status, taskStatuses) &&
    isOneOf(value.priority, priorities) &&
    isOneOf(value.recommendedAgent, agentNames) &&
    typeof value.whyThisAgent === 'string' &&
    isStringArray(value.acceptanceCriteria) &&
    typeof value.notes === 'string'
  )
}

function isKnowledgeNote(value: unknown): value is KnowledgeNote {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.body === 'string' &&
    typeof value.createdAt === 'string'
  )
}

function isRule(value: unknown): value is DoNotChangeRule {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.rule === 'string' &&
    isOneOf(value.severity, ruleSeverities) &&
    typeof value.reason === 'string' &&
    typeof value.createdAt === 'string'
  )
}

function isLastSession(value: unknown): value is LastSession {
  return (
    isRecord(value) &&
    typeof value.date === 'string' &&
    typeof value.agent === 'string' &&
    typeof value.summary === 'string' &&
    typeof value.problems === 'string' &&
    typeof value.recommendedNextStep === 'string'
  )
}

function isProject(value: unknown): value is Project {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.description === 'string' &&
    typeof value.type === 'string' &&
    isOneOf(value.phase, phases) &&
    typeof value.progress === 'number' &&
    Number.isFinite(value.progress) &&
    isOneOf(value.health, healthStates) &&
    typeof value.currentGoal === 'string' &&
    typeof value.nextStep === 'string' &&
    isOneOf(value.recommendedAgent, agentNames) &&
    typeof value.whyThisAgent === 'string' &&
    typeof value.lastAgentUsed === 'string' &&
    typeof value.lastWorkedOn === 'string' &&
    Array.isArray(value.tasks) &&
    value.tasks.every(isTask) &&
    Array.isArray(value.doNotChangeRules) &&
    value.doNotChangeRules.every(isRule) &&
    (value.lastSession === null || isLastSession(value.lastSession)) &&
    typeof value.notes === 'string' &&
    (value.sessionHistory === undefined ||
      (Array.isArray(value.sessionHistory) && value.sessionHistory.every(isLastSession))) &&
    (value.agentUsageCounts === undefined ||
      (isRecord(value.agentUsageCounts) &&
        Object.values(value.agentUsageCounts).every((v) => typeof v === 'number'))) &&
    (value.knowledgeNotes === undefined ||
      (Array.isArray(value.knowledgeNotes) && value.knowledgeNotes.every(isKnowledgeNote)))
  )
}

function isAgent(value: unknown): value is Agent {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    isOneOf(value.name, agentNames) &&
    isStringArray(value.bestFor) &&
    isStringArray(value.risks) &&
    isStringArray(value.recommendedFor)
  )
}

function isSettings(value: unknown): value is AppSettings {
  return (
    isRecord(value) &&
    isOneOf(value.experienceMode, ['builder', 'expert']) &&
    isOneOf(value.theme, ['dark', 'light'])
  )
}

export function isAppData(value: unknown): value is AppData {
  return (
    isRecord(value) &&
    isSettings(value.settings) &&
    Array.isArray(value.projects) &&
    value.projects.every(isProject) &&
    Array.isArray(value.agents) &&
    value.agents.every(isAgent)
  )
}
