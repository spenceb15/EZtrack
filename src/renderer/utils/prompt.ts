import type { Project } from '../types'

const SEVERITY_ORDER = { 'Hard Rule': 0, Warning: 1, Note: 2 } as const

export function generatePrompt(project: Project): string {
  const lines: string[] = []
  const hasText = (value: string) => value.trim().length > 0

  const projectType = hasText(project.type) ? ` (${project.type})` : ''
  lines.push(`You are helping with a project called "${project.name}"${projectType}.`)
  lines.push(`Phase: ${project.phase} | Progress: ${project.progress}%`)

  if (hasText(project.description)) {
    lines.push('')
    lines.push('### Description')
    lines.push(project.description)
  }

  if (hasText(project.currentGoal)) {
    lines.push('')
    lines.push('### Current Goal')
    lines.push(project.currentGoal)
  }

  if (hasText(project.nextStep)) {
    lines.push('')
    lines.push('### Recommended Next Step')
    lines.push(project.nextStep)
  }

  lines.push('')
  lines.push('### Recommended Agent')
  lines.push(project.recommendedAgent)
  if (hasText(project.whyThisAgent)) {
    lines.push(`Why: ${project.whyThisAgent}`)
  }

  const knowledgeNotes = project.knowledgeNotes ?? []
  if (knowledgeNotes.length > 0) {
    lines.push('')
    lines.push('### Knowledge')
    for (const note of knowledgeNotes) {
      lines.push(`**${note.title}:** ${note.body}`)
    }
  }

  const activeTasks = project.tasks.filter((t) => t.status !== 'Complete')
  if (activeTasks.length > 0) {
    lines.push('')
    lines.push('### Active Tasks')
    for (const task of activeTasks) {
      const desc = hasText(task.description) ? `: ${task.description}` : ''
      lines.push(`- [${task.priority}] ${task.title}${desc}`)
      lines.push(`  Status: ${task.status} | Agent: ${task.recommendedAgent}`)
      const acceptanceCriteria = task.acceptanceCriteria.filter(hasText)
      if (acceptanceCriteria.length > 0) {
        lines.push(`  Acceptance: ${acceptanceCriteria.join('; ')}`)
      }
    }
  }

  const rules = project.doNotChangeRules
    .filter((rule) => hasText(rule.rule))
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])
  if (rules.length > 0) {
    lines.push('')
    lines.push('### Do Not Change Rules')
    for (const rule of rules) {
      lines.push(`- [${rule.severity}] ${rule.rule}`)
      if (hasText(rule.reason)) {
        lines.push(`  Reason: ${rule.reason}`)
      }
    }
  }

  if (project.lastSession) {
    const s = project.lastSession
    const sessionLines: string[] = []
    if (hasText(s.date)) sessionLines.push(`Date: ${s.date}`)
    if (hasText(s.agent)) sessionLines.push(`Agent: ${s.agent}`)
    if (hasText(s.summary)) sessionLines.push(`Summary: ${s.summary}`)
    if (hasText(s.problems)) sessionLines.push(`Problems: ${s.problems}`)
    if (hasText(s.recommendedNextStep)) {
      sessionLines.push(`Recommended next step: ${s.recommendedNextStep}`)
    }
    if (sessionLines.length > 0) {
      lines.push('')
      lines.push('### Last Session')
      lines.push(...sessionLines)
    }
  }

  if (hasText(project.nextStep)) {
    lines.push('')
    lines.push('---')
    lines.push('Begin by addressing the Recommended Next Step above.')
  }

  return lines.join('\n')
}
