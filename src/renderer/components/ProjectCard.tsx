import type { Project } from '../types'
import { openTaskCount, blockedTaskCount, formatDate } from '../utils/projects'
import { ProgressBar, PhaseBadge, HealthBadge, AgentBadge } from './ui'

export function ProjectCard({
  project,
  onOpen
}: {
  project: Project
  onOpen: (id: string) => void
}) {
  const blocked = blockedTaskCount(project)

  return (
    <article className="card project-card">
      <header className="project-card-head">
        <h3 className="project-name">{project.name}</h3>
        <HealthBadge health={project.health} />
      </header>

      <p className="project-desc">{project.description}</p>

      <div className="project-meta">
        <PhaseBadge phase={project.phase} />
        <span className="muted-text">{project.progress}%</span>
      </div>
      <ProgressBar value={project.progress} />

      <div className="next-step">
        <span className="field-label">Next step</span>
        <p className="next-step-text">{project.nextStep}</p>
      </div>

      <div className="agent-rec">
        <div className="agent-rec-head">
          <span className="field-label">Recommended agent</span>
          <AgentBadge agent={project.recommendedAgent} />
        </div>
        <p className="why-text">{project.whyThisAgent}</p>
      </div>

      <div className="project-stats">
        <span className="stat">
          <strong>{openTaskCount(project)}</strong> open
        </span>
        <span className={'stat' + (blocked > 0 ? ' stat-blocked' : '')}>
          <strong>{blocked}</strong> blocked
        </span>
        <span className="stat">Last worked {formatDate(project.lastWorkedOn)}</span>
      </div>

      <button className="btn btn-primary btn-block" onClick={() => onOpen(project.id)}>
        Open Project
      </button>
    </article>
  )
}
