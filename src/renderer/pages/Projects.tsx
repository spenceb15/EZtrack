import { useState } from 'react'
import type { Agent, Project } from '../types'
import { PhaseBadge, HealthBadge, EmptyState } from '../components/ui'
import { openTaskCount, formatDate } from '../utils/projects'
import { Modal } from '../components/Modal'
import { ProjectForm, type ProjectFormValues } from '../components/ProjectForm'

export function Projects({
  projects,
  agents,
  onOpenProject,
  onCreateProject
}: {
  projects: Project[]
  agents: Agent[]
  onOpenProject: (id: string) => void
  onCreateProject: (values: ProjectFormValues) => void
}) {
  const [creating, setCreating] = useState(false)

  const handleCreate = (values: ProjectFormValues) => {
    onCreateProject(values)
    setCreating(false)
  }

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">All tracked projects.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setCreating(true)}>
          New Project
        </button>
      </header>

      {projects.length === 0 ? (
        <EmptyState message="No projects yet. Click “New Project” to create one." />
      ) : (
        <ul className="project-list">
          {projects.map((p) => (
            <li key={p.id} className="card project-row">
              <div className="project-row-main">
                <div className="project-row-title">
                  <span className="project-name">{p.name}</span>
                  <HealthBadge health={p.health} />
                  <PhaseBadge phase={p.phase} />
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-stats">
                  <span>{p.progress}%</span>
                  <span>Open tasks: {openTaskCount(p)}</span>
                  <span>Last: {formatDate(p.lastWorkedOn)}</span>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => onOpenProject(p.id)}>
                Open
              </button>
            </li>
          ))}
        </ul>
      )}

      {creating && (
        <Modal title="New project" onClose={() => setCreating(false)}>
          <ProjectForm initial={null} agents={agents} onSubmit={handleCreate} onCancel={() => setCreating(false)} />
        </Modal>
      )}
    </div>
  )
}
