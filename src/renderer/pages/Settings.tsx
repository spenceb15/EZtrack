import { useEffect, useState } from 'react'
import type { AppSettings } from '../types'
import { Section } from '../components/ui'

export function Settings({
  settings,
  onChangeExperienceMode,
  onResetSampleData
}: {
  settings: AppSettings
  onChangeExperienceMode: (mode: AppSettings['experienceMode']) => void
  onResetSampleData: () => void
}) {
  const [dataPath, setDataPath] = useState('~/AIProjectDashboard/app-data.json')

  useEffect(() => {
    void window.api.dataPath().then(setDataPath)
  }, [])

  const handleReset = () => {
    const ok = window.confirm(
      'Reset to sample data? This overwrites your current data with the D.AI.L.Y sample.'
    )
    if (ok) onResetSampleData()
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
            onChange={(e) => onChangeExperienceMode(e.target.value as AppSettings['experienceMode'])}
          >
            <option value="builder">Builder</option>
            <option value="expert">Expert</option>
          </select>
        </div>
        <p className="why-text">Saved immediately. (Mode-specific labels arrive in a later polish milestone.)</p>
      </Section>

      <Section title="Theme">
        <div className="field-row">
          <span className="field-value">Dark</span>
          <select className="select" defaultValue={settings.theme} disabled>
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
        <button className="btn btn-ghost" onClick={handleReset}>
          Reset sample data
        </button>
      </Section>
    </div>
  )
}
