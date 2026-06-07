import type { Project } from '../types'
import { formatDate } from './projects'

export function generateSummary(project: Project): string {
  const lines: string[] = []
  const hasText = (v: string) => v.trim().length > 0

  lines.push(`# ${project.name}`)
  lines.push('')

  if (hasText(project.type)) lines.push(`**Type:** ${project.type}`)
  lines.push(`**Phase:** ${project.phase}`)
  lines.push(`**Progress:** ${project.progress}%`)
  lines.push(`**Health:** ${project.health}`)
  lines.push(`**Last worked on:** ${formatDate(project.lastWorkedOn)}`)
  if (hasText(project.lastAgentUsed)) lines.push(`**Last agent used:** ${project.lastAgentUsed}`)

  if (hasText(project.description)) {
    lines.push('')
    lines.push('## Description')
    lines.push(project.description)
  }

  if (hasText(project.currentGoal)) {
    lines.push('')
    lines.push('## Current Goal')
    lines.push(project.currentGoal)
  }

  if (hasText(project.nextStep) || hasText(project.recommendedAgent)) {
    lines.push('')
    lines.push('## Recommended Next Step')
    if (hasText(project.nextStep)) lines.push(project.nextStep)
    lines.push('')
    lines.push(`**Agent:** ${project.recommendedAgent}`)
    if (hasText(project.whyThisAgent)) lines.push(`**Why:** ${project.whyThisAgent}`)
  }

  if (project.tasks.length > 0) {
    lines.push('')
    lines.push('## Tasks')
    for (const task of project.tasks) {
      lines.push('')
      lines.push(`### ${task.title}`)
      lines.push(
        `**Status:** ${task.status} | **Priority:** ${task.priority} | **Agent:** ${task.recommendedAgent}`
      )
      if (hasText(task.description)) {
        lines.push('')
        lines.push(task.description)
      }
      if (hasText(task.whyThisAgent)) lines.push(`_Why this agent: ${task.whyThisAgent}_`)
      const criteria = task.acceptanceCriteria.filter(hasText)
      if (criteria.length > 0) {
        lines.push('')
        lines.push('**Acceptance criteria:**')
        criteria.forEach((c) => lines.push(`- ${c}`))
      }
      if (hasText(task.notes)) {
        lines.push('')
        lines.push(`_Notes: ${task.notes}_`)
      }
    }
  }

  if (project.doNotChangeRules.length > 0) {
    lines.push('')
    lines.push('## Do Not Change Rules')
    for (const rule of project.doNotChangeRules) {
      if (!hasText(rule.rule)) continue
      lines.push('')
      lines.push(`**[${rule.severity}]** ${rule.rule}`)
      if (hasText(rule.reason)) lines.push(`_Reason: ${rule.reason}_`)
    }
  }

  const sessionHistory = project.sessionHistory ?? (project.lastSession ? [project.lastSession] : [])
  if (sessionHistory.length > 0) {
    lines.push('')
    lines.push('## Session History')
    for (const s of sessionHistory) {
      lines.push('')
      const heading = [hasText(s.date) ? formatDate(s.date) : '', hasText(s.agent) ? s.agent : '']
        .filter(Boolean)
        .join(' · ')
      lines.push(`### ${heading}`)
      if (hasText(s.summary)) lines.push(s.summary)
      if (hasText(s.problems)) {
        lines.push('')
        lines.push(`**Problems:** ${s.problems}`)
      }
      if (hasText(s.recommendedNextStep)) {
        lines.push('')
        lines.push(`**Recommended next step:** ${s.recommendedNextStep}`)
      }
    }
  }

  const knowledgeNotes = project.knowledgeNotes ?? []
  if (knowledgeNotes.length > 0) {
    lines.push('')
    lines.push('## Knowledge')
    for (const note of knowledgeNotes) {
      lines.push('')
      lines.push(`### ${note.title}`)
      lines.push(note.body)
    }
  }

  if (hasText(project.notes)) {
    lines.push('')
    lines.push('## Notes')
    lines.push(project.notes)
  }

  return lines.join('\n')
}
