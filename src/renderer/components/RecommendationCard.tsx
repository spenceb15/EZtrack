import type { Project } from '../types'
import type { ProjectAgentRecommendation } from '../utils/recommend'
import { AgentBadge } from './ui'

interface RecommendationCardProps {
  rec: {
    project: Project
    nextStep: string
    agentRecommendation: ProjectAgentRecommendation
  }
  showProject?: boolean
  onOpenProject?: (id: string) => void
  onDismiss?: () => void
}

export function RecommendationCard({ rec, showProject = false, onOpenProject, onDismiss }: RecommendationCardProps) {
  return (
    <div className="card rec-card">
      <div className="rec-head">
        <div>
          <div className="rec-title">Recommended next step</div>
          {showProject && <div className="field-value">{rec.project.name}</div>}
        </div>
        {onDismiss && (
          <button className="btn btn-ghost btn-sm" onClick={onDismiss}>
            Dismiss
          </button>
        )}
      </div>

      <p className="field-value">{rec.nextStep}</p>

      <div className="field">
        <span className="field-label">Recommended agent</span>
        <AgentBadge agent={rec.agentRecommendation.agent} />
      </div>

      <p className="why-text">{rec.agentRecommendation.reason}</p>

      {showProject && onOpenProject && (
        <div className="rec-actions">
          <button className="btn btn-primary btn-sm" onClick={() => onOpenProject(rec.project.id)}>
            Open project
          </button>
        </div>
      )}
    </div>
  )
}
