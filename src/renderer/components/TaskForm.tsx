import { useState, type FormEvent } from 'react'
import type { Agent, AgentName, Priority, Task, TaskStatus } from '../types'
import { PRIORITIES, TASK_STATUSES } from '../data/options'
import { suggestAgent } from '../utils/recommend'

export interface TaskFormValues {
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  recommendedAgent: AgentName
  whyThisAgent: string
  acceptanceCriteria: string[]
  notes: string
}

export function TaskForm({
  initial,
  agents,
  onSubmit,
  onCancel
}: {
  initial: Task | null
  agents: Agent[]
  onSubmit: (values: TaskFormValues) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [status, setStatus] = useState<TaskStatus>(initial?.status ?? 'Backlog')
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'Medium')
  const [recommendedAgent, setRecommendedAgent] = useState<AgentName>(
    initial?.recommendedAgent ?? agents[0]?.name ?? 'Codex'
  )
  const [whyThisAgent, setWhyThisAgent] = useState(initial?.whyThisAgent ?? '')
  const [criteria, setCriteria] = useState((initial?.acceptanceCriteria ?? []).join('\n'))
  const [notes, setNotes] = useState(initial?.notes ?? '')

  const handleSuggest = () => {
    const s = suggestAgent({ title, description })
    setRecommendedAgent(s.agent)
    setWhyThisAgent(s.why)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({
      title: title.trim(),
      description,
      status,
      priority,
      recommendedAgent,
      whyThisAgent,
      acceptanceCriteria: criteria
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      notes
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span className="form-label">Title</span>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
      </label>

      <label className="form-field">
        <span className="form-label">Description</span>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </label>

      <div className="form-row">
        <label className="form-field">
          <span className="form-label">Status</span>
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span className="form-label">Priority</span>
          <select className="select" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span className="form-label">Recommended agent</span>
          <select
            className="select"
            value={recommendedAgent}
            onChange={(e) => setRecommendedAgent(e.target.value as AgentName)}
          >
            {agents.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-suggest">
        <button type="button" className="btn btn-ghost btn-sm" onClick={handleSuggest} disabled={!title.trim()}>
          Suggest agent from title
        </button>
        <span className="hint-text">Rule-based — fills agent + reason. Edit freely after.</span>
      </div>

      <label className="form-field">
        <span className="form-label">Why this agent</span>
        <input className="input" value={whyThisAgent} onChange={(e) => setWhyThisAgent(e.target.value)} />
      </label>

      <label className="form-field">
        <span className="form-label">Acceptance criteria (one per line)</span>
        <textarea className="textarea" value={criteria} onChange={(e) => setCriteria(e.target.value)} rows={4} />
      </label>

      <label className="form-field">
        <span className="form-label">Notes</span>
        <textarea className="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
      </label>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initial ? 'Save task' : 'Add task'}
        </button>
      </div>
    </form>
  )
}
