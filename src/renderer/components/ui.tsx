import type { ReactNode } from 'react'
import type { Health, Priority, TaskStatus, RuleSeverity } from '../types'

export function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="progress" aria-label={`Progress ${v}%`}>
      <div className="progress-fill" style={{ width: `${v}%` }} />
    </div>
  )
}

export function PhaseBadge({ phase }: { phase: string }) {
  return <span className="badge badge-phase">{phase}</span>
}

export function AgentBadge({ agent }: { agent: string }) {
  return <span className="badge badge-agent">{agent}</span>
}

export function HealthBadge({ health }: { health: Health }) {
  const tone = health === 'Good' ? 'good' : health === 'Blocked' ? 'blocked' : 'attention'
  return <span className={`badge badge-health badge-${tone}`}>{health}</span>
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  const tone =
    status === 'Complete'
      ? 'good'
      : status === 'Blocked'
        ? 'blocked'
        : status === 'In Progress'
          ? 'active'
          : 'muted'
  return <span className={`badge badge-${tone}`}>{status}</span>
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const tone =
    priority === 'Critical' ? 'blocked' : priority === 'High' ? 'attention' : priority === 'Medium' ? 'active' : 'muted'
  return <span className={`badge badge-${tone}`}>{priority}</span>
}

export function SeverityBadge({ severity }: { severity: RuleSeverity }) {
  const tone = severity === 'Hard Rule' ? 'blocked' : severity === 'Warning' ? 'attention' : 'muted'
  return <span className={`badge badge-${tone}`}>{severity}</span>
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  )
}

export function EmptyState({ message }: { message: string }) {
  return <div className="empty-state">{message}</div>
}
