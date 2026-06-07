import { useState, type FormEvent } from 'react'
import type { Agent, AgentName, Phase, Project } from '../types'
import { PHASES } from '../data/options'

export interface ProjectFormValues {
  name: string
  description: string
  type: string
  phase: Phase
  progress: number
  currentGoal: string
  nextStep: string
  recommendedAgent: AgentName
  whyThisAgent: string
  notes: string
  manuallyBlocked: boolean
}

export function ProjectForm({
  initial,
  agents,
  onSubmit,
  onCancel
}: {
  initial: Project | null
  agents: Agent[]
  onSubmit: (values: ProjectFormValues) => void
  onCancel: () => void
}) {
  const [values, setValues] = useState<ProjectFormValues>({
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    type: initial?.type ?? '',
    phase: initial?.phase ?? 'Planning',
    progress: initial?.progress ?? 0,
    currentGoal: initial?.currentGoal ?? '',
    nextStep: initial?.nextStep ?? '',
    recommendedAgent: initial?.recommendedAgent ?? agents[0]?.name ?? 'Claude Code',
    whyThisAgent: initial?.whyThisAgent ?? '',
    notes: initial?.notes ?? '',
    manuallyBlocked: initial?.health === 'Blocked'
  })

  function set<K extends keyof ProjectFormValues>(key: K, val: ProjectFormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!values.name.trim()) return
    onSubmit({ ...values, name: values.name.trim() })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span className="form-label">Name</span>
        <input
          className="input"
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
          required
          autoFocus
        />
      </label>

      <label className="form-field">
        <span className="form-label">Description</span>
        <textarea
          className="textarea"
          value={values.description}
          onChange={(e) => set('description', e.target.value)}
          rows={2}
        />
      </label>

      <div className="form-row">
        <label className="form-field">
          <span className="form-label">Type</span>
          <input className="input" value={values.type} onChange={(e) => set('type', e.target.value)} />
        </label>
        <label className="form-field">
          <span className="form-label">Phase</span>
          <select className="select" value={values.phase} onChange={(e) => set('phase', e.target.value as Phase)}>
            {PHASES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span className="form-label">Progress %</span>
          <input
            className="input"
            type="number"
            min={0}
            max={100}
            value={values.progress}
            onChange={(e) => set('progress', clampPercent(e.target.value))}
          />
        </label>
      </div>

      <label className="form-field">
        <span className="form-label">Current goal</span>
        <textarea
          className="textarea"
          value={values.currentGoal}
          onChange={(e) => set('currentGoal', e.target.value)}
          rows={2}
        />
      </label>

      <label className="form-field">
        <span className="form-label">Next step</span>
        <input className="input" value={values.nextStep} onChange={(e) => set('nextStep', e.target.value)} />
      </label>

      <div className="form-row">
        <label className="form-field">
          <span className="form-label">Recommended agent</span>
          <select
            className="select"
            value={values.recommendedAgent}
            onChange={(e) => set('recommendedAgent', e.target.value as AgentName)}
          >
            {agents.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="form-field grow">
          <span className="form-label">Why this agent</span>
          <input
            className="input"
            value={values.whyThisAgent}
            onChange={(e) => set('whyThisAgent', e.target.value)}
          />
        </label>
      </div>

      <label className="form-field">
        <span className="form-label">Notes</span>
        <textarea
          className="textarea"
          value={values.notes}
          onChange={(e) => set('notes', e.target.value)}
          rows={2}
        />
      </label>

      <label className="checkbox-field">
        <input
          type="checkbox"
          checked={values.manuallyBlocked}
          onChange={(e) => set('manuallyBlocked', e.target.checked)}
        />
        <span>Mark project blocked</span>
      </label>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initial ? 'Save changes' : 'Create project'}
        </button>
      </div>
    </form>
  )
}

function clampPercent(raw: string): number {
  const n = Number(raw)
  if (Number.isNaN(n)) return 0
  return Math.max(0, Math.min(100, Math.round(n)))
}
