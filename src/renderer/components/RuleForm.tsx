import { useState, type FormEvent } from 'react'
import type { RuleSeverity } from '../types'

export interface RuleFormValues {
  rule: string
  severity: RuleSeverity
  reason: string
}

export function RuleForm({
  onSubmit,
  onCancel
}: {
  onSubmit: (values: RuleFormValues) => void
  onCancel: () => void
}) {
  const [rule, setRule] = useState('')
  const [severity, setSeverity] = useState<RuleSeverity>('Hard Rule')
  const [reason, setReason] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!rule.trim()) return
    onSubmit({ rule: rule.trim(), severity, reason: reason.trim() })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span className="form-label">Rule</span>
        <textarea
          className="textarea"
          value={rule}
          onChange={(event) => setRule(event.target.value)}
          rows={3}
          required
          autoFocus
        />
      </label>

      <label className="form-field">
        <span className="form-label">Severity</span>
        <select
          className="select"
          value={severity}
          onChange={(event) => setSeverity(event.target.value as RuleSeverity)}
        >
          <option value="Hard Rule">Hard Rule</option>
          <option value="Warning">Warning</option>
          <option value="Note">Note</option>
        </select>
      </label>

      <label className="form-field">
        <span className="form-label">Reason</span>
        <textarea
          className="textarea"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={2}
        />
      </label>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Add rule
        </button>
      </div>
    </form>
  )
}
