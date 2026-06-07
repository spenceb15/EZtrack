import { useState } from 'react'
import type { Project } from '../types'
import { ProjectCard } from '../components/ProjectCard'
import { EmptyState } from '../components/ui'

export function Dashboard({
  projects,
  onOpenProject
}: {
  projects: Project[]
  onOpenProject: (id: string) => void
}) {
  const [showHint, setShowHint] = useState(false)

  const count = projects.length
  const summary =
    count === 0
      ? 'No projects yet.'
      : `${count} active project${count === 1 ? '' : 's'} at a glance.`

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">{summary}</p>
        </div>
        <button className="btn btn-ghost" onClick={() => setShowHint((s) => !s)}>
          What should I do next?
        </button>
      </header>

      {showHint && (
        <div className="notice">
          The recommendation engine arrives in a later milestone (M7). For now, open a project to see its next step.
        </div>
      )}

      {projects.length === 0 ? (
        <EmptyState message="No projects yet. Project creation arrives in a later milestone." />
      ) : (
        <div className="card-grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={onOpenProject} />
          ))}
        </div>
      )}
    </div>
  )
}
