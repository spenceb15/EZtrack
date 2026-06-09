import { useReducer, useEffect, useState, type ChangeEvent } from 'react'
import type { AppSettings, AppData } from '../types'
import { Section } from '../components/ui'

type Action =
  | { type: 'SET_THEME'; payload: AppSettings['theme'] }
  | { type: 'SET_EXPERIENCE_MODE'; payload: AppSettings['experienceMode'] }

const reducer = (state: AppSettings, action: Action): AppSettings => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_EXPERIENCE_MODE':
      return { ...state, experienceMode: action.payload }
    default:
      return state
  }
}

const saveTheme = async (theme: AppSettings['theme']): Promise<void> => {
  const raw = await window.api.loadData()
  if (raw) {
    const data = raw as AppData
    await window.api.saveData({ ...data, settings: { ...data.settings, theme } })
  }
}

export function Settings({
  settings: initialSettings,
  onChangeExperienceMode,
  onResetSampleData
}: {
  settings: AppSettings
  onChangeExperienceMode: (mode: AppSettings['experienceMode']) => void
  onResetSampleData: () => void
}) {
  const [settings, dispatch] = useReducer(reducer, initialSettings)
  const [dataPath, setDataPath] = useState('')

  useEffect(() => {
    void window.api.dataPath().then((path) => setDataPath(path))
  }, [])

  useEffect(() => {
    dispatch({ type: 'SET_THEME', payload: initialSettings.theme })
    dispatch({ type: 'SET_EXPERIENCE_MODE', payload: initialSettings.experienceMode })
  }, [initialSettings.experienceMode, initialSettings.theme])

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const updated: AppSettings = { ...settings, theme: e.target.value as AppSettings['theme'] }
    dispatch({ type: 'SET_THEME', payload: updated.theme })
    void saveTheme(updated.theme)
  }

  const handleExperienceModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const updated: AppSettings = { ...settings, experienceMode: e.target.value as AppSettings['experienceMode'] }
    dispatch({ type: 'SET_EXPERIENCE_MODE', payload: updated.experienceMode })
    onChangeExperienceMode(updated.experienceMode)
  }

  const handleResetData = () => {
    const ok = window.confirm('Reset to sample data? This overwrites your current data with the D.AI.L.Y sample.')
    if (ok) {
      onResetSampleData()
      void window.api.dataPath().then((path) => setDataPath(path))
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Basic app preferences. Changes save locally and persist after restart.</p>
        </div>
      </header>

      <Section title="Experience mode">
        <div className="field-row">
          <span className="field-value">
            {settings.experienceMode === 'builder' ? 'Builder (plain language)' : 'Expert (technical)'}
          </span>
          <select
            className="select"
            value={settings.experienceMode}
            onChange={handleExperienceModeChange}
          >
            <option value="builder">Builder</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <p className="why-text">Saved immediately. (Mode-specific labels arrive in a later polish milestone.)</p>
      </Section>

      <Section title="Theme">
        <div className="field-row">
          <span className="field-value">{settings.theme}</span>
          <select className="select" value={settings.theme} onChange={handleThemeChange}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </Section>

      <Section title="Data location">
        <code className="code">{dataPath}</code>
        <p className="why-text">Local JSON. Loaded on start, saved on change.</p>
      </Section>

      <Section title="Sample data">
        <button className="btn btn-ghost" onClick={handleResetData}>
          Reset sample data
        </button>
      </Section>
    </div>
  )
}
