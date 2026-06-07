import { useState, type FormEvent } from 'react'

export interface KnowledgeNoteFormValues {
  title: string
  body: string
}

export function KnowledgeNoteForm({
  onSubmit,
  onCancel
}: {
  onSubmit: (values: KnowledgeNoteFormValues) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!title.trim() || !body.trim()) return
    onSubmit({ title: title.trim(), body: body.trim() })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span className="form-label">Title</span>
        <input
          className="input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          autoFocus
        />
      </label>

      <label className="form-field">
        <span className="form-label">Note</span>
        <textarea
          className="textarea"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={4}
          required
        />
      </label>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Add note
        </button>
      </div>
    </form>
  )
}
