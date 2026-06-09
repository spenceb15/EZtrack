import type { DoNotChangeRule, Project } from '../types'

export function openTaskCount(project: Project): number {
  return project.tasks.filter((t) => t.status !== 'Complete').length
}

export function blockedTaskCount(project: Project): number {
  return project.tasks.filter((t) => t.status === 'Blocked').length
}

export function sortRulesNewestFirst(rules: DoNotChangeRule[]): DoNotChangeRule[] {
  return [...rules].sort((a, b) => {
    if (a.createdAt === b.createdAt) return b.id.localeCompare(a.id)
    return b.createdAt.localeCompare(a.createdAt)
  })
}

// ISO date (YYYY-MM-DD) -> "Jun 6, 2026". Falls back to the raw string.
export function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}
