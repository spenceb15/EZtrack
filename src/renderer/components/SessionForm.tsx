import { useState, type FormEvent } from 'react'
import type { Agent, AgentName, LastSession } from '../types'
import { today } from '../utils/id'

export type SessionFormValues = LastSession

export function SessionForm({
  defaultAgent,
  agents,
  onSubmit,
  onCancel
}: {
  defaultAgent: AgentName
  agents: Agent[]
  onSubmit: (values: SessionFormValues) => void
  onCancel: () => void
}) {
  const [date, setDate] = useState(today())
  const [agent, setAgent] = useState<LastSession['agent']>(defaultAgent)
  const [summary, setSummary] = useState('')
  const [problems, setProblems] = useState('')
  const [recommendedNextStep, setRecommendedNextStep] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!summary.trim()) return
    onSubmit({ date, agent, summary: summary.trim(), problems, recommendedNextStep })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-field">
          <span className="form-label">Date</span>
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label className="form-field">
          <span className="form-label">Agent used</span>
          <select className="select" value={agent} onChange={(e) => setAgent(e.target.value)}>
            {agents.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="form-field">
        <span className="form-label">Summary</span>
        <textarea
          className="textarea"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          required
          autoFocus
          placeholder="What was accomplished this session?"
        />
      </label>

      <label className="form-field">
        <span className="form-label">Problems encountered</span>
        <textarea
          className="textarea"
          value={problems}
          onChange={(e) => setProblems(e.target.value)}
          rows={2}
          placeholder="Blockers, surprises, or things that broke."
        />
      </label>

      <label className="form-field">
        <span className="form-label">Recommended next step</span>
        <input
          className="input"
          value={recommendedNextStep}
          onChange={(e) => setRecommendedNextStep(e.target.value)}
          placeholder="What should happen at the start of the next session?"
        />
      </label>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Log session
        </button>
      </div>
    </form>
  )
}
