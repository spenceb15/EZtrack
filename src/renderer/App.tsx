import { useEffect, useRef, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { ProjectDetail } from './pages/ProjectDetail'
import { Agents } from './pages/Agents'
import { Settings } from './pages/Settings'
import { seedData } from './data/seed'
import type { AppData, DoNotChangeRule, KnowledgeNote, NavKey, Project, Task, TaskStatus } from './types'
import { isAppData } from './utils/appData'
import { makeId, today } from './utils/id'
import type { ProjectFormValues } from './components/ProjectForm'
import type { TaskFormValues } from './components/TaskForm'
import type { RuleFormValues } from './components/RuleForm'
import type { KnowledgeNoteFormValues } from './components/KnowledgeNoteForm'
import type { SessionFormValues } from './components/SessionForm'

export function App() {
  const [nav, setNav] = useState<NavKey>('dashboard')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [data, setData] = useState<AppData | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const dataRef = useRef<AppData | null>(null)
  const saveQueueRef = useRef<Promise<void>>(Promise.resolve())

  // Load persisted data on start; write the seed file on first run.
  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const loaded = await window.api.loadData()
        if (loaded !== null && !isAppData(loaded)) {
          throw new Error('The local data file does not match the expected MVP data format.')
        }
        if (!loaded) await window.api.saveData(seedData)
        if (!cancelled) {
          const initialData = loaded ?? seedData
          dataRef.current = initialData
          setData(initialData)
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : 'The local data file could not be loaded.')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const persist = (next: AppData) => {
    dataRef.current = next
    setData(next)
    saveQueueRef.current = saveQueueRef.current
      .then(() => window.api.saveData(next))
      .then(() => {
        setSaveError(null)
      })
      .catch((error) => {
        setSaveError(error instanceof Error ? error.message : 'Changes could not be saved locally.')
      })
  }

  const setExperienceMode = (mode: AppData['settings']['experienceMode']) => {
    const current = dataRef.current
    if (!current) return
    persist({ ...current, settings: { ...current.settings, experienceMode: mode } })
  }

  const resetSampleData = () => {
    persist(seedData)
    setSelectedProjectId(null)
    setNav('dashboard')
  }

  const recoverWithSampleData = async () => {
    try {
      await window.api.saveData(seedData)
      dataRef.current = seedData
      setData(seedData)
      setLoadError(null)
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'The sample data could not be saved.')
    }
  }

  const createProject = (values: ProjectFormValues) => {
    const current = dataRef.current
    if (!current) return
    const { manuallyBlocked, ...projectValues } = values
    const project: Project = {
      id: makeId('project'),
      ...projectValues,
      health: manuallyBlocked ? 'Blocked' : 'Needs Attention',
      lastAgentUsed: '',
      lastWorkedOn: today(),
      tasks: [],
      doNotChangeRules: [],
      lastSession: null,
      sessionHistory: [],
      agentUsageCounts: {},
      knowledgeNotes: []
    }
    persist({ ...current, projects: [...current.projects, project] })
    setSelectedProjectId(project.id)
    setNav('project-detail')
  }

  const updateProject = (id: string, values: ProjectFormValues) => {
    const current = dataRef.current
    if (!current) return
    const { manuallyBlocked, ...projectValues } = values
    persist({
      ...current,
      projects: current.projects.map((p) =>
        p.id === id
          ? {
              ...p,
              ...projectValues,
              health: manuallyBlocked ? 'Blocked' : 'Needs Attention',
              lastWorkedOn: today()
            }
          : p
      )
    })
  }

  const addTask = (projectId: string, values: TaskFormValues) => {
    const current = dataRef.current
    if (!current) return
    const task: Task = { id: makeId('task'), ...values }
    persist({
      ...current,
      projects: current.projects.map((p) =>
        p.id === projectId ? { ...p, lastWorkedOn: today(), tasks: [...p.tasks, task] } : p
      )
    })
  }

  const updateTask = (projectId: string, taskId: string, values: TaskFormValues) => {
    const current = dataRef.current
    if (!current) return
    persist({
      ...current,
      projects: current.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              lastWorkedOn: today(),
              tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, ...values } : t))
            }
          : p
      )
    })
  }

  const setTaskStatus = (projectId: string, taskId: string, status: TaskStatus) => {
    const current = dataRef.current
    if (!current) return
    persist({
      ...current,
      projects: current.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              lastWorkedOn: today(),
              tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, status } : t))
            }
          : p
      )
    })
  }

  const logSession = (projectId: string, values: SessionFormValues) => {
    const current = dataRef.current
    if (!current) return
    persist({
      ...current,
      projects: current.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              lastAgentUsed: values.agent,
              lastWorkedOn: today(),
              lastSession: {
                date: values.date,
                agent: values.agent,
                summary: values.summary,
                problems: values.problems,
                recommendedNextStep: values.recommendedNextStep
              },
              sessionHistory: [
                {
                  date: values.date,
                  agent: values.agent,
                  summary: values.summary,
                  problems: values.problems,
                  recommendedNextStep: values.recommendedNextStep
                },
                ...(p.sessionHistory ?? [])
              ],
              agentUsageCounts: {
                ...(p.agentUsageCounts ?? {}),
                [values.agent]: ((p.agentUsageCounts ?? {})[values.agent] ?? 0) + 1
              }
            }
          : p
      )
    })
  }

  const addRule = (projectId: string, values: RuleFormValues) => {
    const current = dataRef.current
    if (!current) return
    const rule: DoNotChangeRule = {
      id: makeId('rule'),
      ...values,
      createdAt: today()
    }
    persist({
      ...current,
      projects: current.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              lastWorkedOn: today(),
              doNotChangeRules: [...project.doNotChangeRules, rule]
            }
          : project
      )
    })
  }

  const addKnowledgeNote = (projectId: string, values: KnowledgeNoteFormValues) => {
    const current = dataRef.current
    if (!current) return
    const note: KnowledgeNote = {
      id: makeId('note'),
      ...values,
      createdAt: today()
    }
    persist({
      ...current,
      projects: current.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              knowledgeNotes: [...(project.knowledgeNotes ?? []), note]
            }
          : project
      )
    })
  }

  if (loadError) {
    return (
      <div className="loading-screen">
        <div className="load-error">
          <strong>Could not load local data.</strong>
          <span>{loadError}</span>
          <button className="btn btn-ghost" onClick={() => void recoverWithSampleData()}>
            Reset to sample data
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return <div className="loading-screen">Loading…</div>
  }

  const openProject = (id: string) => {
    setSelectedProjectId(id)
    setNav('project-detail')
  }

  const selectedProject = data.projects.find((p) => p.id === selectedProjectId) ?? null

  return (
    <div className="app">
      <Sidebar active={nav} onNavigate={setNav} />
      <main className="content">
        {saveError && (
          <div className="notice" role="alert">
            Could not save changes locally: {saveError}
          </div>
        )}
        {nav === 'dashboard' && <Dashboard projects={data.projects} onOpenProject={openProject} />}
        {nav === 'projects' && (
          <Projects
            projects={data.projects}
            agents={data.agents}
            onOpenProject={openProject}
            onCreateProject={createProject}
          />
        )}
        {nav === 'project-detail' && (
          <ProjectDetail
            project={selectedProject}
            agents={data.agents}
            onBack={() => setNav('projects')}
            onUpdateProject={updateProject}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onSetTaskStatus={setTaskStatus}
            onAddRule={addRule}
            onLogSession={logSession}
            onAddKnowledgeNote={addKnowledgeNote}
          />
        )}
        {nav === 'agents' && <Agents agents={data.agents} />}
        {nav === 'settings' && (
          <Settings
            settings={data.settings}
            onChangeExperienceMode={setExperienceMode}
            onResetSampleData={resetSampleData}
          />
        )}
      </main>
    </div>
  )
}
