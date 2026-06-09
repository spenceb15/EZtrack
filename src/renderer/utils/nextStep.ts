import type { Priority, Project, Task } from '../types'

const PRIORITY_WEIGHT: Record<Priority, number> = {
  Low: 10,
  Medium: 20,
  High: 35,
  Critical: 50
}

function priorityWeight(task: Task): number {
  return PRIORITY_WEIGHT[task.priority] + (task.status === 'In Progress' ? 5 : 0)
}

function projectScore(project: Project): number {
  const blocked = project.tasks.filter((task) => task.status === 'Blocked')
  const actionable = project.tasks.filter((task) => task.status === 'Ready' || task.status === 'In Progress')
  const topActionable = actionable.reduce((best, task) => Math.max(best, priorityWeight(task)), 0)
  const recency = Date.parse(`${project.lastWorkedOn}T00:00:00`)
  const recencyScore = Number.isNaN(recency) ? 0 : Math.floor(recency / 86400000)

  let score = topActionable + recencyScore
  if (project.health === 'Blocked') score += 120
  score += blocked.filter((task) => task.priority === 'Critical').length * 100
  score += blocked.length * 40
  if (project.phase === 'Testing') score += 25
  if (project.phase === 'Build & Refine') score += 15
  if (project.lastSession === null) score += 10

  return score
}

export function pickProjectForNextStep(projects: Project[]): Project | null {
  if (projects.length === 0) return null

  return projects.reduce((best, project) => {
    const bestScore = projectScore(best)
    const projectScoreValue = projectScore(project)
    if (projectScoreValue !== bestScore) return projectScoreValue > bestScore ? project : best
    return project.lastWorkedOn > best.lastWorkedOn ? project : best
  })
}

export function recommendNextStep(project: Project): string {
  const openTasks = project.tasks.filter(t => t.status !== 'Complete')
  const blockedTasks = project.tasks.filter(t => t.status === 'Blocked')

  if (project.phase === 'Planning' && openTasks.length > 0) {
    return 'Start working on your top priority task'
  }
  if (project.phase === 'Planning') {
    return 'Define the first concrete task needed to move this project forward'
  }
  if (project.phase === 'Build & Refine' && blockedTasks.length > 0) {
    return "Address the blocked task that's holding up progress"
  }
  if (project.phase === 'Build & Refine' && openTasks.length > 0) {
    return 'Move the highest-priority ready task into focused implementation'
  }
  if (project.phase === 'Testing') {
    return 'Begin thorough testing of all features and components'
  }
  if (project.phase === 'UX Review') {
    return 'Review the user experience and gather design feedback'
  }
  if (project.phase === 'Stable') {
    return 'Prepare the project for a smooth, successful launch'
  }

  return 'Continue making progress on your project goals'
}
