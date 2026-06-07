import { useState } from 'react'
import type { Agent, Project, Task } from '../types'
import {
  ProgressBar,
  PhaseBadge,
  HealthBadge,
  AgentBadge,
  StatusBadge,
  PriorityBadge,
  SeverityBadge,
  Section,
  EmptyState
} from '../components/ui'
import { formatDate } from '../utils/projects'
import { Modal } from '../components/Modal'
import { ProjectForm, type ProjectFormValues } from '../components/ProjectForm'
import { TaskForm, type TaskFormValues } from '../components/TaskForm'

export function ProjectDetail({
  project,
  agents,
  onBack,
  onUpdateProject,
  onAddTask,
  onUpdateTask,
  onSetTaskStatus
}: {
  project: Project | null
  agents: Agent[]
  onBack: () => void
  onUpdateProject: (id: string, values: ProjectFormValues) => void
  onAddTask: (projectId: string, values: TaskFormValues) => void
  onUpdateTask: (projectId: string, taskId: string, values: TaskFormValues) => void
  onSetTaskStatus: (projectId: string, taskId: string, status: Task['status']) => void
}) {
  const [editingProject, setEditingProject] = useState(false)
  // null = closed; { task: null } = add; { task } = edit
  const [taskModal, setTaskModal] = useState<{ task: Task | null } | null>(null)

  if (!project) {
    return (
      <div className="page">
        <button className="btn btn-ghost back-btn" onClick={onBack}>
          ← Back to Projects
        </button>
        <EmptyState message="Project not found." />
      </div>
    )
  }

  const closeTask = () => setTaskModal(null)

  return (
    <div className="page">
      <button className="btn btn-ghost back-btn" onClick={onBack}>
        ← Back to Projects
      </button>

      <header className="page-head">
        <div>
          <h1 className="page-title">{project.name}</h1>
          <p className="page-subtitle">{project.type}</p>
        </div>
        <div className="head-actions">
          <HealthBadge health={project.health} />
          <button className="btn btn-ghost" onClick={() => setEditingProject(true)}>
            Edit project
          </button>
        </div>
      </header>

      <Section title="Overview">
        <p className="field-value">{project.description}</p>
        <div className="detail-grid">
          <div>
            <span className="field-label">Phase</span>
            <PhaseBadge phase={project.phase} />
          </div>
          <div>
            <span className="field-label">Last agent used</span>
            <span className="field-value">{project.lastAgentUsed || '—'}</span>
          </div>
          <div>
            <span className="field-label">Last worked on</span>
            <span className="field-value">{formatDate(project.lastWorkedOn)}</span>
          </div>
        </div>
        <div className="field">
          <span className="field-label">Progress · {project.progress}%</span>
          <ProgressBar value={project.progress} />
        </div>
      </Section>

      <Section title="Current goal">
        <p className="field-value">{project.currentGoal || '—'}</p>
      </Section>

      <Section title="Recommended next step">
        <p className="field-value">{project.nextStep || '—'}</p>
        <div className="field">
          <span className="field-label">Recommended agent</span>
          <AgentBadge agent={project.recommendedAgent} />
        </div>
        {project.whyThisAgent && <p className="why-text">{project.whyThisAgent}</p>}
      </Section>

      <Section title="Tasks">
        <div className="section-actions">
          <button className="btn btn-primary btn-sm" onClick={() => setTaskModal({ task: null })}>
            Add task
          </button>
        </div>
        {project.tasks.length === 0 ? (
          <EmptyState message="No tasks yet. Click “Add task” to create one." />
        ) : (
          <ul className="task-list">
            {project.tasks.map((t) => {
              const isComplete = t.status === 'Complete'
              const isBlocked = t.status === 'Blocked'
              return (
                <li key={t.id} className="card task-item">
                  <div className="task-head">
                    <span className="task-title">{t.title}</span>
                    <span className="task-badges">
                      <StatusBadge status={t.status} />
                      <PriorityBadge priority={t.priority} />
                    </span>
                  </div>
                  {t.description && <p className="field-value">{t.description}</p>}
                  <div className="field">
                    <span className="field-label">Agent</span>
                    <AgentBadge agent={t.recommendedAgent} />
                    {t.whyThisAgent && <span className="why-text">{t.whyThisAgent}</span>}
                  </div>
                  {t.acceptanceCriteria.length > 0 && (
                    <ul className="criteria">
                      {t.acceptanceCriteria.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  )}
                  <div className="task-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => setTaskModal({ task: t })}>
                      Edit
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => onSetTaskStatus(project.id, t.id, isComplete ? 'Ready' : 'Complete')}
                    >
                      {isComplete ? 'Reopen' : 'Complete'}
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => onSetTaskStatus(project.id, t.id, isBlocked ? 'Ready' : 'Blocked')}
                    >
                      {isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Section>

      <Section title="Do Not Change rules">
        {project.doNotChangeRules.length === 0 ? (
          <EmptyState message="No rules yet." />
        ) : (
          <ul className="rule-list">
            {project.doNotChangeRules.map((r) => (
              <li key={r.id} className="rule-item">
                <SeverityBadge severity={r.severity} />
                <div>
                  <div className="field-value">{r.rule}</div>
                  <div className="why-text">{r.reason}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Last session">
        {project.lastSession ? (
          <div className="detail-grid">
            <div>
              <span className="field-label">Date</span>
              <span className="field-value">{formatDate(project.lastSession.date)}</span>
            </div>
            <div>
              <span className="field-label">Agent</span>
              <span className="field-value">{project.lastSession.agent}</span>
            </div>
            <div className="span-2">
              <span className="field-label">Summary</span>
              <span className="field-value">{project.lastSession.summary}</span>
            </div>
            <div className="span-2">
              <span className="field-label">Problems</span>
              <span className="field-value">{project.lastSession.problems}</span>
            </div>
            <div className="span-2">
              <span className="field-label">Recommended next step</span>
              <span className="field-value">{project.lastSession.recommendedNextStep}</span>
            </div>
          </div>
        ) : (
          <EmptyState message="No session logged yet." />
        )}
      </Section>

      <Section title="Notes">
        <p className="field-value">{project.notes || '—'}</p>
      </Section>

      {editingProject && (
        <Modal title="Edit project" onClose={() => setEditingProject(false)}>
          <ProjectForm
            initial={project}
            agents={agents}
            onSubmit={(values) => {
              onUpdateProject(project.id, values)
              setEditingProject(false)
            }}
            onCancel={() => setEditingProject(false)}
          />
        </Modal>
      )}

      {taskModal && (
        <Modal title={taskModal.task ? 'Edit task' : 'Add task'} onClose={closeTask}>
          <TaskForm
            initial={taskModal.task}
            agents={agents}
            onSubmit={(values) => {
              if (taskModal.task) {
                onUpdateTask(project.id, taskModal.task.id, values)
              } else {
                onAddTask(project.id, values)
              }
              closeTask()
            }}
            onCancel={closeTask}
          />
        </Modal>
      )}
    </div>
  )
}
