import type { NavKey } from '../types'

const ITEMS: { key: NavKey; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'projects', label: 'Projects' },
  { key: 'agents', label: 'Agents' },
  { key: 'settings', label: 'Settings' }
]

export function Sidebar({
  active,
  onNavigate
}: {
  active: NavKey
  onNavigate: (key: NavKey) => void
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">◆</span>
        <span className="brand-name">AI Project Dashboard</span>
      </div>

      <nav className="nav">
        {ITEMS.map((item) => {
          // Keep "Projects" highlighted while viewing a project detail page.
          const isActive = active === item.key || (active === 'project-detail' && item.key === 'projects')
          return (
            <button
              key={item.key}
              className={'nav-item' + (isActive ? ' active' : '')}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-footer">MVP 0.1 · Local-first</div>
    </aside>
  )
}
