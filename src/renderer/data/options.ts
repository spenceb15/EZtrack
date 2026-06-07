import type { Phase, Priority, TaskStatus } from '../types'

export const PHASES: Phase[] = ['Planning', 'Build & Refine', 'Testing', 'UX Review', 'Stable']

export const TASK_STATUSES: TaskStatus[] = ['Backlog', 'Ready', 'In Progress', 'Blocked', 'Complete']

export const PRIORITIES: Priority[] = ['Low', 'Medium', 'High', 'Critical']
