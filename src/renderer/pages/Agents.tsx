import type { Agent } from '../types'

export function Agents({ agents }: { agents: Agent[] }) {
  return (
    <div className="page">
      <header className="page-head">
        <div>
          <h1 className="page-title">Agents</h1>
          <p className="page-subtitle">When to use each AI agent.</p>
        </div>
      </header>

      <div className="card-grid">
        {agents.map((a) => (
          <article key={a.id} className="card agent-card">
            <h3 className="project-name">{a.name}</h3>

            <div className="field">
              <span className="field-label">Best for</span>
              <ul className="chip-list">
                {a.bestFor.map((s, i) => (
                  <li key={i} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="field">
              <span className="field-label">Risks</span>
              <ul className="bullet-list">
                {a.risks.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="field">
              <span className="field-label">Best task types</span>
              <ul className="chip-list">
                {a.recommendedFor.map((s, i) => (
                  <li key={i} className="chip chip-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
