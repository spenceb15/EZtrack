import type { NextStep } from '../utils/nextStep'
import { AgentBadge } from './ui'

// Renders the "What should I do next?" result (MVP_SPEC §11.2 format).
export function RecommendationCard({
  rec,
  showProject = false,
  onOpenProject,
  onDismiss
}: {
  rec: NextStep
  showProject?: boolean
  onOpenProject?: (id: string) => void
  onDismiss?: () => void
}) {
  return (
    <div className="card rec-card">
      <div className="rec-head">
        <span className="rec-title">Recommended next step</span>
        {onDismiss && (
          <button className="btn btn-ghost btn-sm" onClick={onDismiss}>
            Dismiss
          </button>
        )}
      </div>

      {showProject && (
        <div className="field">
          <span className="field-label">Project</span>
          <span className="field-value">{rec.project.name}</span>
        </div>
      )}

      <div className="field">
        <span className="field-label">Task</span>
        <span className="field-value">
          {rec.task
            ? rec.task.title
            : rec.project.tasks.length === 0
              ? 'Create a task to get started.'
              : 'Add the next task or advance the project.'}
        </span>
      </div>

      <div className="field">
        <span className="field-label">Recommended agent</span>
        <AgentBadge agent={rec.agent} />
      </div>

      <div className="field">
        <span className="field-label">Why</span>
        <span className="field-value">{rec.reason}</span>
        {rec.why && <p className="why-text">{rec.why}</p>}
      </div>

      {rec.cautions.length > 0 && (
        <div className="field">
          <span className="field-label">Be careful</span>
          <ul className="bullet-list rec-cautions">
            {rec.cautions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {showProject && onOpenProject && (
        <div className="rec-actions">
          <button className="btn btn-primary btn-sm" onClick={() => onOpenProject(rec.project.id)}>
            Open {rec.project.name}
          </button>
        </div>
      )}
    </div>
  )
}
