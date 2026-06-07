import type { Health, Project } from '../types'

// Project health (MVP_SPEC §14). Derived from live task/next-step/rule state at
// render time, so the badge always reflects the current data — no stored score.
// Precedence: Blocked > Needs Attention > Good. Reasons follow the §14.2 format.

const STALE_DAYS = 14

export interface HealthResult {
  health: Health
  reasons: string[]
}

// Calendar days between an ISO date (YYYY-MM-DD) and today. null if invalid.
function daysSince(iso: string, now: number): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null

  const current = new Date(now)
  const today = Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())
  return Math.floor((today - date.getTime()) / 86400000)
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`
}

export function computeHealth(project: Project, now = Date.now()): HealthResult {
  const { tasks } = project
  const blocked = tasks.filter((t) => t.status === 'Blocked')
  const criticalBlocked = blocked.filter((t) => t.priority === 'Critical')
  const hasActionable = tasks.some((t) => t.status === 'Ready' || t.status === 'In Progress')
  const hasNextStep = project.nextStep.trim().length > 0
  const hasRules = project.doNotChangeRules.length > 0
  const stale = daysSince(project.lastWorkedOn, now)
  const isStale = stale !== null && stale > STALE_DAYS

  // The stored field remains the MVP's manual "project blocked" signal.
  if (project.health === 'Blocked') {
    return { health: 'Blocked', reasons: ['Project is marked blocked'] }
  }

  // Critical blocked work takes precedence over attention warnings.
  if (criticalBlocked.length > 0) {
    return { health: 'Blocked', reasons: [`${plural(criticalBlocked.length, 'critical task')} blocked`] }
  }

  // Needs Attention — any warning sign.
  const attention: string[] = []
  if (tasks.length === 0) attention.push('No tasks yet')
  else if (!hasActionable) attention.push('No active or ready task')
  if (!hasNextStep) attention.push('No next step defined')
  if (blocked.length > 0) attention.push(`${plural(blocked.length, 'blocked task')}`)
  if (!hasRules) attention.push('No Do Not Change rules')
  if (stale === null) attention.push('Last worked date is missing or invalid')
  else if (isStale) attention.push(`Not updated in ${stale} days`)
  if (attention.length > 0) return { health: 'Needs Attention', reasons: attention }

  // Good — has an active/ready task, a next step, rules, and nothing blocked.
  return {
    health: 'Good',
    reasons: ['Has an active or ready task', 'Next step is defined', 'No critical blocked tasks', 'Do Not Change rules exist']
  }
}
