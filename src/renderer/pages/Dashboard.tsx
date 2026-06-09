import { useState } from 'react'
import type { Project } from '../types'
import { ProjectCard } from '../components/ProjectCard'
import { EmptyState } from '../components/ui'
import { RecommendationCard } from '../components/RecommendationCard'
import { pickProjectForNextStep, recommendNextStep } from '../utils/nextStep'
import { recommendAgent } from '../utils/recommend'

export function Dashboard({
  projects,
  onOpenProject
}: {
  projects: Project[]
  onOpenProject: (id: string) => void
}) {
  const [showRec, setShowRec] = useState(false)

  const count = projects.length
  const summary =
    count === 0
      ? 'No projects yet.'
      : `${count} active project${count === 1 ? '' : 's'} at a glance.`

  // Recomputed on each render from current data, so it always reflects edits.
  const recommendedProject = showRec ? pickProjectForNextStep(projects) : null
  const rec = recommendedProject
    ? {
        project: recommendedProject,
        nextStep: recommendNextStep(recommendedProject),
        agentRecommendation: recommendAgent(recommendedProject)
      }
    : null

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">{summary}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowRec((s) => !s)} disabled={count === 0}>
          What should I do next?
        </button>
      </header>

      {showRec &&
        (rec ? (
          <RecommendationCard rec={rec} showProject onOpenProject={onOpenProject} onDismiss={() => setShowRec(false)} />
        ) : (
          <div className="notice">No projects yet — create one to get a recommendation.</div>
        ))}

      {projects.length === 0 ? (
        <EmptyState message="No projects yet. Open the Projects page to create one." />
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
